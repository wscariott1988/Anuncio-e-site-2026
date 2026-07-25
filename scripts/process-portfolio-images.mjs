#!/usr/bin/env node

/**
 * Processamento de imagens do portfólio — Anúncio & Site
 *
 * Gera capas, versões mobile e desktop em WebP a partir dos PNGs originais.
 * Os originais NUNCA são modificados.
 *
 * Uso:
 *   node scripts/process-portfolio-images.mjs
 *   npm run images:portfolio
 */

import { readdir, mkdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { existsSync } from "node:fs";
import sharp from "sharp";

// ─── Configuração ───────────────────────────────────────────────

const ORIGINALS_DIR = join(process.cwd(), "originals", "portfolio");
const OUTPUT_DIR = join(process.cwd(), "public", "images", "portfolio");

/**
 * Mapeamento: arquivo original → slug + tipo
 * Nomes originais NÃO são alterados.
 */
const FILE_MAP = [
  { original: "auto-brum-mobile-full.png", slug: "mecanica-auto-brum", type: "mobile" },
  { original: "auto-brum-desktop-full.png", slug: "mecanica-auto-brum", type: "desktop" },
  { original: "zarq-mobile-full.png", slug: "zarq-planejados", type: "mobile" },
  { original: "zarq-desktop-full.png", slug: "zarq-planejados", type: "desktop" },
  { original: "aga-farma-mobile-full.png", slug: "agafarma-mario-quintana", type: "mobile" },
  { original: "aga-farma-desktop-full.png", slug: "agafarma-mario-quintana", type: "desktop" },
  { original: "bs-montagem-mobile-full.png", slug: "bs-montagem", type: "mobile" },
  { original: "bs-montagem-desktop-full.png", slug: "bs-montagem", type: "desktop" },
  { original: "artur-mobile-full.png", slug: "artur-montador", type: "mobile" },
  { original: "artur-desktop-full.png", slug: "artur-montador", type: "desktop" },
];

/** Slugs únicos para gerar as capas */
const UNIQUE_SLUGS = [...new Set(FILE_MAP.map((f) => f.slug))];

// ─── Parâmetros de processamento (docs/LANDINGPAGE.md) ─────────

/**
 * REGRAS PARA CAPAS:
 * - Fonte: SEMPRE a imagem mobile (nunca desktop).
 * - Recorte: topo da imagem mobile (primeira dobra / hero).
 * - Largura: 780px (corresponde à largura do original mobile).
 * - Não ampliar artificialmente.
 * - Peso máximo: 200 KB.
 */
const COVER = {
  /** Largura alvo da capa: 780px (largura do original mobile, sem ampliação) */
  width: 780,
  /** Qualidade WebP */
  quality: 80,
  /** Percentual da altura mobile a usar como crop (topo da página) */
  cropHeightPercent: 0.3,
  /** Altura máxima do crop (para não ficar excessivamente alto) */
  maxHeight: 700,
  /** Peso máximo: 200 KB */
  maxBytes: 200 * 1024,
  /** Peso desejado: 150 KB */
  targetBytes: 150 * 1024,
};

const MOBILE = {
  /** Largura alvo: 430–600px (usar 600 para preservar qualidade) */
  width: 600,
  /** Qualidade WebP inicial */
  quality: 82,
  /** Peso máximo: 1 MB */
  maxBytes: 1024 * 1024,
  /** Peso desejado: 700 KB */
  targetBytes: 700 * 1024,
};

const DESKTOP = {
  /** Largura máxima: 1600px */
  maxWidth: 1600,
  /** Qualidade WebP inicial */
  quality: 80,
  /** Peso máximo: 2 MB */
  maxBytes: 2 * 1024 * 1024,
  /** Peso desejado: 1.5 MB */
  targetBytes: 1.5 * 1024 * 1024,
};

// ─── Utilidades ─────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function reductionPercent(original, processed) {
  return Math.round((1 - processed / original) * 100);
}

/**
 * Reduz a qualidade gradualmente até atingir o limite de peso.
 * Retorna o buffer WebP.
 */
async function compressToTarget(sharpInstance, initialQuality, maxBytes) {
  let quality = initialQuality;
  let buffer = await sharpInstance.webp({ quality }).toBuffer();

  while (buffer.length > maxBytes && quality > 30) {
    quality -= 5;
    buffer = await sharpInstance.webp({ quality }).toBuffer();
  }

  // Se ainda passa do limite, tenta reduzir a resolução
  if (buffer.length > maxBytes) {
    const meta = await sharpInstance.metadata();
    const newWidth = Math.round((meta.width || 800) * 0.85);
    const resized = sharpInstance.resize({ width: newWidth, withoutEnlargement: true });
    buffer = await resized.webp({ quality: Math.max(quality, 35) }).toBuffer();
  }

  return { buffer, finalQuality: quality };
}

