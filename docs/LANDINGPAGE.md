# Especificação funcional — `/landingpage`

> Status: aprovada para implementação após o preenchimento das dependências de publicação
> Marca: Anúncio & Site
> Responsável: Willian Souza
> Copy oficial: `docs/CONTENT.md`
> Sistema visual: `docs/DESIGN.md`
> Eventos: `docs/TRACKING.md`
> Critérios de conclusão: `docs/CHECKLIST.md`

## 1. Regra de autoridade

Este arquivo define como a Landing Page deve funcionar.

* `CONTENT.md` define todos os textos visíveis.
* `DESIGN.md` define a direção visual.
* `TRACKING.md` define eventos e conversões.
* `CHECKLIST.md` define os critérios de conclusão.

Não reescrever a copy durante a implementação.

Quando existir conflito:

1. seguir a solicitação atual e explícita do proprietário;
2. seguir `AGENTS.md`;
3. preservar a copy de `CONTENT.md`;
4. aplicar o comportamento descrito neste arquivo;
5. consultar os demais documentos.

## 2. Objetivo

A rota `/landingpage` deve converter visitantes interessados na criação de uma Landing Page para tráfego pago em contatos comerciais qualificados.

### Conversão principal

Envio do formulário confirmado pelo servidor e armazenado com sucesso.

Evento:

```text
generate_lead
```

### Continuidade comercial

Depois do envio confirmado, o interessado poderá continuar a conversa pelo WhatsApp.

O clique no WhatsApp após o envio:

* não cria um novo lead;
* não substitui o formulário;
* não deve disparar `generate_lead`;
* deve seguir o evento definido em `TRACKING.md`.

### Prioridade

Qualificação é mais importante que volume bruto de contatos.

A página não deve oferecer um atalho direto para o WhatsApp antes do formulário.

## 3. Público

A página é direcionada principalmente a:

* prestadores de serviços;
* profissionais liberais;
* negócios locais;
* proprietários e decisores;
* empresas que já anunciam;
* empresas que decidiram começar a anunciar;
* pessoas que procuram um serviço pronto.

A página não é direcionada a quem procura:

* curso;
* treinamento;
* template;
* ferramenta automática;
* construtor de páginas;
* programação;
* solução gratuita.

Não exigir que o visitante já esteja anunciando. Ele pode contratar a Landing Page antes de iniciar a campanha, desde que possua uma oferta e intenção real de anunciar.

## 4. Oferta e condição comercial

### Escopo padrão

* Estratégia e estrutura.
* Copy.
* Design responsivo.
* Desenvolvimento em Next.js.
* Formulário de qualificação.
* Continuidade pelo WhatsApp após o envio.
* Configuração de rastreamento.
* Publicação.
* Testes.
* Até duas rodadas de ajustes.

### Investimento

Valor total:

```text
R$ 997
```

Forma de pagamento:

* R$ 498,50 na contratação;
* R$ 498,50 depois que a Landing Page estiver publicada e funcionando.

### Prazo

Até 7 dias úteis, contados somente após:

* confirmação do pagamento inicial;
* briefing completo;
* recebimento das informações necessárias;
* recebimento dos materiais necessários.

O prazo fica pausado quando uma informação, acesso ou material indispensável estiver pendente.

### Custos externos

Domínio, hospedagem, serviços de formulário e ferramentas de terceiros não estão incluídos automaticamente no valor de R$ 997.

As contas utilizadas, custos, renovações e responsabilidades devem ser definidos na proposta antes da contratação.

### Proibições comerciais

Não apresentar:

* preço anterior;
* preço riscado;
* desconto;
* condição de lançamento;
* cronômetro;
* vagas fictícias;
* urgência artificial;
* parcelamento não aprovado;
* garantia de vendas, leads ou retorno.

## 5. Rota e isolamento

### Rota oficial

```text
/landingpage
```

Não criar:

```text
/landingpge
```

### Redirect temporário da raiz

A rota `/` redireciona temporariamente para `/landingpage` enquanto a homepage institucional não existe.

Regras:

- o redirecionamento usa `redirect()` do Next.js sem duplicar conteúdo;
- parâmetros de campanha (UTMs, gclid, fbclid etc.) são preservados;
- o redirecionamento será removido quando a homepage for criada;
- `/landingpage` continua sendo a rota oficial;
- a canonical permanece `https://www.anuncioesite.com.br/landingpage`.

### Regras

