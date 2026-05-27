"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";

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

const DEPENDENTE_DEDUCAO = 189.59;
const TETO_INSS = 8157.41;

function calcularINSS(salario: number) {
  if (salario <= 0) return 0;
  let inss = 0;
  let tetoAtingido = false;
  for (const faixa of FAIXAS_INSS) {
    if (tetoAtingido) break;
    const base = Math.min(salario, faixa.limite);
    const valorFaixa = base * faixa.aliquota;
    inss += valorFaixa;
    if (salario <= faixa.limite) tetoAtingido = true;
  }
  return Math.min(inss, TETO_INSS * 0.14);
}

function calcularIRRF(base: number) {
  if (base <= 0) return 0;
  for (const faixa of FAIXAS_IRRF) {
    if (base <= faixa.limite) {
      const valor = base * faixa.aliquota - faixa.deducao;
      return Math.max(0, valor);
    }
  }
  return 0;
}

export default function SalarioLiquidoPage() {
  const [salario, setSalario] = useState("");
  const [dependentes, setDependentes] = useState("");
  const [outrosDescontos, setOutrosDescontos] = useState("");
  const [resultado, setResultado] = useState<{
    inss: number;
    baseIRRF: number;
    irrf: number;
    liquido: number;
    aliquotaEfetivaINSS: number;
    aliquotaEfetivaIRRF: number;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Salário Líquido",
    url: "https://calculadoratrabalhista.net.br/calculadora-salario-liquido",
    description:
      "Calcule o salário líquido CLT com descontos de INSS e IRRF. Tabelas progressivas atualizadas 2025.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular o salário líquido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O salário líquido é calculado subtraindo do salário bruto os descontos legais obrigatórios: INSS (tabela progressiva de 7,5% a 14%) e IRRF (tabela progressiva de 0% a 27,5%), além de outros descontos como vale-transporte, plano de saúde e pensão alimentícia.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre salário bruto e líquido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Salário bruto é o valor total acordado entre empregado e empregador, antes de qualquer desconto. Salário líquido é o valor efetivamente recebido pelo trabalhador após todos os descontos legais e opcionais. A diferença entre eles pode variar de 10% a 35% dependendo da faixa salarial e dos descontos aplicáveis.",
        },
      },
      {
        "@type": "Question",
        name: "Quais descontos incidem sobre o salário?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Os principais descontos são: INSS (contribuição previdenciária de 7,5% a 14%), IRRF (Imposto de Renda Retido na Fonte de 0% a 27,5%), vale-transporte (até 6% do salário), plano de saúde, pensão alimentícia (por determinação judicial) e contribuição sindical (quando aplicável).",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular o desconto de INSS no salário?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O INSS é calculado de forma progressiva em 2025: até R$ 1.518,00 (7,5%), de R$ 1.518,01 a R$ 2.793,88 (9%), de R$ 2.793,89 a R$ 4.190,83 (12%), de R$ 4.190,84 a R$ 8.157,41 (14%). Cada faixa incide apenas sobre o valor que excede o limite anterior, com teto máximo de contribuição.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona a dedução de dependentes no IRRF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cada dependente legal (filhos até 21 anos ou até 24 se cursando universidade, cônjuge, companheiro(a)) reduz a base de cálculo do IRRF em R$ 189,59. Essa dedução é aplicada após o desconto do INSS, diminuindo o valor sobre o qual o imposto de renda é calculado.",
        },
      },
    ],
  };

  function calcular() {
    const bruto = parseFloat(salario.replace(",", "."));
    if (isNaN(bruto) || bruto <= 0) return;
    const dep = parseInt(dependentes) || 0;
    const outros = parseFloat(outrosDescontos.replace(",", ".")) || 0;

    const inss = calcularINSS(bruto);
    const baseIRRF = Math.max(0, bruto - inss - dep * DEPENDENTE_DEDUCAO);
    const irrf = calcularIRRF(baseIRRF);
    const liquido = bruto - inss - irrf - outros;

    const aliquotaINSS = bruto > 0 ? (inss / bruto) * 100 : 0;
    const aliquotaIRRF = bruto > 0 ? (irrf / bruto) * 100 : 0;

    setResultado({ inss, baseIRRF, irrf, liquido, aliquotaEfetivaINSS: aliquotaINSS, aliquotaEfetivaIRRF: aliquotaIRRF });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Salário Líquido'}]} />
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
          Calculadora de Salário Líquido
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule o valor exato do seu salário líquido com descontos de INSS e IRRF.
          Tabelas progressivas atualizadas 2025.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label
              htmlFor="salario"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salário Bruto (R$)
            </label>
            <input
              id="salario"
              type="text"
              inputMode="decimal"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="Ex: 3500,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="dependentes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dependentes (IRRF)
            </label>
            <input
              id="dependentes"
              type="number"
              min="0"
              max="15"
              value={dependentes}
              onChange={(e) => setDependentes(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Dedução de R$ 189,59 por dependente
            </p>
          </div>

          <div>
            <label
              htmlFor="outros"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Outros Descontos (R$) — opcional
            </label>
            <input
              id="outros"
              type="text"
              inputMode="decimal"
              value={outrosDescontos}
              onChange={(e) => setOutrosDescontos(e.target.value)}
              placeholder="Ex: 200,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular Salário Líquido
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Salário Bruto</p>
                  <p className="text-xl font-bold text-gray-900">
                    R$ {parseFloat(salario.replace(",", ".")).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">INSS</p>
                  <p className="text-xl font-bold text-orange-600">
                    - R$ {resultado.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-400">
                    Alíquota efetiva: {resultado.aliquotaEfetivaINSS.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">IRRF</p>
                  <p className="text-xl font-bold text-red-600">
                    - R$ {resultado.irrf.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-400">
                    Base: R$ {resultado.baseIRRF.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Outros Descontos</p>
                  <p className="text-xl font-bold text-gray-900">
                    - R$ {(parseFloat(outrosDescontos.replace(",", ".")) || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Salário Líquido
                </p>
                <p className="text-3xl font-bold text-green-700">
                  R${" "}
                  {resultado.liquido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Como calcular o Salário Líquido
          </h2>
          <p>
            O salário líquido é o valor que o trabalhador recebe após todos os
            descontos legais obrigatórios. Os principais descontos são:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>INSS</strong> — Instituto Nacional do Seguro Social,
              alíquotas de 7,5% a 14% conforme a faixa salarial
            </li>
            <li>
              <strong>IRRF</strong> — Imposto de Renda Retido na Fonte,
              alíquotas de 0% a 27,5%
            </li>
            <li>
              <strong>Outros descontos</strong> — vale-transporte, plano de
              saúde, pensão alimentícia, etc.
            </li>
          </ul>
          <p>
            Use nossa calculadora acima para simular seu salário líquido de
            forma precisa e atualizada.
          </p>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Salário Líquido - Calculadora Trabalhista" />
      </div>
    </>
  );
}
