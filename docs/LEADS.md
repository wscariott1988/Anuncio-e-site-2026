# Leads — armazenamento e Google Sheets

> ## ⛔ SUSPENSO
>
> A partir da decisão do proprietário em 05/08/2026, o fluxo de captação da rota `/landingpage` **não utiliza mais formulário nem armazenamento de leads no Google Sheets**.
>
> - O endpoint `/api/leads` foi removido.
> - O componente `LeadFormModal` foi removido.
> - O WhatsApp é o único caminho inicial de contato, com mensagem pré-preenchida.
> - O briefing completo é enviado somente depois da contratação.
> - Este documento permanece como referência histórica da arquitetura antiga e não deve ser usado como fonte ativa.
> - Se o formulário voltar a ser implementado, este documento deve ser revisado e reativado antes.

> ## 0. Registro da suspensão
>
> Status: **suspenso em 05/08/2026** por decisão explícita do proprietário (Willian Souza).
> Motivo: redução de atrito entre a chegada do visitante e o início da conversa pelo WhatsApp.
> Reativar somente mediante nova solicitação explícita.

> Fonte oficial para o formulário da rota `/landingpage`, o armazenamento dos leads via Google Apps Script e o Google Sheets como armazenamento único e definitivo.

## 1. Objetivo

Garantir que cada lead confirmado seja armazenado de forma durável e auditável no Google Sheets, com confirmação antes de apresentar sucesso ao visitante.

O formulário deve:

1. receber os dados no servidor Next.js;
2. validar e normalizar os campos;
3. impedir duplicidade;
4. enviar os dados ao Google Apps Script;
5. receber confirmação com `lead_id`;
6. devolver a confirmação ao visitante;
7. permitir continuidade pelo WhatsApp após o sucesso.

O Google Sheets é o armazenamento único e definitivo dos leads. O Google Apps Script é a camada de integração que recebe, valida e escreve na planilha.

## 2. Fonte de verdade

Este documento é a única fonte oficial para:

- arquitetura de captação;
- esquema das colunas da planilha;
- nomes técnicos dos campos;
- normalização dos dados;
- integração via Google Apps Script;
- idempotência;
- tentativas de recuperação;
- regras dos campos comerciais;
- privacidade do registro do lead.

Os demais documentos devem referenciar este arquivo e não criar uma segunda lista de colunas.

Em caso de conflito:

1. uma solicitação atual e explícita de Willian Souza prevalece;
2. este documento governa armazenamento e planilha;
3. `CONTENT.md` governa a copy apresentada ao visitante;
4. `LANDINGPAGE.md` governa comportamento e experiência;
5. `TRACKING.md` governa eventos e plataformas de medição.

## 3. Arquitetura oficial

```text
Formulário em /landingpage
        ↓
Endpoint do servidor Next.js (/api/leads)
        ↓
Validação + normalização + geração de lead_id
        ↓
Envio ao Google Apps Script (web app)
        ↓
Apps Script valida e escreve na aba Leads
        ↓
Confirmação do Apps Script com lead_id
        ↓
Resposta de sucesso ao visitante
        ├── generate_lead
        ├── tela de sucesso
        └── Continuar no WhatsApp
```

### Regra central

O armazenamento confirmado no Google Sheets determina o sucesso do formulário.

Uma falha do Apps Script ou do Sheets:

- não pode perder o lead (o servidor retém os dados e permite nova tentativa);
- não pode criar outro lead com o mesmo `lead_id`;
- deve preservar as respostas do visitante;
- deve permitir nova tentativa sem preenchimento duplicado;
- deve gerar registro técnico para recuperação.

### Google Apps Script como camada de integração

O Google Apps Script é um web app implantado no projeto Google do proprietário. Ele:

- recebe POST com os dados normalizados e o `lead_id`;
- valida o secret compartilhado;
- valida o esquema das colunas;
- verifica se o `lead_id` já existe na aba (idempotência);
- escreve uma linha na aba `Leads`;
- retorna JSON com `success`, `lead_id` e `row`;
- utiliza LockService para evitar concorrência;
- não expõe dados pessoais em logs;
- versiona o código no repositório em `scripts/apps-script/`.

