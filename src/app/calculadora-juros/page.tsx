"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

const FAQS = [
  { q: "O que são juros compostos?", r: "Juros compostos são juros sobre juros. Diferente dos juros simples (que incidem apenas sobre o valor inicial), os juros compostos incidem sobre o montante acumulado a cada período. É o que faz o dinheiro crescer exponencialmente ao longo do tempo. Albert Einstein teria chamado de 'a oitava maravilha do mundo'." },
  { q: "Qual a fórmula dos juros compostos?", r: "A fórmula é M = C × (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros (em decimal), e t é o tempo. Se houver aportes mensais, usa-se: M = C×(1+i)^t + PMT×[((1+i)^t - 1)/i], onde PMT é o valor do aporte mensal." },
  { q: "Qual a diferença entre juros simples e compostos?", r: "Nos juros simples, os juros incidem apenas sobre o capital inicial. Ex: R$ 1.000 a 1% ao mês rende R$ 10 todo mês. Nos juros compostos, os juros incidem sobre o montante acumulado. Ex: R$ 1.000 a 1% rende R$ 10 no 1º mês, R$ 10,10 no 2º, R$ 10,20 no 3º... A diferença cresce com o tempo." },
  { q: "Como calcular juros compostos na prática?", r: "Use nossa calculadora acima. Basta informar: capital inicial, aporte mensal (se houver), taxa de juros ao mês e período em meses. A calculadora mostra o montante final, total investido e total de juros, além de uma tabela mês a mês." },
  { q: "Qual a melhor taxa de juros para investir?", r: "Depende do seu perfil e objetivo. Para referência: Poupança ~0,5% ao mês, CDB 100% CDI ~0,8-0,9% ao mês, Tesouro Selic ~0,9% ao mês, Fundos imobiliários ~0,8-1,2% ao mês, Ações (longo prazo) ~1-3% ao mês em média. Quanto maior a taxa, maior o risco." },
  { q: "Por que começar a investir cedo é tão importante?", r: "Por causa dos juros compostos. Quanto mais tempo, maior o efeito exponencial. Exemplo: investindo R$ 500/mês a 1% ao mês: em 10 anos = R$ 115.000; em 20 anos = R$ 500.000; em 30 anos = R$ 1.700.000. Os primeiros 10 anos parecem pouco, mas o crescimento acelera com o tempo." },
  { q: "Juros compostos funcionam para dívidas também?", r: "Sim! E é por isso que dívidas no cartão de crédito e cheque especial são tão perigosas — os juros compostos trabalham contra você. Uma dívida de R$ 1.000 a 15% ao mês (rotativo do cartão) vira R$ 4.000 em 12 meses e R$ 16.000 em 24 meses." },
  { q: "O que é a regra dos 72?", r: "A regra dos 72 é uma forma rápida de estimar em quanto tempo seu dinheiro dobra com juros compostos. Divida 72 pela taxa mensal. Exemplo: a 1% ao mês: 72/1 = 72 meses (6 anos) para dobrar. A 2% ao mês: 72/2 = 36 meses (3 anos)." },
];

function calcularJuros(capital: number, aporte: number, taxa: number, meses: number) {
  const i = taxa / 100;
  let montante = capital;
  const tabela: { mes: number; saldo: number; aporte: number; juros: number }[] = [];

  for (let m = 1; m <= meses; m++) {
    const jurosMes = montante * i;
    montante = montante + jurosMes + aporte;
    tabela.push({ mes: m, saldo: montante, aporte: aporte, juros: jurosMes });
  }

  const totalInvestido = capital + aporte * meses;
  const totalJuros = montante - totalInvestido;

  return { montanteFinal: montante, totalInvestido, totalJuros, tabela };
}

