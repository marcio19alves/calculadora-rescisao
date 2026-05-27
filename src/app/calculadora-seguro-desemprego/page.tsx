"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";

function calcularSeguroDesemprego(salarioMedio: number): number {
  if (salarioMedio <= 2138.76) {
    return salarioMedio * 0.8;
  } else if (salarioMedio <= 3564.96) {
    return (salarioMedio - 2138.76) * 0.5 + 1711.01;
  } else {
    return 2424.11;
  }
}

function calcularParcelas(mesesTrabalhados: number): number {
  if (mesesTrabalhados >= 6 && mesesTrabalhados <= 11) return 3;
  if (mesesTrabalhados >= 12 && mesesTrabalhados <= 23) return 4;
  if (mesesTrabalhados >= 24) return 5;
  return 0;
}

export default function SeguroDesempregoPage() {
  const [salarioMedio, setSalarioMedio] = useState("");
  const [meses, setMeses] = useState("");
  const [resultado, setResultado] = useState<{
    valorParcela: number;
    parcelas: number;
    valorTotal: number;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Seguro Desemprego",
    url: "https://calculadoratrabalhista.net.br/calculadora-seguro-desemprego",
    description:
      "Calcule o valor das parcelas do seguro desemprego 2025. Simule online grátis com base no salário médio e tempo trabalhado.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quem tem direito ao seguro desemprego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tem direito ao seguro desemprego o trabalhador dispensado sem justa causa que tenha trabalhado por pelo menos 6 meses nos últimos 36 meses. Também é necessário não estar recebendo nenhum benefício previdenciário (exceto pensão por morte ou auxílio-acidente) e não ter renda própria.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular o valor do seguro desemprego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O valor do seguro desemprego é calculado com base na média dos 3 últimos salários. Até R$ 2.138,76: multiplica por 0,8. De R$ 2.138,77 a R$ 3.564,96: o excedente a R$ 2.138,76 multiplica por 0,5 + R$ 1.711,01. Acima de R$ 3.564,96: valor fixo de R$ 2.424,11.",
        },
      },
      {
        "@type": "Question",
        name: "Quantas parcelas de seguro desemprego tenho direito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O número de parcelas varia conforme o tempo trabalhado nos últimos 36 meses: de 6 a 11 meses = 3 parcelas, de 12 a 23 meses = 4 parcelas, 24 meses ou mais = 5 parcelas. Para a primeira solicitação, são necessários 12 meses nos últimos 18 meses.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o valor máximo do seguro desemprego em 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O valor máximo do seguro desemprego em 2025 é de R$ 2.424,11 por parcela. Esse valor é aplicado para trabalhadores com salário médio acima de R$ 3.564,96. O valor mínimo é de um salário mínimo (R$ 1.518,00 em 2025).",
        },
      },
      {
        "@type": "Question",
        name: "Como solicitar o seguro desemprego?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O seguro desemprego pode ser solicitado pelo aplicativo Carteira de Trabalho Digital (Android/iOS), pelo portal Gov.br ou presencialmente nas Superintendências Regionais do Trabalho. O prazo para solicitar é de 7 a 120 dias corridos após a data da demissão.",
        },
      },
    ],
  };

  function calcular() {
    const salario = parseFloat(salarioMedio.replace(",", "."));
    const mesesTrab = parseInt(meses);
    if (isNaN(salario) || salario <= 0 || isNaN(mesesTrab) || mesesTrab < 6) return;

    const valorParcela = calcularSeguroDesemprego(salario);
    const parcelas = calcularParcelas(mesesTrab);
    const valorTotal = valorParcela * parcelas;

    setResultado({ valorParcela, parcelas, valorTotal });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Seguro Desemprego'}]} />
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
          Calculadora de Seguro Desemprego
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule o valor exato das parcelas do seguro desemprego. Baseado nas
          faixas salariais e tempo de trabalho 2025.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label
              htmlFor="salarioMedio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salário Médio dos Últimos 3 Meses (R$)
            </label>
            <input
              id="salarioMedio"
              type="text"
              inputMode="decimal"
              value={salarioMedio}
              onChange={(e) => setSalarioMedio(e.target.value)}
              placeholder="Ex: 2500,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="meses"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Meses Trabalhados nos Últimos 36 Meses
            </label>
            <input
              id="meses"
              type="number"
              min="6"
              max="36"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
              placeholder="Ex: 24"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Mínimo de 6 meses para ter direito
            </p>
          </div>

          <button
            onClick={calcular}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular Seguro Desemprego
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Valor da Parcela</p>
                  <p className="text-2xl font-bold text-green-700">
                    R${" "}
                    {resultado.valorParcela.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Quantidade de Parcelas</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {resultado.parcelas}x
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-purple-700">
                    R${" "}
                    {resultado.valorTotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                ⚠️ O valor é uma estimativa. O cálculo oficial é feito pela
                Caixa Econômica Federal no momento da solicitação.
              </div>
            </div>
          )}
        </div>

        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Como funciona o Seguro Desemprego
          </h2>
          <p>
            O seguro-desemprego é um benefício trabalhista garantido pela Lei
            7.998/90. Tem direito o trabalhador dispensado sem justa causa que
            tenha trabalhado por pelo menos 6 meses nos últimos 36 meses.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Faixas de Cálculo 2025
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>1ª faixa:</strong> até R$ 2.138,76 — multiplica o salário
              médio por 0,8
            </li>
            <li>
              <strong>2ª faixa:</strong> de R$ 2.138,77 a R$ 3.564,96 — o que
              exceder R$ 2.138,76 multiplica por 0,5 + R$ 1.711,01
            </li>
            <li>
              <strong>3ª faixa:</strong> acima de R$ 3.564,96 — valor fixo de
              R$ 2.424,11
            </li>
          </ul>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Seguro Desemprego - Calculadora Trabalhista" />
      </div>
    </>
  );
}
