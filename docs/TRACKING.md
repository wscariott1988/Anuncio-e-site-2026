# Rastreamento — `/landingpage`

> Status: GTM instalado, Microsoft Clarity previsto via GTM (pendente de configuração), demais tags pendentes
> Rota: `/landingpage`  
> Conversão principal: `generate_lead`  
> Formulário: `landingpage_lead_form`  
> Versão dos eventos: `1`

## 1. Objetivo

Medir a jornada do visitante sem confundir interação, tentativa de envio, clique no WhatsApp ou erro técnico com um lead confirmado.

A medição deve responder:

- quais CTAs abrem o formulário;
- quantas pessoas iniciam;
- em qual etapa existe abandono;
- quantas tentam enviar;
- quantas geram um lead confirmado;
- quantas continuam pelo WhatsApp após o envio;
- quantas usam a contingência por erro;
- quais projetos são visualizados;
- quais dúvidas são abertas;
- qual origem trouxe o lead.

## 2. Princípios

1. O servidor confirma a conversão.
2. Somente a confirmação do Google Apps Script em `docs/LEADS.md` gera `generate_lead`.
3. Um envio confirmado gera no máximo um lead.
4. Nenhum dado pessoal entra no `dataLayer` ou nas plataformas de mídia.
5. A escolha de consentimento controla as tags.
6. O formulário continua funcionando sem consentimento de medição.
7. Google Ads e Meta recebem somente a conversão principal.
8. O valor de R$ 997 não é valor de conversão do lead.
9. Não instalar rastreamento duplicado.
10. Não declarar uma integração validada sem teste real.

## 3. Ferramentas previstas

- Google Tag Manager.
- Microsoft Clarity.
- Google Analytics 4.
- Google Ads Conversion Tracking.
- Meta Pixel.
- `dataLayer`.
- Armazenamento real do formulário.
- Sincronização operacional com Google Sheets.
- Controle de consentimento.

### Arquitetura

O Google Tag Manager está instalado no root layout via `@next/third-parties/google` e cobre todas as rotas (`/`, `/landingpage`, `/politica-de-privacidade`, `/termos`).

O GTM é renderizado condicionalmente: somente quando `NEXT_PUBLIC_GTM_ID` está presente.

Antes de configurar tags no GTM:

- verificar se GA4 já está instalado diretamente;
- verificar se Meta Pixel já está instalado diretamente;
- verificar se Google Ads já possui conversão;
- remover ou impedir duplicidades antes de adicionar novas tags.

Não instalar ao mesmo tempo:

- GA4 direto e GA4 duplicado pelo GTM;
- Meta Pixel direto e Meta Pixel duplicado pelo GTM;
- conversão direta do Google Ads e a mesma conversão importada do GA4.

### Microsoft Clarity