export default function JurosPage() {
  const [capital, setCapital] = useState("1000");
  const [aporte, setAporte] = useState("500");
  const [taxa, setTaxa] = useState("1");
  const [meses, setMeses] = useState("12");
  const [resultado, setResultado] = useState<ReturnType<typeof calcularJuros> | null>(null);

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  const softwareJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de Juros Compostos",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Calculadora gratuita de juros compostos com aporte mensal e projeção mês a mês.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  function handleCalcular() {
    const c = parseFloat(capital.replace(/\./g, "").replace(",", ".")) || 0;
    const a = parseFloat(aporte.replace(/\./g, "").replace(",", ".")) || 0;
    const t = parseFloat(taxa) || 0;
    const m = parseInt(meses) || 1;
    if (t <= 0 || m <= 0) return;
    setResultado(calcularJuros(c, a, t, m));
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Juros Compostos'}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJson) }} />

      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculadora de Juros Compostos</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Simule o crescimento dos seus investimentos com <strong>juros compostos</strong>.
          Veja quanto seu dinheiro pode render com aportes mensais, taxa de juros e período.
        </p>
        <p className="text-sm text-gray-500">⚡ Resultado imediato &bull; 📊 Projeção mensal &bull; 🔒 Sem cadastro</p>
      </section>

      {/* Calculadora */}
      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">Simulador de Juros Compostos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Capital Inicial (R$)</label>
            <input type="text" inputMode="decimal" placeholder="1.000,00"
              value={capital} onChange={(e) => setCapital(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Aporte Mensal (R$)</label>
            <input type="text" inputMode="decimal" placeholder="500,00"
              value={aporte} onChange={(e) => setAporte(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Taxa de Juros (% ao mês)</label>
            <input type="number" step="0.1" min="0" max="20" placeholder="1"
              value={taxa} onChange={(e) => setTaxa(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Período (meses)</label>
            <input type="number" min="1" max="600" placeholder="12"
              value={meses} onChange={(e) => setMeses(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
        </div>

        <button onClick={handleCalcular}
          className="w-full min-h-[52px] bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-base transition-colors">
          Calcular Juros Compostos
        </button>

        {resultado && (
          <>
            <div className="bg-green-50 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-green-800">Resultado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Montante Final</p>
                  <p className="text-2xl font-bold text-green-700">R$ {resultado.montanteFinal.toFixed(2)}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Total Investido</p>
                  <p className="text-xl font-semibold">R$ {resultado.totalInvestido.toFixed(2)}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Total em Juros</p>
                  <p className="text-xl font-semibold text-blue-700">R$ {resultado.totalJuros.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Tabela mês a mês */}
            <details className="bg-white border rounded-xl">
              <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl">
                Ver tabela mês a mês ({resultado.tabela.length} meses)
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left"><th className="p-2 font-medium">Mês</th><th className="p-2 font-medium">Saldo</th><th className="p-2 font-medium">Aporte</th><th className="p-2 font-medium">Juros</th></tr></thead>
                  <tbody>
                    {resultado.tabela.map((linha) => (
                      <tr key={linha.mes} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-2">{linha.mes}</td>
                        <td className="p-2 font-medium">R$ {linha.saldo.toFixed(2)}</td>
                        <td className="p-2 text-gray-500">R$ {linha.aporte.toFixed(2)}</td>
                        <td className="p-2 text-green-600">R$ {linha.juros.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </div>

      {/* Artigo */}
      <article className="prose prose-gray max-w-none space-y-6">
        <h2>O que são juros compostos e por que são tão poderosos?</h2>
        <p>Juros compostos são os juros que geram mais juros. É o que acontece quando você reinveste os rendimentos — o dinheiro trabalha para você, e os ganhos geram novos ganhos.</p>

        <h3>Juros simples vs compostos: a diferença que muda tudo</h3>
        <p>Nos juros simples, os juros incidem apenas sobre o valor inicial. Exemplo: R$ 1.000 a 1% ao mês rende R$ 10 todo mês, sempre igual. Nos juros compostos, no 1º mês rende R$ 10, no 2º rende R$ 10,10, no 3º R$ 10,20 — e assim vai aumentando. Em 12 meses, a diferença é pequena. Em 30 anos, é astronômica.</p>

        <h3>A fórmula mágica</h3>
        <p>M = C × (1 + i)^t</p>
        <p>Com aportes mensais: M = C×(1+i)^t + PMT×[((1+i)^t - 1)/i]</p>
        <p>Onde: M = montante final, C = capital inicial, i = taxa, t = tempo, PMT = aporte mensal.</p>

        <h3>Por que o tempo é seu maior aliado</h3>
        <p>O segredo dos juros compostos é o tempo. Investir R$ 500/mês a 1% ao mês:</p>
        <ul>
          <li><strong>5 anos:</strong> ~R$ 41.000</li>
          <li><strong>10 anos:</strong> ~R$ 115.000</li>
          <li><strong>20 anos:</strong> ~R$ 500.000</li>
          <li><strong>30 anos:</strong> ~R$ 1.700.000</li>
        </ul>
        <p>Perceba: de 20 para 30 anos, o valor mais que triplica. Esse é o poder dos juros compostos.</p>

        <h3>Exemplo prático</h3>
        <div className="bg-green-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold">Maria quer juntar para a aposentadoria:</p>
          <ul className="text-sm space-y-1">
            <li>Capital inicial: R$ 5.000,00</li>
            <li>Aporte mensal: R$ 800,00</li>
            <li>Taxa: 0,8% ao mês (CDB 100% CDI)</li>
            <li>Período: 25 anos (300 meses)</li>
            <li className="font-bold text-green-700">Montante final: ~R$ 1.070.000</li>
            <li className="text-sm text-gray-500">Total investido: R$ 245.000 | Juros: R$ 825.000</li>
          </ul>
        </div>

        <h3>Efeito negativo: dívidas</h3>
        <p>Os juros compostos também funcionam contra você. Uma dívida de R$ 5.000 no cartão de crédito (15% ao mês) vira R$ 23.000 em 12 meses. Por isso é tão importante pagar dívidas antes de investir.</p>

        <h2>Perguntas Frequentes</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border rounded-xl p-4">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.r}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <strong>⚠️ Aviso importante:</strong> A calculadora é uma ferramenta educacional. Investimentos reais têm taxas variáveis e riscos. Consulte um profissional para decisões financeiras.
        </div>
      </article>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Juros Compostos - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
