"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState, useMemo } from "react";

type InputMode = "dum" | "dpp";

function parseDate(str: string): Date | null {
  const cleaned = str.replace(/[^0-9]/g, "");
  if (cleaned.length !== 8) return null;
  const day = parseInt(cleaned.substring(0, 2), 10);
  const month = parseInt(cleaned.substring(2, 4), 10) - 1;
  const year = parseInt(cleaned.substring(4, 8), 10);
  const d = new Date(year, month, day);
  if (
    d.getDate() !== day ||
    d.getMonth() !== month ||
    d.getFullYear() !== year
  )
    return null;
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("pt-BR");
}

function addDays(date: Date, days: number): Date {
  const r = new Date(date);
  r.setDate(r.getDate() + days);
  return r;
}

function diffDays(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

const DPP_DUMMY = 280; // 40 semanas em dias

function weeksAndDays(totalDays: number): { weeks: number; days: number } {
  if (totalDays < 0) return { weeks: 0, days: 0 };
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

function getTrimestre(semanas: number): number {
  if (semanas <= 13) return 1;
  if (semanas <= 27) return 2;
  return 3;
}

function trimestreLabel(t: number): string {
  const labels = ["", "1º Trimestre (1–13 sem)", "2º Trimestre (14–27 sem)", "3º Trimestre (28–40+ sem)"];
  return labels[t] || "";
}

const trimColors = ["", "bg-green-100 border-green-400", "bg-blue-100 border-blue-400", "bg-amber-100 border-amber-400"];

export default function GestacionalPage() {
  const [inputMode, setInputMode] = useState<InputMode>("dum");
  const [dumRaw, setDumRaw] = useState("");
  const [dppRaw, setDppRaw] = useState("");

  const [result, setResult] = useState<{
    idadeGestacional: string;
    dpp: string;
    trimestre: number;
    trimestreLabel: string;
    semanasRestantes: number;
    dataDum: string;
    progresso: number; // 0-1
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora Gestacional Online",
    url: "https://calculadoratrabalhista.net.br/calculadora-gestacional",
    description:
      "Calcule sua idade gestacional em semanas e dias, data provável do parto, trimestre atual e semanas restantes. Calculadora de gestação online e gratuita.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular a idade gestacional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A idade gestacional é calculada a partir da Data da Última Menstruação (DUM). Conte o número de dias entre a DUM e a data atual, depois divida por 7 para obter semanas e dias. Também é possível calcular a partir da Data Provável do Parto (DPP), subtraindo 280 dias (40 semanas).",
        },
      },
      {
        "@type": "Question",
        name: "Como calcular a Data Provável do Parto (DPP)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A DPP é calculada adicionando 280 dias (40 semanas) à Data da Última Menstruação (DUM). Também pode-se usar a Regra de Näegele: adicione 7 dias ao primeiro dia da DUM, subtraia 3 meses e adicione 1 ano.",
        },
      },
      {
        "@type": "Question",
        name: "Quais são os trimestres da gestação?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A gestação é dividida em três trimestres: 1º trimestre (semana 1 a 13), 2º trimestre (semana 14 a 27) e 3º trimestre (semana 28 até o parto). Cada trimestre marca fases importantes do desenvolvimento do bebê.",
        },
      },
      {
        "@type": "Question",
        name: "Quantas semanas dura uma gravidez normal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Uma gravidez a termo dura em média 40 semanas (280 dias), contadas a partir da Data da Última Menstruação (DUM). O parto pode ocorrer entre 37 e 42 semanas sem ser considerado prematuro ou pós-termo.",
        },
      },
    ],
  };

  function calcular() {
    let dum: Date | null = null;
    let dpp: Date | null = null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (inputMode === "dum") {
      dum = parseDate(dumRaw);
      if (!dum) return;
      dpp = addDays(dum, DPP_DUMMY);
    } else {
      dpp = parseDate(dppRaw);
      if (!dpp) return;
      dum = addDays(dpp, -DPP_DUMMY);
    }

    const totalDays = diffDays(dum, now);
    const { weeks, days } = weeksAndDays(totalDays);
    const semanas = weeks + days / 7;
    const trimestre = getTrimestre(weeks);
    const semanasRestantes = Math.max(0, 40 - weeks - (days > 0 ? 1 : 0));
    const progresso = Math.min(1, Math.max(0, semanas / 40));

    setResult({
      idadeGestacional: `${weeks} semanas e ${days} dias`,
      dpp: formatDate(dpp),
      trimestre,
      trimestreLabel: trimestreLabel(trimestre),
      semanasRestantes,
      dataDum: formatDate(dum),
      progresso,
    });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") calcular();
  }

  function formatInput(val: string): string {
    const digits = val.replace(/[^0-9]/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  // Calendário visual por trimestre
  const calendario = useMemo(() => {
    if (!result) return null;
    return [1, 2, 3].map((t) => {
      const startWeek = (t - 1) * 13 + 1;
      const endWeek = t * 13;
      const weeks = [];
      for (let w = startWeek; w <= endWeek; w++) {
        weeks.push(w);
      }
      const isCurrent = result.trimestre === t;
      const isPast = result.trimestre > t;
      return { trimestre: t, startWeek, endWeek, weeks, isCurrent, isPast };
    });
  }, [result]);

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Gestacional'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, faqSchema]),
        }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora Gestacional Online Grátis
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule sua idade gestacional em semanas e dias, a data provável do
          parto (DPP), o trimestre atual e quantas semanas faltam para o grande
          dia. Resultado imediato, sem cadastro.
        </p>

        {/* Abas */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200">
          {[
            { key: "dum" as InputMode, label: "Data da Última Menstruação (DUM)" },
            { key: "dpp" as InputMode, label: "Data Provável do Parto (DPP)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setInputMode(tab.key);
                setResult(null);
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                inputMode === tab.key
                  ? "border-blue-600 text-blue-700 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Input DUM */}
          {inputMode === "dum" && (
            <div>
              <label
                htmlFor="dumInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data da Última Menstruação (DUM)
              </label>
              <input
                id="dumInput"
                type="text"
                inputMode="numeric"
                value={dumRaw}
                onChange={(e) => setDumRaw(formatInput(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="DD/MM/AAAA"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Informe o primeiro dia da sua última menstruação
              </p>
            </div>
          )}

          {/* Input DPP */}
          {inputMode === "dpp" && (
            <div>
              <label
                htmlFor="dppInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data Provável do Parto (DPP)
              </label>
              <input
                id="dppInput"
                type="text"
                inputMode="numeric"
                value={dppRaw}
                onChange={(e) => setDppRaw(formatInput(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="DD/MM/AAAA"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Informe a data prevista para o parto (se souber)
              </p>
            </div>
          )}

          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular
          </button>

          {result && (
            <div className="mt-6 border-t pt-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultados da Gestação
              </h2>

              {/* Barra de progresso */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progresso da gestação</span>
                  <span>{(result.progresso * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-green-400 via-blue-400 to-amber-400"
                    style={{ width: `${result.progresso * 100}%` }}
                  />
                </div>
              </div>

              {/* Cards de resultado */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Idade Gestacional
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {result.idadeGestacional}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Data Provável do Parto (DPP)
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {result.dpp}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Trimestre</p>
                  <p className="text-2xl font-bold text-green-700">
                    {result.trimestreLabel}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Semanas Restantes
                  </p>
                  <p className="text-2xl font-bold text-amber-700">
                    {result.semanasRestantes} semanas
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-500 text-center">
                DUM: {result.dataDum} | DPP: {result.dpp}
              </div>

              {/* Calendário Visual por Trimestre */}
              <div className="border-t pt-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  📅 Calendário da Gestação por Trimestre
                </h3>
                <div className="space-y-4">
                  {calendario?.map((t) => (
                    <div
                      key={t.trimestre}
                      className={`rounded-lg border-2 p-4 transition-colors ${
                        t.isCurrent
                          ? trimColors[t.trimestre] + " ring-2 ring-blue-400"
                          : t.isPast
                          ? "bg-gray-50 border-gray-200 opacity-70"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                            t.isCurrent
                              ? "bg-blue-600 text-white"
                              : t.isPast
                              ? "bg-gray-300 text-gray-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {t.trimestre}º Trimestre
                        </span>
                        <span className="text-xs text-gray-500">
                          Semanas {t.startWeek}–{t.endWeek}
                        </span>
                        {t.isCurrent && (
                          <span className="text-xs text-blue-600 font-medium ml-auto">
                            ◀ Atual
                          </span>
                        )}
                        {t.isPast && (
                          <span className="text-xs text-gray-400 ml-auto">
                            ✅ Completo
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {t.weeks.map((w) => {
                          const semanaGestacional = parseInt(result.idadeGestacional.split(" ")[0], 10);
                          const isPassed = w <= semanaGestacional;
                          const isCurrentWeek = w === semanaGestacional + 1;
                          return (
                            <span
                              key={w}
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                                isCurrentWeek
                                  ? "bg-blue-600 text-white ring-2 ring-blue-300 scale-110"
                                  : isPassed
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                              title={`Semana ${w}`}
                            >
                              {w}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Artigo ~400 palavras */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Calculadora Gestacional: Acompanhe Sua Gravidez Semana a Semana
          </h2>
          <p>
            A <strong>calculadora gestacional</strong> é uma ferramenta
            essencial para futuras mamães e papais que desejam acompanhar o
            desenvolvimento da gravidez de forma precisa e informada. Saber a{" "}
            <strong>idade gestacional</strong> em semanas e dias, a{" "}
            <strong>data provável do parto (DPP)</strong>, o trimestre atual e
            quantas semanas restam até o nascimento ajuda a planejar cada etapa
            com mais tranquilidade e segurança.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Como é calculada a idade gestacional?
          </h3>
          <p>
            A idade gestacional é tradicionalmente calculada a partir da{" "}
            <strong>Data da Última Menstruação (DUM)</strong>. O método conta o
            número de dias entre a DUM e a data atual, convertendo o resultado
            em semanas e dias. Uma gestação a termo dura em média{" "}
            <strong>40 semanas (280 dias)</strong>. Caso você não lembre da DUM,
            também pode informar a Data Provável do Parto (DPP) — a calculadora
            faz o caminho inverso e descobre a idade gestacional atual.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Os trimestres da gestação
          </h3>
          <p>
            A gravidez é dividida em três trimestres, cada um com características
            marcantes:
          </p>
          <ul className="list-disc pl-6 space-y-1 my-3">
            <li>
              <strong>1º Trimestre (semanas 1 a 13):</strong> Período de formação
              dos principais órgãos do bebê. É comum ocorrerem enjoos matinais,
              cansaço e alterações hormonais intensas. O embrião se transforma em
              feto e o coração começa a bater por volta da 6ª semana.
            </li>
            <li>
              <strong>2º Trimestre (semanas 14 a 27):</strong> Conhecido como a
              fase mais tranquila da gestação. Os enjoos diminuem, a barriga
              começa a aparecer e a mãe sente os primeiros movimentos do bebê
              (por volta da 18ª–20ª semana). O bebê desenvolve audição, sobrancelhas
              e unhas.
            </li>
            <li>
              <strong>3º Trimestre (semanas 28 a 40+):</strong> Fase final de
              preparação para o parto. O bebê ganha peso rapidamente, os pulmões
              amadurecem e ele se posiciona para o nascimento. A mãe pode sentir
              contrações de treinamento (Braxton-Hicks) e desconfortos comuns do
              final da gestação.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            O calendário visual por trimestre
          </h3>
          <p>
            Nossa calculadora gestacional inclui um <strong>calendário visual</strong>{" "}
            que mostra as 40 semanas organizadas por trimestre. Você pode ver
            rapidamente em que semana está, quantas semanas já passaram e quantas
            ainda faltam. As semanas passadas aparecem destacadas, a semana atual
            ganha um destaque especial, e as futuras ficam visíveis para
            planejamento. Esse recurso ajuda a visualizar o progresso da gestação
            de forma clara e motivadora.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
            Por que usar nossa calculadora gestacional?
          </h3>
          <p>
            Nossa ferramenta é <strong>100% gratuita</strong>, não requer cadastro
            e fornece resultados instantâneos. Você pode alternar entre calcular
            pela DUM ou pela DPP, o que oferece flexibilidade para diferentes
            situações. Além disso, o calendário trimestral visual facilita o
            entendimento do estágio atual da gestação, ajudando você a se preparar
            para consultas pré-natais, exames importantes e a chegada do bebê.
          </p>

          <p>
            Lembre-se: esta calculadora tem caráter informativo e não substitui
            o acompanhamento médico. Consulte seu obstetra regularmente para um
            pré-natal completo e personalizado.
          </p>

          <p className="text-sm text-gray-400 mt-6">
            * Os cálculos são aproximados e baseados na média de 40 semanas (280
            dias). Cada gestação é única — consulte seu médico para informações
            precisas.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora Gestacional - Calculadora Trabalhista" />
      </div>
    </>
  );
}
