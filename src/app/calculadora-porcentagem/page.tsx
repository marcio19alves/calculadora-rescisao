"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

type Modo = "porcentagem-de" | "e-quantos-porcento" | "aumento-desconto";

export default function PorcentagemPage() {
  const [modo, setModo] = useState<Modo>("porcentagem-de");

  // Modo 1: X% de Y
  const [percentual, setPercentual] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  // Modo 2: X é quantos % de Y
  const [valorParcial, setValorParcial] = useState("");
  const [valorTotal2, setValorTotal2] = useState("");

  // Modo 3: Aumento/desconto
  const [valorOriginal, setValorOriginal] = useState("");
  const [percentualAlteracao, setPercentualAlteracao] = useState("");

  const [resultado, setResultado] = useState<{
    label: string;
    valor: string;
    detalhes?: string;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Porcentagem Online",
    url: "https://calculadoratrabalhista.net.br/calculadora-porcentagem",
    description:
      "Calcule porcentagens de forma rápida e gratuita. Três modos: X% de Y, X é quantos % de Y, aumento/desconto percentual.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular X% de Y?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiplique o valor Y pela porcentagem X e divida por 100. Exemplo: 20% de 500 = (20 × 500) ÷ 100 = 100.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular quantos por cento X é de Y?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Divida X por Y e multiplique por 100. Exemplo: 50 é quantos % de 200? (50 ÷ 200) × 100 = 25%.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular aumento percentual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtraia o valor original do novo valor, divida pelo valor original e multiplique por 100. Exemplo: de R$ 100 para R$ 120 → (20 ÷ 100) × 100 = 20% de aumento.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular desconto percentual?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Subtraia o novo valor do valor original, divida pelo valor original e multiplique por 100. Exemplo: de R$ 200 para R$ 150 → (50 ÷ 200) × 100 = 25% de desconto.",
        },
      },
    ],
  };

  function parseNum(val: string): number {
    return parseFloat(val.replace(",", ".").replace(/[^0-9.\-]/g, "")) || 0;
  }

  function calcular() {
    switch (modo) {
      case "porcentagem-de": {
        const p = parseNum(percentual);
        const v = parseNum(valorTotal);
        if (!p || !v) return;
        const res = (p / 100) * v;
        setResultado({
          label: `${p}% de ${v.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          valor: res.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          }),
          detalhes: `${p} ÷ 100 × ${v.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} = ${res.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}`,
        });
        break;
      }
      case "e-quantos-porcento": {
        const x = parseNum(valorParcial);
        const y = parseNum(valorTotal2);
        if (!x || !y) return;
        const res = (x / y) * 100;
        setResultado({
          label: `${x.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} é quantos % de ${y.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`,
          valor: `${res.toFixed(2).replace(".", ",")}%`,
          detalhes: `${x.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} ÷ ${y.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} × 100 = ${res.toFixed(4).replace(".", ",")}%`,
        });
        break;
      }
      case "aumento-desconto": {
        const original = parseNum(valorOriginal);
        const pct = parseNum(percentualAlteracao);
        if (!original || !pct) return;
        const fator = 1 + pct / 100;
        const res = original * fator;
        const diferenca = res - original;
        const tipo = diferenca >= 0 ? "aumento" : "desconto";
        const sinal = diferenca >= 0 ? "+" : "";
        setResultado({
          label: `${pct >= 0 ? "Aumento" : "Desconto"} de ${Math.abs(pct)
            .toFixed(2)
            .replace(".", ",")}% sobre ${original.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`,
          valor: `R$ ${res.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          detalhes: `${original.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} × ${(1 + pct / 100).toFixed(4)} = ${res.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}\n(${sinal}R$ ${Math.abs(diferenca).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })} de ${tipo})`,
        });
        break;
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      calcular();
    }
  }

  const tabs: { key: Modo; label: string }[] = [
    { key: "porcentagem-de", label: "X% de Y" },
    { key: "e-quantos-porcento", label: "X é quantos % de Y" },
    { key: "aumento-desconto", label: "Aumento / Desconto" },
  ];

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Porcentagem'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, faqSchema]),
        }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de Porcentagem Online Grátis
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule porcentagens de forma rápida e precisa com três modos
          diferentes. Resultado imediato, sem cadastro.
        </p>

        {/* Abas / Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setModo(tab.key);
                setResultado(null);
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                modo === tab.key
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Modo 1: X% de Y */}
          {modo === "porcentagem-de" && (
            <>
              <div>
                <label
                  htmlFor="percentual"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Porcentagem (%)
                </label>
                <input
                  id="percentual"
                  type="text"
                  inputMode="decimal"
                  value={percentual}
                  onChange={(e) => setPercentual(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 20"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="valorTotal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valor (Y)
                </label>
                <input
                  id="valorTotal"
                  type="text"
                  inputMode="decimal"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 500"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Modo 2: X é quantos % de Y */}
          {modo === "e-quantos-porcento" && (
            <>
              <div>
                <label
                  htmlFor="valorParcial"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valor parcial (X)
                </label>
                <input
                  id="valorParcial"
                  type="text"
                  inputMode="decimal"
                  value={valorParcial}
                  onChange={(e) => setValorParcial(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 50"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="valorTotal2"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valor total (Y)
                </label>
                <input
                  id="valorTotal2"
                  type="text"
                  inputMode="decimal"
                  value={valorTotal2}
                  onChange={(e) => setValorTotal2(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 200"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </>
          )}

          {/* Modo 3: Aumento/Desconto */}
          {modo === "aumento-desconto" && (
            <>
              <div>
                <label
                  htmlFor="valorOriginal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Valor original (R$)
                </label>
                <input
                  id="valorOriginal"
                  type="text"
                  inputMode="decimal"
                  value={valorOriginal}
                  onChange={(e) => setValorOriginal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 1000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="percentualAlteracao"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Percentual de{" "}
                  <span className="text-gray-500">
                    (use negativo para desconto)
                  </span>
                </label>
                <input
                  id="percentualAlteracao"
                  type="text"
                  inputMode="decimal"
                  value={percentualAlteracao}
                  onChange={(e) => setPercentualAlteracao(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ex: 15 ou -10"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Exemplos: 15 para aumento de 15%, -10 para desconto de 10%
                </p>
              </div>
            </>
          )}

          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>
              <div className="bg-blue-50 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 mb-1">{resultado.label}</p>
                <p className="text-3xl font-bold text-blue-700">
                  {resultado.valor}
                </p>
              </div>
              {resultado.detalhes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    📐 Detalhamento do cálculo
                  </p>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                    {resultado.detalhes}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Artigo ~500 palavras */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Calculadora de Porcentagem: Simples, Rápida e Gratuita
          </h2>
          <p>
            A <strong>calculadora de porcentagem</strong> é uma ferramenta
            essencial para o dia a dia, seja para calcular descontos em
            compras, determinar aumentos salariais, analisar variações
            financeiras ou resolver problemas matemáticos do cotidiano. Nossa
            calculadora oferece <strong>três modos de cálculo</strong> em uma
            única interface intuitiva, permitindo que você encontre o resultado
            que precisa com apenas alguns cliques.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Modo 1: Calcular X% de Y
          </h3>
          <p>
            Este é o modo mais comum e simples: você informa uma porcentagem
            (X) e um valor total (Y), e a calculadora retorna o valor
            correspondente. Por exemplo, se você quer saber quanto é{" "}
            <strong>20% de 500</strong>, basta digitar 20 e 500 — o resultado
            será 100. Esse cálculo é amplamente utilizado para calcular
            gorjetas, comissões, impostos percentuais e descontos em
            promoções. A fórmula utilizada é:{" "}
            <em>(X ÷ 100) × Y = Resultado</em>.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Modo 2: X é quantos % de Y
          </h3>
          <p>
            Neste modo, você descobre a proporção percentual entre dois
            valores. Por exemplo, se você obteve 50 pontos em uma prova de 200
            pontos, a calculadora mostra que 50 é <strong>25% de 200</strong>.
            Esse cálculo é ideal para avaliar taxas de acerto, indicadores de
            desempenho, participação percentual em resultados e análises
            comparativas. A fórmula empregada é:{" "}
            <em>(X ÷ Y) × 100 = Resultado em %</em>.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Modo 3: Aumento ou Desconto Percentual
          </h3>
          <p>
            Com este modo, você calcula o novo valor após aplicar um aumento
            ou desconto percentual sobre um valor original. Basta informar o
            valor original e o percentual de alteração — use valores positivos
            para aumento e negativos para desconto. Por exemplo, um aumento de{" "}
            <strong>15% sobre R$ 1.000</strong> resulta em R$ 1.150, enquanto
            um <strong>desconto de 10% sobre R$ 200</strong> resulta em R$
            180. A calculadora também exibe o valor absoluto da diferença,
            ajudando você a entender o impacto financeiro da alteração.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Como usar a calculadora de porcentagem
          </h3>
          <p>
            O uso é extremamente simples: selecione o modo desejado clicando
            em uma das abas, preencha os campos exibidos e clique em{" "}
            <strong>&ldquo;Calcular&rdquo;</strong> ou pressione Enter. O resultado
            aparece imediatamente na tela, acompanhado de um detalhamento do
            cálculo para que você entenda exatamente como o valor foi obtido.
            Você pode alternar entre os modos a qualquer momento e refazer os
            cálculos quantas vezes precisar.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Aplicações práticas no dia a dia
          </h3>
          <p>
            A porcentagem está presente em inúmeras situações do cotidiano
            brasileiro: cálculo de <strong>juros e multas</strong> em boletos,
            reajustes de aluguel, variação do IPCA e outros índices
            econômicos, percentuais de comissão de vendas, cálculo de
            <strong>13º salário proporcional</strong>, férias, rescisão
            trabalhista e muito mais. No ambiente corporativo, a porcentagem é
            usada para analisar margens de lucro, crescimento de receita,
            participação de mercado e metas de produtividade.
          </p>

          <p>
            Nossa calculadora foi desenvolvida para ser rápida, precisa e
            acessível a todos. Não é necessário cadastro, não há anúncios
            intrusivos e o resultado é calculado instantaneamente. Se você
            precisa de uma <strong>calculadora de porcentagem online
            grátis</strong> confiável, está no lugar certo. Compartilhe com
            amigos e colegas que também possam se beneficiar desta ferramenta
            prática e gratuita.
          </p>

          <p className="text-sm text-gray-400 mt-6">
            * Os valores exibidos são aproximados e têm finalidade
            informativa. Para cálculos oficiais, consulte um profissional
            qualificado.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Porcentagem - Calculadora Trabalhista" />
      </div>
    </>
  );
}
