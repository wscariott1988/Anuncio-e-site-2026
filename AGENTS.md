# AGENTS.md — Anúncio & Site

Este arquivo contém as regras permanentes para qualquer agente ou desenvolvedor que trabalhe neste repositório.

## 1. Missão atual

A prioridade é implementar e manter a Landing Page comercial:

```text
/landingpage
```

O objetivo é captar contatos qualificados interessados na criação de uma Landing Page completa para Google Ads e Meta Ads.

Não transformar essa rota em homepage, site institucional ou catálogo de serviços.

## 2. Escopo protegido

Não alterar sem solicitação explícita:

- homepage;
- blog;
- artigos;
- páginas institucionais;
- outras rotas;
- configurações globais de produção;
- domínio;
- contas de analytics;
- infraestrutura;
- dependências centrais;
- componentes usados por outras páginas.

A grafia oficial é:

```text
/landingpage
```

Não criar:

```text
/landingpge
```

## 3. Inspeção obrigatória

Antes de editar:

1. inspecionar a estrutura do repositório;
2. localizar o `package.json`;
3. identificar o gerenciador pelo arquivo de lock;
4. identificar App Router, Pages Router ou estrutura equivalente;
5. verificar estilos, fontes e componentes existentes;
6. verificar integrações já instaladas;
7. verificar alterações locais do usuário;
8. ler integralmente os documentos da pasta `docs`.

Não assumir stack, versões, serviços ou convenções sem verificar.

## 4. Fonte de verdade

Em caso de dúvida ou conflito, seguir:

1. solicitação atual e explícita do proprietário;
2. este `AGENTS.md`;
3. `docs/CONTENT.md` para copy;
4. `docs/LANDINGPAGE.md` para estrutura e comportamento;
5. `docs/LEADS.md` para armazenamento, esquema da planilha e sincronização;
6. `docs/DESIGN.md` para sistema visual;
7. `docs/TRACKING.md` para eventos e conversões;
8. `docs/CHECKLIST.md` para critérios de conclusão;
9. `README.md` para execução e contexto técnico;
10. implementação existente.

Cada documento governa seu próprio assunto.

Não recuperar decisões antigas de:

- commits;
- documentos substituídos;
- rascunhos;
- mensagens antigas;
- código desatualizado;
- versões com sufixo duplicado.

## 5. Decisões comerciais fixas

- Marca: **Anúncio & Site**.
- Responsável: **Willian Souza**.
- Comunicação em primeira pessoa do singular.
- Usar “eu”; nunca apresentar uma equipe inexistente.
- Serviço: Landing Page completa para campanhas de Google Ads e Meta Ads.
- Investimento: **R$ 997**.
- Entrada: **R$ 498,50 na contratação**.
- Saldo: **R$ 498,50 após a Landing Page ser publicada e estar funcionando**.
- Prazo: **até 7 dias úteis**.
- O prazo começa após entrada, briefing completo e materiais necessários.
- O prazo pausa quando informações, acessos ou materiais indispensáveis estiverem pendentes.
- Inclui até **duas rodadas de ajustes** dentro do escopo.
- Custos externos não estão incluídos automaticamente.

Não exibir:

- preço anterior;
- preço riscado;
- desconto;
- condição de lançamento;
- cronômetro;
- vagas fictícias;
- urgência artificial;
- parcelamento não aprovado.

## 6. Limites de promessa

Não prometer:

- vendas;
- quantidade de leads;
- faturamento;
- ROAS;
- posição em anúncios;
- taxa de conversão;
- retorno financeiro;
- prazo de aprovação de plataformas;
- resultado comercial garantido.

A página pode organizar a experiência depois do clique, mas não controla todos os fatores do negócio ou da campanha.

## 7. Copy

`docs/CONTENT.md` contém a copy oficial e aprovada para implementação.

### Regras

- Implementar os textos sem reescrever por preferência.
- Preservar títulos, preço, prazo e condições.
- Preservar a primeira pessoa do singular.
- Não resumir textos sem solicitação.
- Não adicionar argumentos comerciais.
- Não alterar números aprovados.
- Não inventar prova.
- Não usar texto provisório em produção.

