import { WHATSAPP_NUMBER, WHATSAPP_CTA_MESSAGE } from "./constants";

function encodeMessage(text: string): string {
  return encodeURIComponent(text);
}

function buildUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeMessage(message)}`;
}

export function getWhatsappCtaUrl(message: string = WHATSAPP_CTA_MESSAGE): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return buildUrl(WHATSAPP_NUMBER, message);
}
