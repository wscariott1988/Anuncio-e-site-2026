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

A rota `/landingpage` deve converter visitantes interessados na criação de uma Landing Page para tráfego pago em conversas comerciais pelo WhatsApp.

### Conversão principal

A conversão é a abertura do WhatsApp com a mensagem oficial pré-preenchida. Ela acontece fora da página e não é medida por um evento de conversão confirmado por servidor.

### Fluxo comercial

1. O visitante conhece a oferta.
2. Clica no CTA.
3. Abre diretamente o WhatsApp.
4. Conversa com Willian e confirma a contratação.
5. Paga a entrada de R$ 498,50.
6. Somente depois recebe e responde o briefing completo.
7. A página é desenvolvida.
8. O saldo de R$ 498,50 é pago após a Landing Page estar publicada e funcionando.

### Redução de atrito

A página não deve transmitir que o visitante precisa passar por avaliação, processo seletivo, diagnóstico ou confirmação de enquadramento antes de conversar.

Não existe formulário, modal de avaliação, botão "Começar" nem perguntas anteriores ao WhatsApp.

### Prioridade

Clareza e velocidade do caminho até o WhatsApp são mais importantes que qualquer coleta prévia de dados.

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
* Copy (produzida por Willian; o cliente não entrega textos prontos).
* Design responsivo.
* Desenvolvimento em Next.js.
* Canais de contato (WhatsApp e formulário do próprio projeto do cliente, quando aplicável).
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

### Briefing depois da contratação

O briefing completo é enviado somente depois da contratação. Não existe coleta de briefing antes do WhatsApp.

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
* Não alterar outras rotas ou páginas do projeto.

## 6. Arquitetura da página

A ordem obrigatória é:

1. Cabeçalho.
2. Hero.
3. Bloco de confiança.
4. Projetos reais.
5. O que está incluído.
6. Processo simples.
7. Quem é Willian Souza.
8. Investimento.
9. Perguntas frequentes.
10. CTA final.
11. Rodapé.

Não existe seção de formulário aberto nem modal de formulário.

Não criar seção de depoimentos, avaliações, logotipos ou resultados sem dados reais e autorização.

Não reintroduzir parágrafos, cards, etapas, FAQs ou CTAs removidos da versão enxuta de `CONTENT.md`.

Não criar uma segunda explicação para uma ideia já apresentada em outra seção.

## 7. Cabeçalho

O cabeçalho deve conter apenas:

* identificação ou logotipo da Anúncio & Site;
* CTA "Quero minha Landing Page".

### Comportamento

* A identificação leva ao topo da própria página.
* O CTA abre diretamente o WhatsApp.
* O cabeçalho não precisa ser fixo na primeira versão.

### Não incluir

* menu;
* homepage destacada;
* Instagram;
* blog;
* telefone;
* WhatsApp adicional;
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
* investimento (preço total);
* forma de pagamento (entrada e saldo);
* prazo;
* quantidade de rodadas de ajustes;
* CTA principal;
* microcopy;
* composição visual de Landing Page em desktop e celular.

### Comportamento

* O CTA abre diretamente o WhatsApp.
* No desktop, preço, forma de pagamento e CTA aparecem integralmente na primeira dobra.
* No celular, o H1, o preço e o CTA ficam visíveis rapidamente, sem exigir rolagem longa.
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

## 9. Bloco de confiança

Usar integralmente a copy de `CONTENT.md`.

Bloco compacto, sem parágrafos longos, com três informações:

* Desenvolvimento direto com Willian.
* Mais de 5 anos de experiência prática com Google Ads.
* Página publicada e testada no celular e no desktop.

Funciona como reforço de confiança, não como seção grande. Não deve ocupar posição anterior ao portfólio.

## 10. Projetos reais

### Objetivo

Apresentar projetos reais sem retirar o visitante da Landing Page da Anúncio & Site.

Nenhum projeto deve possuir link para a página externa.

A seção vem imediatamente após o bloco de confiança.

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

