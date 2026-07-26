import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Termos de Uso | Anúncio & Site",
  description:
    "Consulte as condições de uso do site e de apresentação dos serviços da Anúncio & Site.",
  alternates: {
    canonical: "https://www.anuncioesite.com.br/termos",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout>
      <article>
        <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--text-primary)] leading-tight mb-2">
          Termos de Uso
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Última atualização: 01/02/2026
        </p>

        <div className="space-y-6 text-[var(--text-secondary)] text-[16px] leading-relaxed">
          <p>
            Estes Termos regulam o acesso e o uso das páginas da Anúncio & Site.
            Ao utilizar o site ou enviar uma solicitação, o visitante declara que
            leu e compreendeu estas condições.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            1. Identificação
          </h2>
          <p>
            Estes Termos são disponibilizados pela Anúncio & Site.
          </p>
          <p>
            <strong>Contato:</strong>{" "}
            <a href="mailto:contato@grupows.com" className="text-[var(--brand)] hover:underline font-medium">
              contato@grupows.com
            </a>
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            2. Finalidade do site
          </h2>
          <p>
            O site apresenta informações sobre serviços de criação de Landing
            Pages e permite que interessados enviem dados para análise inicial.
          </p>
          <p>O preenchimento do formulário:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>não representa contratação automática;</li>
            <li>não obriga a Anúncio & Site a aceitar o projeto;</li>
            <li>não garante reserva de agenda;</li>
            <li>
              não substitui proposta, contrato, briefing ou confirmação de
              pagamento.
            </li>
          </ul>
          <p>
            A contratação ocorre somente após o alinhamento do escopo, a
            aceitação das condições comerciais e a confirmação prevista na
            proposta.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            3. Oferta apresentada
          </h2>
          <p>
            A página pode apresentar uma oferta padrão de Landing Page por{" "}
            <strong>R$ 997</strong>, incluindo os itens descritos na própria
            oferta.
          </p>
          <p>
            Salvo condição diferente expressamente aprovada, a forma de pagamento
            informada é:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>50% na contratação;</li>
            <li>
              50% após a Landing Page ser publicada e estar funcionando.
            </li>
          </ul>
          <p>
            O prazo padrão é de até 7 dias úteis após a confirmação da entrada, o
            briefing completo e o recebimento dos materiais necessários.
          </p>
          <p>
            Estão incluídas até 2 rodadas de ajustes dentro do escopo aprovado.
          </p>
          <p>
            A proposta comercial aceita pelo cliente definirá os detalhes finais do
            projeto. Qualquer condição específica deverá ser registrada de forma
            clara, respeitados os direitos assegurados pela legislação.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            4. Itens não incluídos automaticamente
          </h2>
          <p>
            Salvo previsão expressa na proposta, não estão incluídos:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>gestão de Google Ads ou Meta Ads;</li>
            <li>produção de fotos, vídeos ou identidade visual completa;</li>
            <li>páginas, automações ou integrações adicionais;</li>
            <li>manutenção mensal;</li>
            <li>testes A/B contínuos;</li>
            <li>domínio, hospedagem e ferramentas de terceiros.</li>
          </ul>
          <p>
            Quando necessários, custos externos, contas utilizadas e
            responsabilidades serão informados antes da contratação.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            5. Responsabilidades do cliente
          </h2>
          <p>O cliente é responsável por:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>fornecer informações e materiais corretos;</li>
            <li>
              possuir autorização para utilizar textos, marcas, imagens e demais
              conteúdos enviados;
            </li>
            <li>disponibilizar os acessos necessários;</li>
            <li>
              revisar textos, preços, contatos, condições e informações;
            </li>
            <li>enviar ajustes de forma consolidada;</li>
            <li>
              aprovar expressamente a versão final antes da publicação;
            </li>
            <li>
              manter ativos e regulares domínio, hospedagem, contas e serviços de
              terceiros sob sua responsabilidade;
            </li>
            <li>
              cumprir as leis e regras aplicáveis à sua atividade e à oferta
              anunciada.
            </li>
          </ul>
          <p>
            Atrasos na entrega de materiais, acessos, respostas ou aprovações
            podem alterar o cronograma.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            6. Ajustes e mudanças de escopo
          </h2>
          <p>
            Uma rodada de ajustes corresponde a um conjunto consolidado de
            solicitações enviado pelo cliente.
          </p>
          <p>
            Correções e refinamentos dentro do escopo aprovado podem ser
            realizados nas rodadas incluídas. Poderão exigir novo orçamento:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>mudança completa da oferta ou do público;</li>
            <li>nova página;</li>
            <li>nova identidade visual;</li>
            <li>integração não prevista;</li>
            <li>nova funcionalidade;</li>
            <li>reestruturação substancial;</li>
            <li>alterações solicitadas após a aprovação final;</li>
            <li>qualquer serviço não incluído na proposta.</li>
          </ul>
          <p>
            Trabalho adicional relevante somente será iniciado após alinhamento e
            aprovação.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            7. Publicação e funcionamento
          </h2>
          <p>A publicação depende:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>da aprovação final do cliente;</li>
            <li>do fornecimento dos acessos necessários;</li>
            <li>da disponibilidade dos serviços de terceiros;</li>
            <li>do cumprimento das condições comerciais acordadas.</li>
          </ul>
          <p>
            Após a publicação, serão realizados testes compatíveis com o escopo
            contratado.
          </p>
          <p>
            Problemas técnicos diretamente relacionados ao projeto entregue serão
            tratados conforme as condições de garantia e suporte definidas na
            proposta.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            8. Ausência de garantia de resultados
          </h2>
          <p>
            A Landing Page organiza a apresentação da oferta e a experiência
            depois do clique, mas não garante:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>vendas;</li>
            <li>leads;</li>
            <li>faturamento;</li>
            <li>custo por clique ou por lead;</li>
            <li>retorno sobre investimento;</li>
            <li>posição de anúncios;</li>
            <li>desempenho de campanhas.</li>
          </ul>
          <p>
            Os resultados também dependem de fatores como oferta, preço, mercado,
            orçamento, segmentação, concorrência, atendimento e capacidade
            comercial do cliente.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            9. Serviços de terceiros
          </h2>
          <p>
            O funcionamento da página pode depender de serviços externos, como
            domínio, hospedagem, Google, Meta, WhatsApp, ferramentas de análise,
            formulários e integrações.
          </p>
          <p>
            A Anúncio &amp; Site não controla integralmente a disponibilidade, as
            regras, os preços ou as alterações realizadas por esses fornecedores.
            Eventuais responsabilidades serão avaliadas conforme o serviço
            contratado, a causa do problema e a legislação aplicável.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            10. Propriedade intelectual
          </h2>
          <p>
            As condições sobre propriedade, licenças, acesso ao código e
            transferência dos materiais serão definidas na proposta comercial.
          </p>
          <p>
            Direitos de terceiros, incluindo fontes, imagens, bibliotecas,
            marcas, plataformas e ferramentas, permanecem sujeitos às respectivas
            licenças.
          </p>
          <p>
            O nome, a marca, as telas ou os resultados do cliente somente poderão
            ser utilizados em portfólio, divulgação ou estudo de caso mediante
            autorização aplicável.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            11. Uso permitido do site
          </h2>
          <p>O visitante não deve:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              tentar acessar áreas, dados ou sistemas sem autorização;
            </li>
            <li>
              interferir no funcionamento ou na segurança da página;
            </li>
            <li>
              enviar informações falsas, ilícitas ou de terceiros sem
              autorização;
            </li>
            <li>utilizar mecanismos automatizados abusivos;</li>
            <li>
              copiar ou explorar conteúdo protegido de forma indevida;
            </li>
            <li>
              usar o site para praticar fraude, violar direitos ou descumprir a
              legislação.
            </li>
          </ul>
          <p>
            Medidas de proteção poderão ser adotadas em caso de abuso ou risco à
            segurança.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            12. Privacidade
          </h2>
          <p>
            O tratamento de dados pessoais realizado por meio da página é
            explicado na{" "}
            <a href="/politica-de-privacidade" className="text-[var(--brand)] hover:underline font-medium">
              Política de Privacidade
            </a>
            , que integra estes Termos.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            13. Limitação de responsabilidade
          </h2>
          <p>
            Nada nestes Termos exclui direitos ou responsabilidades que não possam
            ser afastados pela legislação.
          </p>
          <p>
            Observados o serviço contratado e as normas aplicáveis, a Anúncio &amp;
            Site não se responsabiliza por:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>informações incorretas fornecidas pelo cliente;</li>
            <li>alterações realizadas por terceiros;</li>
            <li>
              uso da página de forma diferente da orientação fornecida;
            </li>
            <li>
              indisponibilidade de serviços externos fora de seu controle;
            </li>
            <li>
              domínio vencido ou configurações alteradas sem autorização;
            </li>
            <li>
              resultados comerciais ou publicitários não garantidos.
            </li>
          </ul>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            14. Alterações
          </h2>
          <p>
            Estes Termos poderão ser atualizados para refletir mudanças legais,
            técnicas ou comerciais. A versão vigente será identificada pela data
            informada no início do documento.
          </p>
          <p>
            Alterações materiais relacionadas a serviços já contratados
            observarão a proposta aceita e a legislação aplicável.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            15. Legislação aplicável
          </h2>
          <p>
            Estes Termos são regidos pelas leis da República Federativa do Brasil,
            incluindo, quando aplicáveis, o Código de Defesa do Consumidor, o Marco
            Civil da Internet e a Lei Geral de Proteção de Dados Pessoais.
          </p>
          <p>
            Ficam preservados os direitos do consumidor e as regras legais de
            competência.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            16. Contato
          </h2>
          <p>Para dúvidas sobre estes Termos:</p>
          <p>
            <a href="mailto:contato@grupows.com" className="text-[var(--brand)] hover:underline font-medium">
              contato@grupows.com
            </a>
          </p>
        </div>
      </article>
    </LegalPageLayout>
  );
}
