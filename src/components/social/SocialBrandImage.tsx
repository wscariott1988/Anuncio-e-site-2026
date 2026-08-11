import React from "react";

const C = {
  background: "#F7F8FA",
  surface: "#FFFFFF",
  surfaceSoft: "#EFF4FF",
  brand: "#155EEF",
  brandLight: "#D1E0FF",
  text: "#101828",
  textSecondary: "#475467",
  textTertiary: "#98A2B3",
  border: "#D0D5DD",
  lightGray: "#F2F4F7",
} as const;

export const OG_SIZE = { width: 1200, height: 630 } as const;

interface SocialBrandImageContentProps {
  variant?: "complete" | "essential";
}

export function SocialBrandImageContent({ variant = "complete" }: SocialBrandImageContentProps) {
  const copy =
    variant === "essential"
      ? {
          badge: "Landing Page Essencial para tráfego pago",
          headline: ["Landing Page Essencial", "para Google Ads e Meta Ads"],
          sub: "Uma página única com estratégia, copy, design e publicação.",
          pill: "Projeto por R$ 399",
          url: "anuncioesite.com.br/landingpage-essencial",
          frameUrl: "www.anuncioesite.com.br/landingpage-essencial",
        }
      : {
          badge: "Landing Page para tráfego pago",
          headline: ["Landing Pages completas", "para Google Ads e Meta Ads"],
          sub: "Estratégia, copy, design, desenvolvimento e rastreamento.",
          pill: "Projeto completo por R$ 997",
          url: "anuncioesite.com.br/landingpage",
          frameUrl: "www.anuncioesite.com.br/landingpage",
        };

  return (
    <div
      style={{
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        display: "flex",
        flexDirection: "row",
        backgroundColor: C.background,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: C.brand,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            A&S
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: C.brand }}>
            Anúncio & Site
          </span>
        </div>

        <div style={{ height: 12 }} />

        <div
          style={{
            display: "flex",
            backgroundColor: C.surfaceSoft,
            borderRadius: 999,
            padding: "5px 14px",
            fontSize: 13,
            fontWeight: 400,
            color: C.brand,
            alignSelf: "flex-start",
          }}
        >
          {copy.badge}
        </div>

        <div style={{ height: 40 }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 42,
            fontWeight: 700,
            color: C.text,
            lineHeight: 1.15,
          }}
        >
          <span>{copy.headline[0]}</span>
          <span>{copy.headline[1]}</span>
        </div>

        <div style={{ height: 16 }} />

        <div
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: C.textSecondary,
            lineHeight: 1.4,
          }}
        >
          {copy.sub}
        </div>

        <div style={{ height: 32 }} />

        <div
          style={{
            display: "flex",
            backgroundColor: C.brand,
            borderRadius: 8,
            padding: "12px 24px",
            alignSelf: "flex-start",
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
            {copy.pill}
          </span>
        </div>

        <div style={{ height: 24 }} />

        <div
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: C.textTertiary,
          }}
        >
          {copy.url}
        </div>
      </div>

      <div
        style={{
          width: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 60px 60px 0",
        }}
      >
        <div
          style={{
            width: 360,
            height: 380,
            backgroundColor: C.surface,
            borderRadius: 12,
            border: "1px solid #D0D5DD",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 36,
              backgroundColor: C.lightGray,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 12px",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#F04438",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#FDB022",
                }}
              />
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#12B76A",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                backgroundColor: "#E0E4EA",
                borderRadius: 4,
                padding: "3px 10px",
                fontSize: 11,
                fontWeight: 400,
                color: "#5F6368",
              }}
            >
          {copy.frameUrl}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: 16,
              gap: 10,
            }}
          >
            <div
              style={{
                height: 40,
                backgroundColor: C.surfaceSoft,
                borderRadius: 6,
              }}
            />
            <div
              style={{
                height: 10,
                backgroundColor: C.lightGray,
                borderRadius: 4,
                width: "65%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 24,
                  backgroundColor: C.brandLight,
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 24,
                  backgroundColor: C.brandLight,
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 24,
                  backgroundColor: C.brandLight,
                  borderRadius: 5,
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: C.surfaceSoft,
                borderRadius: 6,
              }}
            />
            <div
              style={{
                height: 36,
                backgroundColor: C.brand,
                borderRadius: 6,
              }}
            />
            <div
              style={{
                height: 8,
                backgroundColor: C.lightGray,
                borderRadius: 4,
                width: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