O Microsoft Clarity é instalado **exclusivamente pelo GTM**. Não existe snippet do Clarity no código da aplicação e não deve existir `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

Regras:

- Criar uma única tag de Clarity no GTM, com o Project ID configurado dentro do container.
- Não instalar o snippet diretamente no código.
- Não duplicar a tag do Clarity no GTM ou fora dele.
- Não usar o pacote `@microsoft/clarity` sem justificativa e aprovação.
- A tag do Clarity deve respeitar o consentimento: disparar somente quando a categoria Analytics estiver autorizada.
- O banner permanece genérico e não menciona "Microsoft Clarity".
- O formulário inteiro permanece mascarado com `data-clarity-mask="true"` no contêiner raiz.
- Nenhuma PII pode ser enviada ao Clarity ou ao `dataLayer` (nome, WhatsApp, negócio, URL informada, respostas).
- A validação real do Clarity é feita no painel do Clarity (mapas de calor, gravações de sessão e verificação de mascaramento dos campos), nunca apenas no código.
- O consentimento do Clarity segue a categoria Analytics do painel de preferências. Não criar sinal específico no banner.
- Para EEA, Reino Unido e Suíça o Clarity exige sinal de consentimento; como o tráfego-alvo é o Brasil, a pendência para essas regiões deve ser registrada se o escopo mudar.

Não tratar o carregamento do Clarity como conversão.

## 4. Modelo de conversão

### Conversão principal

```text
generate_lead
```

Disparar somente depois que:

1. o visitante enviar o formulário;
2. o servidor validar os campos;
3. o servidor receber a confirmação do Apps Script com a linha escrita no Google Sheets;
4. o servidor devolver confirmação com identificador único.

A sincronização com Google Sheets não cria uma segunda conversão.

Se o Apps Script confirmou o lead e somente a notificação falhou:

- manter `generate_lead`;
- não disparar `form_error`;
- não repetir `generate_lead`;
- recuperar a sincronização internamente conforme `docs/LEADS.md`.

### Não é conversão

Não contabilizar como lead:

- clique em CTA;
- abertura do modal;
- início do formulário;
- conclusão de etapa;
- clique em “Enviar informações”;
- erro de validação;
- falha técnica;
- clique no WhatsApp após o lead;
- clique no WhatsApp por contingência;
- abertura de projeto;
- abertura de FAQ.

### Valor

Não enviar:

```text
value: 997
```

R$ 997 é o preço do serviço, não o valor financeiro comprovado de cada lead.

Enquanto não existir uma regra baseada em dados reais:

- não enviar `value`;
- não enviar `currency`;
- não atribuir receita a `generate_lead`.

## 5. Convenções

### Padrão dos nomes

- Usar letras minúsculas.
- Usar `snake_case`.
- Não usar espaços.
- Não traduzir o mesmo evento de maneiras diferentes.
- Não criar variações por seção.

### Valores fixos

```text
form_id: landingpage_lead_form
page_type: landingpage_sales
event_version: 1
```

### Localizações dos CTAs

| Seção | `cta_location` |
|---|---|
| Cabeçalho | `header` |
| Hero | `hero` |
| Projetos desenvolvidos | `portfolio` |
| Investimento | `pricing` |
| CTA final | `final` |

### Preservação do CTA de origem

- Antes do início do formulário, `source_cta` corresponde ao CTA da abertura atual.
- Quando `form_start` disparar, preservar esse `source_cta` até o sucesso ou reinício completo.
- Fechar e reabrir para continuar o mesmo preenchimento não deve trocar a origem.
- Um preenchimento reiniciado do zero pode assumir uma nova origem.

### Projetos

| Projeto | `project_id` |
|---|---|
| Mecânica Auto Brum | `mecanica_auto_brum` |
| ZARQ Planejados | `zarq_planejados` |
| Agafarma Mário Quintana | `agafarma_mario_quintana` |
| BS Montagem de Móveis | `bs_montagem` |
| Artur Montador | `artur_montador` |

### Etapas do formulário

| Número | `step_name` |
|---:|---|
| 1 | `contact` |
| 2 | `project` |
| 3 | `confirmation` |

## 6. Catálogo de eventos

| Evento | Finalidade | Conversão |
|---|---|---|
| `cta_click` | Identificar o CTA acionado | Não |
| `form_open` | Medir abertura do modal | Não |
| `form_start` | Medir início real | Não |
| `form_step` | Medir conclusão de etapa | Não |
| `form_submit_attempt` | Medir tentativa válida | Não |
| `form_error` | Diagnosticar falhas | Não |
| `generate_lead` | Registrar lead armazenado | Sim |
| `whatsapp_after_lead` | Medir continuidade após lead | Não |
| `portfolio_open` | Medir abertura de projeto | Não |
| `portfolio_view_change` | Medir troca mobile/desktop | Não |
| `faq_open` | Medir dúvida aberta | Não |

O evento antigo `whatsapp_click` não deve ser implementado.

## 7. `cta_click`

### Disparo

Quando o visitante acionar um CTA que abrirá o formulário.

### Parâmetros

| Parâmetro | Tipo | Exemplo |
|---|---|---|
| `cta_id` | string | `hero_primary` |
| `cta_location` | string | `hero` |
| `cta_text` | string | `Quero minha Landing Page` |
| `form_id` | string | `landingpage_lead_form` |
| `event_version` | string | `1` |

`cta_text` deve vir de uma lista fixa da interface. Não enviar texto digitado pelo visitante.

### Sequência

```text
cta_click → form_open
```

## 8. `form_open`

### Disparo

Quando o modal estiver visível, acessível e pronto para interação.

### Parâmetros

| Parâmetro | Tipo |
|---|---|
| `form_id` | string |
| `source_cta` | string |
| `event_version` | string |

### Regras

- Pode disparar novamente se o visitante fechar e reabrir.
- Cada abertura representa uma nova interação.
- Não dispara `form_start`.
- Não dispara conversão.

## 9. `form_start`

### Disparo

Uma única vez por carregamento da página, quando o visitante fornecer a primeira resposta válida.

Abrir o modal ou clicar em “Começar” não é suficiente.

### Parâmetros

| Parâmetro | Tipo |
|---|---|
| `form_id` | string |
| `source_cta` | string |
| `event_version` | string |

### Prevenção de duplicidade

Manter um marcador em memória:

```text
form_started = true
```

Voltar, editar ou reabrir o modal não deve disparar outro `form_start`.

## 10. `form_step`

### Disparo

Quando o visitante concluir todos os campos válidos de uma das três etapas e avançar.

Não disparar a cada pergunta.

### Parâmetros

| Parâmetro | Tipo | Valores |
|---|---|---|
| `form_id` | string | `landingpage_lead_form` |
| `step_number` | number | `1`, `2`, `3` |
| `step_name` | string | `contact`, `project`, `confirmation` |
| `source_cta` | string | origem do formulário |
| `event_version` | string | `1` |

### Regras

- Disparar ao avançar, não ao voltar.
- Cada etapa dispara no máximo uma vez por preenchimento.
- Editar uma etapa já concluída não cria nova conclusão.

## 11. `form_submit_attempt`

### Disparo

Quando o visitante clicar em “Enviar informações” e todos os campos estiverem válidos no cliente.

### Parâmetros

| Parâmetro | Tipo |
|---|---|
| `form_id` | string |
| `source_cta` | string |
| `event_version` | string |

### Regras

- É apenas diagnóstico.
- Não importar como conversão.
- Não disparar Meta `Lead`.
- Não disparar Google Ads.
- Uma nova tentativa após falha pode gerar outro `form_submit_attempt`.

## 12. `form_error`

### Disparo

Quando ocorrer:

- bloqueio por validação ao tentar avançar ou enviar;
- erro de rede;
- rejeição do servidor;
- limite de requisições;
- erro desconhecido.

### Parâmetros

| Parâmetro | Tipo | Valores permitidos |
|---|---|---|
| `form_id` | string | valor fixo |
| `error_type` | string | `validation`, `network`, `server`, `rate_limited`, `unknown` |
| `step_name` | string | `contact`, `project`, `confirmation`, `submit` |
| `error_count` | number | quantidade de erros, sem detalhes |
| `event_version` | string | `1` |

### Proibições

Não enviar:

- nome do campo preenchido;
- valor digitado;
- telefone;
- mensagem do servidor;
- stack trace;
- URL informada;
- corpo da requisição.

## 13. `generate_lead`

### Disparo

Somente no callback de sucesso real do servidor, depois da confirmação do Apps Script em `docs/LEADS.md`.

### Parâmetros

| Parâmetro | Tipo | Observação |
|---|---|---|
| `form_id` | string | valor fixo |
| `lead_id` | string | identificador opaco |
| `lead_source` | string | origem normalizada |
| `source_cta` | string | CTA que iniciou o fluxo |
| `event_id` | string | mesmo identificador de deduplicação |
| `event_version` | string | `1` |

### `lead_source`

Valores sugeridos:

- `google`;
- `meta`;
- `direct`;
- `referral`;
- `other`.

Não enviar nome de pessoa, telefone ou texto do formulário.

### Regras

- Disparar uma única vez.
- Não disparar na tentativa.
- Não disparar em erro.
- Não disparar ao reabrir o modal.
- Não disparar ao atualizar a página.
- Não disparar pelo WhatsApp.
- Não disparar novamente quando o Google Sheets confirmar a sincronização.
- Não remover ou compensar o evento por falha somente do Google Sheets.
- Não registrar `lead_id` como dimensão personalizada de alta cardinalidade no GA4.

## 14. `whatsapp_after_lead`

### Disparo

Quando o visitante clicar em “Continuar no WhatsApp” na tela de sucesso.

### Parâmetros

| Parâmetro | Tipo |
|---|---|
| `form_id` | string |
| `lead_id` | string opaca |
| `source_cta` | string |
| `event_version` | string |

### Regras

- Somente existe depois de `generate_lead`.
- Não gera um segundo lead.
- Não é conversão principal.
- Não deve ser enviado ao Google Ads como nova conversão.
- Não deve disparar outro evento Meta `Lead`.

## 15. `portfolio_open`

### Disparo

Quando um projeto for aberto no visualizador.

### Parâmetros

| Parâmetro | Tipo | Valores |
|---|---|---|
| `project_id` | string | lista oficial de projetos |
| `initial_view` | string | `mobile` |
| `event_version` | string | `1` |

A visualização inicial é sempre mobile, inclusive no desktop.

## 17. `portfolio_view_change`

### Disparo

Quando, no desktop, o visitante alternar entre as capturas mobile e desktop.

### Parâmetros

| Parâmetro | Tipo | Valores |
|---|---|---|
| `project_id` | string | lista oficial |
| `selected_view` | string | `mobile`, `desktop` |
| `event_version` | string | `1` |

Não disparar apenas por abrir o projeto. A abertura pertence a `portfolio_open`.

## 18. `faq_open`

### Disparo

Quando uma pergunta fechada for aberta.

### Parâmetros

| Parâmetro | Tipo | Exemplo |
|---|---|---|
| `faq_id` | string | `faq_01` |
| `event_version` | string | `1` |

Usar:

```text
faq_01
faq_02
faq_03
faq_04
faq_05
faq_06
faq_07
faq_08
```

Não enviar a pergunta ou a resposta completa como parâmetro.

## 19. Sequências esperadas

### Lead confirmado com WhatsApp

```text
cta_click
form_open
form_start
form_step: contact
form_step: project
form_step: confirmation
form_submit_attempt
generate_lead
whatsapp_after_lead
```

### Lead confirmado sem abrir WhatsApp

```text
cta_click
form_open
form_start
form_step: contact
form_step: project
form_step: confirmation
form_submit_attempt
generate_lead
```

### Falha técnica com nova tentativa bem-sucedida

```text
form_submit_attempt
form_error
form_submit_attempt
generate_lead
```

Gerar apenas um `generate_lead`.

### Abandono

Uma jornada pode terminar em qualquer evento anterior a `generate_lead`.

Abandono não é erro e não deve gerar evento específico na primeira versão.

## 20. Contrato do `dataLayer`

### Regra

Todos os eventos personalizados devem passar por uma função central ou módulo equivalente.

Não espalhar chamadas incompatíveis por diversos componentes.

### Exemplo de CTA

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "cta_click",
  cta_id: "hero_primary",
  cta_location: "hero",
  cta_text: "Quero minha Landing Page",
  form_id: "landingpage_lead_form",
  event_version: "1"
});
```

