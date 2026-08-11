import { ImageResponse } from "next/og";
import {
  SocialBrandImageContent,
  OG_SIZE,
} from "@/components/social/SocialBrandImage";
import { loadFont } from "@/lib/social-font";

export const alt = "Landing Page Essencial para Tráfego Pago | Anúncio & Site";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const font400 = loadFont("Geist", 400);
  const font700 = loadFont("Geist", 700);

  return new ImageResponse(<SocialBrandImageContent variant="essential" />, {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    fonts: [
      { name: "Geist", data: font400, weight: 400, style: "normal" },
      { name: "Geist", data: font700, weight: 700, style: "normal" },
    ],
  });
}
