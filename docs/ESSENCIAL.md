# Landing Page Essencial — `/landingpage-essencial`

> Rota: `/landingpage-essencial`
> Status: implementada, aguardando publicação
> Marca: Anúncio & Site
> Responsável: Willian Souza
> Fonte oficial da oferta essencial: este documento.
> Última atualização: 13/08/2026

Este documento define a estrutura, o comportamento e a copy oficial da **Landing Page Essencial** (R$ 399). Em caso de conflito, ele prevalece sobre `README.md` e sobre a implementação, perdendo apenas para `AGENTS.md` e para solicitação explícita do proprietário.

## 1. Oferta

- Serviço: **Landing Page Essencial**, uma página única para campanhas de Google Ads e Meta Ads.
- Valor total publicamente informado: **R$ 399**.
- Prazo: **até 5 dias úteis** após a contratação, o briefing completo e o recebimento dos materiais necessários.
- Ajustes: **1 rodada de ajustes** dentro do escopo aprovado.
- Comunicação em primeira pessoa do singular. Usar "eu"; nunca apresentar uma equipe inexistente.

**Regra de pagamento:** a forma de pagamento **não é definida na página** e será alinhada diretamente com o interessado pelo WhatsApp. Não mencionar parcelas, entrada, saldo, pagamento à vista ou parcela única. Não definir meio, data ou condição de pagamento.

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

## 3. Estrutura da página (13 partes)

Preservar esta ordem:

1. Cabeçalho.
2. Hero.
3. Apresentação pessoal (foto real de Willian Souza).
4. Faixa de clareza.
5. Para quem é.
6. O que está incluído.
7. Projetos desenvolvidos.
8. Como funciona (4 etapas).
9. Quem é Willian Souza.
10. Investimento.
11. Perguntas frequentes (6 itens).
12. CTA final.
13. Rodapé.

Não existe seção de formulário aberto. O contato acontece pelo WhatsApp.

## 4. Copy oficial por seção

### 4.1 Cabeçalho

- Marca: **Anúncio & Site**.
- CTA: **Conversar sobre minha página** (`header`).

### 4.2 Hero

- Eyebrow: **LANDING PAGE ESSENCIAL**.
- H1: **Uma página profissional para apresentar sua oferta e levar mais pessoas até o seu WhatsApp**.
- Texto de apoio: **Landing page desenvolvida por Willian Souza, adaptada para celulares e pronta para você divulgar seu serviço ou começar seus anúncios.**
- Preço: **R$ 399** (sem preço anterior, desconto, parcelamento, entrada, saldo ou condição de pagamento).
- CTA: **Conversar sobre minha página** (`hero`).
- Microtexto do CTA:

```text
Fale diretamente com Willian pelo WhatsApp e confirme a contratação.
```

O mockup do hero é neutro, sem representar um segmento específico, dentro de uma janela de navegador ou dispositivo. Utiliza textos genéricos e curtos ("Sua empresa", "Apresente sua oferta com clareza", "Falar pelo WhatsApp") e não contém referência a móveis planejados nem a outro segmento.

### 4.3 Apresentação pessoal

- Eyebrow: **ATENDIMENTO DIRETO**.
- Título: **Sua página será feita por uma pessoa, não por uma ferramenta automática**.
- Parágrafo 1:

```text
Eu sou Willian Souza e desenvolvo landing pages para profissionais e empresas que precisam apresentar seus serviços com mais clareza e direcionar os visitantes para uma ação.
```

- Parágrafo 2:

```text
Você conversa diretamente comigo durante o projeto. Eu organizo as informações, desenvolvo a página e preparo tudo para que ela funcione bem no celular e esteja pronta para divulgação.
```

- CTA: **Quero conversar com o Willian** (`about`).
- Desktop: foto à esquerda (aproximadamente 40% da largura) e copy à direita, com bom espaço em branco.
- Mobile: foto acima, centralizada, e copy abaixo, com CTA em largura adequada para toque.
- A foto real `public/images/willian-souza.webp` preserva a proporção original e possui `alt` "Willian Souza, responsável pelo desenvolvimento das landing pages".

### 4.4 Faixa de clareza

```text
Uma página única, pronta para receber o tráfego da campanha
Copy e estratégia incluídas no projeto
Contato direto pelo WhatsApp, sem etapas desnecessárias
```

### 4.5 Para quem é

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

### 4.6 O que está incluído

- Label: **O que está incluído**.
- Título: **Tudo o que está incluído no projeto Essencial**.
- Itens (6): Estratégia e copy; Design responsivo; Desenvolvimento; Contato pelo WhatsApp; Publicação e testes; Rodada de ajustes (`1 rodada de ajustes dentro do escopo aprovado`).

### 4.7 Projetos desenvolvidos

- Título: **Projetos reais desenvolvidos por mim**.
- Cinco projetos oficiais: Mecânica Auto Brum, ZARQ Planejados, Agafarma Mário Quintana, BS Montagem de Móveis, Artur Montador.
- Capas WebP; capturas sob demanda; visualizador interno; sem links externos.
- CTA: **Falar sobre meu projeto** (`pricing`).
- Microtexto: `Cada projeto recebe uma estrutura adequada à oferta e ao público do negócio.`

### 4.8 Como funciona (4 etapas)

- Título: **Da contratação à publicação em quatro etapas**.

