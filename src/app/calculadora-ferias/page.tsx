"use client";

import { useState } from "react";

const FAQS = [
  { q: "Como calcular férias CLT?", r: "Para calcular as férias CLT, multiplique o salário por 1/3 (adicional constitucional) e some ao valor base. Exemplo: salário de R$ 3.000 ÷ 30 dias × 30 dias = R$ 3.000 de férias + R$ 1.000 de 1/3 = R$ 4.000. Sobre esse valor incide INSS, mas não IRRF para valores até R$ 4.664,68." },
  { q: "O que é 1/3 constitucional de férias?", r: "O 1/3 constitucional é um adicional de um terço sobre o valor das férias garantido pela Constituição Federal (art. 7º, inciso XVII). Se suas férias são R$ 3.000, você recebe mais R$ 1.000 de adicional, totalizando R$ 4.000." },
  { q: "Qual a diferença entre férias vencidas e proporcionais?", r: "Férias vencidas são aquelas cujo período aquisitivo (12 meses) já foi completado e as férias não foram gozadas. Férias proporcionais são calculadas sobre os meses trabalhados no período aquisitivo atual, que ainda não completou 12 meses." },
  { q: "Como funciona o abono pecuniário (venda de férias)?", r: "O abono pecuniário permite que o trabalhador venda até 1/3 de suas férias (10 dias). O valor recebido é equivalente ao salário dividido por 30 vezes os dias vendidos, mais 1/3 constitucional. É uma opção do trabalhador, não do empregador." },
  { q: "Quantos dias de férias tenho direito por mês trabalhado?", r: "A cada mês trabalhado, o empregado adquire direito a 1/12 de férias. Após 12 meses (período aquisitivo completo), tem direito a 30 dias corridos de férias, que devem ser gozadas nos 12 meses seguintes (período concessivo)." },
  { q: "Faltas injustificadas afetam as férias?", r: "Sim. Conforme o art. 130 da CLT: até 5 faltas = 30 dias; 6 a 14 faltas = 24 dias; 15 a 23 faltas = 18 dias; 24 a 32 faltas = 12 dias; acima de 32 faltas = perde o direito." },
  { q: "Férias têm desconto de INSS e IRRF?", r: "Sim, as férias sofrem desconto de INSS (tabela progressiva). O IRRF incide apenas se o valor total ultrapassar a faixa de isenção (R$ 2.259,20). O 1/3 constitucional também sofre INSS." },
  { q: "O que são férias coletivas?", r: "Férias coletivas são concedidas pelo empregador a todos os empregados ou a setores específicos da empresa, geralmente no fim de ano. Devem ser comunicadas ao sindicato e ao Ministério do Trabalho com 15 dias de antecedência." },
];

function calcularFerias(salario: number, dias: number, abono: boolean, faltas: number) {
  // Ajustar dias conforme faltas (art. 130 CLT)
  let diasFerias = dias;
  if (faltas <= 5) diasFerias = Math.min(dias, 30);
  else if (faltas <= 14) diasFerias = Math.min(dias, 24);
  else if (faltas <= 23) diasFerias = Math.min(dias, 18);
  else if (faltas <= 32) diasFerias = Math.min(dias, 12);
  else diasFerias = 0;

  if (diasFerias <= 0) {
    return { error: "Com mais de 32 faltas, o empregado perde o direito às férias (art. 130 CLT)." };
  }

  const valorDiario = salario / 30;
  const valorFerias = valorDiario * diasFerias;
  const tercoConst = valorFerias / 3;

  let abonoValor = 0;
  let tercoAbono = 0;
  if (abono) {
    const diasAbono = Math.min(10, diasFerias / 3);
    abonoValor = valorDiario * diasAbono;
    tercoAbono = abonoValor / 3;
  }

  const totalBruto = valorFerias + tercoConst + abonoValor + tercoAbono;

  // INSS tabela 2026
  let inss = 0;
  if (totalBruto > 0) {
    const faixas = [
      { ate: 1518.00, ali: 0.075 },
      { ate: 2793.88, ali: 0.09 },
      { ate: 4190.83, ali: 0.12 },
      { ate: 8157.41, ali: 0.14 },
    ];
    let restante = totalBruto;
    let prev = 0;
    for (const f of faixas) {
      const base = Math.min(restante, f.ate - prev);
      if (base > 0) { inss += base * f.ali; restante -= base; prev = f.ate; }
      else break;
    }
  }

  const totalLiquido = Math.max(0, totalBruto - inss);

  return { valorFerias, tercoConst, abonoValor, tercoAbono, totalBruto, inss, totalLiquido, diasFerias };
}