* Não alterar a homepage (exceto o redirect temporário documentado acima).
* Não transformar a Landing Page em homepage.
* Não adicionar menu institucional.
* Não incentivar exploração de outras páginas.
* Não criar novas rotas comerciais sem aprovação.
* Não adicionar links externos para os projetos apresentados.

## 6. Arquitetura da página

A ordem obrigatória é:

1. Cabeçalho.
2. Hero.
3. Faixa de clareza.
4. Problema e solução.
5. O que está incluído.
6. Projetos desenvolvidos.
7. Como funciona.
8. Quem é Willian Souza.
9. Investimento.
10. Perguntas frequentes.
11. CTA final.
12. Rodapé.

O formulário existe como modal e não como uma seção aberta dentro da página.

Não criar seção de depoimentos, avaliações, logotipos ou resultados sem dados reais e autorização.

Não reintroduzir parágrafos, cards, etapas, FAQs ou CTAs removidos da versão enxuta de `CONTENT.md`.

Não criar uma segunda explicação para uma ideia já apresentada em outra seção.

## 7. Cabeçalho

O cabeçalho deve conter apenas:

* identificação ou logotipo da Anúncio & Site;
* CTA “Quero minha Landing Page”.

### Comportamento

* A identificação leva ao topo da própria página.
* O CTA abre o formulário modal.
* O cabeçalho não precisa ser fixo na primeira versão.

### Não incluir

* menu;
* homepage destacada;
* Instagram;
* blog;
* telefone;
* WhatsApp;
* portfólio externo;
* barra promocional;
* seletor de idioma.

## 8. Hero

O hero deve permitir a compreensão imediata de:

* qual serviço está sendo vendido;
* para qual finalidade;
* quem executa;
* quanto custa;
* qual é o próximo passo.

### Elementos

* etiqueta;
* uma única `h1`;
* subheadline;
* investimento;
* prazo;
* quantidade de rodadas de ajustes;
* CTA principal;
* microcopy;
* composição visual de Landing Page em desktop e celular.

### Comportamento

* O CTA abre o formulário modal.
* Texto e CTA aparecem antes do mockup no celular.
* O conteúdo principal deve existir no HTML inicial.
* Nenhuma animação pode ser necessária para compreender a oferta.

### Composição visual

A composição deve:

* usar as capturas reais desktop e mobile da ZARQ Planejados;
* representar a versão desktop em moldura de navegador;
* representar a versão mobile em moldura de celular;
* exibir uma coluna até 1.023 px e duas colunas a partir de 1.024 px;
* mostrar somente a moldura de celular nos menores viewports, quando necessário;
* usar `zarqplanejados.com.br` como endereço visual não interativo;
* manter boa legibilidade;
* possuir dimensões definidas;
* carregar somente os recortes necessários para a hero;
* evitar métricas, avaliações ou resultados fictícios;
* não criar link para a página externa.

Não publicar placeholder, dashboard falso ou marca inventada como se fosse projeto real.

## 9. Faixa de clareza

Usar integralmente a copy de `CONTENT.md`.

A seção deve impedir que o visitante confunda a oferta com:

* curso;
* template;
* ferramenta;
* software;
* assinatura.

Deve ser curta e visualmente separada do hero.

## 10. Problema e solução

Usar integralmente a copy de `CONTENT.md`.

Apresentar os três pontos:

* mensagem alinhada;
* foco em uma ação;
* contato e medição.

Não afirmar que:

* a página atual do visitante desperdiça dinheiro;
* a Landing Page é responsável por todo resultado;
* trocar a página garante campanha lucrativa.

Não criar outra seção para repetir o problema, a jornada ou a solução.

## 11. O que está incluído

Usar os seis itens de `CONTENT.md`:

1. Estratégia e copy.
2. Design responsivo.
3. Desenvolvimento em Next.js.
4. Formulário e WhatsApp.
5. Configuração de rastreamento.
6. Publicação e testes.

A seção pode usar composição Bento Box conforme `DESIGN.md`.

### Regras

* Não inventar serviços adicionais.
* Não separar formulário e WhatsApp como caminhos concorrentes.
* Explicar que o WhatsApp aparece como continuidade após o formulário.
* Condicionar o rastreamento ao fornecimento dos acessos necessários.
* Informar as duas rodadas de ajustes.
* Não incluir CTA nesta seção.

### Layout responsivo

* **Mobile** (`<768px`): painel compacto vertical com `divide-y` mostrando as 6 linhas (título + descrição).
* **Tablet** (`768–1023px`): grid de 2 colunas × 3 linhas.
* **Desktop** (`≥1024px`): grid uniforme de 3 colunas × 2 linhas, todos os cartões com a mesma largura e alinhados pelo topo.

