# Anúncio & Site

Projeto web da Anúncio & Site.

A prioridade atual são as Landing Pages comerciais:

```text
/landingpage              (oferta completa — R$ 997)
/landingpage-essencial    (oferta essencial — R$ 399)
```

## Status

A estratégia, a copy, o design, o comportamento e o rastreamento estão documentados.

A implementação deve ser feita somente depois da leitura de:

- `AGENTS.md`;
- `docs/CONTENT.md`;
- `docs/LANDINGPAGE.md`;
- `docs/ESSENCIAL.md`;
- `docs/LEADS.md`;
- `docs/DESIGN.md`;
- `docs/TRACKING.md`;
- `docs/CHECKLIST.md`.

## Objetivo

Apresentar e captar interessados no serviço de criação de Landing Pages para campanhas de Google Ads e Meta Ads.

Decisões centrais:

- serviço executado diretamente por Willian Souza;
- oferta completa: projeto completo por R$ 997, 50% na contratação e 50% após a publicação, prazo de até 7 dias úteis, até duas rodadas de ajustes;
- oferta essencial: página única por R$ 399, prazo de até 5 dias úteis, 1 rodada de ajustes; a forma de pagamento não é definida na página e é alinhada diretamente pelo WhatsApp;
- fluxo comercial WhatsApp-first: todos os CTAs comerciais abrem diretamente o WhatsApp com a mensagem oficial pré-preenchida;
- nenhuma promessa de resultado comercial.

## Documentação

| Arquivo | Função |
|---|---|
| `AGENTS.md` | Regras permanentes do repositório |
| `docs/CONTENT.md` | Copy oficial da oferta completa |
| `docs/LANDINGPAGE.md` | Estrutura e comportamento da oferta completa |
| `docs/ESSENCIAL.md` | Estrutura, comportamento e copy da oferta essencial |
| `docs/LEADS.md` | Armazenamento, planilha e sincronização dos leads |
| `docs/DESIGN.md` | Sistema visual |
| `docs/TRACKING.md` | Eventos, conversões e consentimento |
| `docs/CHECKLIST.md` | Critérios de conclusão |
| `README.md` | Visão técnica e execução |

`AGENTS.md` deve ser lido antes de qualquer alteração.

## Stack

O projeto utiliza Next.js conforme a versão já instalada no repositório.

Antes de modificar:

- consultar `package.json`;
- identificar a versão do Next.js;
- identificar o roteador utilizado;
- confirmar TypeScript;
- confirmar o sistema de estilos;
- confirmar o gerenciador pelo arquivo de lock;
- preservar as convenções existentes.

Este README não fixa versões e não autoriza migrações.

## Instalação

Use somente o gerenciador correspondente ao lockfile existente.

### npm

Quando existir `package-lock.json`:

```bash
npm ci
```

Se o projeto ainda não possuir lockfile e estiver sendo inicializado:

```bash
npm install
```

### pnpm

Quando existir `pnpm-lock.yaml`:

```bash
pnpm install --frozen-lockfile
```

### Yarn

Quando existir `yarn.lock`:

```bash
yarn install --frozen-lockfile
```

Não criar um segundo lockfile.

## Execução local

Use os scripts existentes em `package.json`.

### npm

```bash
npm run dev
```

### pnpm

```bash
pnpm dev
```

### Yarn

```bash
yarn dev
```

Depois, abrir a rota informada pelo terminal:

```text
/landingpage
/landingpage-essencial
```

## Verificações

Executar somente scripts disponíveis em `package.json`.

Com npm, os nomes mais comuns são:

```bash
npm run lint
npm run typecheck
npm run test:e2e
npm run build
```

Se `typecheck` ou `test:e2e` não existirem:

- não inventar o script;
- executar os equivalentes disponíveis;
- informar claramente o que não foi executado.

## Rotas

### Rota raiz (redirect temporário)

```text
/  →  /landingpage
```

A raiz redireciona para `/landingpage` com preservação de parâmetros de campanha. Esse redirect será mantido até a criação da homepage institucional.

### Rotas comerciais

```text
/landingpage              (oferta completa — R$ 997)
/landingpage-essencial    (oferta essencial — R$ 399)
```

### Rotas jurídicas

As rotas jurídicas implementadas são:

```text
/politica-de-privacidade
/termos
```

O conteúdo é definido em `docs/PRIVACY.md` e `docs/TERMS.md`.

