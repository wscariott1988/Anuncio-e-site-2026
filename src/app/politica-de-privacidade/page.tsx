import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade | Anúncio & Site",
  description:
    "Saiba como a Anúncio & Site coleta, utiliza, armazena e protege dados pessoais.",
  alternates: {
    canonical: "https://www.anuncioesite.com.br/politica-de-privacidade",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout>
      <article>
        <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--text-primary)] leading-tight mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Última atualização: 01/02/2026
        </p>

        <div className="space-y-6 text-[var(--text-secondary)] text-[16px] leading-relaxed">
          <p>
            A Anúncio & Site respeita a privacidade de visitantes, interessados e
            clientes. Esta Política explica quais dados pessoais podem ser
            coletados, por que são utilizados, com quem podem ser compartilhados
            e como o titular pode exercer seus direitos.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            1. Responsável pelo tratamento
          </h2>
          <p>
            A Anúncio & Site é responsável pelas decisões relacionadas ao
            tratamento dos dados pessoais coletados por meio desta página.
          </p>
          <p>
            O e-mail <a href="mailto:contato@grupows.com" className="text-[var(--brand)] hover:underline font-medium">contato@grupows.com</a> é o canal
            para dúvidas, solicitações e exercício dos direitos previstos na Lei
            Geral de Proteção de Dados Pessoais — LGPD.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            2. Dados que podem ser coletados
          </h2>

          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Dados informados no formulário
          </h3>
          <p>Podemos coletar:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>nome;</li>
            <li>número de WhatsApp;</li>
            <li>negócio ou serviço;</li>
            <li>situação atual dos anúncios;</li>
            <li>informação sobre a existência de site ou Landing Page;</li>
            <li>endereço da página atual, quando informado;</li>
            <li>registro do consentimento.</li>
          </ul>
          <p>
            Não solicitamos dados pessoais sensíveis. O visitante não deve incluir
            informações sensíveis ou desnecessárias nos campos de texto.
          </p>

          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Dados de origem e navegação
          </h3>
          <p>
            Também podemos registrar informações relacionadas à origem e ao uso
            da página, como:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>data e hora do envio;</li>
            <li>identificador do lead;</li>
            <li>página de entrada;</li>
            <li>domínio de referência;</li>
            <li>origem do botão utilizado;</li>
            <li>parâmetros UTM;</li>
            <li>
              <code className="bg-[var(--surface-soft)] px-1.5 py-0.5 rounded text-sm">gclid</code>,{" "}
              <code className="bg-[var(--surface-soft)] px-1.5 py-0.5 rounded text-sm">gbraid</code>,{" "}
              <code className="bg-[var(--surface-soft)] px-1.5 py-0.5 rounded text-sm">wbraid</code> e{" "}
              <code className="bg-[var(--surface-soft)] px-1.5 py-0.5 rounded text-sm">fbclid</code>, quando presentes;
            </li>
            <li>eventos de navegação e conversão;</li>
            <li>informações técnicas processadas pela infraestrutura de hospedagem.</li>
          </ul>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            3. Finalidades do tratamento
          </h2>
          <p>Os dados podem ser utilizados para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>receber e analisar solicitações de projeto;</li>
            <li>verificar se a necessidade está dentro do escopo do serviço;</li>
            <li>entrar em contato pelo WhatsApp;</li>
            <li>preparar proposta, briefing e atendimento;</li>
            <li>executar e acompanhar serviços contratados;</li>
            <li>registrar a origem dos contatos;</li>
            <li>medir o funcionamento da página e das campanhas;</li>
            <li>prevenir abuso, fraude e falhas técnicas;</li>
            <li>cumprir obrigações legais e exercer direitos.</li>
          </ul>
          <p>
            Os dados não serão utilizados para finalidades incompatíveis com as
            descritas nesta Política.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            4. Bases legais
          </h2>
          <p>
            O tratamento poderá ocorrer, conforme a finalidade, com base:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>no consentimento do titular;</li>
            <li>em procedimentos preliminares relacionados a possível contratação;</li>
            <li>na execução de contrato;</li>
            <li>no cumprimento de obrigação legal ou regulatória;</li>
            <li>no exercício regular de direitos;</li>
            <li>
              no legítimo interesse, quando aplicável e respeitados os direitos e
              as expectativas do titular.
            </li>
          </ul>
          <p>
            O consentimento pode ser revogado pelo canal indicado nesta Política,
            sem afetar os tratamentos realizados anteriormente de forma legítima.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            5. Compartilhamento e fornecedores
          </h2>
          <p>
            Os dados podem ser processados por fornecedores necessários ao
            funcionamento da página e do atendimento, incluindo:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vercel, para hospedagem e infraestrutura;</li>
            <li>
              Google Apps Script e Google Sheets, para recebimento e organização
              dos contatos;
            </li>
            <li>
              WhatsApp e Meta, quando o visitante decide continuar a conversa;
            </li>
            <li>
              Google Tag Manager, Google Analytics, Google Ads e Meta Pixel,
              quando esses recursos estiverem ativados de acordo com as escolhas
              de privacidade aplicáveis;
            </li>
            <li>
              Microsoft Clarity, da Microsoft, para mapas de calor, gravações de
              sessão e análise agregada da navegação, quando o recurso estiver
              ativado de acordo com as escolhas de privacidade aplicáveis;
            </li>
            <li>
              outros prestadores técnicos indispensáveis à segurança, publicação
              ou funcionamento do serviço.
            </li>
          </ul>
          <p>
            Esses fornecedores tratam dados de acordo com seus próprios termos e
            políticas. Alguns podem operar infraestrutura fora do Brasil, o que
            pode resultar em transferência internacional de dados, observadas as
            medidas e garantias aplicáveis.
          </p>
          <p>Não comercializamos dados pessoais.</p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            6. Cookies e tecnologias semelhantes
          </h2>
          <p>
            A página pode utilizar tecnologias estritamente necessárias para
            funcionamento, segurança, preservação do formulário e registro das
            preferências do visitante.
          </p>
          <p>
            Cookies ou tecnologias de análise, publicidade e medição somente
            deverão ser ativados conforme as escolhas apresentadas no mecanismo de
            consentimento aplicável. O visitante poderá aceitar, rejeitar ou
            gerenciar as categorias não essenciais.
          </p>
          <p>
            As preferências poderão ser alteradas posteriormente por meio do
            recurso disponibilizado na página.
          </p>
          <p>
            Com sua autorização, a página pode utilizar o Microsoft Clarity para
            gerar mapas de calor, gravações de sessão e análises agregadas da
            navegação. A finalidade é compreender como a página é utilizada —
            incluindo rolagem, cliques e eventuais dificuldades de navegação — e
            melhorar a experiência do visitante. Campos e áreas sensíveis do
            formulário são mascarados nessas gravações e análises.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            7. Armazenamento e retenção
          </h2>
          <p>
            Os dados são mantidos somente pelo tempo necessário às finalidades
            informadas:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              contatos que não se tornarem clientes: por até 24 meses após a
              última interação;
            </li>
            <li>
              dados de clientes: durante a execução do serviço e pelos períodos
              necessários ao cumprimento de obrigações legais, contratuais e ao
              exercício de direitos;
            </li>
            <li>
              registros técnicos e de consentimento: pelo período necessário à
              segurança, auditoria e demonstração de conformidade.
            </li>
          </ul>
          <p>
            Ao final do período aplicável, os dados poderão ser eliminados ou
            anonimizados, salvo quando a conservação for permitida ou exigida por
            lei.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            8. Segurança
          </h2>
          <p>
            Adotamos medidas técnicas e administrativas proporcionais à natureza
            dos dados tratados, com o objetivo de reduzir riscos de acesso não
            autorizado, perda, alteração, divulgação ou uso indevido.
          </p>
          <p>
            Nenhum sistema é completamente imune a incidentes. Caso ocorra uma
            situação relevante, serão adotadas as providências cabíveis de acordo
            com a legislação.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            9. Gerenciamento de cookies e consentimento
          </h2>
          <p>
            A página exibe um painel de consentimento na primeira visita. O
            visitante pode:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Aceitar todos</strong> os cookies e tecnologias não
              essenciais;
            </li>
            <li>
              <strong>Recusar opcionais</strong>, bloqueando análise e
              publicidade;
            </li>
            <li>
              <strong>Configurar</strong>, escolhendo entre as categorias
              disponíveis.
            </li>
          </ul>

          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Categorias
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-2 pr-4 font-semibold text-[var(--text-primary)]">Categoria</th>
                  <th className="text-left py-2 font-semibold text-[var(--text-primary)]">Finalidade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--border)]">
                  <td className="py-2 pr-4 text-[var(--text-primary)]">Analytics</td>
                  <td className="py-2 text-[var(--text-secondary)]">Medição de audiência e comportamento na página</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[var(--text-primary)]">Publicidade</td>
                  <td className="py-2 text-[var(--text-secondary)]">Anúncios personalizados nas plataformas de campanha</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Persistência
          </h3>
          <p>
            A escolha fica armazenada no navegador do visitante (
            <code className="bg-[var(--surface-soft)] px-1.5 py-0.5 rounded text-sm">localStorage</code>).
            Em visitas seguintes, a preferência salva é aplicada automaticamente
            antes do carregamento de qualquer tecnologia de medição.
          </p>

          <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mt-6 mb-2">
            Alteração posterior
          </h3>
          <p>
            O visitante pode alterar sua escolha a qualquer momento pelo link{" "}
            <strong>Configurações de privacidade</strong> disponível no rodapé da
            página.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            10. Direitos do titular
          </h2>
          <p>
            Nos termos da LGPD, o titular pode solicitar, quando aplicável:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>confirmação da existência de tratamento;</li>
            <li>acesso aos dados;</li>
            <li>
              correção de dados incompletos, inexatos ou desatualizados;
            </li>
            <li>
              anonimização, bloqueio ou eliminação de dados desnecessários,
              excessivos ou tratados em desconformidade;
            </li>
            <li>informação sobre compartilhamentos;</li>
            <li>portabilidade, conforme regulamentação;</li>
            <li>revogação do consentimento;</li>
            <li>
              eliminação dos dados tratados com consentimento, ressalvadas as
              hipóteses legais de conservação;
            </li>
            <li>
              oposição a tratamento realizado em desconformidade;
            </li>
            <li>
              revisão de decisões tomadas unicamente com base em tratamento
              automatizado, quando aplicável.
            </li>
          </ul>
          <p>
            Para exercer esses direitos, envie uma solicitação para{" "}
            <a href="mailto:contato@grupows.com" className="text-[var(--brand)] hover:underline font-medium">
              contato@grupows.com
            </a>.
            Poderemos pedir informações necessárias para confirmar a identidade
            do solicitante e proteger os dados contra acesso indevido.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            11. Crianças e adolescentes
          </h2>
          <p>
            O serviço é direcionado a empresas, profissionais e pessoas capazes
            de contratar. A página não é destinada à coleta intencional de dados
            de crianças.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            12. Links e serviços de terceiros
          </h2>
          <p>
            A página pode direcionar o visitante para serviços externos, como o
            WhatsApp. O tratamento realizado nesses ambientes é regido também pelos
            termos e políticas dos respectivos fornecedores.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            13. Alterações desta Política
          </h2>
          <p>
            Esta Política poderá ser atualizada para refletir mudanças legais,
            técnicas ou operacionais. A versão vigente será identificada pela data
            informada no início do documento.
          </p>

          <h2 className="text-[22px] md:text-[24px] font-bold text-[var(--text-primary)] mt-10 mb-3">
            14. Contato
          </h2>
          <p>
            Para dúvidas ou solicitações relacionadas à privacidade e à proteção
            de dados:
          </p>
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
