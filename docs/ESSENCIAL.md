# Landing Page Essencial — `/landingpage-essencial`

> Rota: `/landingpage-essencial`
> Status: implementada, aguardando publicação
> Marca: Anúncio & Site
> Responsável: Willian Souza
> Fonte oficial da oferta essencial: este documento.
> Última atualização: 11/08/2026

Este documento define a estrutura, o comportamento e a copy oficial da **Landing Page Essencial** (R$ 399). Em caso de conflito, ele prevalece sobre `README.md` e sobre a implementação, perdendo apenas para `AGENTS.md` e para solicitação explícita do proprietário.

## 1. Oferta

- Serviço: **Landing Page Essencial**, uma página única para campanhas de Google Ads e Meta Ads.
- Preço total: **R$ 399**.
- Entrada para iniciar: **R$ 199,50 na contratação**.
- Saldo: **R$ 199,50 após a publicação e validação do funcionamento**.
- Prazo: **até 5 dias úteis** após a contratação, o briefing completo e o recebimento dos materiais necessários.
- Ajustes: **1 rodada de ajustes** dentro do escopo aprovado.
- Comunicação em primeira pessoa do singular. Usar "eu"; nunca apresentar uma equipe inexistente.

O pagamento é sempre descrito em **duas etapas**: entrada e saldo após a publicação e validação do funcionamento. A expressão "parcela única" não deve aparecer em nenhuma superfície da rota essencial.

Não exibir:

- preço anterior;
- preço riscado;
- desconto;
- condição de lançamento;
- cronômetro;
- vagas fictícias;
- urgência artificial;
- parcelamento não aprovado.

Não prometer vendas, quantidade de leads, faturamento, ROAS, posição em anúncios, taxa de conversão ou retorno financeiro.

Não inclui domínio, hospedagem, ferramentas de terceiros nem gestão de Google Ads / Meta Ads.

## 2. Mensagem oficial do WhatsApp

Usar exatamente:

```text
Olá, Willian! Vi a Landing Page Essencial por R$ 399 e gostaria de entender melhor como funciona.
```

- A mensagem é fixa e pré-preenchida, sem dados pessoais na URL.
- Deve estar corretamente codificada na URL.
- Centralizar o número (`NEXT_PUBLIC_WHATSAPP_NUMBER`); não repetir o número em strings.
- Não renderizar link quebrado quando o número estiver ausente.
- Abrir de forma compatível com celular e desktop.
- Não usar `preventDefault`, `event_callback` nem `window.location` com atraso.

## 3. Estrutura da página (12 partes)

Preservar esta ordem:

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

## 4. Copy oficial por seção

### 4.1 Cabeçalho

- Marca: **Anúncio & Site**.
- CTA: **Conversar sobre minha página** (`header`).

### 4.2 Hero

- H1: **Sua Landing Page profissional por R$ 399**.
- Não mencionar parcela única.
- Não explicar as duas parcelas no hero.
- Manter prazo e 1 rodada de ajustes.
- CTA: **Conversar sobre minha página** (`hero`).

```text
Uma página única, focada na sua oferta, para receber o tráfego da sua campanha. Eu cuido da estratégia, dos textos, do design, do desenvolvimento e da publicação.
```

Abaixo do H1, exibir apenas:

```text
até 5 dias úteis após briefing e materiais • 1 rodada de ajustes
```

Microtexto do CTA:

```text
Fale diretamente com Willian pelo WhatsApp e confirme a contratação.
```

O mockup do hero usa capturas reais da ZARQ Planejados, com o endereço visual `zarqplanejados.com.br` sem ser um link.

### 4.3 Faixa de clareza

```text
Uma página única, pronta para receber o tráfego da campanha
Copy e estratégia incluídas no projeto
Contato direto pelo WhatsApp, sem etapas desnecessárias
```

### 4.4 Para quem é

- Label: **Uma opção para começar** (exibido em caixa alta pela tipografia).
- Título: **Uma página profissional sem transformar o projeto em algo complicado**.
- Texto:

```text
A Landing Page Essencial é indicada para quem precisa apresentar um serviço, explicar sua oferta e facilitar o contato com possíveis clientes.
```

- Itens (5):

```text
Profissionais autônomos que precisam de uma página para apresentar o serviço.
Prestadores de serviços que querem receber contatos pelo WhatsApp.
Pequenos negócios que desejam anunciar uma oferta.
Empresas que desejam anunciar uma oferta no Google Ads ou Meta Ads.
Quem ainda não possui uma página focada em contato.
```