// ─── Processamento ──────────────────────────────────────────────

/**
 * Gera a cover EXCLUSIVAMENTE a partir do print mobile.
 * Nunca usa o print desktop na composição da cover.
 * O recorte é feito do topo da imagem mobile (hero/primeira dobra).
 */
async function processCover(slug) {
  const mobileFile = FILE_MAP.find((f) => f.slug === slug && f.type === "mobile");
  if (!mobileFile) throw new Error(`Cover: arquivo mobile não encontrado para ${slug}`);
  const inputPath = join(ORIGINALS_DIR, mobileFile.original);

  const image = sharp(inputPath);
  const meta = await image.metadata();

  const cropHeight = Math.min(
    Math.round(meta.height * COVER.cropHeightPercent),
    COVER.maxHeight
  );

  const cropped = image.extract({
    left: 0,
    top: 0,
    width: meta.width,
    height: cropHeight,
  });

  const resized = cropped.resize({
    width: COVER.width,
    height: null,
    fit: "inside",
    withoutEnlargement: true,
  });

  const { buffer, finalQuality } = await compressToTarget(
    resized,
    COVER.quality,
    COVER.maxBytes
  );

  const outputPath = join(OUTPUT_DIR, `${slug}-cover.webp`);
  await sharp(buffer).toFile(outputPath);

  const finalMeta = await sharp(outputPath).metadata();
  return {
    outputName: `${slug}-cover.webp`,
    width: finalMeta.width,
    height: finalMeta.height,
    bytes: buffer.length,
    quality: finalQuality,
  };
}

async function processMobile(slug) {
  const entry = FILE_MAP.find((f) => f.slug === slug && f.type === "mobile");
  const inputPath = join(ORIGINALS_DIR, entry.original);

  const image = sharp(inputPath);
  const resized = image.resize({
    width: MOBILE.width,
    height: null,
    fit: "inside",
    withoutEnlargement: true,
  });

  const { buffer, finalQuality } = await compressToTarget(
    resized,
    MOBILE.quality,
    MOBILE.maxBytes
  );

  const outputPath = join(OUTPUT_DIR, `${slug}-mobile.webp`);
  await sharp(buffer).toFile(outputPath);

  const finalMeta = await sharp(outputPath).metadata();
  return {
    outputName: `${slug}-mobile.webp`,
    width: finalMeta.width,
    height: finalMeta.height,
    bytes: buffer.length,
    quality: finalQuality,
  };
}