Não inventar:

- depoimentos;
- avaliações;
- resultados;
- clientes;
- logotipos;
- certificações;
- selos;
- prêmios;
- métricas;
- estudos de caso.

Não usar jargões como:

- “infraestrutura crítica de conversão”;
- “ativo científico”;
- “luxo silencioso”;
- “engenharia de valor”;
- “ecossistema de tração”.

Não atacar:

- WordPress;
- freelancers;
- agências;
- concorrentes;
- outras tecnologias.

## 8. Ordem da página

Preservar a ordem definida em `docs/LANDINGPAGE.md`:

1. Cabeçalho.
2. Hero.
3. Faixa de clareza.
4. Problema pós-clique.
5. Apresentação da solução.
6. O que está incluído.
7. Projetos desenvolvidos.
8. Como funciona.
9. Quem é Willian Souza.
10. Investimento.
11. Perguntas frequentes.
12. CTA final.
13. Rodapé.

O formulário é modal. Não criar uma seção de formulário aberto no final.

## 9. CTAs

Todos os CTAs comerciais devem abrir o mesmo formulário modal.

Localizações:

- `header`;
- `hero`;
- `included`;
- `portfolio`;
- `about`;
- `pricing`;
- `final`.

Não criar:

- CTA para outra página comercial;
- telefone direto;
- WhatsApp direto;
- Instagram;
- link externo de portfólio;
- botões concorrentes.

Não implementar CTA fixo no celular na primeira versão.

## 10. Formulário

O formulário é o único caminho inicial de contato.

### Experiência

- Abrir somente por ação do visitante.
- Nunca abrir automaticamente.
- Apresentar uma pergunta por vez.
- Mostrar três etapas de progresso.
- Permitir voltar.
- Preservar respostas enquanto a página estiver aberta.
- Exibir revisão antes do envio.
- Solicitar consentimento não pré-marcado.
- Funcionar por teclado.
- Funcionar com leitor de tela.
- Ocupar praticamente a tela inteira no celular.

### Envio

- Validar no cliente.
- Validar novamente no servidor.
- Desabilitar o botão durante o envio.
- Impedir duplicidade.
- Preservar respostas em caso de erro.
- Não mostrar sucesso antes da confirmação.
- Não simular armazenamento.

### Sucesso

O sucesso acontece somente depois que:

1. o servidor recebe;
2. o servidor valida;
3. o lead é armazenado;
4. o servidor devolve confirmação.

Não criar:

```text
/landingpage/obrigado
```

O sucesso deve acontecer dentro do modal.

### Integração oficial

Seguir integralmente `docs/LEADS.md`.

A arquitetura aprovada é:

```text
Formulário
→ endpoint do servidor
→ Google Apps Script → Google Sheets
→ confirmação com lead_id
→ notificação
```

Regras:

- o Google Sheets é o armazenamento único e confirma o lead;
- o Google Apps Script é a camada de integração que escreve na planilha;
- uma falha do Apps Script permite nova tentativa sem perder o lead;
- o esquema da aba `Leads` possui exatamente as 24 colunas de `docs/LEADS.md`;
- não criar uma segunda lista de colunas em outro documento;
- não usar chamada direta do navegador para o Apps Script;
- não implementar sincronização bidirecional na primeira versão;
- `status_atendimento` começa como `Novo`;
- `observacoes` começa vazio;
- alterações manuais nessas duas colunas não podem ser sobrescritas por uma repetição técnica.

O endpoint do Apps Script, o secret e a planilha devem ser confirmados antes da implementação definitiva.

Se uma dependência real não estiver definida:

- não inventar um serviço;
- não criar conta externa;
- não declarar a integração concluída;
- registrar a pendência.

## 11. WhatsApp

O WhatsApp aparece somente:

1. após o lead ser armazenado; ou
2. como contingência depois de uma tentativa válida com falha técnica.

Não exibir WhatsApp:

- no cabeçalho;
- no hero;
- nas seções;
- na FAQ;
- no CTA final;
- no rodapé;
- como botão flutuante.

### Após o lead

Usar:

```text
whatsapp_after_lead
```

Esse evento:

- não é novo lead;
- não dispara Google Ads;
- não dispara Meta `Lead`;
- não dispara outro `generate_lead`.

### Contingência

Usar:

```text
whatsapp_form_error
```

Esse evento:

- só aparece após falha técnica válida;
- não aparece em erro de preenchimento;
- não é conversão;
- não possui `lead_id`;
- não dispara `generate_lead`.

O evento antigo `whatsapp_click` não deve ser usado.

## 12. Projetos desenvolvidos

Apresentar os cinco projetos definidos em `docs/CONTENT.md` e `docs/LANDINGPAGE.md`.

### Regras

- Não criar links externos.
- Não abrir os sites reais.
- Usar capas WebP.
- Abrir as capturas em visualizador interno.
- No celular, carregar somente a versão mobile.
- No desktop, começar pela versão mobile.
- No desktop, permitir alternar para a versão desktop.
- Carregar capturas completas somente sob demanda.
- Preservar acessibilidade do modal.

### Originais

Os PNGs ficam em:

```text
/originals/portfolio/
```

A pasta `/originals` deve permanecer no `.gitignore`.

### Saída pública

As imagens processadas ficam em:

```text
/public/images/portfolio/
```

Não modificar os originais.

Não publicar os PNGs grandes.

Seguir tamanhos, nomes e limites de `docs/LANDINGPAGE.md`.

## 13. Direção visual

Seguir `docs/DESIGN.md`.

Direção oficial:

> Minimalismo premium, claro e comercial, com Bento Box seletivo e glassmorphism apenas como detalhe.

Orientação:

- 70% superfícies sólidas e minimalistas;
- 20% Bento Box;
- 10% vidro, gradientes e efeitos.

### Regras

- CTA principal sólido.
- Formulário sólido.
- FAQ sólida.
- Textos longos em superfície sólida.
- Bento principalmente nos itens incluídos.
- Vidro somente em detalhes do hero.
- Prioridade para mobile.
- Respeitar `prefers-reduced-motion`.

Não adicionar:

- fundo escuro dominante;
- neon;
- glow excessivo;
- cursor customizado;
- vídeo automático;
- parallax pesado;
- rolagem presa;
- animação palavra por palavra;
- carrossel automático;
- dashboard falso.

## 14. Imagens e materiais

Priorizar:

- materiais reais;
- foto real de Willian;
- capturas reais dos projetos;
- interface própria aprovada.

### Regras

- Não inventar marca ou cliente.
- Não gerar depoimento dentro de imagem.
- Não incluir métricas fictícias.
- Não publicar placeholder.
- Definir largura e altura.
- Evitar CLS.
- Usar carregamento tardio abaixo da dobra.
- Não deformar imagens.
- Não ampliar além do original.

Se faltar logotipo, foto, hero ou imagem social:

- não substituir silenciosamente;
- criar apenas estrutura reversível;
- registrar a pendência antes da publicação.

## 15. Rastreamento

Seguir exclusivamente `docs/TRACKING.md`.

Para nomes de campos, origem associada ao lead, armazenamento e sincronização, seguir `docs/LEADS.md`.

### Conversão principal

```text
generate_lead
```

Disparar somente depois do armazenamento confirmado pelo servidor.

O armazenamento confirmado é a confirmação do Apps Script de que a linha foi escrita no Google Sheets.

### Eventos

Implementar apenas:

- `cta_click`;
- `form_open`;
- `form_start`;
- `form_step`;
- `form_submit_attempt`;
- `form_error`;
- `generate_lead`;
- `whatsapp_after_lead`;
- `whatsapp_form_error`;
- `portfolio_open`;
- `portfolio_view_change`;
- `faq_open`.

### Proibições

- Não criar conversão no clique.
- Não criar conversão na tentativa.
- Não importar eventos de interação como conversão.
- Não usar R$ 997 como valor de cada lead.
- Não instalar tags duplicadas.
- Não implementar CAPI.
- Não implementar Enhanced Conversions.
- Não implementar rastreamento server-side.

### Dados pessoais

Nunca enviar ao `dataLayer`, GA4, Google Ads ou Meta:

- nome;
- telefone;
- URL digitada;
- descrição do negócio;
- respostas;
- mensagens;
- qualquer outro dado pessoal.

