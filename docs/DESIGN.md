# Sistema Visual — `/landingpage`

## 1. Direção

**Minimalismo premium, claro e comercial, com bento seletivo e glassmorphism apenas como detalhe.**

O visual deve comunicar:

- clareza;
- competência;
- cuidado técnico;
- modernidade acessível;
- confiança para contratar um serviço feito por uma pessoa real.

Não deve parecer um SaaS, uma ferramenta automática, uma página de criptomoeda ou uma grande agência impessoal.

## 2. Proporção visual

- 70%: superfícies sólidas, espaço em branco e tipografia.
- 20%: composição bento para organizar entregáveis e benefícios.
- 10%: gradientes, transparência e elementos decorativos.

Essas proporções são diretrizes, não cálculos rígidos.

## 3. Tokens de cor

| Token | Valor inicial | Uso |
|---|---:|---|
| `--background` | `#F7F8FA` | Fundo principal |
| `--surface` | `#FFFFFF` | Cards, formulário e FAQ |
| `--surface-soft` | `#EFF4FF` | Áreas de apoio |
| `--text-primary` | `#101828` | Títulos e texto principal |
| `--text-secondary` | `#475467` | Texto secundário |
| `--brand` | `#155EEF` | CTA e destaques |
| `--brand-hover` | `#004EEB` | Hover do CTA |
| `--brand-soft` | `#D1E0FF` | Detalhes e ícones |
| `--border` | `#D0D5DD` | Bordas |
| `--success` | `#067647` | Confirmação |
| `--error` | `#B42318` | Erros |
| `--focus` | `#84ADFF` | Anel de foco |

As cores podem ser ajustadas para a identidade existente, mas contraste e função devem ser preservados.

## 4. Gradientes

Gradiente permitido no hero:

```css
background:
  radial-gradient(circle at 85% 10%, rgba(21, 94, 239, 0.14), transparent 34%),
  radial-gradient(circle at 70% 40%, rgba(105, 65, 198, 0.08), transparent 30%),
  #f7f8fa;
```

Não usar gradiente em todos os cartões ou botões.

## 5. Tipografia

Prioridade:

1. Geist, se já estiver instalada;
2. Inter, se já estiver instalada;
3. fonte sans-serif existente e legível.

Não carregar duas famílias apenas por estética.

Escala sugerida:

| Elemento | Desktop | Mobile |
|---|---:|---:|
| Hero `h1` | `56–64px` | `36–42px` |
| Título de seção | `40–48px` | `30–36px` |
| Subtítulo | `20–22px` | `18–20px` |
| Corpo | `17–18px` | `16–18px` |
| Texto auxiliar | `14–15px` | `14–15px` |

- Títulos: peso 650–750, `line-height` entre 1.05 e 1.15.
- Corpo: peso 400–500, `line-height` entre 1.5 e 1.7.
- Comprimento de linha: aproximadamente 55–75 caracteres.
- Evitar títulos em caixa alta.

## 6. Layout e espaçamento

- Container máximo: `1200px`.
- Respiro lateral: `24px` no desktop e `16–20px` no mobile.
- Seções: `96–128px` vertical no desktop e `64–80px` no mobile.
- Base de espaçamento: múltiplos de `4px`, preferencialmente escala 8.
- Hero: duas colunas no desktop e uma coluna no mobile.
- O CTA e a proposta devem aparecer antes do visual no mobile.

## 7. Bordas, raios e sombras

- Card principal: raio `20–24px`.
- Card secundário: raio `16–20px`.
- Botão e campo: raio `10–14px`.
- Borda: `1px solid var(--border)`.
- Sombras discretas, por exemplo:

```css
box-shadow: 0 12px 32px rgba(16, 24, 40, 0.08);
```

Não usar sombras pesadas ou glow neon.

## 8. Hero

O hero deve ter:

- etiqueta curta;
- `h1` única;
- subheadline;
- linha de investimento, prazo e ajustes;
- CTA principal;
- microcopy de segurança;
- mockup realista de uma Landing Page em desktop e mobile.

O mockup pode incluir pequenos cartões decorativos de preço, formulário e rastreamento. Eles não devem simular métricas ou resultados inexistentes.

Não usar:

- foto genérica de escritório;
- gráfico com números inventados;
- dashboard falso;
- animação contínua chamativa;
- texto dentro de imagem quando possa ser HTML.

## 9. Bento

Usar na seção “O que está incluído”.

Composição recomendada:

- card grande: estratégia e copy;
- card médio: design responsivo;
- card médio: desenvolvimento;
- cards pequenos: formulário, WhatsApp e rastreamento;
- card horizontal: investimento e escopo.

Os cards precisam ter hierarquia clara. Nem todos devem usar cor, ícone e tamanho equivalentes.

## 10. Glassmorphism

Permitido apenas em:

- etiqueta do hero;
- pequenos cartões flutuantes;
- selo de escopo;
- detalhes sobre gradiente.

Requisitos:

- fundo previsível;
- contraste legível;
- borda visível;
- alternativa sólida se `backdrop-filter` não estiver disponível.

Proibido em:

- formulário;
- campos;
- FAQ;
- textos longos;
- botão principal;
- política ou termos.

