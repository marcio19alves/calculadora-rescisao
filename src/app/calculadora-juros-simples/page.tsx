"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

export default function JurosSimplesPage() {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [resultado, setResultado] = useState<{
    juros: number;
    montante: number;
  } | null>(null);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Juros Simples",
    url: "https://calculadoratrabalhista.net.br/calculadora-juros-simples",
    description:
      "Calcule online e grátis o valor dos juros simples e o montante final. Informe capital inicial, taxa mensal e período.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "O que são juros simples?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Juros simples são calculados sempre sobre o capital inicial, sem incidir sobre os juros acumulados. A fórmula é J = C × i × t, onde J são os juros, C é o capital inicial, i é a taxa de juros e t é o tempo.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre juros simples e compostos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos juros simples, a taxa incide apenas sobre o valor principal. Nos juros compostos (juros sobre juros), a taxa incide sobre o montante acumulado a cada período, gerando crescimento exponencial.",
        },
      },
      {
        "@type": "Question",
        name: "Onde os juros simples são usados no Brasil?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No Brasil, juros simples são comuns em cálculos trabalhistas (atraso salarial, FGTS, rescisão), mora em contas de consumo, multas contratuais, crediário de lojas e algumas operações de curtíssimo prazo.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular juros simples ao mês?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para calcular juros simples ao mês, use a fórmula J = C × i × t, onde C é o capital inicial, i é a taxa mensal em decimal (divida por 100), e t é o número de meses. O montante final é M = C + J.",
        },
      },
    ],
  };

  function calcular() {
    const c = parseFloat(capital.replace(",", "."));
    const i = parseFloat(taxa.replace(",", "."));
    const t = parseFloat(periodo.replace(",", "."));
    if (isNaN(c) || isNaN(i) || isNaN(t) || c <= 0 || i <= 0 || t <= 0) return;

    const iDecimal = i / 100;
    const juros = c * iDecimal * t;
    const montante = c + juros;

    setResultado({ juros, montante });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Juros Simples'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de Juros Simples
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule online e grátis o valor dos juros simples e o montante final
          de uma aplicação ou dívida. Basta informar o capital, a taxa mensal e
          o prazo.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Capital Inicial */}
          <div>
            <label
              htmlFor="capital"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Capital Inicial (R$)
            </label>
            <input
              id="capital"
              type="text"
              inputMode="decimal"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="Ex: 1000,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Taxa % ao mês */}
          <div>
            <label
              htmlFor="taxa"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Taxa de Juros (% ao mês)
            </label>
            <input
              id="taxa"
              type="text"
              inputMode="decimal"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
              placeholder="Ex: 2"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Período em meses */}
          <div>
            <label
              htmlFor="periodo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Período (meses)
            </label>
            <input
              id="periodo"
              type="text"
              inputMode="numeric"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              placeholder="Ex: 12"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Botão */}
          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular Juros Simples
          </button>

          {/* Resultado */}
          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>

              {/* Fórmula */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                <p className="font-medium text-gray-900">Fórmula utilizada:</p>
                <p>
                  <strong>J</strong> = C × i × t
                </p>
                <p>
                  <strong>J</strong> = R${" "}
                  {parseFloat(capital.replace(",", ".")).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}{" "}
                  × ({parseFloat(taxa.replace(",", "."))} ÷ 100) ×{" "}
                  {parseFloat(periodo.replace(",", "."))}
                </p>
                <p>
                  <strong>J</strong> = R${" "}
                  {resultado.juros.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <hr className="my-1" />
                <p>
                  <strong>M</strong> = C + J
                </p>
                <p>
                  <strong>M</strong> = R${" "}
                  {parseFloat(capital.replace(",", ".")).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}{" "}
                  + R${" "}
                  {resultado.juros.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>M</strong> = R${" "}
                  {resultado.montante.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Juros (J)</p>
                  <p className="text-xl font-bold text-blue-600">
                    R${" "}
                    {resultado.juros.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Montante Final (M)</p>
                  <p className="text-xl font-bold text-green-700">
                    R${" "}
                    {resultado.montante.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-green-100 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Capital Inicial (C)
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  R${" "}
                  {parseFloat(capital.replace(",", ".")).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Artigo */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            O que são Juros Simples?
          </h2>
          <p>
            Juros simples são a forma mais básica de remuneração do capital. No
            regime de juros simples, a taxa de juros incide exclusivamente sobre
            o valor principal (capital inicial), sem acumular sobre os juros já
            gerados. Isso significa que o crescimento do dinheiro é linear e
            previsível, diferente do que ocorre nos juros compostos.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Fórmula dos Juros Simples
          </h3>
          <p>
            A fórmula fundamental dos juros simples é: <strong>J = C × i × t</strong>, onde:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>J</strong> = valor dos juros (em reais)
            </li>
            <li>
              <strong>C</strong> = capital inicial ou principal (R$)
            </li>
            <li>
              <strong>i</strong> = taxa de juros na forma decimal (dividir % por
              100)
            </li>
            <li>
              <strong>t</strong> = tempo ou período (em meses, dias ou anos,
              conforme a taxa)
            </li>
          </ul>
          <p className="mt-2">
            O montante final é dado por: <strong>M = C + J</strong>, ou
            simplesmente <strong>M = C × (1 + i × t)</strong>.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Diferença entre Juros Simples e Juros Compostos
          </h3>
          <p>
            A principal diferença está na base de cálculo. Enquanto os juros
            simples calculam a taxa sempre sobre o capital inicial, os juros
            compostos — conhecidos como &ldquo;juros sobre juros&rdquo; —
            calculam a taxa sobre o montante acumulado a cada período. Isso faz
            com que nos juros compostos o crescimento seja exponencial, enquanto
            nos juros simples ele é linear.
          </p>
          <p className="mt-2">
            Para ilustrar: um capital de R$ 1.000,00 aplicado a 5% ao mês por 6
            meses gera R$ 300,00 de juros no regime simples (R$ 50,00 por mês).
            No regime composto, o mesmo capital geraria aproximadamente R$
            340,10 de juros, pois a cada mês os juros incidem sobre um valor
            maior. Quanto maior o prazo, mais expressiva se torna essa diferença.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Usos dos Juros Simples no Brasil
          </h3>
          <p>
            Apesar de menos comuns em investimentos, os juros simples ainda são
            amplamente utilizados no Brasil em diversas situações do dia a dia:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Cálculos trabalhistas:</strong> A correção de atrasos
              salariais, diferenças de FGTS, rescisões e verbas trabalhistas em
              geral utiliza juros simples de 1% ao mês (art. 39 da Lei
              8.177/91).
            </li>
            <li>
              <strong>Multas e mora em contas:</strong> Contas de luz, água,
              telefone e boletos bancários cobram juros de mora calculados de
              forma simples sobre o valor devido.
            </li>
            <li>
              <strong>Crediário de lojas:</strong> Algumas operações de crédito
              de curto prazo no varejo ainda utilizam o regime de juros simples
              para calcular parcelas.
            </li>
            <li>
              <strong>Empréstimos de curto prazo:</strong> Operações com prazo
              inferior a 30 dias frequentemente adotam juros simples por serem
              mais fáceis de calcular e compreender.
            </li>
            <li>
              <strong>Desconto de duplicatas:</strong> O desconto bancário
              (comercial) é tradicionalmente calculado no regime de juros
              simples.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Vantagens e Desvantagens
          </h3>
          <p>
            A principal vantagem dos juros simples é a transparência e
            previsibilidade: o valor dos juros é sempre o mesmo a cada período,
            facilitando o planejamento financeiro. A desvantagem é que, para o
            credor, o rendimento é menor que nos juros compostos em prazos mais
            longos. Para o devedor, no entanto, os juros simples podem ser mais
            vantajosos, já que os encargos não crescem exponencialmente.
          </p>
          <p className="mt-2">
            Use nossa{" "}
            <strong>calculadora de juros simples online grátis</strong> acima
            para simular qualquer valor, taxa ou prazo. O resultado aparece
            instantaneamente com a fórmula detalhada passo a passo.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Juros Simples - Calculadora Trabalhista" />
      </div>
    </>
  );
}
