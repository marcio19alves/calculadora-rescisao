"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

const FAQS = [
  { q: "Como calcular hora extra 50%?", r: "A hora extra 50% é paga quando o trabalho excede a jornada normal em dias úteis. O cálculo é: salário-hora × 1,5. Exemplo: salário de R$ 3.600 (R$ 16,36/hora) × 1,5 = R$ 24,54 por hora extra. Use nossa calculadora acima para simular." },
  { q: "Como calcular hora extra 100%?", r: "A hora extra 100% é paga quando o trabalho ocorre em domingos e feriados. O cálculo é: salário-hora × 2. Exemplo: salário de R$ 3.600 (R$ 16,36/hora) × 2 = R$ 32,72 por hora extra. O valor é o dobro da hora normal." },
  { q: "O que diz a CLT sobre horas extras?", r: "A CLT determina que a jornada normal é de 8 horas diárias e 44 horas semanais. As horas excedentes devem ser pagas com adicional mínimo de 50% sobre a hora normal. O limite é de 2 horas extras por dia, salvo acordo de compensação (banco de horas)." },
  { q: "O que é DSR (Descanso Semanal Remunerado) sobre horas extras?", r: "O DSR (Descanso Semanal Remunerado) incide sobre as horas extras habituais. O cálculo é: (total de horas extras do mês / dias úteis) × domingos e feriados. As horas extras habituais aumentam o valor do DSR, que deve ser pago separadamente." },
  { q: "Como calcular o valor da hora de trabalho?", r: "Divida o salário mensal por 220 (jornada de 44h semanais). Exemplo: R$ 3.600 ÷ 220 = R$ 16,36/hora. Para jornada de 40h (bancários, por exemplo), divide por 200. Para 36h (alguns profissionais de saúde), divide por 180." },
  { q: "Banco de horas substitui hora extra?", r: "O banco de horas permite compensar horas extras com folgas em vez de pagá-las. Pode ser individual (acordo escrito) ou coletivo (acordo sindical). O prazo para compensação é de até 6 meses (acordo individual) ou 1 ano (acordo coletivo). Se não compensar, deve pagar como hora extra." },
  { q: "Horas extras habituais integram a rescisão?", r: "Sim! Horas extras habituais (feitas por mais de 6 meses) integram o salário para todos os efeitos legais: férias, 13º, FGTS, aviso prévio e verbas rescisórias. A média das horas extras dos últimos 12 meses é usada como base." },
  { q: "Qual a diferença entre hora extra e adicional noturno?", r: "Hora extra é o trabalho além da jornada normal. Adicional noturno (20% sobre a hora normal) é pago pelo trabalho entre 22h e 5h. Os dois podem ser acumulados: hora extra noturna tem adicional de 50% + 20% = 70% sobre a hora normal, ou 100% + 20% se for em domingo/feriado." },
];

function calcularHE(salario: number, horas50: number, horas100: number, horasExtrasHabituais: number, semanasMes: number) {
  const valorHora = salario / 220;
  const valorHE50 = valorHora * 1.5;
  const valorHE100 = valorHora * 2;

  const totalHE50 = valorHE50 * horas50;
  const totalHE100 = valorHE100 * horas100;
  const totalHE = totalHE50 + totalHE100;

  // DSR sobre horas extras habituais
  const diasUteisMes = 25; // média
  const dsrPorDia = horasExtrasHabituais > 0 ? (horasExtrasHabituais * valorHora * 1.5) / diasUteisMes : 0;
  const dsrMensal = dsrPorDia * semanasMes; // ~4-5 domingos/feriados

  return {
    valorHora,
    valorHE50,
    valorHE100,
    totalHE50,
    totalHE100,
    totalHE,
    dsrMensal,
    totalComDSR: totalHE + dsrMensal,
  };
}

