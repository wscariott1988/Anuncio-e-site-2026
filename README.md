# Anúncio & Site

Projeto web da Anúncio & Site.

A prioridade atual é a Landing Page comercial:

```text
/landingpage
```

## Status

A estratégia, a copy, o design, o comportamento e o rastreamento estão documentados.

A implementação deve começar somente depois da leitura de:

- `AGENTS.md`;
- `docs/CONTENT.md`;
- `docs/LANDINGPAGE.md`;
- `docs/LEADS.md`;
- `docs/DESIGN.md`;
- `docs/TRACKING.md`;
- `docs/CHECKLIST.md`.

## Objetivo

Apresentar e captar interessados no serviço de criação completa de Landing Pages para campanhas de Google Ads e Meta Ads.

Decisões centrais:

- serviço executado diretamente por Willian Souza;
- projeto completo por R$ 997;
- 50% na contratação;
- 50% após a Landing Page ser publicada e estar funcionando;
- prazo de até 7 dias úteis após entrada, briefing e materiais;
- até duas rodadas de ajustes;
- formulário como único caminho inicial de contato;
- WhatsApp somente após o envio confirmado ou como contingência por falha técnica;
- nenhuma promessa de resultado comercial.

## Documentação

| Arquivo | Função |
|---|---|
| `AGENTS.md` | Regras permanentes do repositório |
| `docs/CONTENT.md` | Copy oficial |
| `docs/LANDINGPAGE.md` | Estrutura e comportamento |
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
```

## Verificações

Executar somente scripts disponíveis em `package.json`.

Com npm, os nomes mais comuns são:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Se `typecheck` ou `test` não existirem:

- não inventar o script;
- executar os equivalentes disponíveis;
- informar claramente o que não foi executado.

## Rotas

### Rota raiz (redirect temporário)

```text
/  →  /landingpage
```

A raiz redireciona para `/landingpage` com preservação de parâmetros de campanha. Esse redirect será mantido até a criação da homepage institucional.

### Rota comercial

```text
/landingpage
```

### Rotas jurídicas

As rotas jurídicas implementadas são:

```text
/politica-de-privacidade
/termos
```

O conteúdo é definido em `docs/PRIVACY.md` e `docs/TERMS.md`.

### Rota que não deve existir

```text
/landingpage/obrigado
```

O sucesso do formulário acontece dentro do modal.

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

O formulário e a FAQ utilizam superfícies sólidas.

Não implementar:

- fundo escuro dominante;
- neon;
- animações chamativas;
- rolagem presa;
- vídeo automático;
- cursor customizado;
- CTA flutuante na primeira versão.

## Formulário

O formulário:

- abre em modal;
- apresenta uma pergunta por vez;
- possui três etapas;
- é o único caminho inicial de contato;
- valida no cliente e no servidor;
- preserva respostas durante a visita;
- só apresenta sucesso após armazenamento real.

Todos os CTAs comerciais abrem o mesmo formulário.

Não existe botão direto para WhatsApp antes do envio.

### Arquitetura de leads

Seguir `docs/LEADS.md`.

Fluxo oficial:

```text
Formulário
→ endpoint Next.js no servidor
→ envio ao Google Apps Script
→ Apps Script escreve na planilha
→ confirmação com lead_id
→ notificação
```

Decisões:

- o Google Sheets é o armazenamento único e confirma o lead;
- o Google Apps Script é a camada de integração que escreve na planilha;
- o esquema da planilha possui exatamente 24 colunas;
- o navegador não envia diretamente para o Apps Script;
- uma falha do Apps Script permite nova tentativa sem perder o lead;
- `status_atendimento` e `observacoes` são mantidos manualmente na planilha na primeira versão;
- não existe sincronização bidirecional na primeira versão.

Ainda devem ser confirmados antes da implementação definitiva:

- endpoint do Apps Script web app;
- secret do Apps Script;
- identificador e acesso da planilha;
- canal de notificação.

Não simular envio nem escolher fornecedor externo sem aprovação.

## WhatsApp

O WhatsApp aparece somente depois do envio confirmado.

Evento:

```text
whatsapp_after_lead
```

O evento antigo abaixo não deve ser usado:

```text
whatsapp_click
```

O número deve vir de configuração central.

## Rastreamento

Google Tag Manager instalado via `@next/third-parties/google` no root layout. Configurado com `NEXT_PUBLIC_GTM_ID`.

Ferramentas a configurar no GTM:

- Google Analytics 4;
- Google Ads;
- Meta Pixel;
- Microsoft Clarity;
- Consent Mode v2.

Conversão principal:

```text
generate_lead
```

O evento dispara somente depois do armazenamento confirmado pelo servidor.

Não contabilizar como lead:

- abertura do formulário;
- início;
- conclusão de etapa;
- tentativa;
- erro;
- clique no WhatsApp;
- visualização de projeto;
- abertura de FAQ.

Não usar R$ 997 como valor de cada lead.

Detalhes completos estão em `docs/TRACKING.md`.

O Microsoft Clarity é instalado **exclusivamente pelo GTM**: não existe snippet do Clarity no código e não existe `NEXT_PUBLIC_CLARITY_PROJECT_ID`. O formulário inteiro é mascarado com `data-clarity-mask="true"`. A validação real (mapas de calor, gravações de sessão e mascaramento) é feita no painel do Clarity.

## Consentimento e privacidade

As tags devem respeitar as escolhas do visitante.

O formulário deve funcionar quando a pessoa:

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

O consentimento do formulário e o consentimento de medição são controles diferentes.

## Variáveis de ambiente

Primeiro, identificar como o projeto já gerencia variáveis.

IDs públicos podem utilizar nomes como:

```dotenv
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Quando GA4 e Meta forem instalados diretamente, o projeto pode exigir IDs públicos adicionais. Quando forem centralizados pelo GTM, não duplicar a configuração.