## 12. Projetos desenvolvidos

### Objetivo

Apresentar projetos reais sem retirar o visitante da Landing Page da Anúncio & Site.

Nenhum projeto deve possuir link para a página externa.

### Projetos iniciais

| ID                        | Nome                    | Segmento                  | Slug                      |
| ------------------------- | ----------------------- | ------------------------- | ------------------------- |
| `mecanica_auto_brum`      | Mecânica Auto Brum      | Socorro mecânico 24 horas | `mecanica-auto-brum`      |
| `zarq_planejados`         | ZARQ Planejados         | Móveis planejados         | `zarq-planejados`         |
| `agafarma_mario_quintana` | Agafarma Mário Quintana | Farmácia local            | `agafarma-mario-quintana` |
| `bs_montagem`             | BS Montagem de Móveis   | Montagem de móveis        | `bs-montagem`             |
| `artur_montador`          | Artur Montador          | Montagem de móveis        | `artur-montador`          |

Os títulos e as descrições devem ser lidos de `CONTENT.md`.

### Cards

Cada projeto deve possuir:

* capa otimizada;
* nome;
* segmento;
* descrição curta;
* ação "Ver projeto por dentro".

O card deve possuir uma única área interativa válida, sem botão aninhado dentro de outro botão.

A capa deve ser um recorte representativo, não a captura completa reduzida até ficar ilegível.

### Layout responsivo

* **Mobile** (`<768px`): faixa horizontal com `scroll-snap`, cards com `min-w-[85%]`, sem autoplay. Preservar imagem inteira sem corte. CTA abaixo do carrossel.
* **Tablet** (`768–1023px`): grid de 2 colunas. O quinto projeto pode ficar centralizado na última linha se necessário.
* **Desktop** (`≥1024px`): grid de 6 colunas. Cada projeto ocupa 2 colunas. Projetos 1–3 ocupam a primeira linha (colunas 1–2, 3–4, 5–6). Projetos 4–5 ocupam a segunda linha centralizados (colunas 2–3 e 4–5). Os cinco cartões possuem a mesma largura. CTA e microcopy centralizados horizontalmente após o grid, com largura da microcopy limitada a ~580px.

### Visualizador no celular

* Abrir como modal praticamente em tela cheia.
* Exibir somente a captura mobile.
* Não carregar a captura desktop.
* Permitir rolagem vertical por toda a captura.
* Manter o fechamento acessível.

### Visualizador no desktop

* Abrir como modal amplo.
* Iniciar pela versão mobile em moldura de celular.
* Exibir controle “Celular” e “Desktop”.
* Carregar a captura desktop somente quando selecionada.
* Mostrar a versão desktop em moldura de navegador.
* Permitir rolagem vertical por toda a captura.

### Comportamento do visualizador

* Carregar uma captura completa somente ao abrir o projeto.
* Não carregar antecipadamente as dez capturas.
* Ao trocar de projeto, voltar para a visualização mobile.
* Ao fechar e reabrir, iniciar pela versão mobile.
* Bloquear a rolagem da página ao fundo.
* Fechar pelo botão, tecla `Esc` ou clique fora do conteúdo.
* Manter o foco dentro do modal.
* Devolver o foco ao elemento que abriu o modal.
* Respeitar `prefers-reduced-motion`.
* Exibir estado de carregamento.
* Exibir mensagem de erro se a imagem falhar.

### Arquivos originais

Os PNGs devem permanecer fora da área pública:

```text
/originals/portfolio/
```

Nomes esperados:

```text
mecanica-auto-brum-mobile.png
mecanica-auto-brum-desktop.png
zarq-planejados-mobile.png
zarq-planejados-desktop.png
agafarma-mario-quintana-mobile.png
agafarma-mario-quintana-desktop.png
bs-montagem-mobile.png
bs-montagem-desktop.png
artur-montador-mobile.png
artur-montador-desktop.png
```

A pasta `/originals` deve constar no `.gitignore`.

### Arquivos públicos

Criar:

```text
/public/images/portfolio/
```

Para cada projeto:

```text
[slug]-cover.webp
[slug]-mobile.webp
[slug]-desktop.webp
```

### Processamento das capas

* Formato WebP.
* Proporção uniforme.
* Recorte sem deformação.
* Largura aproximada entre 800 e 1.000 pixels.
* Tamanho desejado de até 150 KB.
* Tamanho máximo de 200 KB.

### Processamento das capturas mobile

