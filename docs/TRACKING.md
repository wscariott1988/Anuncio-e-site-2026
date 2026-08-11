# Rastreamento — `/landingpage` e `/landingpage-essencial`

> Status: GTM instalado, Microsoft Clarity previsto via GTM (pendente de configuração), demais tags pendentes
> Rota principal: `/landingpage`
> Rota essencial: `/landingpage-essencial`
> Fluxo de conversão: clique no CTA → abertura direta do WhatsApp
> Formulário: removido em 05/08/2026 (ver `docs/LEADS.md`)
> Versão dos eventos: `1`

## 1. Objetivo

Medir a interação do visitante com a página sem confundir clique, interação ou erro técnico com uma conversão confirmada.

A medição deve responder:

- quais CTAs abrem o WhatsApp;
- em qual posição da página ocorre cada clique;
- quais projetos são visualizados;
- quais dúvidas são abertas.

## 2. Princípios

1. A conversão acontece fora da página, na conversa do WhatsApp.
2. Não criar conversão no clique.
3. Não criar conversão na tentativa.
4. Não importar eventos de interação como conversão.
5. Nenhum dado pessoal entra no `dataLayer` ou nas plataformas de mídia.
6. A escolha de consentimento controla as tags.
7. O WhatsApp continua funcionando sem consentimento de medição.
8. O valor de R$ 997 não é valor de conversão de clique.
9. Não instalar rastreamento duplicado.
10. Não declarar uma integração validada sem teste real.

## 3. Ferramentas previstas

- Google Tag Manager.
- Microsoft Clarity.
- Google Analytics 4.
- Google Ads Conversion Tracking.
- Meta Pixel.
- `dataLayer`.
- Controle de consentimento.

### Arquitetura

O Google Tag Manager está instalado no root layout via `@next/third-parties/google` e cobre todas as rotas (`/`, `/landingpage`, `/landingpage-essencial`, `/politica-de-privacidade`, `/termos`).

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
- Não existe formulário nesta versão; se um formulário for reintroduzido, o contêiner deve ser mascarado com `data-clarity-mask="true"`.
- Nenhuma PII pode ser enviada ao Clarity ou ao `dataLayer`.
- A validação real do Clarity é feita no painel do Clarity (mapas de calor, gravações de sessão e verificação de mascaramento), nunca apenas no código.
- O consentimento do Clarity segue a categoria Analytics do painel de preferências. Não criar sinal específico no banner.

Não tratar o carregamento do Clarity como conversão.

## 4. Modelo de conversão

### Conversão principal

Não existe evento de conversão confirmado por servidor nesta versão.

O contato comercial acontece pela abertura do WhatsApp. O que acontece depois do clique (conversa, contratação e pagamento) acontece fora da página e não é medido por eventos do `dataLayer`.

### Não é conversão

Não contabilizar como conversão:

- clique em CTA;
- clique no WhatsApp;
- abertura de projeto;
- abertura de FAQ;
- qualquer evento de interação.

### Valor

Não enviar:

```text
value: 997
```

R$ 997 é o preço do serviço, não o valor financeiro comprovado de cada clique ou contato.

Enquanto não existir uma regra baseada em dados reais:

- não enviar `value`;
- não enviar `currency`;
- não atribuir receita a `cta_click` ou `whatsapp_click`.

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

> `form_id` é mantido como valor fixo por compatibilidade histórica. Não corresponde mais a um formulário existente.

### Rota `/landingpage-essencial`

Na rota essencial, `cta_click` e `whatsapp_click` usam **obrigatoriamente**:

```text
offer_variant: essential_399
```

- `offer_variant` identifica a oferta a que o clique pertence.
- `portfolio_open`, `portfolio_view_change` e `faq_open` mantêm o formato compartilhado atual, **sem** `offer_variant`.
- **Não** enviar `form_id`, `cta_id`, `cta_text` nem `event_version` no rastreamento específico da rota essencial.
- Não alterar o rastreamento da rota `/landingpage`.
- Não existe `sticky-mobile` nesta rota (CTA fixo mobile proibido).
- Não existe `generate_lead` nem evento de conversão nesta rota.

