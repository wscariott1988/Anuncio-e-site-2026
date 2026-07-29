# Checklist de conclusão — `/landingpage`

> Este checklist define quando a Landing Page da Anúncio & Site pode ser considerada pronta.

## Como usar

- Marcar apenas itens efetivamente verificados.
- Não marcar por suposição.
- Um item não aplicável deve receber justificativa no relatório final.
- Uma dependência ausente deve permanecer como pendência.
- A página não está concluída enquanto houver item crítico não validado.

---

## 1. Documentação

- [ ] `AGENTS.md` está na raiz.
- [ ] `README.md` está na raiz.
- [ ] `docs/CONTENT.md` contém a copy oficial.
- [ ] `docs/LANDINGPAGE.md` contém a especificação funcional atual.
- [ ] `docs/LEADS.md` contém a arquitetura e o esquema oficial da planilha.
- [ ] `docs/DESIGN.md` contém o sistema visual.
- [ ] `docs/TRACKING.md` contém os eventos atuais.
- [ ] `docs/CHECKLIST.md` contém esta versão.
- [ ] Não existem versões antigas conflitantes sendo usadas como fonte.
- [ ] Todos os documentos foram lidos antes da implementação.

## 2. Escopo do repositório

- [ ] A rota oficial é `/landingpage`.
- [ ] A rota incorreta `/landingpge` não foi criada.
- [ ] A homepage não foi modificada (exceto o redirect temporário `/` → `/landingpage`).
- [ ] Blog e artigos não foram modificados.
- [ ] Outras rotas permanecem funcionando.
- [ ] Componentes compartilhados não foram quebrados.
- [ ] Alterações preexistentes do usuário foram preservadas.
- [ ] Nenhum arquivo fora do escopo foi reescrito sem necessidade.
- [ ] Nenhuma dependência foi trocada por preferência.
- [ ] Nenhum segundo lockfile foi criado.
- [ ] Nenhum comando destrutivo de Git foi utilizado.

## 3. Oferta e conteúdo

- [ ] A copy corresponde a `CONTENT.md`.
- [ ] O nome Anúncio & Site está correto.
- [ ] O nome Willian Souza está correto.
- [ ] O texto usa primeira pessoa do singular.
- [ ] Não existe “nós” sugerindo equipe inexistente.
- [ ] O serviço é apresentado como Landing Page completa para tráfego pago.
- [ ] O investimento é R$ 997.
- [ ] A entrada é R$ 498,50.
- [ ] O saldo é R$ 498,50 após publicação e funcionamento.
- [ ] O prazo é de até 7 dias úteis.
- [ ] O início do prazo depende da entrada, briefing e materiais.
- [ ] Estão incluídas até duas rodadas de ajustes.
- [ ] Custos externos estão explicados.
- [ ] Itens fora do escopo estão explicados.
- [ ] Não existe preço riscado.
- [ ] Não existe desconto ou condição de lançamento.
- [ ] Não existe urgência artificial.
- [ ] Não existe promessa de vendas, leads ou retorno.
- [ ] Não existem depoimentos ou provas inventadas.
- [ ] Não existem placeholders apresentados como conteúdo real.
- [ ] Não existem erros de ortografia.

## 4. Estrutura da página

- [ ] Cabeçalho.
- [ ] Hero.
- [ ] Faixa de clareza.
- [ ] Problema e solução.
- [ ] O que está incluído.
- [ ] Projetos desenvolvidos.
- [ ] Como funciona.
- [ ] Quem é Willian Souza.
- [ ] Investimento.
- [ ] Perguntas frequentes.
- [ ] CTA final.
- [ ] Rodapé.
- [ ] As seções aparecem na ordem definida.
- [ ] O formulário não aparece aberto como seção final.
- [ ] Não existe página de obrigado.
- [ ] Não existe menu institucional.
- [ ] Não existem links que desviem da conversão.

## 5. Cabeçalho e CTAs

