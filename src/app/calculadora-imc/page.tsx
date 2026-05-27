"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

interface Resultado {
  imc: number;
  classificacao: string;
  cor: string;
  pesoMin: number;
  pesoMax: number;
}

const CLASSIFICACOES_OMS = [
  { faixa: "Abaixo de 18,5", classificacao: "Abaixo do peso", cor: "#f59e0b" },
  { faixa: "18,5 – 24,9", classificacao: "Peso normal", cor: "#10b981" },
  { faixa: "25,0 – 29,9", classificacao: "Sobrepeso", cor: "#f97316" },
  { faixa: "30,0 – 34,9", classificacao: "Obesidade grau I", cor: "#ef4444" },
  { faixa: "35,0 – 39,9", classificacao: "Obesidade grau II", cor: "#dc2626" },
  { faixa: "Acima de 40,0", classificacao: "Obesidade grau III", cor: "#991b1b" },
];

export default function CalculadoraImcPage() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de IMC Online Grátis",
    url: "https://calculadoratrabalhista.net.br/calculadora-imc",
    description:
      "Calcule seu Índice de Massa Corporal (IMC) gratuitamente. Classificação segundo a OMS, peso ideal mínimo e máximo, barra de progresso visual.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "O que é IMC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IMC significa Índice de Massa Corporal. É um cálculo internacionalmente usado para avaliar se uma pessoa está com peso adequado em relação à sua altura. A fórmula é: IMC = peso (kg) ÷ altura² (m).",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular o IMC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O IMC é calculado dividindo o peso (em kg) pela altura ao quadrado (em metros). Exemplo: para uma pessoa com 70 kg e 1,75 m de altura, o cálculo é 70 ÷ (1,75 × 1,75) = 22,86, que está na faixa de peso normal.",
        },
      },
      {
        "@type": "Question",
        name: "Qual é a tabela do IMC da OMS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A classificação da OMS para adultos é: abaixo de 18,5 (abaixo do peso), 18,5 a 24,9 (peso normal), 25,0 a 29,9 (sobrepeso), 30,0 a 34,9 (obesidade grau I), 35,0 a 39,9 (obesidade grau II) e acima de 40,0 (obesidade grau III).",
        },
      },
      {
        "@type": "Question",
        name: "Qual é o peso ideal para minha altura?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O peso ideal é calculado a partir do IMC na faixa normal (18,5 a 24,9). Para uma altura de 1,70 m, o peso ideal mínimo é 18,5 × (1,70)² ≈ 53,5 kg e o máximo é 24,9 × (1,70)² ≈ 72 kg.",
        },
      },
    ],
  };

  function parseNum(val: string): number {
    return parseFloat(val.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
  }

  function calcular() {
    const p = parseNum(peso);
    const aCm = parseNum(altura);
    if (!p || !aCm) return;

    const aM = aCm / 100;
    const imc = p / (aM * aM);
    const imcArredondado = Math.round(imc * 100) / 100;

    let classificacao: string;
    let cor: string;

    if (imc < 18.5) {
      classificacao = "Abaixo do peso";
      cor = "#f59e0b";
    } else if (imc < 25) {
      classificacao = "Peso normal";
      cor = "#10b981";
    } else if (imc < 30) {
      classificacao = "Sobrepeso";
      cor = "#f97316";
    } else if (imc < 35) {
      classificacao = "Obesidade grau I";
      cor = "#ef4444";
    } else if (imc < 40) {
      classificacao = "Obesidade grau II";
      cor = "#dc2626";
    } else {
      classificacao = "Obesidade grau III";
      cor = "#991b1b";
    }

    const pesoMin = Math.round(18.5 * aM * aM * 100) / 100;
    const pesoMax = Math.round(24.9 * aM * aM * 100) / 100;

    setResultado({
      imc: imcArredondado,
      classificacao,
      cor,
      pesoMin,
      pesoMax,
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      calcular();
    }
  }

  const imcNormalizado = resultado
    ? Math.min(Math.max((resultado.imc / 45) * 100, 0), 100)
    : 0;

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'IMC'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, faqSchema]),
        }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de IMC Online Grátis
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule seu Índice de Massa Corporal e descubra sua classificação
          segundo a Organização Mundial da Saúde. Resultado imediato, sem
          cadastro.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Peso (kg)
            </label>
            <input
              id="peso"
              type="text"
              inputMode="decimal"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: 70"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="altura"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Altura (cm)
            </label>
            <input
              id="altura"
              type="text"
              inputMode="decimal"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: 175"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular IMC
          </button>

          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Seu Resultado
              </h2>

              {/* IMC principal */}
              <div
                className="rounded-lg p-5 text-center"
                style={{ backgroundColor: resultado.cor + "15" }}
              >
                <p className="text-sm text-gray-600 mb-1">Seu IMC</p>
                <p
                  className="text-4xl font-bold"
                  style={{ color: resultado.cor }}
                >
                  {resultado.imc.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <span
                  className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: resultado.cor }}
                >
                  {resultado.classificacao}
                </span>
              </div>

              {/* Barra de progresso visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>18,5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                  <span>40</span>
                </div>
                <div className="relative h-5 w-full rounded-full overflow-hidden flex">
                  <div className="h-full" style={{ width: "41%", backgroundColor: "#f59e0b" }} />
                  <div className="h-full" style={{ width: "14.4%", backgroundColor: "#10b981" }} />
                  <div className="h-full" style={{ width: "11.2%", backgroundColor: "#f97316" }} />
                  <div className="h-full" style={{ width: "11.2%", backgroundColor: "#ef4444" }} />
                  <div className="h-full" style={{ width: "11.2%", backgroundColor: "#dc2626" }} />
                  <div className="h-full" style={{ width: "11%", backgroundColor: "#991b1b" }} />
                </div>
                {/* Indicador do resultado */}
                <div
                  className="relative h-1 w-full"
                  style={{ marginTop: "-1px" }}
                >
                  <div
                    className="absolute top-0 w-4 h-4 border-2 border-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${imcNormalizado}%`,
                      backgroundColor: resultado.cor,
                    }}
                  />
                </div>
                <div className="text-center text-xs font-medium mt-1">
                  <span style={{ color: resultado.cor }}>
                    ▲ Seu IMC: {resultado.imc.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {/* Peso ideal */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  ⚖️ Peso ideal para sua altura
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Mínimo (IMC 18,5)</p>
                    <p className="text-xl font-bold text-green-600">
                      {resultado.pesoMin.toLocaleString("pt-BR", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}{" "}
                      kg
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Máximo (IMC 24,9)</p>
                    <p className="text-xl font-bold text-green-600">
                      {resultado.pesoMax.toLocaleString("pt-BR", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}{" "}
                      kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tabela de classificação da OMS */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tabela de Classificação do IMC (OMS)
          </h2>
          <div className="space-y-2">
            {CLASSIFICACOES_OMS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.cor }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {item.classificacao}
                  </p>
                  <p className="text-xs text-gray-500">IMC: {item.faixa}</p>
                </div>
                {resultado && resultado.classificacao === item.classificacao && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Seu resultado
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Artigo ~400 palavras */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Calculadora de IMC: Entenda seu Índice de Massa Corporal
          </h2>
          <p>
            A <strong>calculadora de IMC</strong> (Índice de Massa Corporal) é
            uma ferramenta amplamente utilizada para avaliar se uma pessoa está
            dentro do peso considerado saudável para sua altura. Criado pelo
            estatístico belga Adolphe Quetelet no século XIX, o IMC se tornou
            um padrão internacional adotado pela{" "}
            <strong>Organização Mundial da Saúde (OMS)</strong> para classificar
            o estado nutricional de adultos. O cálculo é simples: divide-se o
            peso em quilogramas pela altura em metros ao quadrado.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Como usar esta calculadora de IMC
          </h3>
          <p>
            Utilizar nossa calculadora é muito simples. Basta informar seu{" "}
            <strong>peso em quilogramas</strong> (kg) e sua{" "}
            <strong>altura em centímetros</strong> (cm) nos campos
            correspondentes e clicar em &ldquo;Calcular IMC&rdquo; ou pressionar
            Enter. Instantaneamente, você verá seu IMC com duas casas decimais,
            a classificação segundo a tabela da OMS com uma barra de progresso
            colorida, e o <strong>peso ideal mínimo e máximo</strong> para sua
            altura. A barra visual permite que você veja rapidamente em qual
            faixa seu IMC se enquadra, com cores que vão do verde (peso normal)
            ao vermelho escuro (obesidade grau III).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Classificação do IMC segundo a OMS
          </h3>
          <p>
            A OMS estabelece seis faixas de classificação para adultos:{" "}
            <strong>abaixo do peso</strong> (IMC menor que 18,5),{" "}
            <strong>peso normal</strong> (18,5 a 24,9),{" "}
            <strong>sobrepeso</strong> (25,0 a 29,9),{" "}
            <strong>obesidade grau I</strong> (30,0 a 34,9),{" "}
            <strong>obesidade grau II</strong> (35,0 a 39,9) e{" "}
            <strong>obesidade grau III</strong> (40,0 ou mais). A faixa
            considerada saudável para a maioria dos adultos é entre 18,5 e 24,9,
            que corresponde ao peso normal. É importante lembrar que o IMC é um
            indicador geral e não substitui uma avaliação médica completa,
            especialmente para atletas, idosos, gestantes e crianças.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Peso ideal: entenda os limites
          </h3>
          <p>
            O <strong>peso ideal</strong> não é um valor único, mas sim uma
            faixa calculada a partir do IMC na zona de normalidade. Para
            qualquer altura, o peso ideal mínimo corresponde ao IMC de 18,5 e o
            máximo ao IMC de 24,9. Por exemplo, uma pessoa com 1,70 m de altura
            tem peso ideal entre aproximadamente 53,5 kg e 72 kg. Nossa
            calculadora exibe esses valores específicos para sua altura,
            ajudando você a estabelecer metas realistas de saúde.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Por que monitorar o IMC?
          </h3>
          <p>
            Manter o IMC dentro da faixa saudável está associado a menor risco
            de doenças cardiovasculares, diabetes tipo 2, hipertensão arterial
            e diversos outros problemas de saúde. Tanto o baixo peso quanto o
            excesso de peso podem trazer complicações. Por isso, o{" "}
            <strong>cálculo do IMC</strong> é um primeiro passo importante para
            quem deseja cuidar melhor da saúde. Aliado a uma alimentação
            equilibrada e à prática regular de exercícios físicos, o
            acompanhamento do IMC pode ser uma ferramenta valiosa de
            autoconhecimento e prevenção.
          </p>

          <p>
            Nossa calculadora é gratuita, não exige cadastro e fornece
            resultados instantâneos. Compartilhe com amigos e familiares que
            também queiram descobrir seu IMC e entender melhor sua saúde de
            forma prática e acessível.
          </p>

          <p className="text-sm text-gray-400 mt-6">
            * Este cálculo tem finalidade informativa e não substitui consulta
            médica. Consulte um profissional de saúde para uma avaliação
            completa.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de IMC - Calculadora Trabalhista" />
      </div>
    </>
  );
}