## 4. Google Sheets

### Planilha

Nome operacional:

```text
Leads — Anúncio & Site
```

### Aba

Nome exato:

```text
Leads
```

Não renomear a aba sem atualizar e testar a integração.

### Finalidade

O Google Sheets é o armazenamento único e definitivo dos leads. Ele é usado para:

- armazenar cada lead confirmado;
- visualizar novos leads;
- iniciar o atendimento;
- registrar o andamento comercial;
- registrar observações;
- consultar a origem do contato.

### Configuração operacional

- congelar a primeira linha;
- ativar filtro;
- criar lista suspensa em `status_atendimento`;
- deixar `observacoes` como texto livre;
- proteger a linha de cabeçalho;
- não ordenar somente parte do intervalo;
- não excluir linhas para corrigir atendimento;
- não reutilizar uma linha para outro lead.

Podem permanecer visíveis:

```text
created_at
nome
whatsapp
negocio_servico
situacao_anuncios
possui_site_landingpage
url_atual
lead_source
status_atendimento
observacoes
```

As demais colunas podem ser ocultadas na interface do Google Sheets, mas não excluídas.

## 5. Esquema oficial da planilha

A primeira linha da aba `Leads` deve possuir exatamente estas 24 colunas, nesta ordem:

```text
created_at
lead_id
nome
whatsapp
negocio_servico
situacao_anuncios
possui_site_landingpage
url_atual
consentimento_em
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
status_atendimento
observacoes
```

### Regra de estabilidade

- Não alterar nomes.
- Não alterar a ordem.
- Não duplicar cabeçalhos.
- Não adicionar uma segunda linha de título.
- Não inserir colunas entre as 24 colunas oficiais.
- Uma nova coluna exige decisão explícita e atualização deste documento.

Colunas adicionais exclusivamente manuais, caso aprovadas no futuro, devem ficar depois de `observacoes`.

## 6. Dicionário dos campos

| Coluna | Origem | Obrigatória | Regra |
|---|---|---:|---|
| `created_at` | servidor | Sim | Data e hora de criação confirmada do lead |
| `lead_id` | servidor | Sim | Identificador único, opaco e não derivado de PII |
| `nome` | formulário | Sim | Nome informado pelo visitante |
| `whatsapp` | formulário | Sim | Número brasileiro válido, normalizado |
| `negocio_servico` | formulário | Sim | Descrição curta do negócio ou serviço |
| `situacao_anuncios` | formulário | Sim | Uma das opções oficiais de `CONTENT.md` |
| `possui_site_landingpage` | formulário | Sim | `Sim` ou `Não` |
| `url_atual` | formulário | Não | URL válida quando preenchida |
| `consentimento_em` | servidor | Sim | Data e hora da concordância com a Política de Privacidade |
| `lead_source` | servidor | Sim | Origem normalizada |
| `source_cta` | interface | Sim | CTA que iniciou o preenchimento |
| `utm_source` | entrada | Não | Valor permitido capturado na primeira entrada |
| `utm_medium` | entrada | Não | Valor permitido capturado na primeira entrada |
| `utm_campaign` | entrada | Não | Valor permitido capturado na primeira entrada |
| `utm_term` | entrada | Não | Valor permitido capturado na primeira entrada |
| `utm_content` | entrada | Não | Valor permitido capturado na primeira entrada |
| `gclid` | entrada | Não | Identificador do Google quando presente |
| `gbraid` | entrada | Não | Identificador do Google quando presente |
| `wbraid` | entrada | Não | Identificador do Google quando presente |
| `fbclid` | entrada | Não | Identificador da Meta quando presente |
| `entry_path` | entrada | Sim | Caminho inicial permitido, sem dados pessoais |
| `referrer_hostname` | entrada | Não | Somente hostname da referência |
| `status_atendimento` | sistema/Willian | Sim | Inicia como `Novo` |
| `observacoes` | Willian | Não | Inicia vazio e é preenchido manualmente |

## 7. Campos do formulário

Os campos apresentados ao visitante permanecem definidos em `CONTENT.md` e `LANDINGPAGE.md`:

