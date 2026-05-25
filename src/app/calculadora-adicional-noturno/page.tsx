"use client";
import { useState } from "react";

const FAQS = [
  { q: "Como calcular adicional noturno?", r: "O adicional noturno é de 20% sobre a hora normal para o trabalho entre 22h e 5h. O cálculo: salário-hora × 0,20. Exemplo: R$ 16,36/h × 20% = R$ 3,27 de adicional. Cada hora noturna tem 52 minutos e 30 segundos (não 60 min), o que significa que 7h noturnas equivalem a 8h diurnas." },
  { q: "Qual o percentual do adicional noturno?", r: "O percentual do adicional noturno é de 20% sobre a hora normal para trabalhadores urbanos (CLT). Para trabalhadores rurais, o percentual é de 25% sobre a hora diurna. A Constituição Federal garante esse direito no art. 7º, inciso IX." },
  { q: "Qual o horário considerado noturno?", r: "Para trabalhadores urbanos, o horário noturno vai das 22h às 5h do dia seguinte. Para trabalhadores rurais: 21h às 5h (lavoura) ou 20h às 4h (pecuária). A hora noturna é reduzida: 52 minutos e 30 segundos (urbanos), 60 minutos (rurais, mas com adicional maior)." },
  { q: "Adicional noturno e hora extra podem acumular?", r: "Sim! Se a hora extra for trabalhada em horário noturno, os adicionais se acumulam. Exemplo: hora extra 50% + adicional noturno 20% = 70% sobre a hora normal. Hora extra 100% (domingo) + noturno 20% = 120%." },
  { q: "O adicional noturno integra a rescisão?", r: "Sim! O adicional noturno habitual (recebido por mais de 6 meses) integra o salário para todos os efeitos legais: férias, 13º salário, FGTS, aviso prévio e verbas rescisórias. A Súmula 60 do TST garante esse direito." },
  { q: "O que é hora noturna reduzida?", r: "A hora noturna reduzida é de 52 minutos e 30 segundos, conforme o art. 73 da CLT. Isso significa que cada hora relógio entre 22h e 5h equivale a 52min30s de trabalho. Na prática, 7 horas noturnas de relógio correspondem a 8 horas de trabalho." },
  { q: "Trabalhador que faz hora extra após as 22h tem direito aos dois adicionais?", r: "Sim. Se o trabalhador faz hora extra a partir das 22h, ele tem direito ao adicional de hora extra (50% ou 100%) MAIS o adicional noturno (20%) sobre a hora extra. A Súmula 60 do TST assegura esse direito cumulativo." },
  { q: "O adicional noturno muda de acordo com a profissão?", r: "O percentual base é 20% para urbanos, mas acordos e convenções coletivas podem estabelecer percentuais maiores. Vigilantes, porteiros, profissionais de saúde e motoristas noturnos costumam ter adicionais diferenciados por acordo sindical." },
];

const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calculadora de Adicional Noturno",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "Calculadora gratuita de adicional noturno CLT: percentual 20%, hora reduzida e integração com horas extras.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
};