## 16. Consentimento

- Implementar o controle descrito nos documentos.
- Definir estado antes das tags.
- Respeitar aceitação e recusa.
- Permitir alteração posterior.
- Não bloquear o formulário quando a medição for recusada.
- Não confundir consentimento do formulário com consentimento de cookies.
- Validar o comportamento antes da publicação.

Não publicar tags de publicidade ignorando a preferência do visitante.

## 17. Privacidade e documentos jurídicos

Links permitidos:

- Política de Privacidade;
- Termos de Uso;
- voltar ao topo, quando necessário.

Não inventar texto jurídico.

Se as páginas jurídicas não existirem ou não estiverem aprovadas:

- não criar texto definitivo por conta própria;
- não publicar links quebrados;
- registrar a pendência.

## 18. SEO e metadata

Seguir os valores de `docs/LANDINGPAGE.md`.

### Regras

- Uma única `h1`.
- Canonical absoluta correta.
- Title e description corretos.
- Open Graph com imagem aprovada.
- Favicon funcionando.
- Preview e homologação com `noindex`.
- Produção indexável somente depois da aprovação.
- Sitemap atualizado somente quando a página estiver pronta.

Não criar dados estruturados com informações não verificadas.

## 19. Implementação

### Arquitetura

- Manter Next.js e o roteamento existente.
- Preferir Server Components quando adequados.
- Usar Client Components somente para interação necessária.
- Reutilizar componentes existentes quando forem adequados.
- Manter TypeScript se já adotado.
- Manter o sistema de estilos existente.
- Preservar aliases e convenções.

### Dependências

- Usar o gerenciador indicado pelo lockfile.
- Não criar segundo lockfile.
- Não trocar dependências por preferência.
- Não instalar biblioteca apenas para ícone, animação ou modal simples.
- Justificar qualquer dependência nova.

### Configuração

- Usar o mecanismo de ambiente existente.
- Somente IDs públicos podem aparecer no cliente.
- Segredos ficam exclusivamente no servidor.
- Não adicionar valores reais a `.env.example`.
- Não versionar `.env.local`.
- Não registrar credenciais no console.

### Estado e erros

- Evitar efeitos colaterais durante renderização.
- Considerar React Strict Mode.
- Centralizar rastreamento.
- Centralizar número do WhatsApp.
- Tratar ausência de configuração sem quebrar a página.
- Exibir mensagens simples ao visitante.
- Não expor stack trace.

## 20. Acessibilidade

- Usar HTML semântico.
- Manter uma única `h1`.
- Preservar ordem de títulos.
- Usar labels persistentes.
- Manter foco visível.
- Garantir navegação por teclado.
- Associar erros aos campos.
- Comunicar estados de carregamento e sucesso.
- Usar nomes acessíveis nos botões.
- Manter contraste adequado.
- Respeitar movimento reduzido.

Os modais devem:

- manter o foco;
- fechar com `Esc`;
- restaurar o foco;
- bloquear o fundo corretamente;
- possuir título acessível.

## 21. Desempenho

Seguir as metas dos documentos técnicos.

Priorizar:

- HTML útil no primeiro carregamento;
- pouco JavaScript;
- fontes otimizadas;
- imagens dimensionadas;
- capturas sob demanda;
- scripts de terceiros controlados;
- ausência de mudanças excessivas de layout.

Não sacrificar desempenho por efeitos decorativos.

## 22. Segurança

