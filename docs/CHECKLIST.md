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
- [ ] `docs/ESSENCIAL.md` contém a especificação funcional e a copy da oferta essencial.
- [ ] `docs/LEADS.md` está marcado como suspenso (o armazenamento de leads não está em uso).
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
- [ ] Não restaram scripts, imports, estados, estilos ou arquivos órfãos do formulário removido (`LeadFormModal`, `ClarityStrip`, `ProblemSection`, `api/leads`).

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
- [ ] O briefing é enviado somente depois da contratação.
- [ ] Estão incluídas até duas rodadas de ajustes.
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
- [ ] Bloco de confiança.
- [ ] Projetos reais.
- [ ] O que está incluído.
- [ ] Processo simples.
- [ ] Quem é Willian Souza.
- [ ] Investimento.
- [ ] Perguntas frequentes.
- [ ] CTA final.
- [ ] Rodapé.
- [ ] As seções aparecem na ordem definida em `LANDINGPAGE.md`.
- [ ] Não existe formulário aberto como seção final.
- [ ] Não existe modal de formulário.
- [ ] Não existe página de obrigado.
- [ ] Não existe menu institucional.
- [ ] Não existem links que desviem da conversão.

## 5. Cabeçalho e CTAs

- [ ] O cabeçalho contém somente marca e CTA.
- [ ] A marca leva ao topo da própria página.
- [ ] Todos os CTAs comerciais abrem diretamente o WhatsApp.
- [ ] O CTA do cabeçalho (`header`) abre o WhatsApp.
- [ ] O CTA da hero (`hero`) abre o WhatsApp.
- [ ] O CTA do portfólio (`portfolio`) abre o WhatsApp.
- [ ] O CTA de investimento (`investment`) abre o WhatsApp.
- [ ] O CTA final (`final`) abre o WhatsApp.
- [ ] O CTA fixo mobile (`sticky-mobile`) abre o WhatsApp.
- [ ] Todos os CTAs usam a mesma mensagem pré-preenchida.
- [ ] A origem de cada CTA é preservada em `data-cta-location`.
- [ ] Nenhum CTA abre o formulário.
- [ ] Não existe telefone direto.
- [ ] Não existe WhatsApp adicional no cabeçalho ou nas seções.
- [ ] Não existe botão flutuante de WhatsApp além do CTA fixo mobile.
- [ ] Não existe CTA para outra página comercial.

## 6. WhatsApp