async function processDesktop(slug) {
  const entry = FILE_MAP.find((f) => f.slug === slug && f.type === "desktop");
  const inputPath = join(ORIGINALS_DIR, entry.original);

  const image = sharp(inputPath);
  const meta = await image.metadata();

  const targetWidth = Math.min(meta.width, DESKTOP.maxWidth);

  const resized = image.resize({
    width: targetWidth,
    height: null,
    fit: "inside",
    withoutEnlargement: true,
  });

  const { buffer, finalQuality } = await compressToTarget(
    resized,
    DESKTOP.quality,
    DESKTOP.maxBytes
  );

  const outputPath = join(OUTPUT_DIR, `${slug}-desktop.webp`);
  await sharp(buffer).toFile(outputPath);

  const finalMeta = await sharp(outputPath).metadata();
  return {
    outputName: `${slug}-desktop.webp`,
    width: finalMeta.width,
    height: finalMeta.height,
    bytes: buffer.length,
    quality: finalQuality,
  };
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  const coversOnly = process.argv.includes("--covers-only");

  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║  Processamento de imagens do portfólio           ║");
  console.log("║  Anúncio & Site                                 ║");
  if (coversOnly) console.log("║  Modo: somente capas (covers)                   ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  // ── Verificar originais ──
  if (!existsSync(ORIGINALS_DIR)) {
    console.error(`✗ Pasta de originais não encontrada: ${ORIGINALS_DIR}`);
    process.exit(1);
  }

  const availableFiles = (await readdir(ORIGINALS_DIR)).filter((f) => extname(f) === ".png");
  const missingFiles = [];

  for (const entry of FILE_MAP) {
    if (!availableFiles.includes(entry.original)) {
      missingFiles.push(entry.original);
    }
  }

  if (missingFiles.length > 0) {
    console.error("✗ Originais ausentes:");
    for (const f of missingFiles) {
      console.error(`  - ${f}`);
    }
    process.exit(1);
  }

  console.log(`✓ Todos os ${FILE_MAP.length} originais encontrados\n`);

  // ── Criar pasta de saída ──
  await mkdir(OUTPUT_DIR, { recursive: true });

  // ── Status dos originais ──
  console.log("─── Originais ───────────────────────────────────\n");

  const originalsInfo = [];
  for (const entry of FILE_MAP) {
    const filePath = join(ORIGINALS_DIR, entry.original);
    const meta = await sharp(filePath).metadata();
    const fileStat = await stat(filePath);
    originalsInfo.push({
      ...entry,
      origWidth: meta.width,
      origHeight: meta.height,
      origBytes: fileStat.size,
    });
    console.log(
      `  ${entry.original.padEnd(38)} ${String(meta.width).padStart(5)}×${String(meta.height).padStart(5)}  ${formatBytes(fileStat.size).padStart(10)}`
    );
  }

  console.log("\n─── Processando ─────────────────────────────────\n");

  const results = [];

  for (const slug of UNIQUE_SLUGS) {
    console.log(`  ▸ ${slug}`);

    const cover = await processCover(slug);
    console.log(`    capa:    ${cover.width}×${cover.height}  ${formatBytes(cover.bytes)}  (q${cover.quality})`);

    if (!coversOnly) {
      const mobile = await processMobile(slug);
      console.log(`    mobile:  ${mobile.width}×${mobile.height}  ${formatBytes(mobile.bytes)}  (q${mobile.quality})`);

      const desktop = await processDesktop(slug);
      console.log(`    desktop: ${desktop.width}×${desktop.height}  ${formatBytes(desktop.bytes)}  (q${desktop.quality})`);

      // Encontrar originais para cálculo de redução
      const origMobile = originalsInfo.find((o) => o.slug === slug && o.type === "mobile");
      const origDesktop = originalsInfo.find((o) => o.slug === slug && o.type === "desktop");

      results.push({
        slug,
        cover,
        mobile: { ...mobile, reduction: reductionPercent(origMobile.origBytes, mobile.bytes) },
        desktop: { ...desktop, reduction: reductionPercent(origDesktop.origBytes, desktop.bytes) },
        origMobileBytes: origMobile.origBytes,
        origDesktopBytes: origDesktop.origBytes,
      });
    } else {
      results.push({ slug, cover });
    }

    console.log();
  }

  // ── Relatório final ──
  console.log("═══ RELATÓRIO ═══════════════════════════════════\n");

  const allOutputs = [];
  for (const r of results) {
    allOutputs.push(
      { name: r.cover.outputName, width: r.cover.width, height: r.cover.height, bytes: r.cover.bytes, type: "cover" }
    );
    if (!coversOnly && r.mobile) {
      allOutputs.push(
        { name: r.mobile.outputName, width: r.mobile.width, height: r.mobile.height, bytes: r.mobile.bytes, type: "mobile", reduction: r.mobile.reduction, origBytes: r.origMobileBytes },
        { name: r.desktop.outputName, width: r.desktop.width, height: r.desktop.height, bytes: r.desktop.bytes, type: "desktop", reduction: r.desktop.reduction, origBytes: r.origDesktopBytes }
      );
    }
  }

  console.log("  Arquivo".padEnd(42) + "Dimensões".padEnd(18) + "Peso".padEnd(12) + "Redução".padEnd(10));
  console.log("  " + "─".repeat(78));

  for (const o of allOutputs) {
    const dims = `${o.width}×${o.height}`;
    const size = formatBytes(o.bytes);
    const red = o.reduction !== undefined ? `-${o.reduction}%` : "—";
    console.log(`  ${o.name.padEnd(40)} ${dims.padEnd(18)} ${size.padEnd(12)} ${red}`);
  }

  const totalOutputBytes = allOutputs.reduce((sum, o) => sum + o.bytes, 0);
  const totalOriginalBytes = originalsInfo.reduce((sum, o) => sum + o.origBytes, 0);

  console.log(`\n  Total originais:  ${formatBytes(totalOriginalBytes)}`);
  console.log(`  Total gerados:    ${formatBytes(totalOutputBytes)}`);
  console.log(`  Redução geral:    -${reductionPercent(totalOriginalBytes, totalOutputBytes)}%`);
  console.log(`  Arquivos gerados: ${allOutputs.length} (${coversOnly ? "capas apenas" : `${UNIQUE_SLUGS.length} projetos × 3 tipos`})\n`);
  console.log("✓ Concluído\n");
}

main().catch((err) => {
  console.error("\n✗ Erro durante o processamento:");
  console.error(err.message || err);
  process.exit(1);
});