Serviços do formulário podem exigir variáveis exclusivas do servidor.

Exemplos previstos pela arquitetura de leads:

```dotenv
GOOGLE_APPS_SCRIPT_WEB_APP_URL=
GOOGLE_APPS_SCRIPT_SECRET=
```

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
```

Title:

```text
Landing Page para Tráfego Pago | Anúncio & Site
```

Description:

```text
Landing Page completa para Google Ads e Meta Ads, com estratégia, copy, design, desenvolvimento e rastreamento. Projeto por R$ 997.
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
8. Implementar a integração com Google Apps Script conforme `docs/LEADS.md`.
9. Implementar notificação e recuperação de falhas.
10. Implementar notificação e recuperação de falhas.
11. Implementar rastreamento e consentimento.
12. Validar acessibilidade e responsividade.
13. Executar lint, tipos, testes e build.
14. Executar `docs/CHECKLIST.md`.
15. Apresentar o ambiente de revisão.
16. Publicar somente após autorização.

## Dependências antes da publicação

Confirmar:

- número oficial do WhatsApp;
- endpoint e secret do Apps Script;
- planilha e aba `Leads`;
- esquema oficial das 24 colunas;
- sincronização e reprocessamento;
- notificação dos leads;
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
- dez capturas do portfólio;
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
- pop-up de saída.

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
- testar formulário;
- confirmar armazenamento no Google Sheets;
- confirmar uma única linha no Google Sheets;
- simular falha do Sheets e validar recuperação;
- testar WhatsApp;
- testar eventos;
- testar conversões;
- verificar HTTPS;
- verificar canonical e metadata.

## Critérios de conclusão

Uma implementação somente pode ser considerada concluída quando:

- `/landingpage` funciona;
- a homepage permanece intacta;
- a copy corresponde a `docs/CONTENT.md`;
- o comportamento corresponde a `docs/LANDINGPAGE.md`;
- o armazenamento e a planilha correspondem a `docs/LEADS.md`;
- o visual corresponde a `docs/DESIGN.md`;
- os eventos correspondem a `docs/TRACKING.md`;
- o checklist foi executado;
- o formulário foi testado de verdade;
- o lead chegou ao Google Sheets via Apps Script;
- o build foi concluído;
- não existem erros relevantes no console;
- todas as pendências foram informadas.
