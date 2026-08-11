# AGENTS.md — Anúncio & Site

Este arquivo contém as regras permanentes para qualquer agente ou desenvolvedor que trabalhe neste repositório.

## 1. Missão atual

A prioridade é implementar e manter as Landing Pages comerciais:

```text
/landingpage              (oferta completa — R$ 997)
/landingpage-essencial    (oferta essencial — R$ 399)
```

O objetivo é captar contatos qualificados interessados na criação de Landing Pages para Google Ads e Meta Ads.

Não transformar essas rotas em homepage, site institucional ou catálogo de serviços.

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

As grafias oficiais são:

```text
/landingpage
/landingpage-essencial
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
- as canonicals permanecem `https://www.anuncioesite.com.br/landingpage` e `https://www.anuncioesite.com.br/landingpage-essencial`.

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
3. `docs/CONTENT.md` para copy da oferta completa;
4. `docs/LANDINGPAGE.md` para estrutura e comportamento da oferta completa;
5. `docs/ESSENCIAL.md` para estrutura, comportamento e copy da oferta essencial;
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

### Oferta completa (`/landingpage`)

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

### Oferta essencial (`/landingpage-essencial`)

- Preço total: **R$ 399**.
- Entrada para iniciar: **R$ 199,50 na contratação**.
- Saldo: **R$ 199,50 após a publicação e validação do funcionamento**.
- Prazo: **até 5 dias úteis** após a contratação, o briefing completo e o recebimento dos materiais necessários.
- Ajustes: **1 rodada de ajustes** dentro do escopo aprovado.
- Página única, focada em receber o tráfego da campanha.
- Contato direto pelo WhatsApp com a mensagem oficial pré-preenchida iniciando por "Olá, Willian! Vi a Landing Page Essencial por R$ 399".
- Não inclui domínio, hospedagem, ferramentas de terceiros nem gestão de Google Ads / Meta Ads.
- Não usar "parcela única" em nenhuma superfície da rota essencial.

### Regras comuns

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

`docs/CONTENT.md` contém a copy oficial e aprovada da oferta completa. `docs/ESSENCIAL.md` contém a copy oficial e aprovada da oferta essencial.

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

Preservar a ordem definida em `docs/LANDINGPAGE.md` para `/landingpage`:

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

Preservar a ordem definida em `docs/ESSENCIAL.md` para `/landingpage-essencial`:

1. Cabeçalho.
2. Hero.
3. Faixa de clareza.
4. Para quem é.
5. O que está incluído.
6. Projetos desenvolvidos.
7. Como funciona (4 etapas).
8. Quem é Willian Souza.
9. Investimento.
10. Perguntas frequentes (6 itens).
11. CTA final.
12. Rodapé.

Não existe seção de formulário aberto. O contato acontece pelo WhatsApp.

## 9. CTAs

Todos os CTAs comerciais abrem diretamente o WhatsApp com a mensagem oficial pré-preenchida.

### Oferta completa

Localizações:

- `header`;
- `hero`;
- `portfolio`;
- `investment`;
- `final`;
- `sticky-mobile` (CTA fixo mobile).

### Oferta essencial

Localizações e textos:

- `header` — "Conversar sobre minha página";
- `hero` — "Conversar sobre minha página";
- `pricing` (CTA da seção de projetos) — "Falar sobre meu projeto";
- `investment` — "Quero entender como funciona";
- `final` — "Conversar com Willian no WhatsApp".

O CTA fixo mobile (`StickyCtaMobile`) é **proibido** na rota essencial.

### Regras comuns

Não criar:

- CTA para outra página comercial;
- telefone direto;
- Instagram;
- link externo de portfólio;
- botões concorrentes.

Todo CTA comercial deve falar com a oferta certa (completa ou essencial).

## 10. Fluxo comercial (WhatsApp-first)

O formulário foi removido em 05/08/2026 (commit `a91fdbc`) e não deve ser recriado.

### Experiência

- O contato inicial acontece pela abertura direta do WhatsApp.
- A mensagem é fixa e pré-preenchida, sem dados pessoais na URL.
- O clique abre o WhatsApp no mesmo evento, sem bloqueio ou atraso.
- A conversão acontece na conversa, fora da página.
- Não existe formulário, modal de formulário nem página de obrigado.
- Não existe `generate_lead`.

### Contingência

Se a abertura do WhatsApp falhar por motivo técnico, a página deve:

- não quebrar;
- não exibir erro técnico ao visitante;
- permitir nova tentativa;
- não simular envio nem armazenamento.

