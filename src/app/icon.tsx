import { ImageResponse } from "next/og";
import { loadFont } from "@/lib/social-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Image() {
  const font = loadFont("Geist", 700);

  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        backgroundColor: "#155EEF",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Geist",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        A&S
      </span>
    </div>,
    {
      width: 32,
      height: 32,
      fonts: [{ name: "Geist", data: font, weight: 700, style: "normal" }],
    }
  );
}
