"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    if (isBusinessDay(current)) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

function differenceInCalendarDays(start: Date, end: Date): number {
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

function differenceInWeeks(days: number): number {
  return Math.floor(days / 7);
}

function differenceInMonths(start: Date, end: Date): number {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months--;
  return Math.max(0, months);
}

function differenceInYears(start: Date, end: Date): number {
  let years = end.getFullYear() - start.getFullYear();
  if (
    end.getMonth() < start.getMonth() ||
    (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
  )
    years--;
  return Math.max(0, years);
}

function differenceInHours(start: Date, end: Date): number {
  return Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  );
}

function differenceInMinutes(start: Date, end: Date): number {
  return Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60)
  );
}

export default function DiasEntreDatasPage() {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [tipoDia, setTipoDia] = useState<"corridos" | "uteis">("corridos");
  const [resultado, setResultado] = useState<{
    dias: number;
    semanas: number;
    meses: number;
    anos: number;
    horas: number;
    minutos: number;
  } | null>(null);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Dias entre Datas",
    url: "https://calculadoratrabalhista.net.br/calculadora-dias-entre-datas",
    description:
      "Calcule online e grátis a diferença exata entre duas datas: dias corridos, dias úteis, semanas, meses, anos, horas e minutos.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular a diferença entre duas datas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para calcular a diferença entre duas datas, subtraia a data inicial da data final. O resultado pode ser expresso em dias, semanas, meses, anos, horas ou minutos. Nossa calculadora faz isso automaticamente: basta informar as duas datas e escolher entre dias corridos ou dias úteis.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a diferença entre dias corridos e dias úteis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dias corridos contam todos os dias do calendário, incluindo sábados, domingos e feriados. Dias úteis consideram apenas os dias da semana de segunda a sexta-feira, excluindo fins de semana. Para cálculos trabalhistas e prazos processuais, geralmente usam-se dias úteis.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular dias úteis entre duas datas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para calcular dias úteis entre duas datas, conte apenas os dias de segunda a sexta-feira, excluindo sábados e domingos. Nossa calculadora faz esse cálculo automaticamente. Basta selecionar a opção 'Dias Úteis' e informar as datas inicial e final.",
        },
      },
      {
        "@type": "Question",
        name: "Quantos dias tem um mês em média?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Um mês tem em média 30,44 dias (365 dias ÷ 12 meses). Meses variam entre 28 e 31 dias. Fevereiro tem 28 dias (29 em ano bissexto), abril, junho, setembro e novembro têm 30 dias, e os demais têm 31 dias.",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular semanas entre duas datas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para calcular semanas entre duas datas, divida o número total de dias por 7. Por exemplo, 30 dias equivalem a 4 semanas completas e 2 dias. Nossa calculadora mostra tanto o total de dias quanto o equivalente em semanas.",
        },
      },
    ],
  };

  function calcular() {
    if (!dataInicial || !dataFinal) return;

    const start = new Date(dataInicial);
    const end = new Date(dataFinal);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;
    if (end < start) return;

    let dias: number;

    if (tipoDia === "uteis") {
      dias = countBusinessDays(start, end);
    } else {
      dias = differenceInCalendarDays(start, end);
    }

    const semanas = differenceInWeeks(dias);
    const meses = differenceInMonths(start, end);
    const anos = differenceInYears(start, end);
    const horas = differenceInHours(start, end);
    const minutos = differenceInMinutes(start, end);

    setResultado({ dias, semanas, meses, anos, horas, minutos });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Dias Entre Datas'}]} />
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
          Calculadora de Dias entre Datas
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule online e grátis a diferença exata entre duas datas. Informe a
          data inicial e a data final e descubra o resultado em dias, semanas,
          meses, anos, horas e minutos — em dias corridos ou dias úteis.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Data Inicial */}
          <div>
            <label
              htmlFor="dataInicial"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data Inicial
            </label>
            <input
              id="dataInicial"
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Data Final */}
          <div>
            <label
              htmlFor="dataFinal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data Final
            </label>
            <input
              id="dataFinal"
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Tipo de Dia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cálculo
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoDia"
                  value="corridos"
                  checked={tipoDia === "corridos"}
                  onChange={() => setTipoDia("corridos")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Dias Corridos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoDia"
                  value="uteis"
                  checked={tipoDia === "uteis"}
                  onChange={() => setTipoDia("uteis")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Dias Úteis</span>
              </label>
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular Diferença
          </button>

          {/* Resultado */}
          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Dias</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {resultado.dias}
                  </p>
                  <p className="text-xs text-gray-500">
                    {tipoDia === "corridos" ? "corridos" : "úteis"}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Semanas</p>
                  <p className="text-2xl font-bold text-green-700">
                    {resultado.semanas}
                  </p>
                  <p className="text-xs text-gray-500">completas</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Meses</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {resultado.meses}
                  </p>
                  <p className="text-xs text-gray-500">completos</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Anos</p>
                  <p className="text-2xl font-bold text-amber-700">
                    {resultado.anos}
                  </p>
                  <p className="text-xs text-gray-500">completos</p>
                </div>
                <div className="bg-rose-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Horas</p>
                  <p className="text-2xl font-bold text-rose-700">
                    {resultado.horas.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-gray-500">totais</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Minutos</p>
                  <p className="text-2xl font-bold text-teal-700">
                    {resultado.minutos.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-gray-500">totais</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Artigo */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Calculadora de Dias entre Datas: Como Funciona
          </h2>
          <p>
            A <strong>calculadora de dias entre datas</strong> é uma ferramenta
            online gratuita que permite descobrir exatamente quantos dias,
            semanas, meses, anos, horas e minutos existem entre duas datas
            quaisquer. Basta informar a <strong>data inicial</strong> e a{" "}
            <strong>data final</strong> nos campos de data, e o cálculo é feito
            instantaneamente. Você pode optar por dias corridos (todos os dias
            do calendário) ou dias úteis (apenas segunda a sexta-feira).
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Como Calcular a Diferença entre Datas
          </h3>
          <p>
            O cálculo da diferença entre duas datas pode ser feito de forma
            simples: subtraindo a data inicial da data final. No entanto, fazer
            isso manualmente pode ser trabalhoso, especialmente quando se
            considera meses com quantidades diferentes de dias, anos bissextos
            e a exclusão de fins de semana para dias úteis. Nossa calculadora
            automatiza todo esse processo, garantindo precisão e rapidez.
          </p>
          <p className="mt-2">
            Para calcular manualmente, você pode usar a seguinte abordagem:
            converta ambas as datas para timestamp (milissegundos desde
            01/01/1970), subtraia um do outro e divida pelo número de
            milissegundos em um dia (86.400.000). O resultado será o número
            exato de dias entre as duas datas. Para dias úteis, é necessário
            percorrer cada dia e contar apenas os que caem de segunda a sexta.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Dias Corridos vs. Dias Úteis
          </h3>
          <p>
            A diferença entre <strong>dias corridos</strong> e{" "}
            <strong>dias úteis</strong> é fundamental em diversos contextos:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Dias corridos:</strong> Incluem todos os dias do
              calendário, sem exceção. São usados em prazos de contratos,
              contagem de tempo de serviço, idade, validade de produtos e
              muitos outros contextos civis.
            </li>
            <li>
              <strong>Dias úteis:</strong> Excluem sábados, domingos e
              feriados. São amplamente utilizados em prazos processuais
              (Justiça do Trabalho, Justiça Federal), prazos administrativos
              e prazos bancários.
            </li>
          </ul>
          <p className="mt-2">
            No âmbito trabalhista brasileiro, por exemplo, o artigo 775 da CLT
            determina que os prazos processuais trabalhistas são contados em
            dias úteis. Já para cálculos de verbas rescisórias, férias e 13º
            salário, geralmente utilizam-se dias corridos.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Aplicações Práticas da Calculadora
          </h3>
          <p>
            Esta <strong>calculadora de diferença entre datas</strong> é útil
            em diversas situações do dia a dia:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Prazos trabalhistas:</strong> Calcule o tempo exato entre
              a admissão e a demissão de um funcionário para verbas
              rescisórias.
            </li>
            <li>
              <strong>Planejamento financeiro:</strong> Descubra quantos dias
              faltam para o vencimento de um boleto, financiamento ou
              investimento.
            </li>
            <li>
              <strong>Prazos contratuais:</strong> Verifique o prazo restante
              de contratos de aluguel, prestação de serviços ou obras.
            </li>
            <li>
              <strong>Planejamento pessoal:</strong> Calcule o tempo até uma
              data especial, como aniversário, casamento, viagem ou formatura.
            </li>
            <li>
              <strong>Prazos processuais:</strong> Advogados e profissionais do
              direito podem usar a opção de dias úteis para contar prazos
              judiciais com precisão.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Conversões de Tempo entre Datas
          </h3>
          <p>
            Além de dias, nossa calculadora também converte a diferença para
            outras unidades de tempo:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Semanas:</strong> O total de dias dividido por 7. Uma
              semana completa equivale a 7 dias corridos.
            </li>
            <li>
              <strong>Meses:</strong> Calculados com base na diferença de meses
              completos entre as datas, considerando dias do mês.
            </li>
            <li>
              <strong>Anos:</strong> Anos completos entre as datas, levando em
              conta anos bissextos.
            </li>
            <li>
              <strong>Horas e minutos:</strong> O total de horas/minutos exatos
              entre os dois momentos, considerando o horário da meia-noite.
            </li>
          </ul>
          <p className="mt-4">
            Use nossa <strong>calculadora de dias entre datas online grátis</strong>{" "}
            acima para calcular rapidamente qualquer diferença de tempo entre
            duas datas. O resultado é exibido em cards separados para fácil
            visualização de cada unidade de tempo.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Dias entre Datas - Calculadora Trabalhista" />
      </div>
    </>
  );
}