### Exemplo de lead

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "generate_lead",
  form_id: "landingpage_lead_form",
  lead_id: "opaque-lead-id",
  lead_source: "google",
  source_cta: "hero",
  event_id: "opaque-lead-id",
  event_version: "1"
});
```

Os exemplos não devem ser executados com identificadores fictícios em produção.

### Ausência do GTM

Se o GTM não estiver disponível:

- a página continua funcionando;
- o formulário continua enviando;
- nenhum erro deve aparecer para o visitante;
- o módulo de rastreamento deve falhar silenciosamente;
- a ausência deve ser registrada como pendência técnica.

## 21. Deduplicação e idempotência

### Identificador da tentativa

Antes da primeira requisição válida, gerar uma chave de idempotência aleatória.

Reutilizar a mesma chave em novas tentativas do mesmo preenchimento.

### Servidor

O servidor deve:

- reconhecer a chave;
- impedir dois registros para o mesmo envio;
- devolver o mesmo lead quando uma repetição segura acontecer;
- gerar ou confirmar um `lead_id` opaco;
- não criar duplicidade por duplo clique ou timeout.

### Cliente

Depois do sucesso:

- marcar o lead como rastreado;
- não enviar outro `generate_lead`;
- manter o botão de envio bloqueado;
- não repetir o evento ao reabrir o modal;
- não depender da URL para validar conversão.

### Plataformas

Usar o identificador único:

- como `transaction_id` na conversão direta do Google Ads, quando aplicável;
- como `eventID` do Meta Pixel, quando aplicável;
- como `event_id` no contrato interno.

Isso não autoriza CAPI ou rastreamento server-side nesta fase.

## 22. Destino dos eventos

| Evento | GA4 | Google Ads | Meta Pixel |
|---|---:|---:|---:|
| `cta_click` | Sim | Não | Não |
| `form_open` | Sim | Não | Não |
| `form_start` | Sim | Não | Não |
| `form_step` | Sim | Não | Não |
| `form_submit_attempt` | Sim | Não | Não |
| `form_error` | Sim | Não | Não |
| `generate_lead` | Sim | Sim | `Lead` |
| `whatsapp_after_lead` | Sim | Não | Não |
| `portfolio_open` | Sim | Não | Não |
| `portfolio_view_change` | Sim | Não | Não |
| `faq_open` | Sim | Não | Não |

“Sim” está condicionado ao consentimento correspondente e à configuração correta.

## 23. Google Analytics 4

### Configuração

- Enviar os eventos da tabela ao GA4 quando autorizado.
- Marcar `generate_lead` como evento principal ou key event.
- Não marcar eventos de interação como conversão.
- Não criar `generate_lead` novamente dentro do GA4 a partir de outro evento.

### Formulários automáticos

O acompanhamento explícito deste documento é a fonte oficial para o formulário da `/landingpage`.

Se a medição otimizada de interações com formulário gerar `form_start` ou `form_submit` automaticamente:

- desativar a medição automática de formulários para evitar duplicidade; ou
- comprovar tecnicamente que esses eventos estão excluídos da rota e do formulário oficial.

Não usar `form_submit` automático como lead.

### Page view

- Não criar `page_view` manual duplicado.
- Em navegação client-side do Next.js, confirmar um único `page_view` por visualização real.
- Não misturar configuração automática e manual sem teste.

### Dimensões personalizadas

Criar somente as necessárias para análise.

Não registrar como dimensão:

- `lead_id`;
- `event_id`;
- valores livres;
- qualquer dado pessoal.

## 24. Google Ads

### Conversão

Criar ou reutilizar uma única ação de conversão para:

```text
generate_lead
```

### Configuração recomendada

- Categoria: envio de formulário de lead.
- Ação principal: sim.
- Contagem: uma.
- Valor: não usar R$ 997.
- Janela e atribuição: conforme a conta e a campanha.
- Disparo: confirmação do servidor.

### Método

Usar exatamente um:

1. tag de conversão direta do Google Ads pelo GTM; ou
2. importação do `generate_lead` do GA4.

Preferência para a primeira implementação:

- conversão direta pelo GTM;
- `generate_lead` também enviado ao GA4 para análise;
- não importar a mesma conversão do GA4 para o Google Ads.

### Deduplicação

Quando a tag aceitar, usar:

```text
transaction_id = lead_id
```

### Conversion Linker

Se a conversão direta do Google Ads for usada, validar o Conversion Linker e a preservação dos identificadores de anúncio.

## 25. Meta Pixel

### Conversão

Depois de `generate_lead`, disparar uma única vez:

```text
Lead
```

### Regras

- Não disparar no clique do botão.
- Não disparar em `form_submit_attempt`.
- Não disparar em `whatsapp_after_lead`.
- Não disparar em erro técnico.
- Não enviar nome ou telefone.
- Não adicionar Advanced Matching nesta fase.
- Não adicionar CAPI nesta fase.

Se `eventID` for usado:

```text
eventID = lead_id
```

O uso do identificador não autoriza envio de dados pessoais.

## 26. Origem e atribuição

### Fonte dos nomes armazenados

O esquema oficial do registro e da aba `Leads` está em:

```text
docs/LEADS.md
```

Este documento governa a medição. `LEADS.md` governa o armazenamento.

### Captura permitida

Quando disponíveis:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_term`;
- `utm_content`;
- `gclid`;
- `gbraid`;
- `wbraid`;
- `fbclid`;
- `entry_path`;
- `referrer_hostname`.