### CTA do portfólio

Texto:

```text
Quero minha Landing Page por R$ 997
```

Abre diretamente o WhatsApp.

### Visualizador no celular

* Abrir como modal praticamente em tela cheia.
* Exibir somente a captura mobile.
* Não carregar a captura desktop.
* Permitir rolagem vertical por toda a captura.
* Manter o fechamento acessível.

### Visualizador no desktop

* Abrir como modal amplo.
* Iniciar pela versão mobile em moldura de celular.
* Exibir controle "Celular" e "Desktop".
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

## 11. O que está incluído

Usar integralmente a copy de `CONTENT.md`.

Apresentar os itens de maneira curta e escaneável:

1. Estratégia e copy.
2. Design responsivo.
3. Desenvolvimento moderno.
4. Formulário e WhatsApp.
5. Rastreamento.
6. Publicação e testes.

Depois dos itens, exibir:

```text
O projeto inclui até 2 rodadas de ajustes dentro do escopo aprovado.
```

### Regras

* Não inventar serviços adicionais.
* Condicionar o rastreamento ao fornecimento dos acessos necessários.
* Não incluir CTA nesta seção.
* Evitar repetir os mesmos cards ou textos em diferentes versões de desktop e mobile dentro do DOM. Utilizar uma única estrutura semântica e adaptar o layout com CSS sempre que possível.
* O item "Formulário e WhatsApp" descreve os canais de contato do projeto entregue ao cliente, não um formulário nesta Landing Page.

### Layout responsivo

* **Mobile** (`<768px`): grid de 1 coluna (cards empilhados).
* **Tablet** (`768–1023px`): grid de 2 colunas.
* **Desktop** (`≥1024px`): grid uniforme de 3 colunas × 2 linhas, todos os cartões com a mesma largura e alinhados pelo topo.

## 12. Processo simples

Usar integralmente as três etapas de `CONTENT.md`:

1. Contratação.
2. Briefing simples.
3. Criação, revisão e publicação.

Abaixo das etapas, exibir:

```text
Prazo de até 7 dias úteis após o recebimento do briefing completo e dos materiais necessários.
```

### Regras

* Não fazer parecer que o cliente precisa preparar textos completos.
* Deixar claro que Willian produz e organiza a copy.
* Não incluir CTA nesta seção.

### Layout responsivo

* **Mobile** (`<768px`): leitura vertical com gaps reduzidos, números com `w-9 h-9` ou `w-10 h-10`.
* **Tablet** (`768–1023px`): grid 2 colunas.
* **Desktop** (`≥1024px`): três colunas em uma única linha, blocos de largura igual, alinhados pelo topo. O bloco de prazo permanece abaixo das etapas como faixa informativa separada, sem ser contado como etapa.

## 13. Quem é Willian Souza

Usar a copy e os indicadores de `CONTENT.md`.

### Regras

* Usar foto real de Willian.
* Informar que o projeto é conduzido diretamente por ele.
* Não apresentar equipe.
* Não usar "nós".
* Não inventar certificações.
* Não modificar os números aprovados.
* Não dar a entender que foram criadas Landing Pages para mais de sete mil clientes.
* Não transformar a seção em uma biografia extensa.

### Layout responsivo

* **Desktop** (`≥1024px`): composição em duas colunas. Coluna esquerda (~55%) contém etiqueta "EXECUÇÃO DIRETA", título e os três parágrafos alinhados à esquerda. Coluna direita (~45%) contém os quatro indicadores em grid 2×2, alinhados pelo topo. Usa `lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-start`.
* **Tablet** (`768–1023px`): apresentação primeiro, indicadores abaixo em grid 2×2.
* **Mobile** (`<768px`): texto primeiro, indicadores em grid 2×2, sem rolagem horizontal.

## 14. Investimento

Usar integralmente a copy de `CONTENT.md`.

### Elementos obrigatórios

