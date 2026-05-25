import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre | CalcularRescisao",
  description:
    "Conheça o CalcularRescisao — site de calculadoras trabalhistas gratuitas. Nossa missão é ajudar trabalhadores brasileiros a calcular seus direitos de forma simples, rápida e 100% gratuita.",
  openGraph: {
    title: "Sobre o CalcularRescisao",
    description:
      "Conheça nossa história e missão: calculadoras trabalhistas gratuitas para todos os brasileiros.",
  },
};

const VALORES = [
  {
    icone: "🔓",
    titulo: "Gratuidade",
    desc: "Todas as calculadoras são 100% gratuitas. Sem assinatura, sem cartão de crédito, sem limite de uso.",
  },
  {
    icone: "🔒",
    titulo: "Privacidade",
    desc: "Seus dados nunca saem do seu dispositivo. Todo cálculo é processado no seu navegador (client-side).",
  },
  {
    icone: "⚡",
    titulo: "Agilidade",
    desc: "Resultado instantâneo. Preencha os campos e veja o valor na hora. Sem refresh, sem espera.",
  },
  {
    icone: "📖",
    titulo: "Transparência",
    desc: "Explicamos cada verba calculada. Você entende o que está recebendo e por quê.",
  },
];

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <span className="text-3xl">⚖️</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Sobre o <span className="text-blue-600">CalcularRescisao</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Calculadoras trabalhistas online e gratuitas para o trabalhador
          brasileiro. Simples, rápidas e sem burocracia.
        </p>
      </section>

      {/* Nossa História */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
        <h2 className="text-2xl font-bold">Nossa História</h2>
        <p className="text-gray-600 leading-relaxed">
          O <strong>CalcularRescisao</strong> nasceu de uma necessidade real:
          milhões de trabalhadores brasileiros são demitidos todos os anos e
          muitos ficam perdidos na hora de calcular o valor da rescisão.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Sabemos que o momento da demissão gera ansiedade e insegurança.
          Quanto vou receber? Tenho direito a quê? Será que o valor está certo?
          Nossas calculadoras foram criadas para responder essas perguntas de
          forma clara, objetiva e — acima de tudo — gratuita.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Além da <Link href="/calculadora-rescisao" className="text-blue-600 underline">calculadora de rescisão</Link>,
          oferecemos ferramentas para{" "}
          <Link href="/calculadora-fgts" className="text-blue-600 underline">FGTS</Link>,{" "}
          <Link href="/calculadora-ferias" className="text-blue-600 underline">férias</Link>,{" "}
          <Link href="/calculadora-horas-extras" className="text-blue-600 underline">horas extras</Link>,{" "}
          <Link href="/calculadora-adicional-noturno" className="text-blue-600 underline">adicional noturno</Link> e{" "}
          <Link href="/calculadora-juros" className="text-blue-600 underline">juros compostos</Link>.
        </p>
      </section>

      {/* Nossos Valores */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Nossos Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALORES.map((v) => (
            <div
              key={v.titulo}
              className="bg-white border border-gray-200 rounded-xl p-5 space-y-2 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{v.icone}</span>
                <h3 className="font-semibold text-lg">{v.titulo}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 border border-blue-100 space-y-6">
        <h2 className="text-2xl font-bold text-center">Como funciona?</h2>
        <p className="text-gray-600 text-center max-w-xl mx-auto">
          Diferente de outros sites, todos os nossos cálculos são processados no
          <strong> seu navegador</strong>. Isso significa que:
        </p>
        <ul className="space-y-3 max-w-lg mx-auto">
          {[
            "✅ Nenhum dado sai do seu computador ou celular",
            "✅ O resultado é instantâneo — sem refresh, sem espera",
            "✅ Funciona offline depois do primeiro carregamento",
            "✅ Sem limite de consultas, sem cadastro, sem e-mail",
          ].map((item) => (
            <li key={item} className="text-gray-700 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Aviso */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-2">
        <h3 className="font-semibold text-amber-800 flex items-center gap-2">
          ⚠️ Aviso Importante
        </h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          Os valores calculados são aproximados e servem como referência. Cada
          caso trabalhista pode ter particularidades (comissões, horas extras
          habituais, descontos judiciais, acordos coletivos) que alteram o valor
          final. Consulte um contador ou advogado trabalhista para cálculos
          oficiais e orientação jurídica.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/calculadora-rescisao"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          Calcular minha rescisão agora →
        </Link>
      </div>
    </div>
  );
}