### Momento

Capturar os parâmetros na primeira entrada em `/landingpage`, antes que navegação ou limpeza da URL os remova.

### Armazenamento durante o fluxo

- Manter em memória durante a visita.
- Não colocar dados do formulário em parâmetros de URL.
- Não armazenar a URL inteira quando uma lista permitida de parâmetros for suficiente.
- Respeitar a escolha de consentimento e a Política de Privacidade.

### Envio ao formulário

Associar a origem ao registro do lead no servidor.

Aplicar:

- lista permitida;
- limite de tamanho;
- sanitização;
- normalização;
- descarte de parâmetros desconhecidos.

O registro deve receber também:

- `source_cta`, preservado desde o início real do formulário;
- `lead_source`, normalizado pelo servidor.

Não enviar campos pessoais ao `dataLayer` para fazer essa associação.

### Correspondência com a planilha

Os campos de atribuição armazenados na aba `Leads` são:

```text
lead_source
source_cta
utm_source
utm_medium
utm_campaign
utm_term
utm_content
gclid
gbraid
wbraid
fbclid
entry_path
referrer_hostname
```

Essa lista é apenas a correspondência de atribuição. A lista completa e a ordem das 24 colunas permanecem exclusivamente em `docs/LEADS.md`.

Parâmetros ausentes permanecem vazios. Não inventar valores.