export default function FeriasPage() {
  const [salario, setSalario] = useState("");
  const [dias, setDias] = useState("30");
  const [abono, setAbono] = useState("nao");
  const [faltas, setFaltas] = useState("0");
  const [resultado, setResultado] = useState<ReturnType<typeof calcularFerias> | null>(null);

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  const softwareJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de Férias CLT",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Calculadora gratuita de férias CLT com 1/3 constitucional e abono pecuniário.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  function handleCalcular() {
    const s = parseFloat(salario.replace(/\./g, "").replace(",", "."));
    if (isNaN(s) || s <= 0) return;
    const d = parseInt(dias) || 30;
    const f = parseInt(faltas) || 0;
    setResultado(calcularFerias(s, Math.min(d, 30), abono === "sim", f));
  }

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJson) }} />

      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculadora de Férias CLT</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule o valor das suas férias trabalhista de graça. Considere o <strong>1/3 constitucional</strong>, 
          <strong> abono pecuniário</strong> (venda de férias) e <strong>descontos por faltas</strong> conforme a CLT.
        </p>
        <p className="text-sm text-gray-500">⚡ Resultado imediato &bull; 🔒 Sem cadastro &bull; 📱 100% mobile</p>
      </section>

      {/* Calculadora */}
      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">Simulador de Férias</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Salário Bruto (R$) *</label>
            <input type="text" inputMode="decimal" placeholder="3.600,00"
              value={salario} onChange={(e) => setSalario(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dias de Férias</label>
            <input type="number" min={1} max={30} value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Abono Pecuniário (vender 1/3)?</label>
            <select value={abono} onChange={(e) => setAbono(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white">
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Faltas Injustificadas no Ano</label>
            <select value={faltas} onChange={(e) => setFaltas(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white">
              {[0, 5, 10, 14, 15, 20, 23, 24, 30, 32].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "falta" : "faltas"}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleCalcular}
          className="w-full min-h-[52px] bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-base transition-colors">
          Calcular Férias
        </button>

        {resultado && "error" in resultado && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{resultado.error}</div>
        )}

        {resultado && !("error" in resultado) && (
          <div className="bg-purple-50 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-purple-800">Resultado</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Férias ({resultado.diasFerias} dias)</span><span className="font-medium">R$ {resultado.valorFerias.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>1/3 Constitucional</span><span className="font-medium">R$ {resultado.tercoConst.toFixed(2)}</span></div>
              {resultado.abonoValor > 0 && <><div className="flex justify-between"><span>Abono Pecuniário</span><span className="font-medium">R$ {resultado.abonoValor.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>1/3 Abono</span><span className="font-medium">R$ {resultado.tercoAbono.toFixed(2)}</span></div></>}
              <div className="border-t border-purple-200 pt-2" />
              <div className="flex justify-between"><span>Total Bruto</span><span className="font-bold text-green-700">R$ {resultado.totalBruto.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Desconto INSS</span><span className="font-bold text-red-600">- R$ {resultado.inss.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg border-t-2 border-purple-300 pt-2"><span className="font-bold">Total Líquido</span><span className="font-bold text-purple-700">R$ {resultado.totalLiquido.toFixed(2)}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Artigo */}
      <article className="prose prose-gray max-w-none space-y-6">
        <h2>Como funciona o cálculo de férias na CLT?</h2>
        <p>As férias são um direito garantido pela Constituição Federal e pela CLT. Todo trabalhador com carteira assinada tem direito a 30 dias de férias após 12 meses de trabalho (período aquisitivo), com adicional de 1/3 sobre o valor normal.</p>

        <h3>1/3 Constitucional: o que é?</h3>
        <p>O adicional de 1/3 de férias está previsto no art. 7º, inciso XVII da Constituição. Significa que, além do valor normal do salário, o trabalhador recebe mais um terço. Exemplo: se o salário é R$ 3.600, o valor das férias é R$ 3.600 + R$ 1.200 (1/3) = R$ 4.800.</p>

        <h3>Abono Pecuniário: vender as férias</h3>
        <p>O abono pecuniário permite que o trabalhador converta até 1/3 de suas férias em dinheiro (art. 143 da CLT). Ou seja, ao invés de 30 dias de descanso, o trabalhador pode tirar 20 dias e receber 10 dias em dinheiro, além do 1/3 constitucional sobre esses 10 dias. A venda de férias é uma opção do <strong>trabalhador</strong>, não do empregador.</p>

        <h3>Faltas e desconto de férias (art. 130 CLT)</h3>
        <p>As faltas injustificadas reduzem os dias de férias conforme a tabela:</p>
        <div className="overflow-x-auto"><table className="min-w-full text-sm border-collapse"><thead><tr className="bg-gray-100"><th className="p-3 border font-semibold">Faltas no Ano</th><th className="p-3 border font-semibold">Dias de Férias</th></tr></thead><tbody>
          <tr><td className="p-3 border">Até 5 faltas</td><td className="p-3 border font-bold">30 dias</td></tr>
          <tr className="bg-gray-50"><td className="p-3 border">6 a 14 faltas</td><td className="p-3 border font-bold">24 dias</td></tr>
          <tr><td className="p-3 border">15 a 23 faltas</td><td className="p-3 border font-bold">18 dias</td></tr>
          <tr className="bg-gray-50"><td className="p-3 border">24 a 32 faltas</td><td className="p-3 border font-bold">12 dias</td></tr>
          <tr><td className="p-3 border">Mais de 32 faltas</td><td className="p-3 border font-bold text-red-600">Perde o direito</td></tr>
        </tbody></table></div>

        <h3>Férias vencidas vs proporcionais</h3>
        <p>Férias vencidas são aquelas que já deveriam ter sido concedidas (período aquisitivo completo há mais de 12 meses). Férias proporcionais são calculadas sobre os meses trabalhados desde o último período aquisitivo. Na rescisão, ambas devem ser pagas.</p>

        <h3>Exemplo prático</h3>
        <div className="bg-purple-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold">João, salário R$ 3.600, 30 dias de férias, sem faltas, com abono:</p>
          <ul className="text-sm space-y-1">
            <li>Férias (30 dias): R$ 3.600,00</li>
            <li>1/3 Constitucional: R$ 1.200,00</li>
            <li>Abono (10 dias): R$ 1.200,00</li>
            <li>1/3 Abono: R$ 400,00</li>
            <li className="font-bold">Total Bruto: R$ 6.400,00</li>
            <li>INSS (faixa 27,5% limitada): ~R$ 704,00</li>
            <li className="font-bold text-purple-700">Total Líquido: ~R$ 5.696,00</li>
          </ul>
        </div>

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
          <strong>⚠️ Aviso importante:</strong> Os valores são aproximados. Consulte um contador ou advogado trabalhista para cálculos oficiais.
        </div>
      </article>

      {/* Links internos */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">📌 Continue calculando</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/calculadora-rescisao" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div><span className="font-medium">Calculadora de Rescisão</span><p className="text-xs text-gray-500">Calcule todas as verbas</p></div>
          </a>
          <a href="/calculadora-fgts" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div><span className="font-medium">Calculadora de FGTS</span><p className="text-xs text-gray-500">Calcule a multa de 40%</p></div>
          </a>
        </div>
      </section>
    </div>
  );
}
