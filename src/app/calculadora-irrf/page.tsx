"use client";

import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/breadcrumbs";

const FAIXAS_INSS = [
  { limite: 1518.0, aliquota: 0.075 },
  { limite: 2793.88, aliquota: 0.09 },
  { limite: 4190.83, aliquota: 0.12 },
  { limite: 8157.41, aliquota: 0.14 },
];

const FAIXAS_IRRF = [
  { limite: 2259.2, aliquota: 0, deducao: 0 },
  { limite: 2828.65, aliquota: 0.075, deducao: 169.44 },
  { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.0 },
];

const DEPENDENTE = 189.59;

function calcINSS(salario: number) {
  if (salario <= 0) return 0;
  let inss = 0;
  let restante = salario;
  for (const f of FAIXAS_INSS) {
    if (restante <= 0) break;
    const base = Math.min(restante, f.limite);
    inss += base * f.aliquota;
    restante -= f.limite;
  }
  return Math.min(inss, 8157.41 * 0.14);
}

function calcIRRF(base: number) {
  if (base <= 0) return 0;
  for (const f of FAIXAS_IRRF) {
    if (base <= f.limite) {
      return Math.max(0, base * f.aliquota - f.deducao);
    }
  }
  return 0;
}

export default function IRRFPage() {
  const [salario, setSalario] = useState("");
  const [dependentes, setDependentes] = useState("");
  const [outros, setOutros] = useState("");
  const [resultado, setResultado] = useState<{
    inss: number;
    baseCalculo: number;
    irrf: number;
    aliquota: number;
    deducao: number;
    salarioLiquido: number;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de IRRF",
    url: "https://calculadoratrabalhista.net.br/calculadora-irrf",
    description:
      "Calcule o Imposto de Renda Retido na Fonte (IRRF) sobre o salário. Tabela progressiva 2025 com deduções.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular o IRRF do salário?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O IRRF é calculado sobre a base de cálculo, que é o salário bruto menos o INSS, menos a dedução de dependentes (R$ 189,59 cada) e outros descontos legais. Sobre essa base aplica-se a alíquota correspondente (0% a 27,5%) menos a dedução da faixa. O resultado é o valor do IRRF a ser retido.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a tabela do IRRF 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabela IRRF 2025: até R$ 2.259,20 (isento), de R$ 2.259,21 a R$ 2.828,65 (7,5% com dedução de R$ 169,44), de R$ 2.828,66 a R$ 3.751,05 (15% com dedução de R$ 381,44), de R$ 3.751,06 a R$ 4.664,68 (22,5% com dedução de R$ 662,77), acima de R$ 4.664,68 (27,5% com dedução de R$ 896,00).",
        },
      },
      {
        "@type": "Question",
        name: "Quem é isento de IRRF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "São isentos de IRRF os trabalhadores cuja base de cálculo (salário bruto menos INSS e deduções) não ultrapasse R$ 2.259,20. Também são isentos: aposentados e pensionistas acima de 65 anos (dentro do limite), portadores de doenças graves, e rendimentos de caderneta de poupança.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona a dedução de dependentes no IRRF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cada dependente legal reduz a base de cálculo do IRRF em R$ 189,59. Podem ser dependentes: cônjuge, filhos até 21 anos (ou até 24 se cursando universidade), filhos inválidos de qualquer idade, companheiro(a) e enteados. É necessário informar os dependentes no momento do cadastro na empresa.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre IRRF e Imposto de Renda anual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O IRRF é o imposto retido mensalmente na fonte pela empresa, calculado sobre a remuneração do trabalhador. O Imposto de Renda anual é a declaração entregue à Receita Federal até abril, onde se ajusta o total de IRRF pago com o imposto devido. Pode haver restituição se pagou a mais, ou imposto a pagar se pagou a menos.",
        },
      },
    ],
  };

  function calcular() {
    const bruto = parseFloat(salario.replace(",", "."));
    const dep = parseInt(dependentes) || 0;
    const outrosDesc = parseFloat(outros.replace(",", ".")) || 0;
    if (isNaN(bruto) || bruto <= 0) return;

    const inss = calcINSS(bruto);
    const baseCalculo = Math.max(0, bruto - inss - dep * DEPENDENTE - outrosDesc);

    let aliquota = 0;
    let deducao = 0;
    for (const f of FAIXAS_IRRF) {
      if (baseCalculo <= f.limite) {
        aliquota = f.aliquota;
        deducao = f.deducao;
        break;
      }
    }

    const irrf = calcIRRF(baseCalculo);
    const salarioLiquido = bruto - inss - irrf - outrosDesc;

    setResultado({ inss, baseCalculo, irrf, aliquota: aliquota * 100, deducao, salarioLiquido });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'IRRF'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de IRRF
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule o Imposto de Renda Retido na Fonte sobre seu salário. Tabela
          progressiva 2025 atualizada.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label htmlFor="salario" className="block text-sm font-medium text-gray-700 mb-1">
              Salário Bruto (R$)
            </label>
            <input
              id="salario"
              type="text"
              inputMode="decimal"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="Ex: 5000,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="dependentes" className="block text-sm font-medium text-gray-700 mb-1">
              Dependentes
            </label>
            <input
              id="dependentes"
              type="number"
              min="0"
              max="15"
              value={dependentes}
              onChange={(e) => setDependentes(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Dedução de R$ 189,59 por dependente</p>
          </div>
          <div>
            <label htmlFor="outros" className="block text-sm font-medium text-gray-700 mb-1">
              Outros Descontos (R$) — pensão, etc.
            </label>
            <input
              id="outros"
              type="text"
              inputMode="decimal"
              value={outros}
              onChange={(e) => setOutros(e.target.value)}
              placeholder="Ex: 500,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          <button
            onClick={calcular}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular IRRF
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Resultado</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">INSS</p>
                  <p className="text-xl font-bold text-orange-600">
                    - R$ {resultado.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Base de Cálculo IRRF</p>
                  <p className="text-xl font-bold text-gray-900">
                    R$ {resultado.baseCalculo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Alíquota IRRF</p>
                  <p className="text-xl font-bold text-red-700">{resultado.aliquota.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">Dedução: R$ {resultado.deducao.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Valor IRRF</p>
                  <p className="text-xl font-bold text-red-600">
                    R$ {resultado.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 font-medium">Salário Líquido</p>
                <p className="text-3xl font-bold text-green-700">
                  R$ {resultado.salarioLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          )}
        </div>

        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Tabela IRRF 2025</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Até R$ 2.259,20 — Isento</li>
            <li>De R$ 2.259,21 a R$ 2.828,65 — 7,5% (dedução R$ 169,44)</li>
            <li>De R$ 2.828,66 a R$ 3.751,05 — 15% (dedução R$ 381,44)</li>
            <li>De R$ 3.751,06 a R$ 4.664,68 — 22,5% (dedução R$ 662,77)</li>
            <li>Acima de R$ 4.664,68 — 27,5% (dedução R$ 896,00)</li>
          </ul>
          <p className="mt-4">
            A base de cálculo do IRRF é o salário bruto menos o INSS, menos a
            dedução de dependentes (R$ 189,59 cada) e outros descontos
            permitidos por lei.
          </p>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de IRRF - Calculadora Trabalhista" />
      </div>
    </>
  );
}