- [ ] O cabeçalho contém somente marca e CTA.
- [ ] A marca leva ao topo da própria página.
- [ ] O CTA do cabeçalho abre o formulário.
- [ ] O CTA da hero abre o formulário.
- [ ] O CTA do portfólio abre o formulário.
- [ ] O CTA de investimento abre o formulário.
- [ ] O CTA final abre o formulário.
- [ ] Todos abrem a mesma instância lógica do formulário.
- [ ] A origem de cada CTA é preservada.
- [ ] Não existe CTA fixo no celular.
- [ ] Não existe telefone direto.
- [ ] Não existe WhatsApp direto.
- [ ] Não existe botão flutuante de WhatsApp.

## 6. Design

- [ ] A direção visual segue `DESIGN.md`.
- [ ] O visual é claro, premium e comercial.
- [ ] Superfícies sólidas predominam.
- [ ] Bento Box é usado seletivamente.
- [ ] Glassmorphism aparece apenas como detalhe.
- [ ] O CTA principal é sólido e contrastante.
- [ ] Formulário e FAQ usam superfícies sólidas.
- [ ] A paleta está consistente.
- [ ] A tipografia está consistente.
- [ ] Espaçamentos e raios estão consistentes.
- [ ] Não existe fundo escuro dominante.
- [ ] Não existem efeitos neon.
- [ ] Não existem animações chamativas.
- [ ] Não existe parallax pesado.
- [ ] Não existe rolagem presa.
- [ ] Não existe dashboard falso.
- [ ] O preço está evidente sem dominar toda a página.
- [ ] A página não parece curso, software ou template.

## 7. Hero e materiais

- [ ] Existe uma única `h1`.
- [ ] A oferta é compreensível rapidamente.
- [ ] O preço está visível.
- [ ] O prazo está visível.
- [ ] As duas rodadas de ajustes estão visíveis.
- [ ] O CTA aparece antes do mockup no celular.
- [ ] O mockup representa desktop e celular.
- [ ] O mockup não contém dados fictícios.
- [ ] A imagem principal possui largura e altura definidas.
- [ ] O logotipo é real e aprovado.
- [ ] A foto de Willian é real e aprovada.
- [ ] A composição visual da hero está aprovada.
- [ ] Nenhum placeholder permanece em produção.

## 8. Projetos desenvolvidos

- [ ] Mecânica Auto Brum está presente.
- [ ] ZARQ Planejados está presente.
- [ ] Agafarma Mário Quintana está presente.
- [ ] BS Montagem de Móveis está presente.
- [ ] Artur Montador está presente.
- [ ] Nomes e descrições correspondem a `CONTENT.md`.
- [ ] Existe autorização para apresentar os projetos.
- [ ] Nenhum projeto possui link externo.
- [ ] Nenhum card abre o site real.
- [ ] Cada projeto possui capa WebP.
- [ ] Cada projeto possui captura mobile WebP.
- [ ] Cada projeto possui captura desktop WebP.
- [ ] Os PNGs originais não foram modificados.
- [ ] A pasta `/originals` está no `.gitignore`.
- [ ] Os PNGs originais não estão na pasta pública.
- [ ] As capas possuem até 200 KB.
- [ ] Capturas mobile possuem até 1 MB ou exceção justificada.
- [ ] Capturas desktop possuem até 2 MB ou exceção justificada.
- [ ] As capturas mantêm toda a extensão vertical.
- [ ] As imagens não estão deformadas.
- [ ] Largura e altura estão informadas.
- [ ] Capturas completas usam carregamento tardio.
- [ ] Abrir um projeto não carrega os demais.

## 9. Visualizador dos projetos

- [ ] O card possui uma única área interativa válida.
- [ ] O modal possui título acessível.
- [ ] O botão de fechar possui nome acessível.
- [ ] O modal fecha com `Esc`.
- [ ] O modal fecha pelo botão.
- [ ] O fundo fica bloqueado durante a abertura.
- [ ] O foco fica contido no modal.
- [ ] O foco retorna ao card de origem.
- [ ] Existe estado de carregamento.
- [ ] Existe estado de erro da imagem.
- [ ] No celular, somente a captura mobile é carregada.
- [ ] No celular, a captura desktop não é carregada.
- [ ] No desktop, a visualização começa em mobile.
- [ ] No desktop, existe controle Celular/Desktop.
- [ ] A captura desktop carrega somente quando selecionada.
- [ ] Trocar de projeto retorna à visualização mobile.
- [ ] Fechar e reabrir retorna à visualização mobile.
- [ ] A rolagem vertical da captura funciona.

