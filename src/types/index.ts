export type CtaLocation =
  | "header"
  | "hero"
  | "portfolio"
  | "investment"
  | "final"
  | "sticky-mobile";

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