### Origem normalizada

Exemplo:

| Condição | `lead_source` |
|---|---|
| `gclid`, `gbraid`, `wbraid` ou `utm_source=google` | `google` |
| `fbclid` ou origem Meta aprovada | `meta` |
| referência externa sem campanha | `referral` |
| sem referência ou campanha | `direct` |
| demais origens | `other` |

A normalização usada nos eventos deve ser a mesma armazenada em `lead_source`.

## 27. Privacidade

### Proibição absoluta

Nunca enviar ao `dataLayer`, GA4, Google Ads ou Meta:

- nome;
- telefone;
- texto do negócio;
- URL digitada no formulário;
- respostas;
- consentimento individual associado à pessoa;
- mensagem de erro contendo conteúdo;
- endereço de e-mail, se adicionado futuramente;
- qualquer outro dado pessoal.

### Identificadores

`lead_id` e `event_id` devem:

- ser opacos;
- não conter telefone;
- não conter nome;
- não conter data de nascimento;
- não ser derivados de dados pessoais;
- não ser apresentados ao visitante.

### Formulário

Os dados pessoais devem ir somente ao endpoint seguro responsável pelo atendimento.

O consentimento do formulário é diferente do consentimento de cookies e medição.

## 28. Consentimento

### Base técnica

Usar uma implementação compatível com **Consent Mode v2 avançado** e com a Política de Privacidade aprovada.