## 10. Formulário — abertura e experiência

- [ ] Todos os CTAs abrem o mesmo modal.
- [ ] O modal abre somente por ação do visitante.
- [ ] O modal nunca abre automaticamente.
- [ ] Não existe pop-up por tempo.
- [ ] Não existe pop-up por rolagem.
- [ ] Não existe pop-up de saída.
- [ ] A tela inicial informa cerca de 40 segundos.
- [ ] Uma pergunta é apresentada por vez.
- [ ] O progresso mostra Contato, Sobre o projeto e Confirmar.
- [ ] O número total de perguntas não gera ruído desnecessário.
- [ ] É possível voltar.
- [ ] Voltar preserva respostas.
- [ ] Fechar e reabrir durante a visita preserva respostas.
- [ ] Reabrir não altera a origem após o formulário ter iniciado.
- [ ] Nenhum dado pessoal aparece na URL.
- [ ] O modal funciona no celular.
- [ ] O teclado virtual não esconde a ação.
- [ ] Não existe rolagem horizontal.

## 11. Formulário — campos e validação

- [ ] Nome.
- [ ] WhatsApp.
- [ ] Negócio ou serviço.
- [ ] Situação atual dos anúncios.
- [ ] Possui site ou Landing Page.
- [ ] URL atual condicional.
- [ ] Revisão das respostas.
- [ ] Consentimento com Política de Privacidade.
- [ ] Campos obrigatórios são validados.
- [ ] A URL é opcional.
- [ ] A URL é validada somente quando preenchida.
- [ ] O telefone aceita número brasileiro com DDD.
- [ ] O telefone aceita colagem.
- [ ] O telefone é normalizado no envio.
- [ ] Labels permanecem visíveis.
- [ ] Placeholders não substituem labels.
- [ ] Erros aparecem junto aos campos.
- [ ] Erros não dependem somente da cor.
- [ ] O foco vai ao primeiro erro quando necessário.
- [ ] O consentimento não vem marcado.
- [ ] A Política de Privacidade está acessível.

## 12. Formulário — servidor e armazenamento

- [ ] O endpoint real está definido.
- [ ] O endpoint do Apps Script web app está confirmado.
- [ ] O secret do Apps Script está definido e testado.
- [ ] A planilha `Leads — Anúncio & Site` está confirmada.
- [ ] A aba possui o nome exato `Leads`.
- [ ] Os 24 cabeçalhos correspondem exatamente a `docs/LEADS.md`.
- [ ] Os 24 cabeçalhos estão na ordem oficial.
- [ ] Não existem colunas inseridas entre as colunas oficiais.
- [ ] O Apps Script possui acesso de edição na planilha.
- [ ] O Apps Script utiliza LockService.
- [ ] O navegador não envia diretamente para o Apps Script.
- [ ] A forma de notificação está definida.
- [ ] A política de retenção está definida.
- [ ] Existe contingência operacional.
- [ ] O servidor valida todos os dados antes de enviar ao Apps Script.
- [ ] O servidor normaliza o telefone.
- [ ] O servidor sanitiza conteúdo.
- [ ] Valores livres não são interpretados como fórmulas no Sheets.
- [ ] Existem limites de tamanho.
- [ ] Existe proteção antispam proporcional.
- [ ] Existe rate limit ou solução equivalente.
- [ ] Existe chave de idempotência.
- [ ] Duplo clique não cria dois leads.
- [ ] Nova tentativa segura não cria dois leads.
- [ ] O servidor devolve um `lead_id` opaco.
- [ ] O mesmo envio seguro devolve o mesmo `lead_id`.
- [ ] Uma única linha é gravada por `lead_id`.
- [ ] `status_atendimento` inicia como `Novo`.
- [ ] `observacoes` inicia vazio.
- [ ] Reprocessamento não sobrescreve `status_atendimento`.
- [ ] Reprocessamento não sobrescreve `observacoes`.
- [ ] Falha de notificação não apaga lead armazenado.
- [ ] Nenhum segredo aparece no cliente.
- [ ] Nenhum dado sensível aparece no log.

