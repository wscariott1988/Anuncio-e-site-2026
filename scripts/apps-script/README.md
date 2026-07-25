# Google Apps Script — Recebimento de Leads

Este script recebe os dados do formulário de contato enviados pelo endpoint `/api/leads` do Next.js e escreve cada lead na aba `Leads` da planilha Google Sheets.

## Pré-requisitos

- Conta Google com acesso ao Google Apps Script.
- Planilha Google Sheets criada com a aba `Leads`.
- A aba `Leads` deve possuir exatamente as 24 colunas na ordem definida em `docs/LEADS.md`.

## Configuração

### 1. Criar o projeto no Apps Script

1. Acesse [script.google.com](https://script.google.com).
2. Clique em **Novo projeto**.
3. Renomeie o projeto para `AnuncioESite Leads`.
4. Substitua todo o conteúdo do arquivo `Code.gs` pelo código deste repositório (`scripts/apps-script/Code.gs`).

### 2. Configurar as Script Properties

1. No editor do Apps Script, vá em **Arquivo** → **Propriedades do projeto**.
2. Na aba **Propriedades do script**, adicione as seguintes propriedades:

| Propriedade | Descrição | Exemplo |
|---|---|---|
| `SHARED_SECRET` | Secret compartilhado com o servidor Next.js | `valor_gerado_fortemente` |
| `SPREADSHEET_ID` | ID da planilha Google Sheets | `1AbCdEfGhIjKlMnOpQrStUvWxYz...` |
| `SHEET_NAME` | Nome da aba (opcional, padrão: `Leads`) | `Leads` |

> **Nunca** compartilhe o `SHARED_SECRET`. Ele deve ser o mesmo valor configurado em `GOOGLE_APPS_SCRIPT_SECRET` no servidor Next.js.

### 3. Implantar o script

1. Clique em **Implantar** → **Nova implantação**.
2. Selecione o tipo: **Aplicativo da Web**.
3. Execute como: **Eu** (sua conta Google).
4. Quem tem acesso: **Qualquer pessoa** (o acesso é protegido pelo secret).
5. Clique em **Implantar** e copie a **URL do aplicativo da Web**.
6. A URL será algo como:
   ```
   https://script.google.com/macros/s/ABCdefGHIjklMNO/exec
   ```
7. Configure essa URL em `GOOGLE_APPS_SCRIPT_WEB_APP_URL` no servidor Next.js.

### 4. Verificar a planilha

Certifique-se de que a aba `Leads` possui exatamente estas 24 colunas na primeira linha, nesta ordem:

```
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

## Fluxo

```
Browser → POST /api/leads (Next.js) → POST Google Apps Script → Google Sheets
```

1. O visitante preenche o formulário na Landing Page.
2. O endpoint `/api/leads` valida e normaliza os dados.
3. O servidor envia um JSON com `secret` + dados do lead ao Apps Script.
4. O Apps Script valida o secret, verifica idempotência por `lead_id` e escreve na planilha.
5. O Apps Script retorna `{"ok":true,"status":"created","lead_id":"..."}` ou `{"ok":true,"status":"duplicate","lead_id":"..."}`.
6. O servidor retorna a confirmação ao navegador.

## Respostas do Apps Script

| Resposta | Significado |
|---|---|
| `{"ok":true,"status":"created","lead_id":"..."}` | Lead gravado com sucesso |
| `{"ok":true,"status":"duplicate","lead_id":"..."}` | Lead já existia (idempotente) |
| `{"ok":false,"status":"error","code":"UNAUTHORIZED"}` | Secret inválido |
| `{"ok":false,"status":"error","code":"MISSING_BODY"}` | Corpo da requisição ausente |
| `{"ok":false,"status":"error","code":"INVALID_JSON"}` | JSON malformado |
| `{"ok":false,"status":"error","code":"MISSING_LEAD_ID"}` | lead_id ausente |
| `{"ok":false,"status":"error","code":"SHEET_NOT_FOUND"}` | Aba não encontrada |
| `{"ok":false,"status":"error","code":"INVALID_HEADERS"}` | Cabeçalhos da aba divergem |
| `{"ok":false,"status":"error","code":"SERVER_MISCONFIGURED"}` | Propriedades ausentes |
| `{"ok":false,"status":"error","code":"INTERNAL_ERROR"}` | Erro interno |

## Segurança

- O `SHARED_SECRET` é verificado antes de qualquer processamento.
- O secret é removido do payload imediatamente após a verificação.
- O secret nunca é gravado, retornado ou registrado em logs.
- Utiliza `LockService` para evitar escrita concorrente.
- Não expõe dados pessoais (PII) nas respostas ou logs.
- Não inclui `Content-Disposition` ou detalhes de erro interno nas respostas.

## Desenvolvimento local

Para testes locais, você pode usar o [Apps Script local](https://github.com/nicereply/apps-script-local) ou simular o comportamento com mocks nos testes E2E do Next.js.

## Atualizações

Ao atualizar o `Code.gs`:

1. Copie o novo código para o editor do Apps Script.
2. Clique em **Salvar**.
3. A implantação existente continua ativa (não é necessário reimplantar para alterações no código, apenas para alterações de access).