O projeto adota o comportamento avançado do Consent Mode: com o consentimento negado, GTM, gtag.js e GA4 podem ser carregados e podem emitir **pings sem cookies** (sinais restritos). Esses acessos não são tratados como falha nem como coleta identificável. A medição identificável (cookies `_ga`, `_gid`, `_gcl_*` e equivalentes em armazenamento) só pode ocorrer após `analytics_storage = granted`.

Garantias esperadas no estado `denied`:

- os comandos `consent default` e `consent update` existem no `dataLayer` com as quatro categorias negadas;
- os pings do GA4 carregam marcadores restritos (`pscdl=denied`, `npa=1`, `gcs=G[01]00`);
- nenhum cookie de rastreamento (`_ga`, `_gid`, `_gcl_*`, `_clck`, `_clsk`) é criado;
- nenhum identificador equivalente é gravado em `localStorage` ou `sessionStorage`;
- o Microsoft Clarity não carrega enquanto `analytics_storage` estiver negado.

### Estado padrão

Antes da escolha, com `wait_for_update: 500` para o GTM aguardar a restauração:

```text
analytics_storage: denied (wait_for_update: 500)
ad_storage: denied (wait_for_update: 500)
ad_user_data: denied (wait_for_update: 500)
ad_personalization: denied (wait_for_update: 500)
```

### Aceitar medição

Quando a escolha autorizar medição e publicidade:

```text
analytics_storage: granted
ad_storage: granted
ad_user_data: granted
ad_personalization: granted
```

### Recusar recursos não essenciais

Manter:

```text
analytics_storage: denied
ad_storage: denied
ad_user_data: denied
ad_personalization: denied
```

### Configuração personalizada

Permitir combinações coerentes:

- análise autorizada e publicidade recusada;
- análise recusada e publicidade recusada;
- ambas autorizadas.

Não permitir publicidade autorizada de forma incompatível com a política adotada.

### Implementação