```text
1. Contratação: Você confirma o projeto e envia as informações e os materiais necessários para começar.
2. Briefing simples: Depois da contratação, envio um briefing para reunir as informações da oferta, do público, dos diferenciais e os materiais disponíveis.
3. Criação: Eu preparo a estratégia, os textos, o design e o desenvolvimento da página.
4. Publicação: Você revisa, solicita os ajustes previstos e a página é publicada e testada.
```

Faixa de prazo:

```text
Prazo de até 5 dias úteis
A contagem começa após a confirmação da contratação e o recebimento do briefing completo e dos materiais necessários.
```

### 4.9 Quem é Willian Souza

- Título: **Seu projeto é desenvolvido diretamente por mim**.
- Indicadores oficiais: Mais de 5 anos usando Google Ads em negócios locais; Cerca de R$ 40 mil investidos em campanhas próprias; Mais de 7 mil clientes atendidos a partir do Google; Execução direta.
- A foto `public/images/willian-souza.webp` existe e também pode ser exibida nesta seção; se a foto estiver ausente, a seção não deve renderizar espaços vazios nem imagem quebrada.

### 4.10 Investimento

- Título: **Sua Landing Page Essencial por R$ 399**.
- Destaques:

```text
Valor total: R$ 399
Prazo: até 5 dias úteis
Ajustes: 1 rodada
```

- Não criar bloco "Forma de pagamento".
- CTA: **Quero entender como funciona** (`investment`).
- Microtexto: `Você fala diretamente comigo pelo WhatsApp. O briefing completo vem depois da contratação.`

### 4.11 Perguntas frequentes (6 itens)

1. **O que está incluído na Landing Page Essencial?** — A Landing Page Essencial é uma página única, focada em receber o tráfego de uma campanha de Google Ads ou Meta Ads. O projeto inclui estratégia e copy, design responsivo, desenvolvimento e publicação. Você não precisa entregar os textos prontos: a copy faz parte do projeto.
2. **Quanto custa a Landing Page Essencial?** — O projeto custa R$ 399. Os detalhes da contratação são alinhados diretamente comigo pelo WhatsApp.
3. **Em quanto tempo a página fica pronta?** — O prazo é de até 5 dias úteis após a contratação, o recebimento do briefing completo e dos materiais necessários.
4. **Posso solicitar alterações?** — Sim. O projeto inclui 1 rodada de ajustes dentro do escopo aprovado.
5. **Domínio e hospedagem estão incluídos?** — Domínio, hospedagem e ferramentas de terceiros não estão incluídos automaticamente. Quando necessários, os custos e as responsabilidades são informados antes da contratação.
6. **A gestão dos anúncios está incluída?** — Não. O serviço inclui a criação e publicação da Landing Page. A gestão de Google Ads ou Meta Ads não faz parte deste projeto.

### 4.12 CTA final

- Título: **Tenha sua Landing Page Essencial publicada e preparada para anunciar**.
- Texto: `Fale diretamente comigo pelo WhatsApp para confirmar o projeto e receber as orientações para contratação.`
- CTA: **Conversar com Willian no WhatsApp** (`final`).
- Microtexto: **O briefing completo é enviado depois da confirmação do projeto.**

### 4.13 Rodapé

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
| Apresentação pessoal | `about` | Quero conversar com o Willian |
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

- não informar forma, meio, data ou condição de pagamento;
- não usar "parcela única", "pagamento único", "entrada" ou "saldo";
- não usar `offer_variant: "landingpage_essencial"` nem `form_id` no rastreamento;
- não recriar a mensagem antiga `Olá, Willian. Vi a Landing Page Essencial por R$ 399 e quero iniciar meu projeto. Pode me explicar os próximos passos?`;
- não usar os textos antigos dos cinco CTAs;
- não criar formulário, modal de formulário, página de obrigado nem `generate_lead`;
- não criar CTA fixo mobile;
- não criar links externos para os projetos;
- não exibir a foto da seção Sobre como espaço vazio.

## 9. Regras de imagem e materiais

- Usar capturas reais dos projetos.
- A foto `public/images/willian-souza.webp` é exibida na seção "Apresentação pessoal" preservando a proporção original; não usar banco de imagens, avatar, ilustração nem imagem gerada por IA.
- Não inventar marca, cliente, depoimento ou métrica.
- Definir largura e altura; evitar CLS.
- Carregar capturas completas somente sob demanda.
- Não modificar os originais em `/originals/portfolio`.

## 10. Critérios de conclusão da rota essencial

A rota está concluída quando:

- as 13 partes aparecem na ordem deste documento;
- os seis CTAs usam os textos oficiais e abrem o WhatsApp com a mensagem oficial;
- `cta_click` e `whatsapp_click` levam `offer_variant: "essential_399"` e nenhum `form_id`/`cta_id`/`cta_text`/`event_version`;
- a seção "Apresentação pessoal" aparece imediatamente após a hero, com a foto real de Willian Souza;
- a seção "Para quem é" está presente na posição 5;
- o valor total R$ 399 está presente e nenhuma informação de forma ou condição de pagamento (entrada, saldo, parcelas, parcela única) aparece;
- a FAQ 2 usa a resposta oficial sobre o valor;
- o build, o lint, a verificação de tipos e os testes E2E foram concluídos;
- não existem erros relevantes no console;
- `/landingpage` permanece intacta.