### Localizações dos CTAs

| Seção | `cta_location` |
|---|---|
| Cabeçalho | `header` |
| Hero | `hero` |
| Projetos desenvolvidos | `portfolio` |
| Projetos desenvolvidos (rota essencial) | `pricing` |
| Investimento | `investment` |
| CTA final | `final` |
| CTA fixo mobile | `sticky-mobile` |

Cada CTA de WhatsApp possui os atributos:

```text
data-whatsapp-cta="true"
data-cta-location="[localização]"
```

### Projetos

| Projeto | `project_id` |
|---|---|
| Mecânica Auto Brum | `mecanica_auto_brum` |
| ZARQ Planejados | `zarq_planejados` |
| Agafarma Mário Quintana | `agafarma_mario_quintana` |
| BS Montagem de Móveis | `bs_montagem` |
| Artur Montador | `artur_montador` |

## 6. Catálogo de eventos

| Evento | Finalidade | Conversão |
|---|---|---|
| `cta_click` | Identificar o CTA acionado | Não |
| `whatsapp_click` | Medir clique no CTA de WhatsApp | Não |
| `portfolio_open` | Medir abertura de projeto | Não |
| `portfolio_view_change` | Medir troca mobile/desktop | Não |
| `faq_open` | Medir dúvida aberta | Não |

O evento antigo `whatsapp_after_lead` não deve ser usado. O formulário foi removido.

## 7. `cta_click`

### Disparo

Quando o visitante acionar um CTA comercial da página.

### Parâmetros

| Parâmetro | Tipo | Exemplo |
|---|---|---|
| `cta_id` | string | `hero_primary` |
| `cta_location` | string | `hero` |
| `cta_text` | string | `Quero minha Landing Page por R$ 997` |
| `form_id` | string | `landingpage_lead_form` |
| `offer_variant` | string | `essential_399` (somente rota essencial) |
| `event_version` | string | `1` |

> Rota essencial: `cta_click` envia `event`, `offer_variant: "essential_399"`, `cta_location` e `cta_label`. Não envia `form_id`, `cta_id`, `cta_text` nem `event_version`.

`cta_text` deve vir de uma lista fixa da interface. Não enviar texto digitado pelo visitante.

### Regras

- Não usar `preventDefault`.
- Não usar `event_callback`.
- Não usar `window.location` com atraso.
- O evento não pode bloquear ou atrasar a abertura do WhatsApp.
- Disparar no mesmo clique da navegação.
- Não é conversão.

## 8. `whatsapp_click`

### Disparo

Quando o visitante acionar um CTA que abre o WhatsApp (mesma ação de `cta_click`).

### Parâmetros

| Parâmetro | Tipo | Exemplo |
|---|---|---|
| `cta_location` | string | `hero` |
| `form_id` | string | `landingpage_lead_form` |
| `offer_variant` | string | `essential_399` (somente rota essencial) |
| `event_version` | string | `1` |

> Rota essencial: `whatsapp_click` envia `event`, `offer_variant: "essential_399"`, `cta_location` e `contact_method: "whatsapp"`. Não envia `form_id`, `cta_id`, `cta_text` nem `event_version`.

### Regras

- Disparar junto com `cta_click`, sem bloquear a navegação.
- Não é conversão.
- Não dispara Google Ads.
- Não dispara Meta `Lead`.
- Não dispara outro `generate_lead` (esse evento não existe mais).

### Sequência

```text
cta_click → whatsapp_click
```

## 9. `portfolio_open`

### Disparo

Quando um projeto for aberto no visualizador.

### Parâmetros

| Parâmetro | Tipo | Valores |
|---|---|---|
| `project_id` | string | lista oficial de projetos |
| `initial_view` | string | `mobile` |
| `event_version` | string | `1` |