## 13. Formulário — estados

- [ ] O botão final diz “Enviar informações”.
- [ ] O botão é desabilitado durante o envio.
- [ ] O estado “Enviando informações…” aparece.
- [ ] A largura do botão permanece estável.
- [ ] `form_submit_attempt` não é conversão.
- [ ] O sucesso aparece somente após confirmação do servidor.
- [ ] O sucesso depende da confirmação do Apps Script.
- [ ] A confirmação do Sheets não dispara um segundo sucesso.
- [ ] Falha somente do Sheets não dispara `form_error`.
- [ ] O sucesso acontece dentro do modal.
- [ ] Atualizar a página não repete o sucesso.
- [ ] Erro de validação preserva respostas.
- [ ] Falha de rede preserva respostas.
- [ ] Falha do servidor preserva respostas.
- [ ] “Tentar novamente” é a primeira ação após falha.
- [ ] Erros não expõem detalhes internos.
- [ ] O WhatsApp de contingência não aparece por erro de preenchimento.

## 14. WhatsApp

- [ ] O número oficial está configurado centralmente.
- [ ] O número foi testado.
- [ ] O link funciona no celular.
- [ ] O link funciona no desktop.
- [ ] O link não é renderizado quando o número está ausente.
- [ ] O WhatsApp aparece após lead confirmado.
- [ ] A mensagem pós-lead corresponde a `CONTENT.md`.
- [ ] `whatsapp_after_lead` dispara somente após o lead.
- [ ] `whatsapp_after_lead` não gera outro lead.
- [ ] O WhatsApp não aparece em erro de validação ou erro técnico.
- [ ] O evento antigo `whatsapp_click` não existe.

## 15. Eventos

- [ ] `cta_click`.
- [ ] `form_open`.
- [ ] `form_start`.
- [ ] `form_step`.
- [ ] `form_submit_attempt`.
- [ ] `form_error`.
- [ ] `generate_lead`.
- [ ] `whatsapp_after_lead`.
- [ ] `portfolio_open`.
- [ ] `portfolio_view_change`.
- [ ] `faq_open`.
- [ ] Os nomes seguem `snake_case`.
- [ ] Os parâmetros seguem `TRACKING.md`.
- [ ] `source_cta` é preservado.
- [ ] `form_start` dispara apenas uma vez.
- [ ] Cada `form_step` dispara apenas uma vez.
- [ ] `generate_lead` dispara apenas uma vez.
- [ ] `generate_lead` ocorre depois do armazenamento primário.
- [ ] A sincronização com Sheets não repete `generate_lead`.
- [ ] React Strict Mode não duplica eventos.
- [ ] Reabrir o modal não duplica a conversão.
- [ ] Atualizar a página não duplica a conversão.

## 16. `dataLayer` e privacidade

- [ ] Existe um módulo central de rastreamento.
- [ ] Ausência do GTM não quebra a página.
- [ ] Nome não aparece no `dataLayer`.
- [ ] Telefone não aparece no `dataLayer`.
- [ ] Negócio ou serviço não aparece no `dataLayer`.
- [ ] URL informada não aparece no `dataLayer`.
- [ ] Respostas não aparecem no `dataLayer`.
- [ ] Dados pessoais não aparecem no console.
- [ ] Dados pessoais não aparecem em URLs.
- [ ] `lead_id` é opaco.
- [ ] `lead_id` não deriva de telefone ou nome.
- [ ] `event_id` é opaco.
- [ ] Nenhum identificador opaco foi criado como dimensão de alta cardinalidade.

## 17. GA4

- [ ] GA4 está instalado uma única vez.
- [ ] `generate_lead` chega ao GA4.
- [ ] `generate_lead` está marcado como evento principal.
- [ ] Eventos de interação não estão marcados como conversão.
- [ ] Não existe `generate_lead` recriado a partir de outro evento.
- [ ] Formulários automáticos não duplicam `form_start`.
- [ ] `form_submit` automático não é tratado como lead.
- [ ] Existe somente um `page_view` por visualização.
- [ ] Parâmetros foram conferidos no DebugView.