export default function HorasExtrasPage() {
  const [salario, setSalario] = useState("");
  const [horas50, setHoras50] = useState("10");
  const [horas100, setHoras100] = useState("4");
  const [resultado, setResultado] = useState<ReturnType<typeof calcularHE> | null>(null);

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
  };

  const softwareJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calculadora de Horas Extras CLT",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Calculadora gratuita de horas extras CLT: 50%, 100% e DSR.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  function handleCalcular() {
    const s = parseFloat(salario.replace(/\./g, "").replace(",", "."));
    if (isNaN(s) || s <= 0) return;
    const h50 = parseFloat(horas50) || 0;
    const h100 = parseFloat(horas100) || 0;
    setResultado(calcularHE(s, h50, h100, h50 + h100, 4.5));
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Horas Extras'}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJson) }} />

      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculadora de Horas Extras</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule o valor exato das suas <strong>horas extras 50% e 100%</strong> conforme a CLT.
          Inclui DSR (Descanso Semanal Remunerado) sobre horas extras habituais.
        </p>
        <p className="text-sm text-gray-500">⚡ Resultado imediato &bull; 🔒 Sem cadastro &bull; 📱 100% mobile</p>
      </section>

      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">Simulador de Horas Extras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Salário Mensal Bruto (R$) *</label>
            <input type="text" inputMode="decimal" placeholder="3.600,00"
              value={salario} onChange={(e) => setSalario(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Valor da Hora Normal</label>
            <input type="text" readOnly disabled placeholder="(calculado automaticamente)"
              value={resultado ? `R$ ${resultado.valorHora.toFixed(2)}` : "(preencha o salário)"}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base bg-gray-50 text-gray-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Horas Extras 50% (dias úteis)</label>
            <input type="number" min="0" step="0.5" value={horas50}
              onChange={(e) => setHoras50(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Horas Extras 100% (domingos/feriados)</label>
            <input type="number" min="0" step="0.5" value={horas100}
              onChange={(e) => setHoras100(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
        </div>

        <button onClick={handleCalcular}
          className="w-full min-h-[52px] bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-base transition-colors">
          Calcular Horas Extras
        </button>

        {resultado && (
          <div className="bg-amber-50 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-amber-800">Resultado</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Valor da hora normal</span><span className="font-medium">R$ {resultado.valorHora.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Valor hora extra 50%</span><span className="font-medium">R$ {resultado.valorHE50.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Valor hora extra 100%</span><span className="font-medium">R$ {resultado.valorHE100.toFixed(2)}</span></div>
              <div className="border-t border-amber-200 pt-2" />
              <div className="flex justify-between"><span>Total HE 50% ({horas50}h)</span><span className="font-medium">R$ {resultado.totalHE50.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Total HE 100% ({horas100}h)</span><span className="font-medium">R$ {resultado.totalHE100.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>DSR sobre HE</span><span className="font-medium">R$ {resultado.dsrMensal.toFixed(2)}</span></div>
              <div className="border-t-2 border-amber-300 pt-2 flex justify-between text-lg">
                <span className="font-bold">Total a Receber no Mês</span>
                <span className="font-bold text-amber-700">R$ {resultado.totalComDSR.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-3 text-xs text-gray-500 mt-2">
              <strong>Lembre-se:</strong> Se as horas extras são habituais (mais de 6 meses), elas integram o cálculo de férias, 13º, FGTS e verbas rescisórias.
            </div>
          </div>
        )}
      </div>

      <article className="prose prose-gray max-w-none space-y-6">
        <h2>Como calcular horas extras conforme a CLT?</h2>
        <p>As horas extras são um dos direitos trabalhistas mais comuns e também um dos que mais geram dúvidas. A CLT determina que a jornada normal é de 8 horas diárias e 44 horas semanais. Qualquer hora além disso é considerada extra e deve ser paga com adicional.</p>

        <h3>Hora extra 50% (dias úteis)</h3>
        <p>Aplica-se ao trabalho excedente em dias úteis (segunda a sábado). O cálculo é: <strong>salário-hora × 1,5</strong>. Exemplo: salário de R$ 3.600 ÷ 220h = R$ 16,36/h. Hora extra 50% = R$ 16,36 × 1,5 = <strong>R$ 24,54/h</strong>.</p>

        <h3>Hora extra 100% (domingos e feriados)</h3>
        <p>Aplica-se ao trabalho em domingos e feriados, salvo escala de revezamento autorizada. O cálculo é: <strong>salário-hora × 2</strong>. Exemplo: R$ 16,36 × 2 = <strong>R$ 32,72/h</strong>.</p>

        <h3>DSR sobre horas extras</h3>
        <p>O Descanso Semanal Remunerado (DSR) incide sobre as horas extras habituais. A cada 25 dias úteis trabalhados, o trabalhador tem direito a 5 dias de descanso (domingos + feriados). As horas extras habituais aumentam o valor do DSR, que deve ser pago separadamente.</p>

        <h3>Como calcular o valor da hora de trabalho?</h3>
        <div className="overflow-x-auto"><table className="min-w-full text-sm border-collapse"><thead><tr className="bg-gray-100"><th className="p-3 border font-semibold">Jornada Semanal</th><th className="p-3 border font-semibold">Divisor Mensal</th><th className="p-3 border font-semibold">Exemplo (R$ 3.600)</th></tr></thead><tbody>
          <tr><td className="p-3 border">44h (geral)</td><td className="p-3 border">220</td><td className="p-3 border">R$ 16,36/h</td></tr>
          <tr className="bg-gray-50"><td className="p-3 border">40h (bancários)</td><td className="p-3 border">200</td><td className="p-3 border">R$ 18,00/h</td></tr>
          <tr><td className="p-3 border">36h (saúde)</td><td className="p-3 border">180</td><td className="p-3 border">R$ 20,00/h</td></tr>
          <tr className="bg-gray-50"><td className="p-3 border">30h (alguns professores)</td><td className="p-3 border">150</td><td className="p-3 border">R$ 24,00/h</td></tr>
        </tbody></table></div>

        <h3>Banco de Horas</h3>
        <p>O banco de horas permite compensar horas extras com folgas, desde que haja acordo individual ou coletivo. O prazo máximo é de 6 meses (acordo individual) ou 1 ano (acordo coletivo). Se não houver compensação no prazo, as horas devem ser pagas como extras.</p>

        <h3>Horas extras na rescisão</h3>
        <p><strong>Horas extras habituais incorporam o salário</strong> para cálculo de férias, 13º salário, FGTS e aviso prévio. A Súmula 264 do TST determina que a média das horas extras dos últimos 12 meses deve ser usada como base para o cálculo das verbas rescisórias.</p>

        <h3>Exemplo prático</h3>
        <div className="bg-amber-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold">Carlos, salário R$ 3.600, fez 15h extras 50% + 6h extras 100% no mês:</p>
          <ul className="text-sm space-y-1">
            <li>Valor hora normal: R$ 16,36</li>
            <li>HE 50%: 15h × R$ 24,54 = R$ 368,10</li>
            <li>HE 100%: 6h × R$ 32,72 = R$ 196,32</li>
            <li>DSR sobre HE: ~R$ 45,00</li>
            <li className="font-bold text-amber-700">Total a receber no mês: ~R$ 609,42</li>
            <li className="text-xs text-gray-500">Valor total do mês com salário: R$ 4.209,42</li>
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
          <strong>⚠️ Aviso importante:</strong> Valores aproximados. Cada categoria profissional pode ter acordos coletivos com percentuais diferentes. Consulte seu sindicato ou um advogado trabalhista.
        </div>
      </article>

      <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">📌 Ferramentas relacionadas</h2>
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
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Horas Extras - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