* Manter toda a extensão vertical.
* Não recortar seções.
* Formato WebP.
* Largura entre 430 e 600 pixels, conforme o original.
* Tamanho desejado de até 700 KB.
* Tamanho máximo de 1 MB.

### Processamento das capturas desktop

* Manter toda a extensão vertical.
* Não recortar seções.
* Formato WebP.
* Redimensionar para no máximo 1.600 pixels de largura.
* Tamanho desejado de até 1,5 MB.
* Tamanho máximo de 2 MB.

Se o limite prejudicar a leitura, priorizar legibilidade e registrar a exceção.

### Regras de imagem

* Não deformar.
* Não ampliar além do tamanho original.
* Remover metadados desnecessários.
* Informar largura e altura.
* Usar carregamento tardio nas capturas completas.
* Não aplicar carregamento prioritário a imagens abaixo da dobra.

## 13. Como funciona

Usar integralmente as quatro etapas de `CONTENT.md`:

1. Briefing e materiais.
2. Copy, design e desenvolvimento.
3. Revisão e ajustes.
4. Aprovação e publicação.

Destacar:

* prazo de até 7 dias úteis;
* início após entrada, briefing e materiais;
* pausa do prazo quando houver pendência;
* até duas rodadas de ajustes.

### Layout responsivo

* **Mobile** (`<768px`): leitura vertical com gaps reduzidos, números com `w-9 h-9`.
* **Tablet** (`768–1023px`): grid 2×2, blocos lado a lado em duas linhas.
* **Desktop** (`≥1024px`): quatro colunas em uma única linha (`lg:grid-cols-4`), blocos de largura igual, alinhados pelo topo. O bloco "Prazo do projeto" permanece abaixo das quatro etapas como faixa informativa separada, sem ser contado como quinta etapa.

## 14. Quem é Willian Souza

Usar a copy e os indicadores de `CONTENT.md`.

### Regras

* Usar foto real de Willian.
* Informar que o projeto é conduzido diretamente por ele.
* Não apresentar equipe.
* Não usar "nós".
* Não inventar certificações.
* Não modificar os números aprovados.
* Não transformar a seção em uma biografia extensa.

### Layout responsivo

* **Desktop** (`≥1024px`): composição em duas colunas. Coluna esquerda (~55%) contém etiqueta "EXECUÇÃO DIRETA", título e dois parágrafos alinhados à esquerda. Coluna direita (~45%) contém os quatro indicadores em grid 2×2, alinhados pelo topo. Usa `lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-start`.
* **Tablet** (`768–1023px`): apresentação primeiro, indicadores abaixo em grid 2×2.
* **Mobile** (`<768px`): texto primeiro, indicadores em grid 2×2, sem rolagem horizontal.

## 15. Investimento

Usar integralmente a copy de `CONTENT.md`.

### Elementos obrigatórios

* preço de R$ 997;
* entrada de R$ 498,50;
* saldo de R$ 498,50 após publicação;
* escopo resumido;
* prazo;
* até duas rodadas de ajustes;
* custos externos;
* itens fora do escopo;
* ausência de garantia comercial;
* CTA.

O CTA abre o formulário modal.

## 16. Perguntas frequentes

Usar as 8 perguntas e respostas de `CONTENT.md`.

### Comportamento

* Usar acordeão acessível.
* A pergunta permanece visível.
* Permitir abertura por teclado.
* Comunicar o estado expandido.
* Não inserir botão direto para WhatsApp.
* Não adicionar campo livre de dúvidas.

## 17. CTA final

Usar integralmente a copy de `CONTENT.md`.

O CTA abre o formulário modal.

Não renderizar o formulário aberto dentro da seção.

## 18. Formulário modal

### Regra central

O formulário é o único caminho inicial de contato.

Todos os CTAs comerciais abrem a mesma instância lógica do formulário.

### Identificação da origem dos CTAs

| Local                  | `cta_location` |
| ---------------------- | -------------- |
| Cabeçalho              | `header`       |
| Hero                   | `hero`         |
| Projetos desenvolvidos | `portfolio`    |
| Investimento           | `pricing`      |
| CTA final              | `final`        |

### Abertura

* Abrir somente por ação do visitante.
* Nunca abrir automaticamente.
* Não abrir por tempo, rolagem ou intenção de saída.
* Registrar o CTA de origem conforme `TRACKING.md`.
* Posicionar o foco no título ou primeiro controle adequado.

### Tela inicial

Antes da primeira pergunta, apresentar:

* etiqueta;
* título;
* explicação;
* estimativa de cerca de 40 segundos;
* botão “Começar”.

