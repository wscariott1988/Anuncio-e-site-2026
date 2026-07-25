import type { Project, FaqItem } from "@/types";

export const BRAND_NAME = "Anúncio & Site";
export const OWNER_NAME = "Willian Souza";
export const FORM_ID = "landingpage_lead_form";
export const EVENT_VERSION = "1";

export const PRICE = "R$ 997";
export const PRICE_INSTALLMENT = "R$ 498,50";
export const DEADLINE = "até 7 dias úteis";
export const ROUNDS = "até 2 rodadas de ajustes";

export const WHATSAPP_NUMBER = "";

export const PROJECTS: Project[] = [
  {
    id: "mecanica_auto_brum",
    name: "Mecânica Auto Brum",
    segment: "Socorro mecânico 24 horas",
    slug: "mecanica-auto-brum",
    description:
      "Landing Page desenvolvida para apresentar os atendimentos emergenciais e facilitar o contato rápido pelo WhatsApp.",
  },
  {
    id: "zarq_planejados",
    name: "ZARQ Planejados",
    segment: "Móveis planejados",
    slug: "zarq-planejados",
    description:
      "Página desenvolvida para apresentar o trabalho da ZARQ Planejados e direcionar interessados para solicitar atendimento.",
  },
  {
    id: "agafarma_mario_quintana",
    name: "Agafarma Mário Quintana",
    segment: "Farmácia local",
    slug: "agafarma-mario-quintana",
    description:
      "Página desenvolvida para apresentar a unidade, seus principais serviços e os canais de atendimento disponíveis ao público local.",
  },
  {
    id: "bs_montagem",
    name: "BS Montagem de Móveis",
    segment: "Montagem de móveis",
    slug: "bs-montagem",
    description:
      "Landing Page voltada ao atendimento em Porto Alegre e região, com apresentação dos serviços e solicitação de orçamento pelo WhatsApp.",
  },
  {
    id: "artur_montador",
    name: "Artur Montador",
    segment: "Montagem de móveis",
    slug: "artur-montador",
    description:
      "Landing Page criada para apresentar o profissional, explicar os serviços e facilitar a solicitação de orçamento.",
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
    question: "O projeto custa R$ 997?",
    answer:
      "Sim. R$ 997 é o valor do projeto padrão apresentado nesta página. Se sua necessidade incluir outra página, integração, funcionalidade ou serviço fora do escopo, eu explico antes e envio um orçamento adicional. Nada é acrescentado sem sua aprovação.",
  },
  {
    id: "faq_02",
    question: "O que está incluído?",
    answer:
      "O projeto inclui estratégia e estrutura, copy, design responsivo, desenvolvimento em Next.js, formulário, continuidade pelo WhatsApp, configuração de rastreamento, publicação, testes e até duas rodadas de ajustes dentro do escopo aprovado.",
  },
  {
    id: "faq_03",
    question: "Em quanto tempo a página fica pronta?",
    answer:
      "O prazo padrão é de até sete dias úteis. A contagem começa após a confirmação do pagamento inicial, o preenchimento completo do briefing e o recebimento de todas as informações e materiais necessários.",
  },
  {
    id: "faq_04",
    question: "Preciso já estar anunciando?",
    answer:
      "Não. Você pode desenvolver a Landing Page antes de iniciar sua campanha. É importante, porém, ter uma oferta definida e um plano real para anunciar no Google Ads ou Meta Ads.",
  },
  {
    id: "faq_05",
    question: "Já tenho um site. Ainda preciso de uma Landing Page?",
    answer:
      "Depende da sua campanha e da estrutura do seu site. Um site institucional normalmente apresenta a empresa e oferece diferentes caminhos. A Landing Page concentra a atenção em uma oferta e em uma ação principal. Antes da contratação, eu posso avaliar se uma página específica faz sentido para o que você pretende anunciar.",
  },
  {
    id: "faq_06",
    question: "A gestão de Google Ads ou Meta Ads está incluída?",
    answer:
      "Não. O projeto de R$ 997 contempla a criação da Landing Page. A gestão das campanhas é um serviço separado e só será incluída quando estiver descrita em outra proposta.",
  },
  {
    id: "faq_07",
    question: "Domínio e hospedagem estão incluídos?",
    answer:
      "Não estão incluídos automaticamente. A infraestrutura é definida antes do início do projeto. Você saberá qual conta será utilizada, quem será responsável pelo pagamento, pelas renovações e pelo funcionamento depois da entrega.",
  },
  {
    id: "faq_08",
    question: "Posso solicitar alterações?",
    answer:
      "Sim. O projeto inclui até duas rodadas de ajustes. Cada rodada corresponde a uma lista consolidada de solicitações. Correções, pequenos ajustes de texto, troca de imagens e refinamentos dentro do escopo podem ser incluídos. Mudanças de oferta, público, página, funcionalidade ou integração podem exigir um novo orçamento.",
  },
  {
    id: "faq_09",
    question: "A página terá rastreamento?",
    answer:
      "Sim. Os eventos previstos no projeto podem ser configurados para acompanhar ações como o envio confirmado do formulário e a continuidade pelo WhatsApp. A integração com Google Tag Manager, Google Analytics 4, Google Ads e Meta Pixel depende do fornecimento das contas, dos acessos e dos consentimentos necessários.",
  },
  {
    id: "faq_10",
    question: "Você garante vendas ou leads?",
    answer:
      "Não. Nenhuma Landing Page pode garantir vendas, quantidade de contatos ou desempenho de campanha. Os resultados também dependem da oferta, dos anúncios, do orçamento, da demanda, da concorrência, do atendimento e de outros fatores. Meu compromisso é entregar uma página funcional, responsiva, rastreável e de acordo com o escopo aprovado.",
  },
  {
    id: "faq_11",
    question: "Quais materiais preciso enviar?",
    answer:
      "No briefing, eu solicito as informações sobre sua empresa, oferta, público, diferenciais, serviços, contatos e condições comerciais. Você também deverá fornecer os materiais disponíveis, como logotipo, fotos, identidade visual e acessos necessários. Se algum material importante não existir, alinhamos antes como ele será substituído ou contratado.",
  },
  {
    id: "faq_12",
    question: "O projeto inclui manutenção mensal?",
    answer:
      "Não. A entrega padrão não inclui manutenção recorrente. Depois da entrega, correções técnicas relacionadas ao projeto seguem as condições da proposta. Novos textos, imagens, seções, integrações ou funcionalidades podem ser avaliados separadamente.",
  },
  {
    id: "faq_13",
    question: "Como funciona o pagamento?",
    answer:
      "O pagamento é dividido em duas etapas: 50% na contratação e 50% depois que a Landing Page estiver publicada e funcionando. O prazo de produção começa após a confirmação da entrada, o briefing completo e o recebimento dos materiais necessários.",
  },
];