* preço total de R$ 997;
* entrada para iniciar de R$ 498,50;
* saldo de R$ 498,50 após a publicação;
* prazo de até 7 dias úteis após briefing e materiais;
* até duas rodadas de ajustes;
* CTA;
* microtexto.

### Removido desta seção

* Lista do que não está incluído.
* Advertências sobre garantia de resultados.
* Parágrafos sobre custos de terceiros.
* Frase pedindo preenchimento de formulário.
* Frase sobre avaliar a necessidade.
* Frase sobre confirmar o escopo.

Essas informações foram transferidas para a FAQ.

### CTA

```text
Quero minha Landing Page por R$ 997
```

Abre diretamente o WhatsApp.

## 15. Perguntas frequentes

Usar as 9 perguntas e respostas de `CONTENT.md`.

### Comportamento

* Usar acordeão acessível.
* A pergunta permanece visível.
* Permitir abertura por teclado.
* Comunicar o estado expandido.
* Não inserir botão direto para WhatsApp dentro da FAQ.
* Não adicionar campo livre de dúvidas.

## 16. CTA final

Usar integralmente a copy de `CONTENT.md`.

O CTA abre diretamente o WhatsApp.

Não renderizar formulário aberto dentro da seção.

## 17. WhatsApp

### Caminho único de contato

O WhatsApp é o único caminho inicial de contato.

Todos os CTAs comerciais abrem a mesma URL do WhatsApp com a mensagem oficial pré-preenchida.

### Mensagem pré-preenchida

Usar exatamente:

```text
Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?
```

A mensagem deve estar corretamente codificada na URL.

### Identificação da origem dos CTAs

| Local                  | `cta_location`   |
| ---------------------- | ---------------- |
| Cabeçalho              | `header`         |
| Hero                   | `hero`           |
| Projetos desenvolvidos | `portfolio`      |
| Investimento           | `investment`     |
| CTA final              | `final`          |
| CTA fixo mobile        | `sticky-mobile`  |

Cada CTA possui os atributos:

```text
data-whatsapp-cta="true"
data-cta-location="[localização]"
```

### Comportamento

* Abrir o WhatsApp em nova aba.
* Não usar `preventDefault`.
* Não usar `event_callback`.
* Não usar `window.location` com atraso.
* O rastreamento (`cta_click` e `whatsapp_click`) deve disparar sem bloquear ou atrasar a navegação.
* Não renderizar link quebrado quando o número estiver ausente.

### Configuração

