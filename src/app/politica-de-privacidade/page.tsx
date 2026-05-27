import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Política de Privacidade | Calculadora Trabalhista",
  description:
    "Política de privacidade do Calculadora Trabalhista. Não coletamos dados pessoais — todos os cálculos são processados no seu navegador.",
  openGraph: {
    title: "Política de Privacidade | Calculadora Trabalhista",
    description:
      "Sua privacidade protegida: cálculos processados no navegador, sem envio de dados.",
  },
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
          <span className="text-3xl">🔒</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Política de Privacidade
        </h1>
        <p className="text-gray-500 text-sm">
          Última atualização: Maio de 2026
        </p>
      </section>

      {/* Resumo */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
        <h2 className="font-bold text-emerald-800 flex items-center gap-2">
          🛡️ Resumo para quem tem pressa
        </h2>
        <p className="text-emerald-700 text-sm leading-relaxed">
          <strong>Não coletamos nenhum dado pessoal.</strong> Todas as
          calculadoras processam os dados exclusivamente no seu navegador.
          Nenhuma informação é enviada para nossos servidores. Sua privacidade
          é levada a sério.
        </p>
      </section>

      {/* Conteúdo detalhado */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">1. Dados que coletamos</h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>Não coletamos dados pessoais.</strong> As calculadoras do
            Calculadora Trabalhista funcionam inteiramente no lado do cliente
            (client-side). Os valores que você insere nos campos — salário,
            data de admissão, data de demissão — <strong>nunca</strong> saem do
            seu navegador.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Isso significa que nem nós, nem terceiros, temos acesso aos
            números que você digita. Se você desligar o Wi-Fi e recarregar a
            página, a calculadora continua funcionando.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">2. Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Este site utiliza apenas cookies técnicos necessários para o
            funcionamento da plataforma de hospedagem (Vercel Inc.). Não
            utilizamos cookies de rastreamento, marketing ou publicidade
            direcionada.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Futuramente, com a implementação do Google AdSense, cookies de
            publicidade podem ser utilizados pelo Google para exibir anúncios
            relevantes com base na sua navegação. Você pode gerenciar suas
            preferências de cookies de anúncios diretamente nas
            configurações do Google.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">3. Google Analytics</h2>
          <p className="text-gray-600 leading-relaxed">
            Utilizamos o Google Analytics 4 (GA4) para entender como os
            visitantes usam o site — quais páginas são mais acessadas, quanto
            tempo passam em cada calculadora, etc. Esses dados são anônimos e
            agregados. O GA4 pode utilizar cookies próprios para distinguir
            visitantes únicos.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Você pode optar por não ser rastreado pelo GA4 instalando a
            extensão oficial do{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener"
              className="text-blue-600 underline"
            >
              Google Analytics Opt-out
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">4. Google AdSense</h2>
          <p className="text-gray-600 leading-relaxed">
            Este site pode exibir anúncios do Google AdSense. O Google
            utiliza cookies para personalizar anúncios com base na sua
            navegação anterior. Você pode configurar a personalização de
            anúncios em{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener"
              className="text-blue-600 underline"
            >
              adssettings.google.com
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">5. Serviços de terceiros</h2>
          <p className="text-gray-600 leading-relaxed">
            Este site é hospedado na{" "}
            <a
              href="https://vercel.com/privacy"
              target="_blank"
              rel="noopener"
              className="text-blue-600 underline"
            >
              Vercel Inc.
            </a>{" "}
            — logs de acesso padrão (IP, agente do usuário, páginas
            visitadas) são registrados automaticamente para fins de
            segurança e operação.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">6. Seus direitos</h2>
          <p className="text-gray-600 leading-relaxed">
            Conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018), você tem direito a:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
            <li>Saber quais dados tratamos (resposta: nenhum dado pessoal)</li>
            <li>Solicitar a exclusão de qualquer dado (resposta: não temos)</li>
            <li>Revogar consentimento a qualquer momento</li>
            <li>
              Entrar em contato conosco para esclarecimentos pelo e-mail{" "}
              <a
                href="mailto:contato@calculadoratrabalhista.net.br"
                className="text-blue-600 underline"
              >
                contato@calculadoratrabalhista.net.br
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            7. Alterações nesta política
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Esta política pode ser atualizada periodicamente para refletir
            mudanças nos serviços ou na legislação. Recomendamos revisá-la
            ocasionalmente. O rodapé do site sempre exibe a data da última
            atualização.
          </p>
        </div>
      </section>

      {/* Contato */}
      <section className="bg-gray-50 rounded-2xl p-6 text-center space-y-3 border border-gray-200">
        <h2 className="font-bold text-lg">Dúvidas?</h2>
        <p className="text-gray-600 text-sm">
          Se você tiver qualquer dúvida sobre esta política de privacidade,
          entre em contato:
        </p>
        <a
          href="mailto:contato@calculadoratrabalhista.net.br"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          ✉️ contato@calculadoratrabalhista.net.br
        </a>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} Calculadora Trabalhista. Todas as
          calculadoras são gratuitas.
        </p>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Política de Privacidade - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