A visualização inicial é sempre mobile, inclusive no desktop.

## 10. `portfolio_view_change`

### Disparo

Quando, no desktop, o visitante alternar entre as capturas mobile e desktop.

### Parâmetros

| Parâmetro | Tipo | Valores |
|---|---|---|
| `project_id` | string | lista oficial |
| `selected_view` | string | `mobile`, `desktop` |
| `event_version` | string | `1` |

Não disparar apenas por abrir o projeto. A abertura pertence a `portfolio_open`.

## 11. `faq_open`

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
faq_09
```

Não enviar a pergunta ou a resposta completa como parâmetro.

## 12. Sequências esperadas

### CTA acionado

```text
cta_click
whatsapp_click
```

A abertura do WhatsApp é direta. Não existe sequência intermediária de formulário.

### Abandono

Uma visita pode terminar sem nenhum clique. Abandono não é erro e não deve gerar evento específico na primeira versão.

## 13. Contrato do `dataLayer`

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
  cta_text: "Quero minha Landing Page por R$ 997",
  form_id: "landingpage_lead_form",
  event_version: "1"
});
```

Os exemplos não devem ser executados com identificadores fictícios em produção.

### Ausência do GTM

Se o GTM não estiver disponível:

- a página continua funcionando;
- os CTAs continuam abrindo o WhatsApp;
- nenhum erro deve aparecer para o visitante;
- o módulo de rastreamento deve falhar silenciosamente;
- a ausência deve ser registrada como pendência técnica.

## 14. Destino dos eventos

| Evento | GA4 | Google Ads | Meta Pixel |
|---|---|---:|---:|---:|
| `cta_click` | Sim | Não | Não |
| `whatsapp_click` | Sim | Não | Não |
| `portfolio_open` | Sim | Não | Não |
| `portfolio_view_change` | Sim | Não | Não |
| `faq_open` | Sim | Não | Não |

“Sim” está condicionado ao consentimento correspondente e à configuração correta.

Nenhum evento desta página deve ser configurado como conversão principal de Google Ads ou Meta.

## 15. Google Analytics 4

### Configuração

- Enviar os eventos da tabela ao GA4 quando autorizado.
- Não marcar eventos de interação como conversão.
- Não criar conversão a partir de `cta_click` ou `whatsapp_click`.

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

## 16. Google Ads

### Conversão

Não criar conversão no clique. A conversão de contratação acontece pela conversa do WhatsApp e não é disparada por eventos da página.

Não usar:

```text
cta_click
whatsapp_click
```

como conversão do Google Ads.

## 17. Meta Pixel

### Conversão

Não disparar Meta `Lead` a partir de cliques, interações ou eventos da página.

## 18. WhatsApp

### Mensagem pré-preenchida — rota `/landingpage`

Usar exatamente:

```text
Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?
```

### Mensagem pré-preenchida — rota `/landingpage-essencial`

Usar exatamente:

```text
Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.
```

A mensagem deve estar corretamente codificada na URL.

### Configuração