Usar a copy de `CONTENT.md`.

### Progresso

Exibir três etapas:

1. Contato.
2. Sobre o projeto.
3. Confirmar.

O indicador não precisa mostrar a quantidade total de perguntas.

### Experiência

* Apresentar uma pergunta por vez.
* Permitir avançar somente com resposta obrigatória válida.
* Permitir voltar.
* Preservar respostas ao voltar.
* Preservar respostas ao fechar e reabrir durante a mesma visualização da página.
* Não persistir dados pessoais em URL.
* Não exigir reinício após erro.
* Não mostrar WhatsApp antes do envio.

### Organização das etapas

#### Contato

* Nome.
* WhatsApp.

#### Sobre o projeto

* Negócio ou serviço.
* Situação dos anúncios.
* Existência de site ou Landing Page.
* URL atual, quando houver.

#### Confirmar

* Revisão das respostas.
* Consentimento.
* Envio.

### Campos

Os rótulos, perguntas, opções, placeholders e mensagens são definidos em `CONTENT.md`.

Campos:

1. Nome.
2. WhatsApp.
3. Negócio ou serviço.
4. Situação atual dos anúncios.
5. Possui site ou Landing Page.
6. URL atual opcional.
7. Consentimento com a Política de Privacidade.

### URL condicional

* Exibir somente quando o visitante informar que já possui site ou Landing Page.
* Manter opcional.
* Validar apenas quando preenchida.
* Aceitar colagem.

### Telefone

* Aceitar número brasileiro com DDD.
* Permitir colagem.
* Não apagar dígitos inesperadamente.
* Manter fonte de pelo menos 16 px no celular.
* Normalizar no envio.
* Validar novamente no servidor.

### Revisão

Antes do envio:

* mostrar todas as respostas;
* permitir editar;
* não expor dados na URL;
* solicitar consentimento não pré-marcado;
* apresentar link para a Política de Privacidade.

### Fechamento do modal

* Disponibilizar botão de fechar com nome acessível.
* Fechar com `Esc`.
* Fechar ao clicar no fundo, quando isso não causar perda inesperada.
* Preservar as respostas enquanto a página permanecer aberta.
* Bloquear a rolagem da página ao fundo.
* Restaurar a rolagem ao fechar.
* Devolver o foco ao CTA de origem.

### Mobile

* Ocupar praticamente a tela inteira.
* Respeitar áreas seguras.
* Manter o botão de avançar acessível com teclado virtual.
* Não permitir rolagem horizontal.
* Não ocultar erros ou consentimento.

## 19. Envio e estados

### Validação

* Validar no cliente para orientar o visitante.
* Validar novamente no servidor.
* Exibir erro junto ao campo.
* Não depender somente da cor.
* Direcionar o foco ao primeiro erro quando necessário.

### Processamento

Ao clicar em “Enviar informações”:

* validar todos os campos;
* bloquear cliques repetidos;
* desabilitar o botão;
* exibir “Enviando informações…”;
* preservar os dados;
* não disparar `generate_lead`.

### Sucesso

O sucesso acontece somente quando:

1. o servidor aceita os dados;
2. os dados são validados;
3. o lead é armazenado;
4. o servidor devolve confirmação.

Depois disso:

* disparar `generate_lead` uma única vez;
* exibir a tela de sucesso dentro do modal;
* disponibilizar “Continuar no WhatsApp”;
* disponibilizar “Voltar para a página”;
* usar a mensagem de WhatsApp definida em `CONTENT.md`.

Não criar nem usar `/landingpage/obrigado` na primeira versão.

### Falha de validação

* Mostrar quais informações precisam ser corrigidas.
* Preservar todas as respostas.
* Não disponibilizar WhatsApp por erro de preenchimento.

### Falha técnica

Na primeira falha técnica:

* preservar respostas;
* exibir “Tentar novamente” como ação principal;
* permitir voltar e revisar;
* não disparar conversão.

Depois de uma tentativa válida que falhe tecnicamente:

* permitir a contingência “Avisar pelo WhatsApp”;
* usar a mensagem específica de erro definida em `CONTENT.md`;
* não marcar essa ação como lead confirmado;
* não usar `whatsapp_after_lead` para essa contingência.

Evento da contingência:

```text
whatsapp_form_error
```

Esse evento deve ser incluído em `TRACKING.md` e nunca importado como conversão principal.

## 20. Integração e armazenamento do formulário

### Fonte oficial

Toda a arquitetura, os nomes técnicos, o esquema das 24 colunas e as regras de sincronização estão em:

```text
docs/LEADS.md
```

Não criar uma segunda lista de colunas neste documento.

### Arquitetura aprovada

```text
Formulário
→ endpoint do servidor Next.js
→ validação, normalização e idempotência
→ envio ao Google Apps Script
→ Google Apps Script escreve na aba Leads
→ confirmação com lead_id
→ sucesso e continuidade pelo WhatsApp
```

O Google Sheets:

* é o armazenamento único e definitivo dos leads;
* usa a aba `Leads`;
* recebe exatamente as 24 colunas de `LEADS.md`;
* não é acessado diretamente pelo navegador.

### Regra de sucesso

Não simular envio e não apresentar sucesso sem confirmação do Google Apps Script.

O sucesso acontece quando:

1. os dados foram aceitos;
2. o servidor validou e normalizou os campos;
3. a idempotência foi confirmada;
4. o Apps Script confirmou a escrita no Google Sheets;
5. o servidor devolveu um `lead_id`.

Uma falha do Apps Script:

* significa que o armazenamento não foi confirmado;
* não pode produzir sucesso, `generate_lead` ou WhatsApp pós-lead;
* deve preservar as respostas no navegador;
* deve permitir nova tentativa segura com o mesmo `lead_id`;
* não pode afirmar que o servidor reteve os dados.

### Implementação

Antes de desenvolver:

* inspecionar a infraestrutura existente;
* verificar variáveis de ambiente;
* confirmar o endpoint do Apps Script web app;
* confirmar o secret do Apps Script;
* confirmar o identificador da planilha;
* confirmar a aba `Leads` com as 24 colunas;
* confirmar que o Apps Script possui acesso de edição na planilha;
* não criar conta externa ou contratar serviço sem aprovação.

### Servidor

O endpoint deve:

* aceitar somente os campos previstos;
* validar tipos e tamanhos;
* normalizar o telefone;
* sanitizar conteúdo;
* impedir interpretação de texto como fórmula no Sheets;
* aplicar proteção contra abuso;
* preservar somente parâmetros de origem permitidos;
* gerar data e hora no servidor;
* registrar o consentimento do formulário;
* aplicar idempotência;
* criar ou confirmar um `lead_id` opaco;
* enviar os dados ao Google Apps Script;
* iniciar `status_atendimento` como `novo`;
* iniciar `observacoes` vazio;
* devolver resposta clara;
* não expor detalhes internos.

### Integração via Apps Script

A integração com Google Sheets deve:

* acontecer via Google Apps Script (web app);
* receber POST com secret para autenticação;
* usar LockService para evitar concorrência;
* verificar idempotência por `lead_id` antes de escrever;
* gravar uma única linha por `lead_id`;
* preservar a ordem das 24 colunas;
* não inventar valores ausentes;
* não sobrescrever alterações manuais em `status_atendimento` e `observacoes`;
* retornar JSON com `ok`, `status` e `lead_id`;
* usar `status: created` para nova linha;
* usar `status: duplicate` para repetição idempotente;
* permitir no máximo uma repetição automática segura do servidor com o mesmo `lead_id`;
* gerar registro técnico em falha persistente.

Não implementar sincronização bidirecional na primeira versão.

### Proteção proporcional

Aplicar conforme a estrutura existente:

* honeypot;
* limite de tamanho;
* validação de origem quando aplicável;
* HTTPS;
* segredos somente no servidor;
* logs sem dados pessoais desnecessários.

Rate limit e CAPTCHA podem ser adicionados futuramente somente quando houver necessidade comprovada.

## 21. WhatsApp

### Disponibilidade

O WhatsApp aparece somente:

1. depois do envio confirmado; ou
2. como contingência após tentativa válida com falha técnica.

### Configuração

* Centralizar o número.
* Não repetir o número em diversas strings.
* Validar antes da publicação.
* Não renderizar link quebrado quando estiver ausente.
* Abrir de forma compatível com celular e desktop.

### Depois do lead

Usar a mensagem:

```text
Olá, Willian. Acabei de enviar as informações do meu projeto pela página da Anúncio & Site.
```

### Contingência

Usar a mensagem:

```text
Olá, Willian. Preenchi o formulário da Anúncio & Site, mas ocorreu um erro no envio.
```

### Proibições

Não exibir WhatsApp:

* no cabeçalho;
* no hero;
* nas seções intermediárias;
* na FAQ;
* no CTA final;
* no rodapé;
* como botão flutuante.

## 22. Rastreamento e origem

Implementar somente os eventos definidos em `TRACKING.md`.