- Definir o estado antes das tags via scripts `beforeInteractive`.
- Restaurar preferência salva do `localStorage` também via `beforeInteractive`.
- Usar `wait_for_update: 500` no consentimento padrão.
- Permitir pings sem cookies (cookieless) de GTM, gtag.js e GA4 no estado negado, sem tratar esses acessos como falha.
- Mapeamento das categorias do painel para os storage types:

  | Categoria | Storage type |
  |---|---|
  | Analytics | `analytics_storage` |
  | Publicidade | `ad_storage`, `ad_user_data`, `ad_personalization` |

- Atualizar na mesma página após a escolha.
- Persistir a preferência em `localStorage` com chave `anuncio_e_site_consent_v1` e versão embutida.
- Permitir alteração posterior pelo link "Configurações de privacidade" no rodapé.
- Não recarregar a página como único meio de atualização.
- Bloquear Meta Pixel enquanto publicidade estiver recusada.
- Bloquear tags não essenciais conforme a escolha.
- Bloquear o Microsoft Clarity enquanto Analytics estiver recusado, configurando o gating da tag no GTM para `analytics_storage`.
- Não expor "Microsoft Clarity" no texto do banner.

### Independência do formulário

Mesmo com tudo recusado:

- a página carrega;
- o formulário abre;
- o formulário envia;
- o lead é armazenado;
- a tela de sucesso funciona;
- o WhatsApp pós-envio funciona.

`generate_lead` pode deixar de ser enviado às plataformas quando o consentimento não autorizar. O armazenamento do lead continua sendo a fonte operacional.

## 29. Configuração

### Variáveis públicas

IDs públicos podem utilizar o mecanismo existente do projeto.

Exemplos:

```text
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_GA4_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_WHATSAPP_NUMBER

Não exigir todas quando o GTM centralizar as integrações.

O Microsoft Clarity não utiliza variável pública: o Project ID fica configurado exclusivamente no container do GTM. Não criar `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

### Segredos

Nunca:

- prefixar segredo com `NEXT_PUBLIC_`;
- expor token de formulário;
- incluir credencial no repositório;
- registrar segredo no console;
- enviar segredo ao navegador.

### Ambientes

- Produção usa IDs de produção.
- Preview e desenvolvimento não devem poluir as propriedades reais.
- Homologação deve usar modo de depuração, IDs separados ou rastreamento desabilitado.
- Não marcar testes como conversões reais.

## 30. Validação obrigatória

### Código

- Eventos passam por módulo central.
- Nenhum componente envia PII.
- Ausência de GTM não quebra a página.
- Eventos não disparam durante renderização duplicada.
- React Strict Mode não cria duplicidade.

### Consent Mode v2 avançado

- Consent default com as quatro categorias negadas antes da escolha.
- `consent update` presente no `dataLayer` após aceitar, recusar ou salvar preferências.
- No estado negado, pings GA4 com `pscdl=denied`, `npa=1` e `gcs=G[01]00`, e ausência de cookies `_ga`, `_gid` e `_gcl_*`.
- No estado negado, ausência de identificadores equivalentes em `localStorage` e `sessionStorage`.
- "Aceitar todos" atualiza `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` para `granted` e permite cookies do GA4.
- "Recusar opcionais" mantém as quatro categorias negadas e não cria cookies opcionais.
- Revogação pelas "Configurações de privacidade" envia `consent update` para `denied` e impede novas coletas opcionais.
- Microsoft Clarity não carrega com `analytics_storage` negado; ausência de `_clck`, `_clsk` e scripts de Clarity nesse estado.
- Não afrouxar filtros de rede genericamente: liberar apenas os endpoints Google esperados no modo negado e continuar bloqueando outros rastreadores opcionais antes do consentimento.

### GTM

- Testar no modo de visualização.
- Verificar cada gatilho.
- Verificar consentimento exigido por tag.
- Confirmar ausência de tags duplicadas.
- Confirmar Conversion Linker quando aplicável.

### GA4

- Usar DebugView.
- Confirmar nomes e parâmetros.
- Confirmar um único `generate_lead`.
- Confirmar ausência de `form_submit` tratado como lead.
- Confirmar um único `page_view`.

### Google Ads