export default function AdicionalNoturnoPage() {
  const [salario, setSalario] = useState("");
  const [horasNormais, setHorasNormais] = useState("0");
  const [horasExtras50, setHorasExtras50] = useState("0");
  const [horasExtras100, setHorasExtras100] = useState("0");
  const [resultado, setResultado] = useState<{
    valorHora: number;
    adicionalNoturnoHora: number;
    horasRelogio: number;
    horasEfetivas: number;
    totalAdicionalNormal: number;
    totalHE50: number;
    totalHE100: number;
    totalGeral: number;
  } | null>(null);

  const faqJson = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
  };

  function handleCalcular() {
    const s = parseFloat(salario.replace(/\./g, "").replace(",", "."));
    if (isNaN(s) || s <= 0) return;
    const hn = parseFloat(horasNormais) || 0;
    const he50 = parseFloat(horasExtras50) || 0;
    const he100 = parseFloat(horasExtras100) || 0;

    const valorHora = s / 220;
    const adicionalNoturno = valorHora * 0.2;
    
    // Hora reduzida: 52min30s = 0.875 de hora normal
    const fatorReducao = 52.5 / 60;
    const horasEfetivasNoturnas = hn * (1 / fatorReducao);

    const totalAdicionalNormal = adicionalNoturno * horasEfetivasNoturnas;
    const totalHE50Noturno = (valorHora * 1.5 + adicionalNoturno) * he50;
    const totalHE100Noturno = (valorHora * 2 + adicionalNoturno) * he100;

    setResultado({
      valorHora,
      adicionalNoturnoHora: adicionalNoturno,
      horasRelogio: hn,
      horasEfetivas: horasEfetivasNoturnas,
      totalAdicionalNormal,
      totalHE50: totalHE50Noturno,
      totalHE100: totalHE100Noturno,
      totalGeral: totalAdicionalNormal + totalHE50Noturno + totalHE100Noturno,
    });
  }

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_SCHEMA) }} />

      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Calculadora de Adicional Noturno CLT</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule o valor exato do seu <strong>adicional noturno</strong> conforme a CLT.
          Inclui hora reduzida (52min30s), adicional de 20% e cumulação com horas extras.
        </p>
        <p className="text-sm text-gray-500">⚡ Resultado imediato &bull; 🔒 Sem cadastro &bull; 📱 100% mobile</p>
      </section>

      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">Simulador de Adicional Noturno</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Salário Mensal (R$) *</label>
            <input type="text" inputMode="decimal" placeholder="3.600,00" value={salario}
              onChange={(e) => setSalario(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Horas Noturnas Normais (relógio)</label>
            <input type="number" min="0" step="0.5" value={horasNormais}
              onChange={(e) => setHorasNormais(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">HE Noturna 50% (horas)</label>
            <input type="number" min="0" step="0.5" value={horasExtras50}
              onChange={(e) => setHorasExtras50(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">HE Noturna 100% (horas)</label>
            <input type="number" min="0" step="0.5" value={horasExtras100}
              onChange={(e) => setHorasExtras100(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
        </div>

        <button onClick={handleCalcular}
          className="w-full min-h-[52px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base transition-colors">
          Calcular Adicional Noturno
        </button>

        {resultado && (
          <div className="bg-indigo-50 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-indigo-800">Resultado</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Valor da hora normal</span><span className="font-medium">R$ {resultado.valorHora.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Adicional noturno (20%)</span><span className="font-medium text-indigo-700">R$ {resultado.adicionalNoturnoHora.toFixed(2)}/h</span></div>
              <div className="border-t border-indigo-200 pt-2" />
              <div className="flex justify-between"><span>Horas relógio</span><span className="font-medium">{resultado.horasRelogio}h</span></div>
              <div className="flex justify-between"><span>Horas efetivas (hora reduzida)</span><span className="font-medium">{resultado.horasEfetivas.toFixed(1)}h</span></div>
              <div className="border-t border-indigo-200 pt-2" />
              <div className="flex justify-between"><span>Adicional HE normal</span><span className="font-medium">R$ {resultado.totalAdicionalNormal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>HE 50% + noturno</span><span className="font-medium">R$ {resultado.totalHE50.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>HE 100% + noturno</span><span className="font-medium">R$ {resultado.totalHE100.toFixed(2)}</span></div>
              <div className="border-t-2 border-indigo-300 pt-2 flex justify-between text-lg">
                <span className="font-bold">Total Adicional Noturno</span>
                <span className="font-bold text-indigo-700">R$ {resultado.totalGeral.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <article className="prose prose-gray max-w-none space-y-6">
        <h2>Como funciona o adicional noturno na CLT?</h2>
        <p>O adicional noturno é um direito de todo trabalhador que exerce suas funções entre 22h e 5h. Instituído pelo art. 73 da CLT, garante um acréscimo de <strong>20% sobre o valor da hora normal</strong> para trabalhadores urbanos.</p>

        <h3>Hora noturna reduzida</h3>
        <p>Um dos pontos mais importantes e menos conhecidos: a hora noturna tem duração de <strong>52 minutos e 30 segundos</strong>, não 60 minutos. Isso significa que cada hora de relógio no período noturno equivale a 52min30s de trabalho efetivo. Na prática, quem trabalha 7 horas noturnas (22h às 5h) recebe como se tivesse trabalhado 8 horas.</p>

        <h3>Percentual do adicional</h3>
        <ul>
          <li><strong>Trabalhadores urbanos:</strong> 20% sobre a hora normal</li>
          <li><strong>Trabalhadores rurais (lavoura):</strong> 25% — horário: 21h às 5h</li>
          <li><strong>Trabalhadores rurais (pecuária):</strong> 25% — horário: 20h às 4h</li>
        </ul>

        <h3>Adicional noturno + hora extra</h3>
        <p>A Súmula 60 do TST garante que o adicional noturno <strong>cumula com as horas extras</strong>. Exemplo: trabalho noturno em dia útil que excede a jornada normal: hora extra 50% + noturno 20% = 70% adicional. Em domingo/feriado: 100% + 20% = 120%.</p>

        <h3>Integração na rescisão</h3>
        <p>O adicional noturno recebido por mais de 6 meses integra o salário para todos os efeitos: <strong>férias, 13º salário, FGTS, aviso prévio e verbas rescisórias</strong>. A média dos últimos 12 meses é usada como base para o cálculo.</p>

        <h3>Exemplo prático</h3>
        <div className="bg-indigo-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold">Maria, salário R$ 3.600, trabalha 22h às 5h (7h noturnas) por 20 dias no mês:</p>
          <ul className="text-sm space-y-1">
            <li>Valor hora normal: R$ 16,36</li>
            <li>Adicional noturno/hora: R$ 3,27</li>
            <li>Horas relógio no mês: 140h (7h × 20 dias)</li>
            <li>Horas efetivas (hora reduzida): 160h</li>
            <li>Total adicional noturno no mês: ~R$ 523,00</li>
            <li className="font-bold text-indigo-700">Salário com adicional: ~R$ 4.123,00</li>
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
          <strong>⚠️ Aviso importante:</strong> Valores aproximados. Convenções coletivas podem ter percentuais diferentes. Consulte seu sindicato.
        </div>
      </article>
    </div>
  );
}