* Centralizar o número (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
* Não repetir o número em diversas strings.
* Não inventar ou substituir o número.
* Validar antes da publicação.

### Proibições

Não exibir telefone direto, botão flutuante adicional, Instagram, Facebook ou links comerciais concorrentes.

## 18. CTA fixo mobile

CTA fixo discreto na parte inferior, exibido somente no celular.

### Regras

* Não cobrir o banner de cookies, controles ou elementos importantes.
* Não aparecer na primeira dobra quando gerar duplicação visual excessiva com o CTA da hero. Pode aparecer após uma pequena rolagem.
* Ocultar enquanto o banner de consentimento estiver visível.
* Ocultar quando o rodapé estiver visível.
* Não exibir em telas desktop.
* Abrir diretamente o WhatsApp com `cta_location = sticky-mobile`.

## 19. Rastreamento e origem

Implementar somente os eventos definidos em `TRACKING.md`.

### Eventos

* `cta_click`.
* `whatsapp_click`.
* `portfolio_open`.
* `portfolio_view_change`.
* `faq_open`.

### Proibições

* Não criar conversão no clique.
* Não criar conversão na tentativa.
* Não importar eventos de interação como conversão.
* Não usar R$ 997 como valor de cada lead.
* Não instalar tags duplicadas.
* Não implementar CAPI.
* Não implementar Enhanced Conversions.
* Não implementar rastreamento server-side.

### Proibição de dados pessoais

Não enviar para `dataLayer`, GA4, Google Ads ou Meta Pixel:

* nome;
* telefone;
* descrição do negócio;
* URL digitada;
* respostas;
* mensagem;
* qualquer outro dado pessoal.

### Consentimento

* As tags devem respeitar as escolhas do visitante.
* O WhatsApp deve funcionar mesmo sem consentimento para medição.
* A preferência deve poder ser revista.
* A copy do controle de consentimento está em `CONTENT.md`.
* O comportamento técnico deve ser validado antes da publicação.
* O Microsoft Clarity segue a categoria Analytics do painel de preferências.
* O banner não exibe "Microsoft Clarity" no texto visível.

## 20. Rodapé e links jurídicos

Usar integralmente a copy de `CONTENT.md`.

### Links permitidos

* Política de Privacidade (`/politica-de-privacidade`).
* Termos de Uso (`/termos`).
* "Configurações de privacidade".
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

## 21. Metadata e compartilhamento

### Title

```text
Landing Page Profissional para Google Ads e Meta Ads por R$ 997 | Anúncio & Site
```

### Description

```text
Landing Page profissional para tráfego pago, criada para Google Ads e Meta Ads por R$ 997. Estratégia, copy, design, desenvolvimento, rastreamento e publicação por Willian Souza. Entrada de R$ 498,50 para iniciar.
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
* nenhuma afirmação diferente da oferta;
* title e description refletem: Landing Page profissional, Google Ads, Meta Ads, tráfego pago, preço de R$ 997 e Anúncio & Site;
* sem keyword stuffing.

Não publicar imagem social provisória ou com dados fictícios.

## 22. Indexação

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

## 23. Responsividade

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

### CTA fixo mobile

O CTA fixo mobile está implementado nesta versão, seguindo as regras da seção 18.

## 24. Acessibilidade

A página deve possuir:

* HTML semântico;
* uma única `h1`;
* hierarquia coerente;
* landmarks;
* contraste adequado;
* foco visível;
* navegação por teclado;
* labels persistentes;
* estados comunicados;
* textos alternativos;
* alvos clicáveis adequados;
* nomes acessíveis em botões e links;
* suporte a `prefers-reduced-motion`.

### Modais

O modal de portfólio deve:

* possuir título acessível;
* manter o foco internamente;
* fechar por teclado (`Esc`);
* restaurar o foco;
* bloquear adequadamente o fundo;
* não depender de animação.

## 25. Performance

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

## 26. Segurança e privacidade

* Usar HTTPS.
* Não expor segredos.
* Não colocar chaves privadas no cliente.
* Não incluir dados pessoais em URLs.
* Não incluir dados pessoais em eventos.
* Tratar erros sem revelar detalhes internos.
* Respeitar a Política de Privacidade.
* Coletar apenas o necessário.
* A mensagem fixa do WhatsApp não contém dados pessoais do visitante.

## 27. Fora do escopo

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
* formulário de qualificação;
* CAPI;
* rastreamento server-side;
* chat automático;
* pop-up de saída;
* página de obrigado;
* CTA flutuante adicional;
* links externos para projetos.

## 28. Dependências antes da publicação

Os itens abaixo devem ser confirmados:

* número oficial do WhatsApp;
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

## 29. Critério funcional de aprovação

A Landing Page somente pode ser considerada concluída quando:

* `/landingpage` funciona;
* a homepage permanece intacta;
* a copy corresponde a `CONTENT.md`;
* o preço e o pagamento estão corretos;
* todas as seções estão na ordem definida;
* todos os CTAs abrem diretamente o WhatsApp;
* a mensagem pré-preenchida está correta na URL;
* o formulário e o modal antigos não aparecem mais;
* não existem scripts, imports, estados ou estilos órfãos do formulário removido;
* os eventos de rastreamento continuam sendo disparados sem bloquear a navegação;
* nenhum CTA bloqueia a abertura do WhatsApp;
* o portfólio funciona sem links externos;
* mobile e desktop foram testados;
* o CTA fixo mobile respeita as regras da seção 18;
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
