import { redirect } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const CONTATO_MESSAGE =
  "Olá, Willian. Vi sua divulgação no grupo da CDL de Dois Irmãos e gostaria de saber mais sobre sites e Landing Pages.";

export async function GET() {
  if (!WHATSAPP_NUMBER) {
    redirect("/landingpage");
  }

  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  url.searchParams.set("text", CONTATO_MESSAGE);
  redirect(url.toString());
}