## 11. WhatsApp

O WhatsApp é o único caminho inicial de contato comercial.

### Mensagens oficiais

Oferta completa:

```text
Olá, Willian. Vi a Landing Page completa por R$ 997 e quero iniciar meu projeto. Pode me explicar os próximos passos?
```

Oferta essencial:

```text
Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.
```

A mensagem deve estar corretamente codificada na URL.

### Regras

- Centralizar o número (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- Não repetir o número em diversas strings.
- Não renderizar link quebrado quando o número estiver ausente.
- Abrir de forma compatível com celular e desktop.
- Não usar `preventDefault`, `event_callback` nem `window.location` com atraso.

Os eventos antigos `whatsapp_after_lead` e `generate_lead` não existem mais e não devem ser usados.

## 12. Projetos desenvolvidos

Apresentar os cinco projetos definidos em `docs/CONTENT.md`, `docs/LANDINGPAGE.md` e `docs/ESSENCIAL.md`.

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

A foto `public/images/willian-souza.webp` não existe; a seção Sobre não deve renderizar espaços vazios.

## 15. Rastreamento

Seguir exclusivamente `docs/TRACKING.md`.

### Eventos

Implementar apenas:

- `cta_click`;
- `whatsapp_click`;
- `portfolio_open`;
- `portfolio_view_change`;
- `faq_open`.

### Oferta essencial

Na rota `/landingpage-essencial`, `cta_click` e `whatsapp_click` usam **obrigatoriamente**:

```text
offer_variant: essential_399
```

`portfolio_open`, `portfolio_view_change` e `faq_open` mantêm o formato compartilhado atual, sem `offer_variant`. Não enviar `form_id`, `cta_id`, `cta_text` nem `event_version` no rastreamento específico da rota essencial. Não alterar o rastreamento da rota `/landingpage`.

Nenhum evento é conversão. A conversão acontece na conversa do WhatsApp, fora da página.

### Instalação do GTM

O Google Tag Manager está instalado no root layout via `@next/third-parties/google` (`GoogleTagManager`). A renderização é condicional: só ocorre quando `NEXT_PUBLIC_GTM_ID` está presente. O GTM cobre todas as rotas (`/`, `/landingpage`, `/landingpage-essencial`, `/politica-de-privacidade`, `/termos`).

### Microsoft Clarity

O Microsoft Clarity é instalado **exclusivamente pelo GTM**.

- Não instalar snippet do Clarity no código.
- Não criar `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- Não usar o pacote `@microsoft/clarity` sem justificativa e aprovação.
- Não duplicar a tag do Clarity.
- O banner permanece genérico e não menciona "Microsoft Clarity".
- Nenhuma PII pode ser enviada ao Clarity ou ao `dataLayer`.
- A validação real do Clarity (mapas de calor, gravações e mascaramento) é feita no painel do Clarity.

### Proibições

- Não criar conversão no clique.
- Não criar conversão na tentativa.
- Não importar eventos de interação como conversão.
- Não usar R$ 997 (nem R$ 399) como valor de conversão de clique.
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
- Não bloquear o WhatsApp quando a medição for recusada.
- Não confundir consentimento do formulário com consentimento de cookies (não existe formulário nesta versão).
- Validar o comportamento antes da publicação.

### Arquitetura implementada

A implementação segue Consent Mode v2 com três camadas:

1. **Scripts beforeInteractive** (`src/app/layout.tsx`): criam `dataLayer` e `gtag()`, definem consentimento padrão com `wait_for_update: 500`, restauram preferência salva.
2. **ConsentProvider** (`src/components/consent/ConsentProvider.tsx`): componente cliente React com contexto, gerencia banner (primeira visita) e painel de configurações (reabertura).
3. **Componentes de UI**: `ConsentBanner` (fixo inferior), `ConsentSettings` (modal overlay com duas categorias), `ConsentFooterButton` (link nos rodapés).

### Chave de persistência

- `localStorage` com a chave `anuncio_e_site_consent_v1`, contendo versão, preferências e timestamp.

### Mapeamento

| Categoria | Storage type |
|---|---|
| Analytics | `analytics_storage` |
| Publicidade | `ad_storage`, `ad_user_data`, `ad_personalization` |

### Regras

- O banner nunca abre automaticamente após a primeira escolha.
- O painel de configurações nunca abre automaticamente — somente por ação do visitante ("Configurar" no banner ou "Configurações de privacidade" no rodapé).
- O link "Configurações de privacidade" está presente nos rodapés.
- Nenhum dado pessoal é armazenado no `localStorage` como parte do consentimento.
- O Microsoft Clarity segue a categoria Analytics e não dispara enquanto Analytics estiver recusado.

Não publicar tags de publicidade ignorando a preferência do visitante.

## 17. Privacidade e documentos jurídicos

Rotas jurídicas implementadas:

```text
/politica-de-privacidade
/termos
```

As páginas jurídicas são rotas auxiliares autorizadas. Não transformar em rotas comerciais.

Links permitidos:

- Política de Privacidade;
- Termos de Uso;
- voltar ao topo, quando necessário.

Não inventar texto jurídico. O conteúdo é definido em `docs/PRIVACY.md` e `docs/TERMS.md`.

Se as páginas jurídicas não existirem ou não estiverem aprovadas:

- não criar texto definitivo por conta própria;
- não publicar links quebrados;
- registrar a pendência.

## 18. SEO e metadata

Seguir os valores de `docs/LANDINGPAGE.md` e `docs/ESSENCIAL.md`.

### Regras

- Uma única `h1` por página.
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

- Sanitizar conteúdo quando aplicável.
- Limitar tamanhos.
- Aplicar proteção antispam proporcional quando aplicável.
- Usar HTTPS.
- Não expor segredos.
- Não guardar dados pessoais em URL.
- Evitar logs desnecessários.
- Não mostrar detalhes internos.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` é público intencionalmente.
- Não usar prefixo `NEXT_PUBLIC_` em segredos.

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
- formulário;
- página de obrigado;
- CTA flutuante (na rota essencial, em nenhuma versão);
- links externos para os projetos.

## 25. Dependências de publicação

Confirmar antes da publicação:

- número oficial do WhatsApp;
- GTM;
- GA4;
- conversão do Google Ads;
- Meta Pixel;
- Microsoft Clarity (Project ID configurado no GTM);
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
7. testar `/landingpage-essencial` no desktop;
8. testar `/landingpage-essencial` no celular;
9. testar teclado e foco;
10. testar todos os CTAs de WhatsApp nas duas rotas;
11. confirmar a mensagem pré-preenchida correta em cada rota;
12. testar o visualizador de portfólio;
13. testar os eventos;
14. testar consentimento aceito e recusado;
15. verificar console e rede;
16. verificar metadata e canonical;
17. verificar links jurídicos;
18. confirmar que homepage e outras rotas permanecem intactas;
19. executar `docs/CHECKLIST.md`.

Não declarar sucesso quando:

- build falhou;
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
- testar os CTAs de WhatsApp nas duas rotas;
- testar eventos;
- testar consentimento aceito e recusado;
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

## 29. Registro de decisões (ADR)

Base permanente de decisões:

- 2026-05-08: formulário removido (commit `a91fdbc`), fluxo comercial passou a ser WhatsApp-first.
- 2026-08-05: rota `/landingpage-essencial` criada para a oferta essencial (R$ 399 em parcela única).
- 2026-08-05: eventos de rastreamento da rota essencial levam `offer_variant: "landingpage_essencial"` e `form_id: "landingpage_essencial_contact"`.
- 2026-08-05: o CTA fixo mobile (`StickyCtaMobile`) é proibido na rota essencial.
- 2026-08-05: a foto `public/images/willian-souza.webp` não existe; a seção Sobre não deve renderizar espaços vazios.
- 2026-08-05: o rodapé essencial contém `contato@grupows.com` e os links de Política de Privacidade, Termos de Uso e consentimento.
- 2026-08-11: oferta essencial passa a ser em duas etapas (R$ 199,50 na contratação + R$ 199,50 após a publicação e validação do funcionamento). "Parcela única" é proibida na rota essencial.
- 2026-08-11: `offer_variant` da rota essencial passa a ser `"essential_399"`, sem `form_id`, `cta_id`, `cta_text` nem `event_version`. `portfolio_open`, `portfolio_view_change` e `faq_open` permanecem sem `offer_variant`. O rastreamento de `/landingpage` não muda.
- 2026-08-11: mensagem oficial da oferta essencial passa a ser "Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.".
- 2026-08-11: os cinco CTAs da oferta essencial passam a ser "Conversar sobre minha página" (header/hero), "Falar sobre meu projeto" (pricing), "Quero entender como funciona" (investment) e "Conversar com Willian no WhatsApp" (final).
- 2026-08-11: `docs/ESSENCIAL.md` criado como fonte oficial da oferta essencial; seção "Para quem é" adicionada na posição 4 (ordem passa a ter 12 partes).