### Conversão principal

```text
generate_lead
```

Disparar somente após confirmação real do armazenamento.

### Continuidade pelo WhatsApp

Depois do lead confirmado:

```text
whatsapp_after_lead
```

Depois de falha técnica válida:

```text
whatsapp_form_error
```

Nenhum dos dois eventos cria outro `generate_lead`.

### Origem

Preservar e associar ao registro conforme `docs/LEADS.md`, quando existirem:

* `utm_source`;
* `utm_medium`;
* `utm_campaign`;
* `utm_term`;
* `utm_content`;
* `gclid`;
* `gbraid`;
* `wbraid`;
* `fbclid`;
* `entry_path`;
* `referrer_hostname`.

Associar a origem ao lead sem enviar dados pessoais para analytics.

Gerar também:

* `lead_source` normalizado;
* `source_cta` com o CTA que iniciou o formulário.

Não inventar parâmetros ausentes e não substituir valores válidos por vazio.

### Proibição de dados pessoais

Não enviar para `dataLayer`, GA4, Google Ads ou Meta Pixel:

* nome;
* telefone;
* descrição do negócio;
* URL informada;
* respostas;
* mensagem;
* qualquer outro dado pessoal.

### Consentimento

* As tags devem respeitar as escolhas do visitante.
* O formulário deve funcionar mesmo sem consentimento para medição.
* A preferência deve poder ser revista.
* A copy do controle de consentimento está em `CONTENT.md`.
* O comportamento técnico deve ser validado antes da publicação.

## 23. Rodapé e links jurídicos

Usar integralmente a copy de `CONTENT.md`.

### Links permitidos

* Política de Privacidade (`/politica-de-privacidade`).
* Termos de Uso (`/termos`).
* Voltar ao topo, se necessário.

### Links proibidos

* WhatsApp.
* Instagram.
* Facebook.
* YouTube.
* blog.
* homepage destacada.
* portfólio externo.
* páginas de outros serviços.
* parceiros.

As páginas jurídicas devem estar prontas e acessíveis antes da publicação.

## 24. Metadata e compartilhamento

### Title

```text
Landing Page para Tráfego Pago | Anúncio & Site
```

### Description

```text
Landing Page completa para Google Ads e Meta Ads, com estratégia, copy, design, desenvolvimento e rastreamento. Projeto por R$ 997.
```

### Canonical

```text
https://www.anuncioesite.com.br/landingpage
```

### Requisitos

* uma única `h1`;
* Open Graph coerente;
* imagem social real e aprovada;
* URL base configurada;
* favicon funcionando;
* metadata implementada conforme o padrão do projeto;
* nenhuma afirmação diferente da oferta.

Não publicar imagem social provisória ou com dados fictícios.

## 25. Indexação

A rota de produção pode ser indexável.

Aplicar `noindex` a:

* preview;
* homologação;
* teste;
* variante temporária;
* URL duplicada.

Adicionar ao sitemap somente depois de:

* publicação;
* aprovação;
* canonical correta;
* conteúdo final;
* documentos jurídicos disponíveis.

Não bloquear CSS, JavaScript ou imagens necessários à renderização.

## 26. Responsividade

Priorizar mobile.

Validar pelo menos:

* 320 px;
* 375 px;
* 390 px;
* 768 px;
* 1024 px;
* 1280 px;
* 1440 px.

### Requisitos

* Sem rolagem horizontal acidental.
* Sem textos cortados.
* Sem CTA escondido.
* Sem cards comprimidos.
* Sem mockup maior que a tela.
* Sem teclado cobrindo a ação.
* Sem elementos fixos cobrindo conteúdo.

Não implementar CTA fixo no celular na primeira versão.

### Comportamento compacto mobile (< 768 px)

Aplicar padrões compactos para reduzir a altura total sem remover conteúdo:

* **Portfólio**: faixa horizontal com `scroll-snap`, cards com `min-w-[85%]`, sem autoplay. Desktop mantém grid `md:grid-cols-2 lg:grid-cols-3`.
* **O que está incluído**: painel compacto com 6 linhas em `divide-y`. Bento Box (`hidden md:grid`) mantido no desktop.
* **Quem é Willian Souza**: a partir de `1024px`, layout em duas colunas com texto à esquerda e indicadores em 2×2 à direita. Entre `768px` e `1023px`, apresentação acima e indicadores abaixo em 2×2. Abaixo de `768px`, texto primeiro e indicadores em grid `grid-cols-2` (2×2) com tamanhos de fonte reduzidos.
* **Como funciona**: gaps e tamanhos reduzidos (`space-y-4 md:space-y-8`, `w-9 h-9 md:w-10 md:h-10`).