1. Nome.
2. WhatsApp.
3. Negócio ou serviço.
4. Situação atual dos anúncios.
5. Possui site ou Landing Page.
6. URL atual, opcional e condicional.
7. Consentimento com a Política de Privacidade.

A revisão das respostas é uma etapa de interface, não uma coluna da planilha.

O visitante não preenche:

- identificadores;
- UTMs;
- dados de clique;
- origem normalizada;
- CTA de origem;
- datas do servidor;
- status de atendimento;
- observações.

## 8. Valores controlados

### `situacao_anuncios`

Valores oficiais:

```text
Já anuncio no Google Ads
Já anuncio no Meta Ads
Já anuncio nos dois
Ainda não anuncio, mas pretendo começar
```

Não inventar abreviações diferentes entre formulário e planilha.

### `possui_site_landingpage`

Valores:

```text
Sim
Não
```

### `status_atendimento`

Valor inicial:

```text
Novo
```

Valores permitidos na planilha:

```text
Novo
Contato iniciado
Qualificado
Proposta enviada
Contratado
Perdido
```

Na primeira versão, `status_atendimento` e `observacoes` são mantidos manualmente no Google Sheets. Não implementar sincronização bidirecional sem solicitação explícita.

### `source_cta`

Valores permitidos:

```text
header
hero
included
portfolio
about
pricing
final
```

### `lead_source`

Valores permitidos:

```text
google
meta
direct
referral
other
```

Normalização:

| Condição | `lead_source` |
|---|---|
| `gclid`, `gbraid`, `wbraid` ou `utm_source=google` | `google` |
| `fbclid` ou origem Meta aprovada | `meta` |
| referência externa sem campanha | `referral` |
| sem referência ou campanha | `direct` |
| demais origens | `other` |

Não inventar valores para parâmetros ausentes.

## 9. Normalização

### Datas

- armazenar `created_at` e `consentimento_em` em formato compatível com `America/Sao_Paulo`;
- gerar datas no servidor, não depender do relógio do navegador;
- enviar ao Apps Script como string ISO 8601.

### WhatsApp

- aceitar número brasileiro com DDD;
- validar novamente no servidor;
- normalizar com código do país;
- preservar como texto;
- não usar o telefone para criar `lead_id`.

### Textos livres

- remover espaços excedentes;
- aplicar limites de tamanho;
- rejeitar conteúdo inválido;
- impedir interpretação como fórmula na planilha;
- enviar valores ao Apps Script como dados brutos;
- não executar conteúdo informado pelo visitante.

### URL

- é opcional;
- só deve ser validada quando preenchida;
- deve aceitar `http` ou `https`;
- não deve ser enviada a analytics;
- não deve ser incluída em mensagens de erro públicas.

### Parâmetros de origem

- usar lista permitida;
- aplicar limite de tamanho;
- sanitizar;
- descartar parâmetros desconhecidos;
- não armazenar a URL inteira quando os campos permitidos forem suficientes;
- não substituir um valor válido por string vazia.

### Referência

Em `referrer_hostname`, armazenar apenas o hostname permitido.

Não armazenar query string, caminho sensível ou dados pessoais provenientes da referência.

## 10. Privacidade e consentimento

`consentimento_em` registra a concordância com a Política de Privacidade necessária para analisar a solicitação e entrar em contato.

Esse campo:

- não substitui o consentimento de medição;
- não deve ser enviado ao `dataLayer`;
- não deve ser enviado ao GA4;
- não deve ser enviado ao Google Ads;
- não deve ser enviado ao Meta Pixel;
- não deve aparecer em URL;
- não deve ser derivado do consentimento de cookies.

O formulário deve funcionar mesmo quando o visitante recusar tecnologias de medição não essenciais.

## 11. Idempotência

Antes da primeira requisição válida, o cliente deve gerar uma chave aleatória de idempotência.

O servidor deve:

- validar a chave;
- reutilizar o mesmo registro em uma repetição segura;
- impedir duplicidade por duplo clique;
- impedir duplicidade por timeout;
- impedir duplicidade em nova tentativa do mesmo envio;
- devolver o mesmo `lead_id` quando o envio já tiver sido confirmado.

`lead_id`:

