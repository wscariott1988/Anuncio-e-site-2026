import { ImageResponse } from "next/og";
import { loadFont } from "@/lib/social-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Image() {
  const font400 = loadFont("Geist", 400);
  const font700 = loadFont("Geist", 700);

  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        backgroundColor: "#155EEF",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Geist",
      }}
    >
      <span
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        A&S
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#FFFFFF",
          opacity: 0.9,
        }}
      >
        Anúncio & Site
      </span>
    </div>,
    {
      width: 180,
      height: 180,
      fonts: [
        { name: "Geist", data: font400, weight: 400, style: "normal" },
        { name: "Geist", data: font700, weight: 700, style: "normal" },
      ],
    }
  );
}
