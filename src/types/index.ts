export type CtaLocation =
  | "header"
  | "hero"
  | "included"
  | "portfolio"
  | "about"
  | "pricing"
  | "final";

export type ProjectId =
  | "mecanica_auto_brum"
  | "zarq_planejados"
  | "agafarma_mario_quintana"
  | "bs_montagem"
  | "artur_montador";

export interface Project {
  id: ProjectId;
  name: string;
  segment: string;
  slug: string;
  description: string;
}

export type FormStepName = "contact" | "project" | "confirmation";

export type SituacaoAnuncios =
  | "Já anuncio no Google Ads"
  | "Já anuncio no Meta Ads"
  | "Já anuncio nos dois"
  | "Ainda não anuncio, mas pretendo começar";

export type PossuiSite = "Sim" | "Não";

export interface FormData {
  nome: string;
  whatsapp: string;
  negocioServico: string;
  situacaoAnuncios: SituacaoAnuncios | "";
  possuiSite: PossuiSite | "";
  urlAtual: string;
  consentimento: boolean;
}

export type FormState =
  | "idle"
  | "intro"
  | "step_1"
  | "step_2"
  | "step_3"
  | "submitting"
  | "error_validation"
  | "error_server"
  | "pending_integration";

export interface TrackingEvent {
  event: string;
  form_id: string;
  event_version: string;
  [key: string]: string | number | undefined;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