- Validar entradas no servidor.
- Sanitizar conteúdo.
- Limitar tamanhos.
- Aplicar proteção antispam proporcional.
- Aplicar idempotência.
- Usar HTTPS.
- Não expor segredos.
- Não guardar dados pessoais em URL.
- Evitar logs desnecessários.
- Não mostrar detalhes internos.
- Não expor credenciais do Apps Script ou do Google Sheets.
- `GOOGLE_APPS_SCRIPT_WEB_APP_URL` e `GOOGLE_APPS_SCRIPT_SECRET` são exclusivamente servidor.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` é público intencionalmente.
- `SHARED_SECRET` e `SPREADSHEET_ID` ficam nas Script Properties do Apps Script.
- Não usar prefixo `NEXT_PUBLIC_` em segredos.
- Não permitir que valores do formulário sejam interpretados como fórmulas na planilha.
- Não usar nome ou telefone para gerar `lead_id`.
- Não sobrescrever `status_atendimento` ou `observacoes` durante uma recuperação de sincronização.

Não adicionar CAPTCHA visual intrusivo sem necessidade comprovada.

## 23. Git e preservação

- Preservar alterações do usuário.
- Não apagar mudanças não relacionadas.
- Não usar comandos destrutivos.
- Não fazer `reset --hard`.
- Não forçar push.
- Não reescrever histórico.
- Não criar ou trocar branch sem necessidade.
- Não fazer commit ou push sem solicitação.
- Não alterar arquivos fora do escopo.

Se uma mudança necessária conflitar com trabalho existente:

- interromper;
- explicar o conflito;
- pedir orientação.

## 24. Fora do escopo

Não implementar nesta fase:

- homepage;
- blog;
- artigos;
- páginas por nicho;
- checkout;
- área do cliente;
- CRM não definido;
- automações comerciais;
- manutenção mensal;
- testes A/B;
- SEO avançado;
- gestão de anúncios;
- CAPI;
- rastreamento server-side;
- chat automático;
- pop-up de saída;
- página de obrigado;
- CTA flutuante;
- links externos para os projetos.

## 25. Dependências de publicação

Confirmar antes da publicação:

- número oficial do WhatsApp;
- endpoint e secret do Apps Script;
- identificador e acesso da planilha;
- aba `Leads` com as 24 colunas oficiais;
- sincronização e recuperação do Google Sheets;
- notificação dos leads;
- política de retenção;
- GTM;
- GA4;
- conversão do Google Ads;
- Meta Pixel;
- consentimento;
- domínio;
- infraestrutura;
- Política de Privacidade;
- Termos de Uso;
- logotipo;
- foto de Willian;
- visual do hero;
- imagem Open Graph;
- capturas do portfólio;
- autorização dos projetos.

Não preencher dependências ausentes com dados inventados.

## 26. Verificação obrigatória

Antes de considerar a implementação concluída:

1. executar lint disponível;
2. executar verificação de tipos disponível;
3. executar testes disponíveis;
4. executar build de produção;
5. testar `/landingpage` no desktop;
6. testar `/landingpage` no celular;
7. testar teclado e foco;
8. testar formulário real;
9. confirmar armazenamento no Google Sheets;
10. confirmar uma única linha no Google Sheets;
11. validar as 24 colunas na ordem oficial;
12. simular falha do Sheets e validar recuperação sem perda;
13. testar estados de erro;
14. testar WhatsApp pós-lead;
15. testar contingência;
16. testar portfólio;
17. testar eventos;
18. testar consentimento aceito e recusado;
19. verificar console e rede;
20. verificar metadata e canonical;
21. verificar links jurídicos;
22. confirmar que homepage e outras rotas permanecem intactas;
23. executar `docs/CHECKLIST.md`.

Não declarar sucesso quando:

- build falhou;
- formulário não foi armazenado no Google Sheets;
- sincronização com a planilha não foi testada;
- eventos não foram validados;
- dependência real está ausente;
- página não foi testada.

## 27. Publicação

Não publicar nem fazer deploy de produção sem autorização explícita.

Antes da publicação:

- obter aprovação da versão;
- confirmar domínio;
- confirmar variáveis;
- confirmar contas;
- confirmar documentos jurídicos;
- confirmar infraestrutura.

Depois da publicação:

- testar no endereço real;
- testar mobile;
- testar desktop;
- testar formulário;
- testar armazenamento;
- testar WhatsApp;
- testar eventos;
- testar conversões;
- verificar HTTPS;
- verificar metadata.

## 28. Relatório final

Ao concluir uma tarefa, informar:

- arquivos alterados;
- comportamento implementado;
- comandos executados;
- testes concluídos;
- resultado do build;
- pendências;
- itens não testados;
- qualquer decisão que ainda dependa do proprietário.

Não esconder limitação nem declarar validação que não aconteceu.