- [ ] O número oficial está configurado centralmente (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- [ ] O número foi testado.
- [ ] O link funciona no celular.
- [ ] O link funciona no desktop.
- [ ] O link abre em nova aba.
- [ ] O link usa `target="_blank"` e `rel="noopener noreferrer"`.
- [ ] A mensagem pré-preenchida corresponde a `CONTENT.md`.
- [ ] A mensagem está corretamente codificada na URL.
- [ ] O link não é renderizado quando o número está ausente.
- [ ] O clique não é bloqueado por `preventDefault`.
- [ ] O clique não depende de `event_callback`.
- [ ] O clique não usa `window.location` com atraso.
- [ ] O clique dispara `cta_click` e `whatsapp_click` sem bloquear a navegação.
- [ ] Não existe evento antigo `whatsapp_after_lead`.
- [ ] O evento antigo `whatsapp_click` foi substituído pelo novo fluxo, quando aplicável.
- [ ] O WhatsApp não aparece no rodapé.
- [ ] O WhatsApp não aparece na FAQ.
- [ ] O WhatsApp não aparece como contingência de formulário.

## 7. CTA fixo mobile

- [ ] Existe CTA fixo na parte inferior.
- [ ] É exibido somente em telas de celular (`md:hidden`).
- [ ] Não aparece no desktop.
- [ ] Não aparece na primeira dobra quando o CTA da hero está visível.
- [ ] Some quando o CTA da hero está visível.
- [ ] Aparece após pequena rolagem.
- [ ] Oculto enquanto o banner de consentimento está visível.
- [ ] Oculto quando o rodapé está visível.
- [ ] O CTA usa `cta_location = sticky-mobile`.
- [ ] O CTA abre diretamente o WhatsApp com a mensagem oficial.
- [ ] Não cobre conteúdo importante.
- [ ] Exibe "Projeto completo: R$ 997" e a ação "Quero iniciar por R$ 498,50".

## 8. Design

- [ ] A direção visual segue `DESIGN.md`.
- [ ] O visual é claro, premium e comercial.
- [ ] Superfícies sólidas predominam.
- [ ] Bento Box é usado seletivamente.
- [ ] Glassmorphism aparece apenas como detalhe.
- [ ] O CTA principal é sólido e contrastante.
- [ ] Textos longos usam superfícies sólidas.
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

## 9. Hero e materiais

- [ ] Existe uma única `h1`.
- [ ] A oferta é compreensível rapidamente.
- [ ] O preço total de R$ 997 está visível.
- [ ] A forma de pagamento (entrada e saldo) está visível.
- [ ] O prazo está visível.
- [ ] As duas rodadas de ajustes estão visíveis.
- [ ] O CTA aparece antes do mockup no celular.
- [ ] O mockup representa desktop e celular.
- [ ] O mockup usa capturas reais da ZARQ Planejados.
- [ ] O mockup não contém dados fictícios.
- [ ] O endereço visual usa `zarqplanejados.com.br` e não é um link.
- [ ] A imagem principal possui largura e altura definidas.
- [ ] O logotipo é real e aprovado.
- [ ] A foto de Willian é real e aprovada.
- [ ] A composição visual da hero está aprovada.
- [ ] Nenhum placeholder permanece em produção.
- [ ] O bloco de confiança corresponde a `CONTENT.md`.

## 10. Projetos desenvolvidos

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
- [ ] O CTA da seção abre o WhatsApp com `cta_location = portfolio`.

## 11. Visualizador dos projetos

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

## 12. O que está incluído

- [ ] Os 6 itens de `CONTENT.md` estão presentes (Estratégia e copy, Design responsivo, Desenvolvimento moderno, Formulário e WhatsApp, Rastreamento, Publicação e testes).
- [ ] A nota das duas rodadas de ajustes está presente.
- [ ] Não existem serviços inventados.
- [ ] Não existe CTA nesta seção.
- [ ] Existe uma única estrutura semântica (sem DOM duplicado por viewport).
- [ ] Mobile usa grid de 1 coluna.
- [ ] Tablet usa grid de 2 colunas.
- [ ] Desktop usa grid uniforme de 3 colunas × 2 linhas.

## 13. Processo simples

- [ ] As 3 etapas de `CONTENT.md` estão presentes (Contratação, Briefing simples, Criação, revisão e publicação).
- [ ] A faixa de prazo "até 7 dias úteis" está presente.
- [ ] Não existe CTA nesta seção.
- [ ] O texto deixa claro que Willian produz a copy.
- [ ] Mobile usa leitura vertical.
- [ ] Tablet usa grid 2 colunas.
- [ ] Desktop usa três colunas em uma linha com o prazo abaixo.

## 14. Quem é Willian Souza

- [ ] A foto real de Willian está presente.
- [ ] A seção informa que o projeto é conduzido diretamente por ele.
- [ ] Não existe "nós" sugerindo equipe.
- [ ] Não existem certificações inventadas.
- [ ] Os indicadores correspondem a `CONTENT.md`.
- [ ] Não afirma que foram criadas Landing Pages para mais de sete mil clientes.
- [ ] Não é uma biografia extensa.
- [ ] Desktop usa duas colunas (texto à esquerda, indicadores 2×2 à direita).
- [ ] Mobile usa texto primeiro e indicadores 2×2 abaixo.

## 15. Investimento

- [ ] Preço total de R$ 997 presente.
- [ ] Entrada de R$ 498,50 presente.
- [ ] Saldo de R$ 498,50 presente.
- [ ] Prazo de até 7 dias úteis presente.
- [ ] Até duas rodadas de ajustes presente.
- [ ] CTA presente.
- [ ] Microtexto presente.
- [ ] Não existe lista de "não incluído".
- [ ] Não existem advertências sobre garantia de resultados.
- [ ] Não existe frase pedindo formulário.
- [ ] O CTA abre o WhatsApp com `cta_location = investment`.

## 16. Perguntas frequentes

- [ ] As 9 perguntas de `CONTENT.md` estão presentes.
- [ ] O acordeão é acessível.
- [ ] A pergunta permanece visível quando aberta.
- [ ] Permite abertura por teclado.
- [ ] O estado expandido é comunicado.
- [ ] Não existe botão direto para WhatsApp dentro da FAQ.
- [ ] Não existe campo livre de dúvidas.

## 17. CTA final

- [ ] A copy de `CONTENT.md` está presente.
- [ ] O CTA abre o WhatsApp com `cta_location = final`.
- [ ] Não existe formulário aberto na seção.

## 18. Rodapé

- [ ] O rodapé usa a copy de `CONTENT.md`.
- [ ] Política de Privacidade está acessível.
- [ ] Termos de Uso estão acessíveis.
- [ ] "Configurações de privacidade" está presente.
- [ ] Não existem links jurídicos quebrados.
- [ ] O conteúdo jurídico foi aprovado.
- [ ] Não existe telefone no rodapé.
- [ ] Não existe WhatsApp no rodapé.
- [ ] Não existe Instagram no rodapé.
- [ ] Não existe blog no rodapé.
- [ ] Não existe portfólio externo no rodapé.

## 19. Eventos

- [ ] `cta_click`.
- [ ] `whatsapp_click`.
- [ ] `portfolio_open`.
- [ ] `portfolio_view_change`.
- [ ] `faq_open`.
- [ ] Os nomes seguem `snake_case`.
- [ ] Os parâmetros seguem `TRACKING.md`.
- [ ] `cta_location` é preservado em cada CTA.
- [ ] `cta_click` e `whatsapp_click` disparam juntos no clique do CTA.
- [ ] `whatsapp_click` dispara sem `preventDefault`.
- [ ] `whatsapp_click` não dispara duas vezes no mesmo clique.
- [ ] `portfolio_view_change` dispara ao trocar Celular/Desktop.
- [ ] `faq_open` dispara ao abrir cada pergunta.
- [ ] Não existem `form_open`, `form_start`, `form_step`, `form_submit_attempt`, `form_error` nem `generate_lead`.
- [ ] Nenhum evento é conversão.
- [ ] React Strict Mode não duplica eventos.
- [ ] Clicar no mesmo CTA novamente não duplica eventos indevidamente.

## 20. `dataLayer` e privacidade

- [ ] Existe um módulo central de rastreamento.
- [ ] Ausência do GTM não quebra a página.
- [ ] GTM instalado via `@next/third-parties/google` no root layout.
- [ ] GTM carrega com `NEXT_PUBLIC_GTM_ID` configurado.
- [ ] Container ID correto no script.
- [ ] Apenas um script GTM (sem duplicidade).
- [ ] Nenhum `gtag.js` separado incluído.
- [ ] GTM presente em `/landingpage`, `/politica-de-privacidade`, `/termos`.
- [ ] Nenhuma alteração visual causada pelo GTM.
- [ ] Nome não aparece no `dataLayer`.
- [ ] Telefone não aparece no `dataLayer`.
- [ ] Mensagem do WhatsApp não aparece no `dataLayer`.
- [ ] URL digitada não aparece no `dataLayer`.
- [ ] Respostas não aparecem no `dataLayer`.
- [ ] Dados pessoais não aparecem no console.
- [ ] Dados pessoais não aparecem em URLs.
- [ ] Microsoft Clarity é instalado exclusivamente pelo GTM.
- [ ] Não existe snippet do Clarity no código.
- [ ] Não existe `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
- [ ] Não existe script `clarity.ms` no HTML sem o GTM.
- [ ] O formulário dos projetos entregues (quando aplicável) permanece mascarado com `data-clarity-mask="true"`.
- [ ] Nenhuma PII é enviada ao Clarity ou ao `dataLayer`.

## 21. Consentimento

- [ ] O estado padrão é definido antes das tags.
- [ ] `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` iniciam negados.
- [ ] `wait_for_update: 500` está presente no consentimento padrão.
- [ ] A preferência salva é restaurada automaticamente.
- [ ] O banner aparece na primeira visita sem preferência.
- [ ] O banner desaparece após aceitar ou recusar.
- [ ] O banner possui link para a Política de Privacidade.
- [ ] O painel de configurações abre somente por ação do visitante.
- [ ] "Salvar preferências" persiste e aplica a escolha.
- [ ] É possível alterar a escolha pelo link "Configurações de privacidade".
- [ ] O link "Configurações de privacidade" está presente no rodapé da Landing Page.
- [ ] O link "Configurações de privacidade" está presente no rodapé das páginas jurídicas.
- [ ] Meta Pixel não dispara quando publicidade está recusada.
- [ ] O Microsoft Clarity não dispara quando Analytics está recusado.
- [ ] O banner não menciona "Microsoft Clarity".
- [ ] O WhatsApp funciona com medição recusada.
- [ ] A página funciona com tudo recusado.
- [ ] Nenhum dado pessoal é armazenado no `localStorage` como parte do consentimento.
- [ ] A chave `anuncio_e_site_consent_v1` é usada.

### Divergência de copy (pendência)

- [ ] A copy do banner e do painel de consentimento corresponde a `CONTENT.md` §13 (seção "Consentimento de medição").
- [ ] Se divergir, a aplicação da nova copy ao componente global foi confirmada com o proprietário (o provider é compartilhado pelo root layout e afeta todas as rotas).

## 22. SEO e metadata

- [ ] Title correto: "Landing Page Profissional para Google Ads e Meta Ads por R$ 997 | Anúncio & Site".
- [ ] Meta description corresponde a `LANDINGPAGE.md`.
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

## 23. Acessibilidade

- [ ] A página pode ser navegada por teclado.
- [ ] O foco é visível.
- [ ] A ordem de foco é lógica.
- [ ] Landmarks são semânticos.
- [ ] Botões e links possuem nomes acessíveis.
- [ ] Os CTAs de WhatsApp são links com texto acessível.
- [ ] Os links de WhatsApp indicam que abrem em nova aba.
- [ ] Estados de carregamento são anunciados.
- [ ] Contraste foi verificado.
- [ ] Alvos clicáveis possuem tamanho adequado.
- [ ] A FAQ funciona sem mouse.
- [ ] Os modais mantêm foco.
- [ ] Os modais restauram foco.
- [ ] Os modais fecham com `Esc`.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] O conteúdo continua compreensível sem animação.

## 24. Responsividade

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
- [ ] Elementos fixos não cobrem conteúdo.
- [ ] O CTA fixo mobile não cobre o banner de consentimento.
- [ ] Portfólio usa faixa horizontal com scroll-snap no mobile.
- [ ] Portfólio usa grid no desktop.
- [ ] Portfólio não possui autoplay nem animação automática.
- [ ] "O que está incluído" usa grid 1 coluna no mobile.
- [ ] "O que está incluído" usa grid 2 colunas no tablet.
- [ ] "O que está incluído" usa grid uniforme 3×2 no desktop.
- [ ] "Processo simples" usa leitura vertical no mobile.
- [ ] "Processo simples" usa 3 colunas no desktop com o prazo abaixo.
- [ ] "Quem é Willian Souza" usa indicadores 2×2 no mobile.
- [ ] "Quem é Willian Souza" usa duas colunas no desktop.
- [ ] Todos os textos e CTAs estão preservados nos padrões compactos.
- [ ] Desktop não foi afetado pelos padrões compactos.

## 25. Desempenho

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

## 26. Segurança

- [ ] HTTPS funciona.
- [ ] Nenhuma credencial está no código.
- [ ] Nenhum segredo usa `NEXT_PUBLIC_`.
- [ ] `.env.local` não está versionado.
- [ ] `.env.example` não contém valores reais.
- [ ] Erros não revelam detalhes internos.
- [ ] Logs não armazenam dados pessoais desnecessários.
- [ ] Dados pessoais não aparecem na URL.
- [ ] A mensagem fixa do WhatsApp não contém dados pessoais do visitante.
- [ ] CAPTCHA intrusivo não foi adicionado sem necessidade.

## 27. Testes técnicos

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

## 28. Testes do WhatsApp e CTAs

- [ ] Todos os CTAs possuem `data-whatsapp-cta="true"`.
- [ ] Todos os CTAs possuem `data-cta-location` correto.
- [ ] O href contém o número oficial sem formatação.
- [ ] O href contém a mensagem codificada.
- [ ] O href abre com `https://wa.me/...`.
- [ ] Clicar no CTA do header abre o WhatsApp.
- [ ] Clicar no CTA da hero abre o WhatsApp.
- [ ] Clicar no CTA do portfólio abre o WhatsApp.
- [ ] Clicar no CTA de investimento abre o WhatsApp.
- [ ] Clicar no CTA final abre o WhatsApp.
- [ ] Clicar no CTA fixo mobile abre o WhatsApp.
- [ ] `cta_click` e `whatsapp_click` chegam ao `dataLayer` no clique.
- [ ] A navegação não é bloqueada pelos eventos.
- [ ] O fallback sem número não renderiza link quebrado.

## 29. Testes de consentimento e medição

- [ ] Banner aparece na primeira visita.
- [ ] Aceitar medição permite cookies de medição.
- [ ] Recusar recursos não essenciais mantém tudo negado.
- [ ] Preferências personalizadas funcionam.
- [ ] Revogação impede novas coletas opcionais.
- [ ] O WhatsApp continua funcionando com medição recusada.
- [ ] O CTA fixo mobile desaparece quando o banner está visível.
- [ ] O CTA fixo mobile volta quando o banner é fechado.
- [ ] O Microsoft Clarity não dispara sem Analytics aceito.
- [ ] A validação real do Clarity ocorreu no painel (mapas de calor, gravações e mascaramento).

## 30. Ambiente e publicação

- [ ] IDs de desenvolvimento não apontam para produção.
- [ ] Preview não polui analytics real.
- [ ] Preview usa `noindex`.
- [ ] Variáveis de produção estão configuradas.
- [ ] Domínio oficial está confirmado.
- [ ] Deploy foi autorizado por Willian.
- [ ] HTTPS funciona no domínio real.
- [ ] `/landingpage` funciona no domínio real.
- [ ] O WhatsApp foi testado no domínio real.
- [ ] Eventos foram testados no domínio real.
- [ ] Canonical foi validada.
- [ ] Metadata foi validada.
- [ ] Mobile foi testado no domínio real.
- [ ] Desktop foi testado no domínio real.

## 31. Dependências finais

- [ ] Número oficial do WhatsApp.
- [ ] GTM.
- [ ] GA4.
- [ ] Google Ads (conversão de clique apenas se aprovada).
- [ ] Meta Pixel.
- [ ] Microsoft Clarity (Project ID configurado no GTM).
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
- [ ] A copy corresponde a `CONTENT.md`.
- [ ] Todos os CTAs abrem diretamente o WhatsApp com a mensagem oficial.
- [ ] O formulário e o modal antigos não aparecem mais.
- [ ] Não restaram artefatos do formulário removido.
- [ ] O CTA fixo mobile respeita as regras.
- [ ] Nenhuma conversão foi criada no clique sem aprovação.
- [ ] Nenhum dado pessoal apareceu nas plataformas.
- [ ] Homepage e outras rotas permaneceram intactas (redirect temporário `/` → `/landingpage` está ativo).
- [ ] Build de produção foi concluído.
- [ ] Testes no domínio real foram concluídos.

---

## 34. Oferta essencial (`/landingpage-essencial`)

> Critérios específicos da rota essencial. A copy oficial está em `docs/ESSENCIAL.md`.

- [ ] A rota `/landingpage-essencial` funciona.
- [ ] As 12 partes aparecem na ordem de `docs/ESSENCIAL.md` (Cabeçalho, Hero, Faixa de clareza, Para quem é, O que está incluído, Projetos desenvolvidos, Como funciona, Quem é Willian Souza, Investimento, Perguntas frequentes, CTA final, Rodapé).
- [ ] A seção "Para quem é" está presente na posição 4 com a copy oficial.
- [ ] O H1 da hero é "Sua Landing Page profissional por R$ 399".
- [ ] A hero não menciona parcelas, entrada, saldo, pagamento à vista ou parcela única.
- [ ] A hero mantém prazo (até 5 dias úteis) e 1 rodada de ajustes.
- [ ] O preço total de R$ 399 está presente.
- [ ] O bloco de investimento exibe "Valor total: R$ 399", "Prazo: até 5 dias úteis" e "Ajustes: 1 rodada".
- [ ] Não existe bloco "Forma de pagamento" na rota.
- [ ] A forma de pagamento não é definida na página; será alinhada diretamente pelo WhatsApp.
- [ ] O processo — etapa 1 usa "Você confirma o projeto e envia as informações e os materiais necessários para começar".
- [ ] O microtexto do CTA final usa "O briefing completo é enviado depois da confirmação do projeto".
- [ ] A FAQ 2 é "Quanto custa a Landing Page Essencial?" com a resposta oficial.
- [ ] "parcela única", "entrada", "saldo" e "199,50" não aparecem em nenhuma superfície da rota.
- [ ] A mensagem antiga do WhatsApp não aparece.
- [ ] Os textos antigos dos cinco CTAs não aparecem.
- [ ] Os cinco CTAs oficiais estão presentes com os textos de `docs/ESSENCIAL.md`.
- [ ] As cinco `cta_location` são `header`, `hero`, `pricing`, `investment` e `final`.
- [ ] Não existe CTA fixo mobile (`sticky-mobile`) na rota essencial.
- [ ] `cta_click` e `whatsapp_click` levam `offer_variant: "essential_399"`.
- [ ] `cta_click` leva `cta_location` e `cta_label`.
- [ ] `whatsapp_click` leva `cta_location` e `contact_method: "whatsapp"`.
- [ ] Nenhum evento essencial envia `form_id`, `cta_id`, `cta_text` nem `event_version`.
- [ ] `portfolio_open`, `portfolio_view_change` e `faq_open` seguem o formato compartilhado, sem `offer_variant`.
- [ ] O rastreamento de `/landingpage` não foi alterado.
- [ ] A mensagem do WhatsApp é exatamente a oficial de `docs/ESSENCIAL.md`.
- [ ] A metadata usa a description oficial (sem "Pagamento em parcela única").
- [ ] `docs/ESSENCIAL.md` foi lido antes da implementação.