- Encerramento:

```text
Uma oferta, uma página e uma ação principal.
```

### 4.5 O que está incluído

- Label: **O que está incluído**.
- Título: **Tudo o que está incluído no projeto Essencial**.
- Itens (6): Estratégia e copy; Design responsivo; Desenvolvimento; Contato pelo WhatsApp; Publicação e testes; Rodada de ajustes (`1 rodada de ajustes dentro do escopo aprovado`).

### 4.6 Projetos desenvolvidos

- Título: **Projetos reais desenvolvidos por mim**.
- Cinco projetos oficiais: Mecânica Auto Brum, ZARQ Planejados, Agafarma Mário Quintana, BS Montagem de Móveis, Artur Montador.
- Capas WebP; capturas sob demanda; visualizador interno; sem links externos.
- CTA: **Falar sobre meu projeto** (`pricing`).
- Microtexto: `Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.`

### 4.7 Como funciona (4 etapas)

- Título: **Da contratação à publicação em quatro etapas**.

```text
1. Contratação: Você confirma o projeto e faz o pagamento da entrada de R$ 199,50.
2. Briefing simples: Depois da contratação, envio um briefing para reunir as informações da oferta, do público, dos diferenciais e os materiais disponíveis.
3. Criação: Eu preparo a estratégia, os textos, o design e o desenvolvimento da página.
4. Publicação: Você revisa, solicita os ajustes previstos e a página é publicada e testada.
```

Faixa de prazo:

```text
Prazo de até 5 dias úteis
A contagem começa após a confirmação da contratação e o recebimento do briefing completo e dos materiais necessários.
```

### 4.8 Quem é Willian Souza

- Título: **Seu projeto é desenvolvido diretamente por mim**.
- Indicadores oficiais: Mais de 5 anos usando Google Ads em negócios locais; Cerca de R$ 40 mil investidos em campanhas próprias; Mais de 7 mil clientes atendidos a partir do Google; Execução direta.
- A foto `public/images/willian-souza.webp` não existe; a seção não deve renderizar espaços vazios nem imagem quebrada.

### 4.9 Investimento

- Título: **Sua Landing Page Essencial por R$ 399**.
- Destaques:

```text
Preço total: R$ 399
Entrada para iniciar: R$ 199,50
Saldo após a publicação e validação do funcionamento: R$ 199,50
Prazo: até 5 dias úteis
Ajustes: 1 rodada
```

- Usar sempre "após a publicação e validação do funcionamento".
- CTA: **Quero entender como funciona** (`investment`).
- Microtexto: `Você fala diretamente comigo pelo WhatsApp. O briefing completo vem depois da contratação.`

### 4.10 Perguntas frequentes (6 itens)

1. **O que está incluído na Landing Page Essencial?** — A Landing Page Essencial é uma página única, focada em receber o tráfego de uma campanha de Google Ads ou Meta Ads. O projeto inclui estratégia e copy, design responsivo, desenvolvimento e publicação. Você não precisa entregar os textos prontos: a copy faz parte do projeto.
2. **Quanto custa e como funciona o pagamento?** — O projeto custa R$ 399. O pagamento é dividido em R$ 199,50 na contratação e R$ 199,50 após a Landing Page estar publicada e funcionando.
3. **Em quanto tempo a página fica pronta?** — O prazo é de até 5 dias úteis após a contratação, o recebimento do briefing completo e dos materiais necessários.
4. **Posso solicitar alterações?** — Sim. O projeto inclui 1 rodada de ajustes dentro do escopo aprovado.
5. **Domínio e hospedagem estão incluídos?** — Domínio, hospedagem e ferramentas de terceiros não estão incluídos automaticamente. Quando necessários, os custos e as responsabilidades são informados antes da contratação.
6. **A gestão dos anúncios está incluída?** — Não. O serviço inclui a criação e publicação da Landing Page. A gestão de Google Ads ou Meta Ads não faz parte deste projeto.

### 4.11 CTA final

- Título: **Tenha sua Landing Page Essencial publicada e preparada para anunciar**.
- Texto: `Fale diretamente comigo pelo WhatsApp para confirmar o projeto e receber as orientações para contratação.`
- CTA: **Conversar com Willian no WhatsApp** (`final`).
- Microtexto: **Entrada de R$ 199,50 para iniciar. O briefing completo é enviado depois da contratação.**