## 11. Botões e links

CTA primário:

- fundo sólido `--brand`;
- texto branco;
- altura mínima `48px`, preferencialmente `52–56px`;
- padding horizontal de `20–28px`;
- estado hover, focus, active e disabled;
- rótulo descritivo.

CTA secundário:

- usar somente quando necessário;
- borda sólida e fundo branco;
- não competir com o primário.

No mobile, o botão principal pode ocupar toda a largura. O alvo interativo nunca deve ser menor que `44 × 44px`.

## 12. Formulário

- Superfície sólida branca.
- Uma coluna.
- Labels persistentes acima dos campos.
- Texto de ajuda abaixo quando necessário.
- Mensagens de erro junto ao campo e resumo acessível quando aplicável.
- Foco visível.
- Não usar apenas cor para indicar erro.
- Botão com estado de carregamento sem alterar bruscamente a largura.
- Checkbox de consentimento com área clicável adequada.

## 13. FAQ

- Acordeão com superfície sólida.
- Título da pergunta sempre visível.
- Ícone simples de expansão.
- Operável por teclado.
- Estado aberto exposto a tecnologias assistivas.
- Sem animação longa.

## 14. Imagens e ícones

- Priorizar imagens reais da página, do processo e de Willian.
- Usar mockups próprios, não interfaces copiadas de terceiros.
- Ícones lineares consistentes.
- SVG ou biblioteca já existente.
- Toda imagem informativa deve ter `alt`.
- Imagem decorativa usa `alt=""`.
- Usar WebP ou AVIF quando apropriado.

## 15. Movimento

Permitido:

- entrada discreta com opacidade e deslocamento curto;
- hover de card de até `2–4px`;
- transições de `150–250ms`;
- feedback de botão e acordeão.

Proibido:

- parallax pesado;
- rolagem presa;
- textos surgindo palavra por palavra;
- cursor customizado;
- autoplay com áudio;
- elementos voando;
- animação que atrase a ação.

Com `prefers-reduced-motion: reduce`, remover movimento não essencial.

## 16. Responsividade

Validar pelo menos:

- `320px`;
- `375px`;
- `390px`;
- `768px`;
- `1024px`;
- `1280px`;
- `1440px`.

Não depender apenas de breakpoints fixos. Evitar:

- overflow horizontal;
- texto truncado;
- CTA escondido;
- cards estreitos demais;
- mockup maior que a viewport;
- teclado cobrindo a ação do formulário.

### Comportamento compacto no mobile

Em viewports abaixo de `768px`, aplicar padrões compactos para reduzir a altura total da página sem remover conteúdo nem alterar o desktop:

- **Portfólio**: faixa horizontal com `scroll-snap` (`snap-x snap-mandatory`), cards com `min-w-[85%]`, `scroll-snap-align: start`. Sem autoplay, sem animação. Incluir `<p className="sr-only">Deslize para ver outros projetos</p>` para acessibilidade. No desktop (≥1024px), grid de 6 colunas com 3 projetos na primeira linha (2 colunas cada) e 2 projetos centralizados na segunda linha (colunas 2–3 e 4–5). CTA e microcopy centralizados horizontalmente após o grid. No tablet (768–1023px), grid de 2 colunas.
- **O que está incluído**: painel compacto com `divide-y` mostrando 6 linhas (título + descrição), visível apenas no mobile. No desktop (≥1024px), grid uniforme de 3 colunas × 2 linhas sem `col-span` especial. No tablet (768–1023px), grid de 2 colunas × 3 linhas.
- **Quem é Willian Souza**: a partir de `1024px`, composição em duas colunas (texto à esquerda com etiqueta, título e parágrafos; métricas em grid 2×2 à direita, alinhadas pelo topo). Proporção aproximada 55/45. Entre `768px` e `1023px`, apresentação acima e indicadores abaixo em grid 2×2. Abaixo de `768px`, grid `grid-cols-2` (2×2) com tamanhos de fonte reduzidos.
- **Como funciona**: gaps reduzidos (`space-y-4 md:space-y-8`), número do passo com `w-9 h-9 md:w-10 md:h-10`. No desktop (≥1024px), 4 colunas em uma única linha (`lg:grid-cols-4`). No tablet (768–1023px), grid 2×2. O bloco "Prazo do projeto" permanece abaixo das etapas como faixa informativa separada.

Esses padrões são **somente mobile**. O desktop não pode ser afetado.

## 17. Acessibilidade

- Contraste mínimo compatível com WCAG AA.
- Uma `h1` e hierarquia de títulos sem saltos arbitrários.
- Foco visível.
- Ordem de tabulação lógica.
- Landmark semântico.
- Links com finalidade compreensível.
- Erros anunciados por leitor de tela.
- Nenhuma informação apenas por cor ou movimento.

## 18. Elementos proibidos

- fundo escuro dominante;
- excesso de glassmorphism;
- neon;
- gradiente em todos os elementos;
- carrossel automático;
- pop-up de saída;
- cronômetro;
- barra de urgência falsa;
- números animados sem dados reais;
- selos de segurança genéricos;
- depoimentos fictícios;
- logos sem autorização;
- comparação depreciativa com concorrentes.
