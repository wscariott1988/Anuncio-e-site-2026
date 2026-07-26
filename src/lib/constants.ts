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

export const SITUACAO_OPCOES = [
  "Já anuncio no Google Ads",
  "Já anuncio no Meta Ads",
  "Já anuncio nos dois",
  "Ainda não anuncio, mas pretendo começar",
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq_01",
    question: "Quanto custa e como funciona o pagamento?",
    answer:
      "O projeto padrão custa R$ 997: R$ 498,50 na contratação e R$ 498,50 após a página ser publicada e estar funcionando. Serviços fora do escopo são apresentados separadamente antes de qualquer execução.",
  },
  {
    id: "faq_02",
    question: "Em quanto tempo a página fica pronta?",
    answer:
      "O prazo é de até 7 dias úteis após a entrada, o briefing completo e o recebimento dos materiais necessários. Pendências pausam a contagem.",
  },
  {
    id: "faq_03",
    question: "Preciso já estar anunciando?",
    answer:
      "Não. A página pode ser desenvolvida antes da campanha, desde que você tenha uma oferta definida e um plano real para anunciar.",
  },
  {
    id: "faq_04",
    question: "Já tenho um site. Ainda preciso de uma Landing Page?",
    answer:
      "Depende. Um site normalmente oferece vários caminhos; a Landing Page concentra uma oferta e uma ação principal. Eu avalio seu caso antes da contratação.",
  },
  {
    id: "faq_05",
    question: "A gestão dos anúncios está incluída?",
    answer:
      "Não. O valor de R$ 997 contempla a criação da Landing Page. A gestão de Google Ads ou Meta Ads é um serviço separado.",
  },
  {
    id: "faq_06",
    question: "Domínio e hospedagem estão incluídos?",
    answer:
      "Não automaticamente. A infraestrutura, as contas, os custos e as responsabilidades são definidos antes do início.",
  },
  {
    id: "faq_07",
    question: "Posso solicitar alterações e manutenção?",
    answer:
      "O projeto inclui até 2 rodadas de ajustes dentro do escopo. Manutenção recorrente, novas seções, páginas, integrações ou funcionalidades são avaliadas separadamente.",
  },
  {
    id: "faq_08",
    question: "A página terá rastreamento e garante resultados?",
    answer:
      "Os eventos previstos podem ser configurados quando os acessos necessários forem fornecidos. A página não garante vendas ou leads, pois o resultado também depende da oferta, da campanha, do orçamento, da demanda e do atendimento.",
  },
];