## 18. Google Ads

- [ ] Existe uma única ação principal para lead.
- [ ] A categoria da conversão está correta.
- [ ] A contagem está configurada como uma.
- [ ] A conversão depende do servidor.
- [ ] R$ 997 não foi usado como valor do lead.
- [ ] Apenas um método foi escolhido: tag direta ou importação do GA4.
- [ ] Não existe tag direta e importação duplicadas.
- [ ] `transaction_id` usa o identificador do lead quando aplicável.
- [ ] Conversion Linker foi validado quando aplicável.
- [ ] `form_submit_attempt` não dispara Google Ads.
- [ ] WhatsApp não dispara Google Ads.

## 19. Meta Pixel

- [ ] Meta Pixel está instalado uma única vez.
- [ ] Um único evento `Lead` dispara após `generate_lead`.
- [ ] O evento não dispara no clique do botão.
- [ ] O evento não dispara na tentativa.
- [ ] O evento não dispara no WhatsApp.
- [ ] Nenhum dado pessoal é enviado.
- [ ] Advanced Matching não foi adicionado.
- [ ] CAPI não foi adicionada.
- [ ] O Pixel respeita consentimento.
- [ ] O evento foi validado na ferramenta de teste disponível.

## 20. Origem e atribuição

- [ ] `utm_source`.
- [ ] `utm_medium`.
- [ ] `utm_campaign`.
- [ ] `utm_term`.
- [ ] `utm_content`.
- [ ] `gclid`.
- [ ] `gbraid`.
- [ ] `wbraid`.
- [ ] `fbclid`.
- [ ] `entry_path`.
- [ ] `referrer_hostname`.
- [ ] `source_cta`.
- [ ] `lead_source`.
- [ ] Parâmetros são capturados na entrada.
- [ ] A origem permanece durante o formulário.
- [ ] Apenas parâmetros permitidos são armazenados.
- [ ] Existem limites de tamanho.
- [ ] Parâmetros desconhecidos são descartados.
- [ ] `lead_source` é normalizado.
- [ ] A origem chega ao registro do lead.
- [ ] A origem chega às colunas correspondentes da planilha.
- [ ] Parâmetros ausentes permanecem vazios.

## 21. Consentimento

- [ ] O controle de consentimento usa a copy aprovada.
- [ ] O estado padrão é definido antes das tags.
- [ ] `analytics_storage` inicia negado.
- [ ] `ad_storage` inicia negado.
- [ ] `ad_user_data` inicia negado.
- [ ] `ad_personalization` inicia negado.
- [ ] “Aceitar medição” atualiza os estados previstos.
- [ ] “Recusar recursos não essenciais” mantém os estados negados.
- [ ] Preferências personalizadas funcionam.
- [ ] A escolha fica persistida.
- [ ] É possível alterar a escolha posteriormente.
- [ ] Meta Pixel não dispara quando publicidade está recusada.
- [ ] Tags não essenciais respeitam a escolha.
- [ ] O formulário funciona com tudo recusado.
- [ ] O sucesso funciona com tudo recusado.
- [ ] O WhatsApp pós-lead funciona com tudo recusado.
- [ ] O consentimento de medição não é confundido com o consentimento do formulário.

## 22. SEO e metadata

- [ ] Title correto.
- [ ] Meta description correta.
- [ ] Canonical aponta para `https://www.anuncioesite.com.br/landingpage`.
- [ ] Open Graph está configurado.
- [ ] A imagem social é real e aprovada.
- [ ] Favicon funciona.
- [ ] Existe uma única `h1`.
- [ ] A hierarquia de títulos é coerente.
- [ ] Imagens informativas possuem texto alternativo.
- [ ] Imagens decorativas usam `alt=""`.
- [ ] Preview e homologação usam `noindex`.
- [ ] Produção está indexável somente após aprovação.
- [ ] Sitemap foi tratado.
- [ ] Robots foi tratado.
- [ ] Dados estruturados não possuem informações inventadas.

## 23. Rodapé e documentos jurídicos