- Confirmar uma única ação principal.
- Confirmar que não existe importação duplicada.
- Testar `transaction_id`, quando usado.
- Confirmar ausência de valor R$ 997.

### Meta

- Validar no modo de teste e ferramenta de diagnóstico disponível.
- Confirmar um único evento `Lead`.
- Confirmar que WhatsApp não dispara `Lead`.
- Confirmar que o Pixel respeita consentimento.

### Microsoft Clarity

- Confirmar uma única tag no GTM e ausência de snippet no código.
- Confirmar que o formulário possui `data-clarity-mask="true"` e que todos os campos estão dentro da área mascarada.
- Confirmar que o banner não menciona "Microsoft Clarity".
- Confirmar que a tag respeita `analytics_storage`.
- Validar no painel do Clarity: mapas de calor, gravações de sessão e mascaramento dos campos.
- Confirmar ausência de PII no Clarity, no `dataLayer`, no console e na URL.

### Formulário

Testar:

- envio válido;
- erro de validação;
- erro de rede;
- erro do servidor;
- duplo clique;
- nova tentativa;
- timeout seguido de resposta;
- fechamento e reabertura;
- atualização da página;
- confirmação do Apps Script;
- uma única linha no Google Sheets;
- falha somente do Google Sheets após armazenamento;
- recuperação da sincronização sem novo `generate_lead`;
- repetição segura sem novo `lead_id`;
- WhatsApp após lead;
- WhatsApp por contingência.

### Origem

Testar:

- URL com UTMs;
- URL com `gclid`;
- URL com `gbraid` ou `wbraid`;
- URL com `fbclid`;
- acesso direto;
- referência externa;
- parâmetros desconhecidos;
- valores acima do limite.

### Consentimento

Testar:

- antes da escolha;
- aceitar medição;
- recusar não essenciais;
- configuração personalizada;
- alteração posterior;
- retorno em nova visita;
- formulário com consentimento negado.

### Privacidade

Inspecionar:

- `dataLayer`;
- console;
- aba de rede;
- URLs;
- payloads das tags;
- mensagens de erro.

Confirmar ausência de dados pessoais.

## 31. Critérios de aprovação

O rastreamento somente pode ser considerado concluído quando:

- o GTM está instalado uma única vez;
- a configuração de consentimento ocorre antes das tags;
- todos os eventos previstos foram testados;
- `generate_lead` depende do servidor;
- `generate_lead` depende da confirmação do Apps Script;
- `generate_lead` não duplica;
- a confirmação posterior do Sheets não cria nova conversão;
- falha somente do Sheets não gera `form_error`;
- Google Ads recebe uma única conversão;
- Meta recebe um único `Lead`;
- eventos de WhatsApp não viram lead;
- contingência por erro não vira lead;
- UTMs e identificadores são preservados corretamente;
- dados pessoais não aparecem nas plataformas;
- o formulário funciona sem consentimento de medição;
- o Clarity é instalado uma única vez pelo GTM, sem snippet no código e sem `NEXT_PUBLIC_CLARITY_PROJECT_ID`;
- o formulário permanece mascarado e sem PII no Clarity ou no `dataLayer`;
- a validação real do Clarity (mapas de calor, gravações e mascaramento) ocorreu no painel;
- ambientes de teste não poluem produção;
- pendências de contas e IDs são documentadas.

## 32. Fora do escopo

Não implementar nesta fase:

- Meta Conversions API;
- Google Ads Enhanced Conversions;
- rastreamento server-side;
- GTM Server;
- CRM não definido;
- importação de vendas offline;
- `qualify_lead`;
- `working_lead`;
- `close_convert_lead`;
- valor econômico de lead;
- testes A/B;
- call tracking;
- gravação de sessão sem aprovação específica.

Esses itens podem ser adicionados posteriormente por escopo próprio.

## 33. Referências técnicas

- Google Analytics — eventos recomendados:  
  `https://developers.google.com/analytics/devguides/collection/ga4/reference/events`
- Google Tag Platform — Consent Mode:  
  `https://developers.google.com/tag-platform/security/guides/consent`
- Microsoft Clarity — setup e instalação:
  `https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup`
- Microsoft Clarity — consentimento (Consent API v2):
  `https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2`
- Microsoft Clarity — mascaramento de conteúdo (`data-clarity-mask`):
  `https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking`