- Centralizar o número (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- Não repetir o número em diversas strings.
- Validar antes da publicação.
- Não renderizar link quebrado quando o número estiver ausente.
- Abrir de forma compatível com celular e desktop.
- Não usar `preventDefault`, `event_callback` ou `window.location` com atraso.

## 19. Origem e atribuição

Sem formulário, não existe armazenamento de origem no servidor.

Os parâmetros de campanha (UTMs, `gclid`, `fbclid` etc.) continuam sendo preservados pelo redirecionamento da rota `/` para `/landingpage` e pela navegação direta nas rotas `/landingpage` e `/landingpage-essencial`. A atribuição comercial é feita pelo atendimento externo.

Não enviar parâmetros de origem ou identificadores de campanha como dados pessoais ao `dataLayer`.

## 20. Privacidade

### Proibição absoluta

Nunca enviar ao `dataLayer`, GA4, Google Ads ou Meta:

- nome;
- telefone;
- texto do negócio;
- URL digitada;
- respostas;
- mensagens;
- consentimento individual associado à pessoa;
- qualquer outro dado pessoal.

Os CTAs de WhatsApp não adicionam nenhum dado pessoal à URL além da mensagem fixa pré-preenchida.

## 21. Consentimento

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

### Independência do WhatsApp

Mesmo com tudo recusado:

- a página carrega;
- os CTAs abrem o WhatsApp;
- os eventos podem deixar de ser enviados às plataformas quando o consentimento não autorizar;
- o contato comercial continua funcionando.

## 22. Configuração

### Variáveis públicas

IDs públicos podem utilizar o mecanismo existente do projeto.

Exemplos:

```text
NEXT_PUBLIC_GTM_ID
NEXT_PUBLIC_GA4_ID
NEXT_PUBLIC_META_PIXEL_ID
NEXT_PUBLIC_WHATSAPP_NUMBER
```

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

## 23. Validação obrigatória

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
- Confirmar um único `page_view`.

### CTAs e WhatsApp

- Testar todos os CTAs (header, hero, portfolio, pricing, investment, final, sticky-mobile).
- Confirmar que todos abrem diretamente o WhatsApp.
- Confirmar a mensagem pré-preenchida codificada na URL.
- Confirmar que o navegador não é bloqueado ou atrasado pelo rastreamento.
- Confirmar que `cta_click` e `whatsapp_click` disparam sem bloquear a navegação.
- Confirmar que o formulário e o modal antigos não aparecem mais.
- Confirmar ausência de scripts, imports, estados ou estilos órfãos do formulário removido.

### Microsoft Clarity

- Confirmar uma única tag no GTM e ausência de snippet no código.
- Confirmar que o banner não menciona "Microsoft Clarity".
- Confirmar que a tag respeita `analytics_storage`.
- Validar no painel do Clarity: mapas de calor, gravações de sessão e mascaramento.
- Confirmar ausência de PII no Clarity, no `dataLayer`, no console e na URL.

### Consentimento

Testar:

- antes da escolha;
- aceitar medição;
- recusar não essenciais;
- configuração personalizada;
- alteração posterior;
- retorno em nova visita;
- CTAs com consentimento negado.

### Privacidade

Inspecionar:

- `dataLayer`;
- console;
- aba de rede;
- URLs;
- payloads das tags;
- mensagens de erro.

Confirmar ausência de dados pessoais.

## 24. Critérios de aprovação

O rastreamento somente pode ser considerado concluído quando:

- o GTM está instalado uma única vez;
- a configuração de consentimento ocorre antes das tags;
- todos os eventos previstos foram testados;
- não existe conversão configurada no clique;
- `cta_click` e `whatsapp_click` disparam sem bloquear a navegação;
- todos os CTAs abrem o WhatsApp com a mensagem correta;
- o formulário e o modal antigos não existem mais;
- não existem scripts, imports, estados ou estilos órfãos do formulário removido;
- o WhatsApp continua funcionando sem consentimento de medição;
- o Clarity é instalado uma única vez pelo GTM, sem snippet no código e sem `NEXT_PUBLIC_CLARITY_PROJECT_ID`;
- dados pessoais não aparecem nas plataformas;
- a validação real do Clarity (mapas de calor, gravações e mascaramento) ocorreu no painel;
- ambientes de teste não poluem produção;
- pendências de contas e IDs são documentadas.

## 25. Fora do escopo

Não implementar nesta fase:

- Meta Conversions API;
- Google Ads Enhanced Conversions;
- rastreamento server-side;
- GTM Server;
- CRM não definido;
- conversão no clique;
- conversão na tentativa;
- valor econômico de lead;
- testes A/B;
- call tracking;
- gravação de sessão sem aprovação específica.

Esses itens podem ser adicionados posteriormente por escopo próprio.

## 26. Referências técnicas

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