- é criado no servidor;
- é único;
- é opaco;
- não contém nome;
- não contém WhatsApp;
- pode ser usado para deduplicação de conversão;
- é a chave de reconciliação com a planilha.

### Verificação no Apps Script

Antes de escrever, o Apps Script verifica se o `lead_id` já existe na aba `Leads`. Se existir:

- retorna a confirmação existente;
- não insere nova linha;
- preserva a integridade da idempotência.

## 12. Integração via Google Apps Script

### Método

O servidor Next.js envia os dados normalizados para o endpoint do Google Apps Script via `fetch` com método POST.

Não usar:

- chamada direta do navegador para o Apps Script;
- credenciais no cliente;
- segredo com prefixo `NEXT_PUBLIC_`;
- automação que considere sucesso sem verificar a resposta do Apps Script.

### Payload enviado pelo servidor

O servidor envia ao Apps Script um JSON com:

- `secret`: valor de `GOOGLE_APPS_SCRIPT_SECRET` para autenticação;
- `lead_id`: identificador único gerado no servidor;
- `created_at`: data/hora ISO 8601;
- os 24 campos da planilha, na ordem exata.

### Resposta do Apps Script

O Apps Script retorna JSON:

```json
{
  "success": true,
  "lead_id": "abc123",
  "row": 15
}
```

Em caso de erro:

```json
{
  "success": false,
  "error": "descrição técnica"
}
```

### Escrita na planilha

- usar a aba `Leads`;
- respeitar exatamente o esquema das 24 colunas;
- gravar uma linha por `lead_id`;
- escrever valores como dados, não como fórmulas;
- manter vazios os campos opcionais ausentes;
- iniciar `status_atendimento` como `Novo`;
- iniciar `observacoes` vazio.

### Segurança do Apps Script

- validar o `secret` recebido antes de qualquer operação;
- rejeitar requisições sem `secret` válido;
- não registrar dados pessoais em logs do Apps Script;
- utilizar LockService para evitar escrita concorrente;
- retornar apenas informações técnicas necessárias;
- não expor a estrutura interna da planilha em mensagens de erro.

### Tentativas

Em erro temporário do Apps Script:

- o servidor deve retry com espera progressiva;
- respeitar limites de taxa do Google;
- não bloquear a resposta ao visitante além do razoável;
- registrar somente informações técnicas necessárias;
- não registrar dados pessoais no erro.

Em falha persistente:

- o servidor deve retornar erro ao visitante;
- preservar as respostas do formulário;
- permitir nova tentativa;
- não pedir ao visitante para preencher novamente;
- gerar registro técnico para análise.

## 13. Notificação

A notificação serve para avisar Willian sobre um lead novo. Ela não é o armazenamento.

Uma falha de notificação:

- não apaga o lead;
- não altera `generate_lead`;
- não cria outro registro;
- deve ser registrada para recuperação.

O canal de notificação deve ser confirmado antes da publicação.

## 14. Relação com o sucesso do formulário

### Sucesso

O servidor pode responder sucesso quando:

1. os dados foram validados;
2. a idempotência foi confirmada;
3. o Apps Script confirmou a escrita no Google Sheets;
4. existe um `lead_id`.

Depois:

- disparar `generate_lead` uma única vez;
- mostrar a tela de sucesso;
- oferecer "Continuar no WhatsApp".

### Falha do Apps Script ou do Sheets

Se o Apps Script não confirmou a escrita:

- não responder sucesso;
- não disparar `generate_lead`;
- preservar respostas;
- oferecer nova tentativa;
- usar a contingência definida em `LANDINGPAGE.md` somente após tentativa válida com falha técnica.

## 15. Operação da planilha

Para facilitar o atendimento:

- congelar a primeira linha;
- ativar filtro;
- criar lista suspensa em `status_atendimento`;
- deixar `observacoes` como texto livre;
- proteger a linha de cabeçalho;
- não ordenar somente parte do intervalo;
- não excluir linhas para corrigir atendimento;
- não reutilizar uma linha para outro lead.

Podem permanecer visíveis:

```text
created_at
nome
whatsapp
negocio_servico
situacao_anuncios
possui_site_landingpage
url_atual
lead_source
status_atendimento
observacoes
```