- [ ] O rodapé usa a copy de `CONTENT.md`.
- [ ] Política de Privacidade está acessível.
- [ ] Termos de Uso estão acessíveis.
- [ ] Não existem links jurídicos quebrados.
- [ ] O conteúdo jurídico foi aprovado.
- [ ] Não existe telefone no rodapé.
- [ ] Não existe WhatsApp no rodapé.
- [ ] Não existe Instagram no rodapé.
- [ ] Não existe blog no rodapé.
- [ ] Não existe portfólio externo no rodapé.

## 23a. Páginas jurídicas

- [ ] `/politica-de-privacidade` retorna status 200.
- [ ] `/termos` retorna status 200.
- [ ] Cada página possui uma única `h1`.
- [ ] Cada página possui data de última atualização visível.
- [ ] As datas correspondem a `docs/PRIVACY.md` e `docs/TERMS.md`.
- [ ] O e-mail contato@grupows.com está presente com link `mailto:`.
- [ ] Não existem dados fictícios de CPF, CNPJ ou responsável.
- [ ] Não existe texto provisório ou placeholder.
- [ ] O layout usa o componente `LegalPageLayout`.
- [ ] O cabeçalho contém somente marca e link "Voltar para a Landing Page".
- [ ] O rodapé contém marca, links para ambas as páginas jurídicas, e-mail e link para `/landingpage`.
- [ ] Não existe link para `/` no cabeçalho ou rodapé das páginas jurídicas.
- [ ] As páginas possuem `noindex` e `follow`.
- [ ] A canonical está correta para cada página.
- [ ] Não existem scripts ou dependências externas adicionadas.
- [ ] Não existe `dangerouslySetInnerHTML`.
- [ ] Não existe rolagem horizontal em 360, 390, 768 e 1440 px.
- [ ] Não existem erros no console ao carregar cada página.

## 24. Acessibilidade

- [ ] A página pode ser navegada por teclado.
- [ ] O foco é visível.
- [ ] A ordem de foco é lógica.
- [ ] Landmarks são semânticos.
- [ ] Botões possuem nomes acessíveis.
- [ ] Campos possuem labels associadas.
- [ ] Erros são anunciados.
- [ ] Estados de carregamento são anunciados.
- [ ] Contraste foi verificado.
- [ ] Alvos clicáveis possuem tamanho adequado.
- [ ] O formulário funciona sem mouse.
- [ ] A FAQ funciona sem mouse.
- [ ] Os modais mantêm foco.
- [ ] Os modais restauram foco.
- [ ] Os modais fecham com `Esc`.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] O conteúdo continua compreensível sem animação.

## 25. Responsividade

- [ ] 320 px.
- [ ] 375 px.
- [ ] 390 px.
- [ ] 768 px.
- [ ] 1024 px.
- [ ] 1280 px.
- [ ] 1440 px.
- [ ] Não existe rolagem horizontal acidental.
- [ ] Textos não são cortados.
- [ ] Botões não são cortados.
- [ ] Cards não ficam comprimidos.
- [ ] Mockups cabem na tela.
- [ ] O teclado não cobre a ação.
- [ ] Áreas seguras do aparelho foram respeitadas.
- [ ] Elementos fixos não cobrem conteúdo.
- [ ] Portfólio usa faixa horizontal com scroll-snap no mobile.
- [ ] Portfólio usa grid no desktop.
- [ ] Portfólio não possui autoplay nem animação automática.
- [ ] Texto sr-only de orientação ao swipe está presente.
- [ ] "O que está incluído" usa painel compacto com divide-y no mobile.
- [ ] "O que está incluído" usa grid uniforme 3×2 no desktop.
- [ ] "O que está incluído" usa grid 2×3 no tablet.
- [ ] "O que está incluído" não possui col-span especial no desktop.
- [ ] "Projetos desenvolvidos" usa faixa horizontal com scroll-snap no mobile.
- [ ] "Projetos desenvolvidos" usa grid 2 colunas no tablet.
- [ ] "Projetos desenvolvidos" usa grid 6 colunas no desktop com segunda linha centralizada.
- [ ] "Projetos desenvolvidos" possui 5 cartões com mesma largura no desktop.
- [ ] "Como funciona" usa leitura vertical no mobile.
- [ ] "Como funciona" usa grid 2×2 no tablet.
- [ ] "Como funciona" usa 4 colunas em uma linha no desktop.
- [ ] "Como funciona" mantém "Prazo do projeto" como faixa separada abaixo das etapas.
- [ ] "Quem é Willian Souza" usa grid-cols-2 (2×2) no mobile.
- [ ] "Quem é Willian Souza" usa layout de duas colunas no desktop (texto à esquerda, indicadores 2×2 à direita).
- [ ] "Quem é Willian Souza" usa apresentação acima e indicadores 2×2 abaixo no tablet.
- [ ] "Projetos desenvolvidos" usa CTA centralizado no desktop.
- [ ] "Projetos desenvolvidos" usa microcopy centralizada e limitada no desktop.
- [ ] Todos os textos e CTAs estão preservados nos padrões compactos.
- [ ] Desktop não foi afetado pelos padrões compactos.