### 4.12 Rodapé

- Marca e `© {ano} Anúncio & Site. Todos os direitos reservados.`
- Contato: `contato@grupows.com`.
- Links: Política de Privacidade, Termos de Uso e "Configurações de privacidade".
- Sem WhatsApp, telefone, Instagram, blog ou portfólio externo no rodapé.

## 5. CTAs

Todos os CTAs comerciais abrem diretamente o WhatsApp com a mensagem oficial.

| Localização | `cta_location` | Texto |
|---|---|---|
| Cabeçalho | `header` | Conversar sobre minha página |
| Hero | `hero` | Conversar sobre minha página |
| Projetos desenvolvidos | `pricing` | Falar sobre meu projeto |
| Investimento | `investment` | Quero entender como funciona |
| CTA final | `final` | Conversar com Willian no WhatsApp |

O CTA fixo mobile (`StickyCtaMobile`) é **proibido** na rota essencial, em nenhuma versão.

Atributos obrigatórios em cada CTA:

```text
data-whatsapp-cta="true"
data-cta-location="[localização]"
```

## 6. Rastreamento

Seguir exclusivamente `docs/TRACKING.md`.

Na rota `/landingpage-essencial`:

- `cta_click` e `whatsapp_click` usam **obrigatoriamente** `offer_variant: "essential_399"`.
- `portfolio_open`, `portfolio_view_change` e `faq_open` mantêm o formato compartilhado atual, **sem** `offer_variant`.
- **Não** enviar `form_id`, `cta_id`, `cta_text` nem `event_version` no rastreamento específico da rota essencial.

### `cta_click` (rota essencial)

```text
{
  event: "cta_click",
  offer_variant: "essential_399",
  cta_location: "[localização]",
  cta_label: "[texto do CTA]"
}
```

### `whatsapp_click` (rota essencial)

```text
{
  event: "whatsapp_click",
  offer_variant: "essential_399",
  cta_location: "[localização]",
  contact_method: "whatsapp"
}
```

Nenhum evento é conversão. A conversão acontece na conversa do WhatsApp, fora da página.

## 7. Metadata e SEO

- Title: **Landing Page Essencial para Google Ads e Meta Ads por R$ 399 | Anúncio & Site**.
- Description: **Landing Page profissional para Google Ads e Meta Ads por R$ 399, com design responsivo, WhatsApp, publicação e 1 rodada de ajustes.**
- Canonical: `https://www.anuncioesite.com.br/landingpage-essencial`.
- Open Graph com imagem social aprovada (`opengraph-image`).
- Uma única `h1` por página.
- Preview e homologação com `noindex`.
- Produção indexável somente depois da aprovação.

## 8. Proibições específicas

Na rota essencial:

- não usar "parcela única" nem "pagamento único";
- não usar `offer_variant: "landingpage_essencial"` nem `form_id` no rastreamento;
- não recriar a mensagem antiga `Olá, Willian. Vi a Landing Page Essencial por R$ 399 e quero iniciar meu projeto. Pode me explicar os próximos passos?`;
- não usar os textos antigos dos cinco CTAs;
- não criar formulário, modal de formulário, página de obrigado nem `generate_lead`;
- não criar CTA fixo mobile;
- não criar links externos para os projetos;
- não exibir a foto da seção Sobre como espaço vazio.

## 9. Regras de imagem e materiais

- Usar capturas reais dos projetos.
- Não inventar marca, cliente, depoimento ou métrica.
- Definir largura e altura; evitar CLS.
- Carregar capturas completas somente sob demanda.
- Não modificar os originais em `/originals/portfolio`.

## 10. Critérios de conclusão da rota essencial

A rota está concluída quando:

- as 12 partes aparecem na ordem deste documento;
- os cinco CTAs usam os textos oficiais e abrem o WhatsApp com a mensagem oficial;
- `cta_click` e `whatsapp_click` levam `offer_variant: "essential_399"` e nenhum `form_id`/`cta_id`/`cta_text`/`event_version`;
- a seção "Para quem é" está presente na posição 4;
- "parcela única" e a mensagem antiga não aparecem em nenhuma superfície;
- o microtexto de investimento usa "após a publicação e validação do funcionamento";
- o build, o lint, a verificação de tipos e os testes E2E foram concluídos;
- não existem erros relevantes no console;
- `/landingpage` permanece intacta.
