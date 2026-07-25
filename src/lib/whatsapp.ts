import { WHATSAPP_NUMBER, BRAND_NAME } from "./constants";

const POST_LEAD_MESSAGE = `Olá, Willian. Acabei de enviar as informações do meu projeto pela página da ${BRAND_NAME}.`;
const ERROR_MESSAGE = `Olá, Willian. Preenchi o formulário da ${BRAND_NAME}, mas ocorreu um erro no envio.`;

function encodeMessage(text: string): string {
  return encodeURIComponent(text);
}

function buildUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeMessage(message)}`;
}

export function getWhatsappAfterLeadUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return buildUrl(WHATSAPP_NUMBER, POST_LEAD_MESSAGE);
}

export function getWhatsappErrorUrl(): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return buildUrl(WHATSAPP_NUMBER, ERROR_MESSAGE);
}