Todos os textos, CTAs, modais e integrações permanecem idênticos. O desktop não é afetado.

## 27. Acessibilidade

A página deve possuir:

* HTML semântico;
* uma única `h1`;
* hierarquia coerente;
* landmarks;
* contraste adequado;
* foco visível;
* navegação por teclado;
* labels persistentes;
* erros associados aos campos;
* estados comunicados;
* textos alternativos;
* alvos clicáveis adequados;
* suporte a `prefers-reduced-motion`.

### Modais

Os modais de formulário e portfólio devem:

* possuir título acessível;
* manter o foco internamente;
* fechar por teclado;
* restaurar o foco;
* bloquear adequadamente o fundo;
* não depender de animação.

## 28. Performance

Metas de experiência:

* LCP de até 2,5 segundos;
* INP de até 200 milissegundos;
* CLS de até 0,1.

São metas, não garantias para toda rede ou aparelho.

### Prioridades

* HTML útil no primeiro carregamento.
* Pouco JavaScript no cliente.
* Fontes otimizadas.
* Imagem principal dimensionada.
* Capas otimizadas.
* Capturas completas carregadas sob demanda.
* Scripts de terceiros controlados.
* Rastreamento assíncrono.
* Ausência de efeitos pesados.

## 29. Segurança e privacidade

* Usar HTTPS.
* Não expor segredos.
* Não colocar chaves privadas no cliente.
* Validar entradas no servidor.
* Evitar logs de dados pessoais.
* Não incluir dados pessoais em URLs.
* Não incluir dados pessoais em eventos.
* Tratar erros sem revelar detalhes internos.
* Respeitar a Política de Privacidade.
* Coletar apenas o necessário.

## 30. Fora do escopo

Não implementar nesta fase:

* homepage;
* blog;
* artigos;
* páginas por nicho;
* checkout;
* área do cliente;
* CRM não definido;
* automações comerciais;
* manutenção mensal;
* testes A/B ativos;
* SEO avançado;
* gestão de anúncios;
* CAPI;
* rastreamento server-side;
* chat automático;
* pop-up de saída;
* página de obrigado;
* CTA flutuante;
* links externos para projetos.

## 31. Dependências antes da publicação

Os itens abaixo devem ser confirmados:

* número oficial do WhatsApp;
* endpoint do Apps Script web app;
* secret do Apps Script;
* identificador da planilha;
* aba `Leads` com as 24 colunas de `docs/LEADS.md`;
* Apps Script com acesso de edição na planilha;
* LockService habilitado no Apps Script;
* idempotência e recuperação testadas;
* IDs de GTM, GA4, Google Ads e Meta Pixel;
* configuração de consentimento;
* domínio e infraestrutura;
* Política de Privacidade;
* Termos de Uso;
* logotipo;
* foto real de Willian;
* composição visual do hero;
* imagem Open Graph;
* dez capturas originais do portfólio;
* autorização para apresentar os projetos.

Ausência de uma dependência deve ser relatada como pendência real. Não substituir por dado inventado.

## 32. Critério funcional de aprovação

A Landing Page somente pode ser considerada concluída quando:

* `/landingpage` funciona;
* a homepage permanece intacta;
* a copy corresponde a `CONTENT.md`;
* o preço e o pagamento estão corretos;
* todas as seções estão na ordem definida;
* todos os CTAs abrem o mesmo formulário;
* não existe WhatsApp antes do formulário;
* o formulário valida e envia;
* o lead é armazenado no Google Sheets via Apps Script;
* o mesmo `lead_id` chega uma única vez ao Google Sheets;
* a linha possui as 24 colunas na ordem de `docs/LEADS.md`;
* uma falha do Sheets preserva as respostas e não produz sucesso falso;
* o sucesso depende da confirmação do Apps Script;
* `generate_lead` não duplica;
* o WhatsApp pós-envio funciona;
* a contingência não é contabilizada como lead;
* o portfólio funciona sem links externos;
* mobile e desktop foram testados;
* os modais são acessíveis;
* metadata e canonical estão corretas;
* Política de Privacidade e Termos estão acessíveis;
* consentimento aceito e recusado foram testados;
* não existem links quebrados;
* não existem erros relevantes no console;
* lint, tipos, testes disponíveis e build foram executados;
* nenhuma rota fora do escopo foi alterada;
* a publicação foi autorizada;
* os testes no domínio real foram concluídos.