### Rotas que não devem existir

```text
/landingpage/obrigado
/landingpage-essencial/obrigado
```

O fluxo comercial é WhatsApp-first: o contato acontece pela abertura direta do WhatsApp, sem página de obrigado.

### Rotas fora do escopo

Não alterar nesta fase:

- homepage (exceto o redirect temporário `/` → `/landingpage`);
- blog;
- artigos;
- páginas por nicho;
- outras páginas comerciais.

## Estrutura documental

Estrutura esperada:

```text
/
├── AGENTS.md
├── README.md
├── docs/
│   ├── CONTENT.md
│   ├── LANDINGPAGE.md
│   ├── ESSENCIAL.md
│   ├── LEADS.md
│   ├── DESIGN.md
│   ├── TRACKING.md
│   └── CHECKLIST.md
├── originals/
│   └── portfolio/
├── public/
│   └── images/
│       └── portfolio/
├── src/
└── ...
```

A estrutura do código pode variar conforme o projeto existente.

Não reorganizar o repositório apenas para reproduzir o exemplo.

## Arquivos originais do portfólio

Os PNGs completos ficam em:

```text
/originals/portfolio/
```

Essa pasta:

- deve permanecer no `.gitignore`;
- não deve ser publicada;
- não deve ser alterada durante a conversão.

Os nomes e tamanhos esperados estão em `docs/LANDINGPAGE.md`.

## Imagens públicas do portfólio

Gerar as imagens otimizadas em:

```text
/public/images/portfolio/
```

Para cada projeto:

```text
[slug]-cover.webp
[slug]-mobile.webp
[slug]-desktop.webp
```

Regras de compressão, largura e carregamento estão em `docs/LANDINGPAGE.md`.

## Decisões de interface

A direção visual é:

> Minimalismo premium, claro e comercial, com Bento Box seletivo e glassmorphism apenas como detalhe.

Orientação:

- 70% superfícies sólidas;
- 20% Bento Box;
- 10% vidro, gradientes e efeitos.

A FAQ utiliza superfícies sólidas.

Não implementar:

- fundo escuro dominante;
- neon;
- animações chamativas;
- rolagem presa;
- vídeo automático;
- cursor customizado;
- CTA flutuante na primeira versão (e em nenhuma versão na rota essencial).

## Fluxo comercial (WhatsApp-first)

O contato inicial acontece pelo WhatsApp:

```text
visitante → CTA → abertura direta do WhatsApp com mensagem oficial pré-preenchida
```

Regras:

- todo CTA comercial abre diretamente o WhatsApp;
- a mensagem é fixa e pré-preenchida, sem dados pessoais na URL;
- a conversão acontece na conversa, fora da página;
- não existe formulário, modal de formulário, página de obrigado nem `generate_lead`;
- na rota essencial, não existe CTA fixo mobile.

O formulário foi removido em 05/08/2026 (commit `a91fdbc`) e não deve ser recriado.

## WhatsApp

O WhatsApp é o único caminho inicial de contato comercial.

Mensagens oficiais:

```text
Rota /landingpage:
Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?

Rota /landingpage-essencial:
Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.
```

O número deve vir de configuração central (`NEXT_PUBLIC_WHATSAPP_NUMBER`).

Os eventos antigos `whatsapp_after_lead` e `generate_lead` não existem mais e não devem ser usados.

## Rastreamento

Google Tag Manager instalado via `@next/third-parties/google` no root layout. Configurado com `NEXT_PUBLIC_GTM_ID`.

Ferramentas a configurar no GTM:

- Google Analytics 4;
- Google Ads;
- Meta Pixel;
- Microsoft Clarity;
- Consent Mode v2.

Eventos implementados:

```text
cta_click
whatsapp_click
portfolio_open
portfolio_view_change
faq_open
```

Na rota essencial, `cta_click` e `whatsapp_click` levam `offer_variant: "essential_399"`, sem `form_id`, `cta_id`, `cta_text` nem `event_version`.

Não contabilizar como conversão:

- clique em CTA;
- clique no WhatsApp;
- abertura de projeto;
- abertura de FAQ;
- qualquer evento de interação.

Não usar R$ 997 (nem R$ 399) como valor de conversão de clique.

Detalhes completos estão em `docs/TRACKING.md`.