## 26. Desempenho

- [ ] Build de produção foi usado no teste.
- [ ] LCP foi medido.
- [ ] INP foi medido.
- [ ] CLS foi medido.
- [ ] Imagem principal possui prioridade adequada.
- [ ] Imagens abaixo da dobra usam lazy loading.
- [ ] Capturas completas não carregam na abertura da página.
- [ ] Fontes estão otimizadas.
- [ ] JavaScript desnecessário foi evitado.
- [ ] Scripts de terceiros estão controlados.
- [ ] Não existe mudança excessiva de layout.
- [ ] Lighthouse foi executado em mobile.
- [ ] Lighthouse foi executado em desktop.
- [ ] Exceções de desempenho foram registradas.

## 27. Segurança

- [ ] HTTPS funciona.
- [ ] Entradas são validadas no servidor.
- [ ] Entradas são sanitizadas.
- [ ] Tamanhos são limitados.
- [ ] Existe proteção contra abuso.
- [ ] Nenhuma credencial está no código.
- [ ] Nenhum segredo usa `NEXT_PUBLIC_`.
- [ ] `.env.local` não está versionado.
- [ ] `.env.example` não contém valores reais.
- [ ] Erros não revelam detalhes internos.
- [ ] Logs não armazenam dados pessoais desnecessários.
- [ ] Dados pessoais não aparecem na URL.
- [ ] CAPTCHA intrusivo não foi adicionado sem necessidade.

## 28. Testes técnicos

- [ ] Dependências foram instaladas com o gerenciador correto.
- [ ] O lockfile existente foi preservado.
- [ ] Lint foi executado, quando disponível.
- [ ] Verificação de tipos foi executada, quando disponível.
- [ ] Testes automatizados foram executados, quando disponíveis.
- [ ] Build de produção foi concluído.
- [ ] Playwright não reutilizou servidor antigo (`reuseExistingServer: false`).
- [ ] Porta 3000 esteve livre antes dos testes.
- [ ] Capturas foram geradas a partir do build atual.
- [ ] Não existem erros relevantes no console.
- [ ] Não existem erros inesperados na rede.
- [ ] Links internos funcionam.
- [ ] Chrome foi testado.
- [ ] Edge foi testado.
- [ ] Safari ou equivalente foi testado quando disponível.
- [ ] Rotas existentes continuam funcionando.
- [ ] Página 404 não foi prejudicada (rota `/` agora redireciona em vez de 404).

## 29. Testes do formulário

- [ ] Envio válido.
- [ ] Campo obrigatório vazio.
- [ ] Telefone inválido.
- [ ] URL inválida.
- [ ] Consentimento não marcado.
- [ ] Erro de rede.
- [ ] Erro do servidor.
- [ ] Rate limit.
- [ ] Duplo clique.
- [ ] Nova tentativa após erro.
- [ ] Timeout seguido de confirmação.
- [ ] Fechar e reabrir.
- [ ] Voltar e editar.
- [ ] Atualizar a página.
- [ ] Lead confirmado pelo Apps Script uma única vez.
- [ ] Mesmo `lead_id` gravado uma única vez na planilha.
- [ ] Linha possui exatamente 24 colunas na ordem oficial.
- [ ] UTMs presentes foram preservadas.
- [ ] UTMs ausentes não foram inventadas.
- [ ] Texto iniciado por caractere de fórmula permaneceu como texto.
- [ ] Falha temporária do Sheets foi recuperada.
- [ ] Falha persistente do Sheets manteve o lead pendente.
- [ ] Recuperação do Sheets não gerou outra conversão.
- [ ] Alterações manuais de status e observações foram preservadas.
- [ ] Notificação recebida.
- [ ] WhatsApp pós-lead.
- [ ] WhatsApp por contingência.
- [ ] Formulário com medição recusada.

