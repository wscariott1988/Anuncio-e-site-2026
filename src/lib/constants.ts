import type { Project, FaqItem } from "@/types";

export const BRAND_NAME = "Anúncio & Site";
export const OWNER_NAME = "Willian Souza";
export const FORM_ID = "landingpage_lead_form";
export const EVENT_VERSION = "1";

export const PRICE = "R$ 997";
export const PRICE_INSTALLMENT = "R$ 498,50";
export const DEADLINE = "até 7 dias úteis";
export const ROUNDS = "até 2 rodadas de ajustes";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const WHATSAPP_CTA_MESSAGE =
  "Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?";

export const PROJECTS: Project[] = [
  {
    id: "mecanica_auto_brum",
    name: "Mecânica Auto Brum",
    segment: "Socorro mecânico 24 horas",
    slug: "mecanica-auto-brum",
    description:
      "Página para apresentar atendimentos emergenciais e facilitar o contato.",
  },
  {
    id: "zarq_planejados",
    name: "ZARQ Planejados",
    segment: "Móveis planejados",
    slug: "zarq-planejados",
    description:
      "Página para apresentar a oferta e direcionar pedidos de atendimento.",
  },
  {
    id: "agafarma_mario_quintana",
    name: "Agafarma Mário Quintana",
    segment: "Farmácia local",
    slug: "agafarma-mario-quintana",
    description:
      "Página para apresentar a unidade, seus serviços e canais de atendimento.",
  },
  {
    id: "bs_montagem",
    name: "BS Montagem de Móveis",
    segment: "Montagem de móveis",
    slug: "bs-montagem",
    description:
      "Página para apresentar os serviços e receber pedidos de orçamento.",
  },
  {
    id: "artur_montador",
    name: "Artur Montador",
    segment: "Montagem de móveis",
    slug: "artur-montador",
    description:
      "Página para apresentar o profissional e facilitar a solicitação de orçamento.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq_01",
    question: "O que preciso enviar para iniciar?",
    answer:
      "Depois da contratação, você recebe um briefing simples para informar sua oferta, público, diferenciais e materiais disponíveis. Você não precisa entregar os textos prontos: a estratégia e a copy fazem parte do projeto.",
  },
  {
    id: "faq_02",
    question: "Quanto custa e como funciona o pagamento?",
    answer:
      "O projeto completo custa R$ 997. O pagamento é dividido em R$ 498,50 na contratação e R$ 498,50 após a Landing Page estar publicada e funcionando.",
  },
  {
    id: "faq_03",
    question: "Em quanto tempo a página fica pronta?",
    answer:
      "O prazo é de até 7 dias úteis após o pagamento da entrada, o recebimento do briefing completo e dos materiais necessários.",
  },
  {
    id: "faq_04",
    question: "A gestão dos anúncios está incluída?",
    answer:
      "Não. O serviço inclui a criação e publicação da Landing Page. A gestão de Google Ads ou Meta Ads não faz parte deste projeto.",
  },
  {
    id: "faq_05",
    question: "Domínio e hospedagem estão incluídos?",
    answer:
      "Domínio, hospedagem e ferramentas de terceiros não estão incluídos automaticamente. Quando necessários, os custos e as responsabilidades são informados antes da contratação.",
  },
  {
    id: "faq_06",
    question: "O projeto inclui fotos, vídeos ou identidade visual?",
    answer:
      "Não inclui produção de fotos, vídeos ou identidade visual completa. São utilizados os materiais fornecidos pelo cliente e os recursos previstos no escopo aprovado.",
  },
  {
    id: "faq_07",
    question: "Posso solicitar alterações?",
    answer:
      "Sim. O projeto inclui até 2 rodadas de ajustes dentro do escopo aprovado.",
  },
  {
    id: "faq_08",
    question: "A Landing Page garante vendas ou leads?",
    answer:
      "Não. A Landing Page organiza a experiência depois do clique e facilita o contato, mas o resultado também depende da oferta, da campanha, do mercado, do investimento e de outros fatores.",
  },
  {
    id: "faq_09",
    question: "Já tenho um site. Ainda preciso de uma Landing Page?",
    answer:
      "Depende. Um site normalmente oferece vários caminhos; a Landing Page concentra uma oferta e uma ação principal. Eu analiso seu caso junto com você antes da contratação.",
  },
];