O Microsoft Clarity é instalado **exclusivamente pelo GTM**: não existe snippet do Clarity no código e não existe `NEXT_PUBLIC_CLARITY_PROJECT_ID`. A validação real (mapas de calor, gravações de sessão e mascaramento) é feita no painel do Clarity.

## Consentimento e privacidade

As tags devem respeitar as escolhas do visitante.

O WhatsApp deve funcionar quando a pessoa:

- aceita medição;
- recusa recursos não essenciais;
- configura preferências.

Nunca enviar para analytics:

- nome;
- telefone;
- descrição do negócio;
- URL digitada;
- respostas;
- qualquer outro dado pessoal.

## Variáveis de ambiente

Primeiro, identificar como o projeto já gerencia variáveis.

IDs públicos podem utilizar nomes como:

```dotenv
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Quando GA4 e Meta forem instalados diretamente, o projeto pode exigir IDs públicos adicionais. Quando forem centralizados pelo GTM, não duplicar a configuração.

Nunca:

- adicionar valores reais ao `.env.example`;
- versionar `.env.local`;
- expor tokens;
- prefixar segredos com `NEXT_PUBLIC_`;
- registrar credenciais no console.

## Canonical e metadata

Canonical de produção:

```text
https://www.anuncioesite.com.br/landingpage
https://www.anuncioesite.com.br/landingpage-essencial
```

Title da oferta completa:

```text
Landing Page para Tráfego Pago | Anúncio & Site
```

Title da oferta essencial:

```text
Landing Page Essencial para Google Ads e Meta Ads por R$ 399 | Anúncio & Site
```

Preview e homologação devem usar `noindex`.

## Fluxo de implementação

Ordem recomendada:

1. Ler os documentos.
2. Inspecionar o repositório.
3. Confirmar rotas e stack.
4. Confirmar os materiais.
5. Processar as imagens.
6. Implementar a estrutura da página.
7. Implementar os modais.
8. Implementar rastreamento e consentimento.
9. Validar acessibilidade e responsividade.
10. Executar lint, tipos, testes e build.
11. Executar `docs/CHECKLIST.md`.
12. Apresentar o ambiente de revisão.
13. Publicar somente após autorização.

## Dependências antes da publicação

Confirmar:

- número oficial do WhatsApp;
- GTM;
- GA4;
- conversão do Google Ads;
- Meta Pixel;
- Microsoft Clarity (Project ID configurado no GTM);
- controle de consentimento;
- domínio e infraestrutura;
- Política de Privacidade;
- Termos de Uso;
- logotipo;
- foto de Willian;
- visual do hero;
- imagem Open Graph;
- capturas do portfólio;
- autorização para apresentar os projetos.

Não substituir itens pendentes por dados inventados.

## Fora do escopo

Não implementar automaticamente:

- gestão de Google Ads;
- gestão de Meta Ads;
- homepage;
- blog;
- artigos;
- página adicional;
- identidade visual completa;
- produção de fotos ou vídeos;
- CRM não definido;
- automações;
- manutenção mensal;
- testes A/B;
- SEO avançado;
- CAPI;
- Enhanced Conversions;
- rastreamento server-side;
- chat automático;
- pop-up de saída;
- formulário;
- página de obrigado.

## Publicação

Não fazer deploy de produção sem autorização explícita.

Antes:

- obter aprovação;
- confirmar domínio;
- confirmar variáveis;
- confirmar integrações;
- confirmar documentos jurídicos.

Depois:

- abrir o domínio real;
- testar celular e desktop;
- testar os CTAs de WhatsApp em todas as localizações;
- testar a mensagem pré-preenchida;
- testar eventos;
- testar consentimento aceito e recusado;
- verificar HTTPS;
- verificar canonical e metadata.

## Critérios de conclusão

Uma implementação somente pode ser considerada concluída quando:

- `/landingpage` funciona;
- `/landingpage-essencial` funciona;
- a homepage permanece intacta;
- a copy corresponde a `docs/CONTENT.md` e `docs/ESSENCIAL.md`;
- o comportamento corresponde a `docs/LANDINGPAGE.md` e `docs/ESSENCIAL.md`;
- o visual corresponde a `docs/DESIGN.md`;
- os eventos correspondem a `docs/TRACKING.md`;
- o checklist foi executado;
- todos os CTAs abrem o WhatsApp com a mensagem correta;
- o build foi concluído;
- não existem erros relevantes no console;
- todas as pendências foram informadas.