## 30. Ambiente e publicação

- [ ] IDs de desenvolvimento não apontam para produção.
- [ ] Preview não polui analytics real.
- [ ] Preview usa `noindex`.
- [ ] Variáveis de produção estão configuradas.
- [ ] Domínio oficial está confirmado.
- [ ] Deploy foi autorizado por Willian.
- [ ] HTTPS funciona no domínio real.
- [ ] `/landingpage` funciona no domínio real.
- [ ] Formulário foi testado no domínio real.
- [ ] Lead confirmado pelo Apps Script no teste real.
- [ ] Lead chegou uma única vez à aba `Leads`.
- [ ] WhatsApp foi testado no domínio real.
- [ ] Eventos foram testados no domínio real.
- [ ] Conversão do Google Ads foi validada.
- [ ] Meta `Lead` foi validado.
- [ ] Canonical foi validada.
- [ ] Metadata foi validada.
- [ ] Mobile foi testado no domínio real.
- [ ] Desktop foi testado no domínio real.

## 31. Dependências finais

- [ ] Número oficial do WhatsApp.
- [ ] Endpoint do Apps Script web app.
- [ ] Secret do Apps Script.
- [ ] Política de retenção.
- [ ] Identificador da planilha.
- [ ] Aba `Leads` com 24 colunas.
- [ ] Apps Script com acesso de edição na planilha.
- [ ] Idempotência e reprocessamento testados.
- [ ] Notificação dos leads.
- [ ] GTM.
- [ ] GA4.
- [ ] Google Ads.
- [ ] Meta Pixel.
- [ ] Consentimento.
- [ ] Política de Privacidade.
- [ ] Termos de Uso.
- [ ] Logotipo.
- [ ] Foto de Willian.
- [ ] Visual do hero.
- [ ] Imagem Open Graph.
- [ ] Dez capturas do portfólio.
- [ ] Autorizações dos projetos.

Itens ausentes devem permanecer como pendência. Não preencher com informação inventada.

## 32. Relatório de conclusão

- [ ] Arquivos alterados foram listados.
- [ ] Comportamentos implementados foram explicados.
- [ ] Comandos executados foram informados.
- [ ] Testes concluídos foram informados.
- [ ] Resultado do build foi informado.
- [ ] Pendências foram informadas.
- [ ] Itens não testados foram informados.
- [ ] Nenhuma validação foi declarada sem ter acontecido.
- [ ] Nenhum item fora do escopo foi incluído silenciosamente.

## 33. Aprovação final

A Landing Page somente está pronta quando:

- [ ] Willian aprovou a versão.
- [ ] Todos os itens críticos foram validados.
- [ ] O formulário armazenou um lead real no Google Sheets via Apps Script.
- [ ] O mesmo `lead_id` chegou uma única vez ao Google Sheets.
- [ ] A linha respeitou o esquema das 24 colunas de `docs/LEADS.md`.
- [ ] Uma falha de Sheets foi simulada sem perda do lead.
- [ ] O reprocessamento foi concluído sem duplicidade.
- [ ] `generate_lead` disparou uma única vez.
- [ ] Google Ads não recebeu duplicidade.
- [ ] Meta não recebeu duplicidade.
- [ ] Nenhum WhatsApp foi contabilizado como novo lead.
- [ ] Dados pessoais não apareceram nas plataformas.
- [ ] Homepage e outras rotas permaneceram intactas (redirect temporário `/` → `/landingpage` está ativo).
- [ ] Build de produção foi concluído.
- [ ] Testes no domínio real foram concluídos.