As demais colunas podem ser ocultadas na interface do Google Sheets, mas não excluídas.

## 16. Segurança

- Compartilhar a planilha apenas com contas necessárias.
- Manter o Apps Script com acesso restrito.
- Não compartilhar secret do Apps Script.
- Não versionar credenciais.
- Não colocar segredos em `NEXT_PUBLIC_*`.
- Não registrar o corpo completo do formulário em logs.
- Não enviar PII para analytics.
- Aplicar rate limit no endpoint `/api/leads`.
- Aplicar honeypot ou proteção equivalente.
- Usar HTTPS.
- Validar origem quando aplicável.
- Definir política de retenção.

## 17. Variáveis de ambiente

### Servidor Next.js (variáveis exclusivamente servidor)

```dotenv
GOOGLE_APPS_SCRIPT_WEB_APP_URL=
GOOGLE_APPS_SCRIPT_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

- `GOOGLE_APPS_SCRIPT_WEB_APP_URL`: endpoint do Google Apps Script web app para envio dos leads.
- `GOOGLE_APPS_SCRIPT_SECRET`: secret compartilhado entre o servidor e o Apps Script para autenticação. Nunca expor no cliente.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: número do WhatsApp em formato `55DDDNUMERO`. Pode ser usada no cliente.

### Google Apps Script

O Apps Script não utiliza variáveis de ambiente do Next.js. O `secret` é verificado contra valor fixo definido no próprio script.

### Regras

- Não preencher `.env.example` com valores reais.
- Não usar prefixo `NEXT_PUBLIC_` em segredos.
- `GOOGLE_APPS_SCRIPT_SECRET` é exclusivamente servidor.
- `GOOGLE_APPS_SCRIPT_WEB_APP_URL` é exclusivamente servidor.

## 18. Testes obrigatórios

### Armazenamento

- envio válido cria uma linha no Google Sheets;
- resposta contém `lead_id`;
- campos obrigatórios chegam corretamente;
- campos opcionais ausentes permanecem vazios;
- datas são geradas pelo servidor;
- `status_atendimento` inicia como `Novo`;
- `observacoes` inicia vazio.

### Idempotência

- duplo clique cria um lead;
- timeout e nova tentativa retornam o mesmo lead;
- recarregar não cria outro lead;
- reabrir o modal após sucesso não cria outro lead.

### Google Sheets

- uma linha contém exatamente 24 colunas;
- a ordem corresponde a este documento;
- o `lead_id` não duplica;
- UTMs presentes são preservadas;
- UTMs ausentes não são inventadas;
- origem normalizada está correta;
- valores livres não viram fórmulas;
- campos manuais não são sobrescritos;
- falha temporária é recuperada;
- falha persistente gera registro técnico.

### Conversão

- `generate_lead` dispara após a confirmação do Apps Script;
- dispara uma única vez;
- falha do Apps Script não gera conversão;
- WhatsApp não gera outro lead.

### Privacidade

- PII não aparece no `dataLayer`;
- PII não aparece no console;
- PII não aparece na URL;
- o formulário funciona sem consentimento de medição;
- o consentimento do formulário não é confundido com cookies.

## 19. Dependências antes da implementação

Confirmar:

- projeto Google com Apps Script implantado;
- endpoint do Apps Script web app;
- secret do Apps Script definido e testado;
- planilha `Leads — Anúncio & Site` criada;
- aba `Leads` com as 24 colunas oficiais;
- Apps Script com acesso de edição na planilha;
- LockService habilitado no Apps Script;
- canal de notificação;
- número oficial do WhatsApp;
- Política de Privacidade aprovada.

## 20. Critério de conclusão

A captação de leads somente está concluída quando:

- um lead real foi armazenado no Google Sheets via Apps Script;
- o mesmo `lead_id` chegou uma única vez à planilha;
- a linha respeita as 24 colunas;
- uma falha do Apps Script foi simulada e não perdeu o lead;
- o reprocessamento foi validado;
- Willian recebeu a notificação configurada;
- `generate_lead` disparou uma única vez;
- o WhatsApp apareceu somente depois do sucesso;
- nenhuma PII chegou às plataformas de medição;
- os testes foram executados no ambiente real de produção.
