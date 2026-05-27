import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Contato | Calculadora Trabalhista",
  description:
    "Entre em contato com o Calculadora Trabalhista. Sugestões de calculadoras, reportar erros, parcerias e mais.",
  openGraph: {
    title: "Contato | Calculadora Trabalhista",
    description:
      "Tem uma sugestão? Encontrou um erro? Quer fazer parceria? Fale conosco.",
  },
};

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <span className="text-3xl">📧</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">Fale Conosco</h1>
        <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
          Tem uma sugestão de calculadora? Encontrou algum erro? Quer fazer
          parceria ou anunciar? Mande uma mensagem.
        </p>
      </section>

      {/* Cartão de contato */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl">✉️</span>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Nosso e-mail</h2>
          <a
            href="mailto:contato@calculadoratrabalhista.net.br"
            className="text-blue-600 font-semibold text-lg sm:text-xl hover:text-blue-800 transition-colors"
          >
            contato@calculadoratrabalhista.net.br
          </a>
        </div>
        <p className="text-gray-500 text-sm">Respondemos em até 48 horas úteis.</p>
      </section>

      {/* Sugestões de pauta */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 space-y-4 border border-blue-100">
        <h2 className="text-xl font-bold flex items-center gap-2">
          💡 Sugira uma calculadora
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Estamos sempre adicionando novas ferramentas. Se você precisa de uma
          calculadora específica que ainda não temos, nos avise! Analisamos
          todas as sugestões.
        </p>
        <p className="text-sm text-gray-500">
          Exemplos: Aviso Prévio, 13º Salário, Seguro-Desemprego, INSS,
          Comissões, Plano de Saúde na Rescisão...
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {["Aviso Prévio", "13º Salário", "Seguro-Desemprego", "INSS"].map(
            (sugestao) => (
              <Link
                key={sugestao}
                href={`mailto:contato@calculadoratrabalhista.net.br?subject=Sugestão: Calculadora de ${sugestao}`}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                {sugestao}
              </Link>
            )
          )}
        </div>
      </section>

      {/* Links rápidos */}
      <section className="text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Nossas calculadoras
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { nome: "Rescisão", href: "/calculadora-rescisao" },
            { nome: "Horas Extras", href: "/calculadora-horas-extras" },
            { nome: "Adicional Noturno", href: "/calculadora-adicional-noturno" },
            { nome: "FGTS", href: "/calculadora-fgts" },
            { nome: "Férias", href: "/calculadora-ferias" },
            { nome: "Juros Compostos", href: "/calculadora-juros" },
          ].map(({ nome, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
            >
              {nome}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Fale Conosco - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
