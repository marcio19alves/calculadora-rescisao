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

const DEPENDENTE_DEDUCAO = 189.59;

function calcularINSS(salario: number) {
  if (salario <= 0) return 0;
  let inss = 0;
  for (const faixa of FAIXAS_INSS) {
    if (salario <= faixa.limite) {
      inss += salario * faixa.aliquota;
      break;
    }
    inss += faixa.limite * faixa.aliquota;
    salario -= faixa.limite;
  }
  return Math.min(inss, 8157.41 * 0.14);
}

function calcularIRRF(base: number) {
  if (base <= 0) return 0;
  for (const faixa of FAIXAS_IRRF) {
    if (base <= faixa.limite) {
      return Math.max(0, base * faixa.aliquota - faixa.deducao);
    }
  }
  return 0;
}

export default function DecimoTerceiroPage() {
  const [salario, setSalario] = useState("");
  const [meses, setMeses] = useState("12");
  const [dependentes, setDependentes] = useState("");
  const [resultado, setResultado] = useState<{
    bruto: number;
    inss: number;
    irrf: number;
    liquido: number;
    primeiraParcela: number;
    segundaParcela: number;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de 13º Salário",
    url: "https://calculadoratrabalhista.net.br/calculadora-13o-salario",
    description:
      "Calcule o valor exato do 13º salário proporcional. INSS, IRRF, 1ª e 2ª parcela. Tabela atualizada 2025.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular o 13º salário proporcional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O 13º salário proporcional é calculado dividindo o salário bruto por 12 e multiplicando pelos meses trabalhados no ano. Exemplo: salário de R$ 3.600 ÷ 12 = R$ 300/mês. Se trabalhou 7 meses, recebe R$ 2.100 de 13º proporcional. Sobre esse valor incidem INSS e IRRF.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre a 1ª e a 2ª parcela do 13º?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 1ª parcela do 13º salário (paga até 30 de novembro) corresponde a 50% do valor bruto, sem descontos. A 2ª parcela (paga até 20 de dezembro) é o valor restante com os descontos de INSS e IRRF. O valor líquido total é a soma das duas parcelas.",
        },
      },
      {
        "@type": "Question",
        name: "Quem tem direito ao 13º salário?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Todo trabalhador com carteira assinada (CLT), servidores públicos, aposentados e pensionistas do INSS têm direito ao 13º salário. O trabalhador precisa ter trabalhado por pelo menos 15 dias no ano para ter direito ao proporcional. O 13º é pago em duas parcelas: novembro e dezembro.",
        },
      },
      {
        "@type": "Question",
        name: "O 13º salário tem desconto de INSS e IRRF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim, o 13º salário sofre desconto de INSS sobre o valor bruto (tabela progressiva de 7,5% a 14%) e de IRRF quando o valor ultrapassa a faixa de isenção (R$ 2.259,20). Os descontos incidem apenas sobre a 2ª parcela. A 1ª parcela é paga sem descontos.",
        },
      },
      {
        "@type": "Question",
        name: "Como funciona o 13º para quem foi demitido?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O trabalhador demitido tem direito ao 13º salário proporcional aos meses trabalhados no ano da demissão, inclusive no mês da rescisão se trabalhou 15 dias ou mais. Na demissão sem justa causa, o 13º proporcional é pago junto com as demais verbas rescisórias. Na justa causa, o empregado perde o direito ao 13º proporcional.",
        },
      },
    ],
  };

  function calcular() {
    const bruto = parseFloat(salario.replace(",", "."));
    const mesesTrab = parseInt(meses) || 12;
    const dep = parseInt(dependentes) || 0;
    if (isNaN(bruto) || bruto <= 0 || mesesTrab < 1) return;

    const decimoBruto = (bruto / 12) * mesesTrab;
    const inss = calcularINSS(decimoBruto);
    const baseIRRF = Math.max(0, decimoBruto - inss - dep * DEPENDENTE_DEDUCAO);
    const irrf = calcularIRRF(baseIRRF);
    const liquido = decimoBruto - inss - irrf;
    const primeiraParcela = decimoBruto / 2;
    const segundaParcela = liquido - primeiraParcela;

    setResultado({
      bruto: decimoBruto,
      inss,
      irrf,
      liquido,
      primeiraParcela,
      segundaParcela,
    });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'13º Salário'}]} />
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
          Calculadora de 13º Salário
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule o valor exato do seu décimo terceiro salário, proporcional ou
          integral, com todos os descontos legais.
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="meses"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Meses Trabalhados no Ano
            </label>
            <input
              id="meses"
              type="number"
              min="1"
              max="12"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              15 dias ou mais no mês conta como mês integral
            </p>
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
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular 13º Salário
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">13º Bruto</p>
                  <p className="text-xl font-bold text-purple-700">
                    R${" "}
                    {resultado.bruto.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">INSS</p>
                  <p className="text-xl font-bold text-orange-600">
                    - R${" "}
                    {resultado.inss.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">IRRF</p>
                  <p className="text-xl font-bold text-red-600">
                    - R${" "}
                    {resultado.irrf.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">13º Líquido</p>
                  <p className="text-xl font-bold text-emerald-700">
                    R${" "}
                    {resultado.liquido.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  🗓️ Forma de Pagamento
                </h3>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-sm text-blue-700">1ª Parcela (novembro)</span>
                  <span className="font-bold text-blue-800">
                    R${" "}
                    {resultado.primeiraParcela.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-blue-700">
                    2ª Parcela (dezembro)
                  </span>
                  <span className="font-bold text-blue-800">
                    R${" "}
                    {resultado.segundaParcela.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Como calcular o 13º Salário
          </h2>
          <p>
            O 13º salário, também conhecido como gratificação natalina, é um
            direito do trabalhador previsto na Lei 4.090/62. O cálculo é:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Divide-se o salário bruto por 12 e multiplica pelos meses
              trabalhados
            </li>
            <li>
              Aplica-se o INSS progressivo sobre o valor do 13º
            </li>
            <li>Aplica-se o IRRF quando houver base de cálculo</li>
            <li>
              A 1ª parcela (50% sem descontos) é paga até 30 de novembro
            </li>
            <li>
              A 2ª parcela (com descontos) é paga até 20 de dezembro
            </li>
          </ul>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de 13º Salário - Calculadora Trabalhista" />
      </div>
    </>
  );
}
