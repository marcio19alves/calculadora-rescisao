"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState, useMemo, useCallback } from 'react';
import ShareButtons from "@/components/ShareButtons";

// ─── Types ───────────────────────────────────────────────────────────────────

type TipoEscala = '6x1' | '12x36' | '5x2' | '4x3';

interface Calculos {
  diasPorMes: number;
  horasMensais: number;
  valorHora: number;
  salarioBaseProporcional: number;
  dsr: number;
  adicionalNoturno: number;
  totalBruto: number;
}

interface EscalaDados {
  label: string;
  descricao: string;
  diasTrabalho: number;
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const ESCALA_DADOS: Record<TipoEscala, EscalaDados> = {
  '6x1': {
    label: '6×1',
    descricao: '6 dias de trabalho + 1 de descanso',
    diasTrabalho: 26,
  },
  '12x36': {
    label: '12×36',
    descricao: '12 horas de trabalho + 36 horas de descanso',
    diasTrabalho: 15,
  },
  '5x2': {
    label: '5×2',
    descricao: 'Segunda a sexta (5 dias trabalho + 2 descanso)',
    diasTrabalho: 22,
  },
  '4x3': {
    label: '4×3',
    descricao: '4 dias de trabalho + 3 de descanso',
    diasTrabalho: 17,
  },
};

const DIAS_NO_MES = 30;
const DSR_PERCENT = 1 / 6; // ≈ 16,67%

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcularEscala(
  tipo: TipoEscala,
  salario: number,
  cargaHorariaDiaria: number,
  adicionalNoturnoPct: number,
  diasPersonalizados?: number,
): Calculos {
  const escala = ESCALA_DADOS[tipo];
  const diasMes = diasPersonalizados ?? escala.diasTrabalho;
  const horasMes = diasMes * cargaHorariaDiaria;
  const valorHora = horasMes > 0 ? salario / horasMes : 0;
  const salarioBaseProporcional = (salario / DIAS_NO_MES) * diasMes;
  const dsr = salarioBaseProporcional * DSR_PERCENT;
  const adicionalNoturno = valorHora > 0 ? valorHora * (adicionalNoturnoPct / 100) * horasMes : 0;
  const totalBruto = salarioBaseProporcional + dsr + adicionalNoturno;

  return {
    diasPorMes: diasMes,
    horasMensais: horasMes,
    valorHora,
    salarioBaseProporcional,
    dsr,
    adicionalNoturno,
    totalBruto,
  };
}

function calcularTodasEscalas(
  salario: number,
  cargaHorariaDiaria: number,
  adicionalNoturnoPct: number,
): Record<TipoEscala, Calculos> {
  const tipos: TipoEscala[] = ['6x1', '12x36', '5x2', '4x3'];
  const result = {} as Record<TipoEscala, Calculos>;
  for (const t of tipos) {
    result[t] = calcularEscala(t, salario, cargaHorariaDiaria, adicionalNoturnoPct);
  }
  return result;
}

function formatCurrency(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function formatNumber(valor: number, decimals = 1): string {
  return valor.toFixed(decimals);
}

// ─── Componente Principal ────────────────────────────────────────────────────

export default function CalculadoraEscalaTrabalhoPage() {
  const [tipo, setTipo] = useState<TipoEscala>('6x1');
  const [salario, setSalario] = useState<number>(1518);
  const [cargaHoraria, setCargaHoraria] = useState<number>(8);
  const [adicionalNoturnoPct, setAdicionalNoturnoPct] = useState<number>(20);
  const [diasPersonalizados, setDiasPersonalizados] = useState<number | null>(null);
  const [usarDiasPersonalizados, setUsarDiasPersonalizados] = useState(false);
  const [mostrarComparativa, setMostrarComparativa] = useState(false);

  const handleTipoChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipo(e.target.value as TipoEscala);
  }, []);

  const handleSalarioChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSalario(isNaN(val) ? 0 : val);
  }, []);

  const handleCargaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCargaHoraria(isNaN(val) ? 0 : val);
  }, []);

  const handleAdicionalNoturnoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAdicionalNoturnoPct(isNaN(val) ? 0 : val);
  }, []);

  const handleDiasChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setDiasPersonalizados(isNaN(val) ? 0 : val);
  }, []);

  const calculos = useMemo<Calculos>(
    () =>
      calcularEscala(
        tipo,
        salario,
        cargaHoraria,
        adicionalNoturnoPct,
        usarDiasPersonalizados ? (diasPersonalizados ?? undefined) : undefined,
      ),
    [tipo, salario, cargaHoraria, adicionalNoturnoPct, diasPersonalizados, usarDiasPersonalizados],
  );

  const todasEscalas = useMemo<Record<TipoEscala, Calculos>>(
    () => calcularTodasEscalas(salario, cargaHoraria, adicionalNoturnoPct),
    [salario, cargaHoraria, adicionalNoturnoPct],
  );

  const escalaInfo = ESCALA_DADOS[tipo];

  // ── JSON-LD Schema ──────────────────────────────────────────────────────

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Calculadora de Escala de Trabalho',
        description:
          'Calcule dias trabalhados/mês, horas mensais totais, valor-hora, salário base proporcional, DSR (Descanso Semanal Remunerado) e adicional noturno para escalas 6x1, 12x36, 5x2 e 4x3. Inclui tabela comparativa entre escalas.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
        },
        author: {
          '@type': 'Organization',
          name: 'Simuladores Trabalhistas',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'O que é a escala 6x1?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A escala 6x1 consiste em 6 dias consecutivos de trabalho seguidos de 1 dia de folga. É comum no comércio e serviços. Com base em 30 dias, o trabalhador cumpre cerca de 26 dias de trabalho por mês, com direito a DSR (Descanso Semanal Remunerado) sobre as horas trabalhadas.',
            },
          },
          {
            '@type': 'Question',
            name: 'Como funciona a escala 12x36?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Na escala 12x36, o trabalhador labora por 12 horas consecutivas e folga nas 36 horas seguintes, em ciclo contínuo. Cerca de 15 dias/mês (180h mensais). A Súmula 444 do TST reconhece a validade desta escala, desde que haja acordo coletivo ou Convenção Coletiva de Trabalho, e o repouso de 36 horas seja integralmente concedido.',
            },
          },
          {
            '@type': 'Question',
            name: 'O que é DSR (Descanso Semanal Remunerado)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O DSR é o descanso semanal remunerado, equivalente a 1/6 (aproximadamente 16,67%) do salário base proporcional dos dias trabalhados no mês. Está previsto no artigo 7º da Lei 605/49 e é devido a todos os trabalhadores com jornada de 6 dias de trabalho para 1 de descanso.',
            },
          },
          {
            '@type': 'Question',
            name: 'Horas extras são permitidas na escala 12x36?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'De acordo com a Súmula 444 do TST, a escala 12x36 é válida por acordo coletivo e não comporta a realização de horas extras habituais, pois a jornada já é extensa (12 horas). No entanto, horas extras eventuais ou suplementares podem ser realizadas e devem ser pagas com o adicional legal (mínimo de 50% sobre a hora normal).',
            },
          },
          {
            '@type': 'Question',
            name: 'Qual a diferença entre escala 5x2 e 4x3?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A escala 5x2 (segunda a sexta) prevê aproximadamente 22 dias trabalhados/mês, totalizando 176h mensais com carga de 8h/dia. Já a escala 4x3 prevê cerca de 17 dias/mês, com folgas mais frequentes (3 dias de descanso a cada 4 trabalhados), ideal para regimes de turno. Ambas geram DSR proporcional.',
            },
          },
          {
            '@type': 'Question',
            name: 'Como calcular o valor da hora de trabalho?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O valor da hora de trabalho é calculado dividindo o salário mensal pelo total de horas trabalhadas no mês. Por exemplo: salário de R$ 1.518 ÷ 220h (jornada padrão 8h/dia × 26 dias ≈ 208h na 6x1, ou 180h na 12x36). Cada escala tem um divisor diferente de horas mensais.',
            },
          },
        ],
      },
    ],
  };

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Escala de Trabalho'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* ── Cabeçalho ─────────────────────────────────────────────────── */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Calculadora de Escala de Trabalho
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Simule sua escala de trabalho: calcule dias trabalhados, horas mensais, valor-hora,
              DSR (Descanso Semanal Remunerado), salário proporcional e adicional noturno.
            </p>
          </div>

          {/* ── Card do formulário ────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-6">Dados da Simulação</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de escala */}
              <div>
                <label htmlFor="tipo-escala" className="block text-sm font-medium text-slate-700 mb-1">
                  Tipo de Escala
                </label>
                <select
                  id="tipo-escala"
                  value={tipo}
                  onChange={handleTipoChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                >
                  <option value="6x1">6×1 (6 dias trabalho + 1 folga)</option>
                  <option value="12x36">12×36 (12h trabalho + 36h folga)</option>
                  <option value="5x2">5×2 (Segunda a Sexta)</option>
                  <option value="4x3">4×3 (4 dias trabalho + 3 folga)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">{escalaInfo.descricao}</p>
              </div>

              {/* Salário mensal */}
              <div>
                <label htmlFor="salario" className="block text-sm font-medium text-slate-700 mb-1">
                  Salário Mensal (R$)
                </label>
                <input
                  id="salario"
                  type="number"
                  min={0}
                  step={0.01}
                  value={salario}
                  onChange={handleSalarioChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              {/* Carga horária diária */}
              <div>
                <label htmlFor="carga-horaria" className="block text-sm font-medium text-slate-700 mb-1">
                  Carga Horária Diária (horas)
                </label>
                <input
                  id="carga-horaria"
                  type="number"
                  min={0}
                  max={24}
                  step={0.5}
                  value={cargaHoraria}
                  onChange={handleCargaChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
              </div>

              {/* Adicional noturno (%) */}
              <div>
                <label htmlFor="adicional-noturno" className="block text-sm font-medium text-slate-700 mb-1">
                  Adicional Noturno (%)
                </label>
                <input
                  id="adicional-noturno"
                  type="number"
                  min={0}
                  max={200}
                  step={0.5}
                  value={adicionalNoturnoPct}
                  onChange={handleAdicionalNoturnoChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Padrão: 20% (art. 73 CLT). Deixe 0 para desabilitar.</p>
              </div>

              {/* Dias personalizados (opcional) */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <label htmlFor="dias-personalizados" className="text-sm font-medium text-slate-700">
                    Dias Trabalhados/Mês (personalizado)
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={usarDiasPersonalizados}
                      onChange={(e) => setUsarDiasPersonalizados(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                  </label>
                </div>
                <input
                  id="dias-personalizados"
                  type="number"
                  min={0}
                  max={31}
                  value={diasPersonalizados ?? ''}
                  onChange={handleDiasChange}
                  disabled={!usarDiasPersonalizados}
                  placeholder={String(escalaInfo.diasTrabalho)}
                  className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* ── Resultados da Escala Selecionada ────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Resultados — Escala {escalaInfo.label}
            </h2>
            <p className="text-sm text-slate-500 mb-6">{escalaInfo.descricao}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResultCard label="Dias por Mês" value={String(calculos.diasPorMes)} suffix="dias" />
              <ResultCard label="Horas Mensais" value={formatNumber(calculos.horasMensais)} suffix="h" />
              <ResultCard label="Valor Hora" value={formatCurrency(calculos.valorHora)} />
              <ResultCard label="Salário Base Proporcional" value={formatCurrency(calculos.salarioBaseProporcional)} />
              <ResultCard label="DSR (Descanso Semanal)" value={formatCurrency(calculos.dsr)} />
              <ResultCard
                label="Adicional Noturno"
                value={formatCurrency(calculos.adicionalNoturno)}
                suffix={adicionalNoturnoPct > 0 ? `(${adicionalNoturnoPct}%)` : '(0%)'}
              />
            </div>

            {/* Total Bruto */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-medium text-blue-800">
                  Total Bruto Estimado (salário proporcional + DSR + adicional noturno)
                </span>
                <span className="text-2xl font-bold text-blue-700">{formatCurrency(calculos.totalBruto)}</span>
              </div>
            </div>
          </div>

          {/* ── Botão Comparativa ─────────────────────────────────────────── */}
          <div className="text-center mb-8">
            <button
              onClick={() => setMostrarComparativa(!mostrarComparativa)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${mostrarComparativa ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {mostrarComparativa ? 'Ocultar Tabela Comparativa' : 'Mostrar Tabela Comparativa entre Escalas'}
            </button>
          </div>

          {/* ── Tabela Comparativa ────────────────────────────────────────── */}
          {mostrarComparativa && (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 overflow-x-auto">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Comparativo entre Escalas</h2>
              <p className="text-sm text-slate-500 mb-6">
                Comparação com salário de {formatCurrency(salario)}, carga horária de {cargaHoraria}h/dia e
                adicional noturno de {adicionalNoturnoPct}%.
              </p>

              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 px-2 font-semibold text-slate-700">Escala</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Dias/Mês</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Horas/Mês</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Valor Hora</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Salário Prop.</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">DSR</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Ad. Noturno</th>
                    <th className="py-3 px-2 font-semibold text-slate-700">Total Bruto</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['6x1', '6×1 — 6 dias trab. + 1 folga'],
                      ['12x36', '12×36 — 12h trab. + 36h folga'],
                      ['5x2', '5×2 — Segunda a Sexta'],
                      ['4x3', '4×3 — 4 dias trab. + 3 folga'],
                    ] as [TipoEscala, string][]
                  ).map(([key, label]) => {
                    const c = todasEscalas[key];
                    const isSelected = key === tipo;
                    return (
                      <tr
                        key={key}
                        className={`border-b border-slate-100 hover:bg-blue-50 transition-colors ${
                          isSelected ? 'bg-blue-50 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 px-2 text-slate-800 whitespace-nowrap">
                          {label}
                          {isSelected && (
                            <span className="ml-1 text-xs text-blue-600">(atual)</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-slate-700">{c.diasPorMes}</td>
                        <td className="py-3 px-2 text-slate-700">{formatNumber(c.horasMensais)}h</td>
                        <td className="py-3 px-2 text-slate-700">{formatCurrency(c.valorHora)}</td>
                        <td className="py-3 px-2 text-slate-700">{formatCurrency(c.salarioBaseProporcional)}</td>
                        <td className="py-3 px-2 text-slate-700">{formatCurrency(c.dsr)}</td>
                        <td className="py-3 px-2 text-slate-700">{formatCurrency(c.adicionalNoturno)}</td>
                        <td className="py-3 px-2 text-blue-700 font-semibold">
                          {formatCurrency(c.totalBruto)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-4 text-xs text-slate-500">
                <p>Os valores são estimativas baseadas nos parâmetros informados. Consulte um contador para cálculos oficiais.</p>
              </div>
            </div>
          )}

          {/* ── Notas / Legenda ───────────────────────────────────────────── */}
          <div className="mb-10 text-xs text-slate-500 space-y-1">
            <p>* DSR calculado como 1/6 do salário base proporcional (art. 7º, Lei 605/49).</p>
            <p>* Adicional noturno padrão de 20% sobre o valor-hora (art. 73, CLT).</p>
            <p>* Salário proporcional baseado em 30 dias/mês.</p>
            <p>* Os valores são estimativas; consulte um contador para cálculos oficiais.</p>
          </div>

          {/* ── Artigo Explicativo ────────────────────────────────────────── */}
          <article className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8 prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Escalas de Trabalho no Brasil: Direitos, Cálculos e Legislação
            </h2>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">O que é a Escala de Trabalho?</h3>
            <p>
              A escala de trabalho define a distribuição dos dias e horários laborais do empregado ao longo do mês.
              Cada escala possui características específicas quanto ao número de dias trabalhados, folgas, carga horária
              diária e impacto nos encargos trabalhistas como o DSR (Descanso Semanal Remunerado) e adicional noturno.
              Conhecer as particularidades de cada escala é essencial para empregadores e trabalhadores garantirem o
              cumprimento da legislação e o cálculo correto da remuneração.
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Escala 6×1</h3>
            <p>
              A escala 6×1 é uma das mais comuns no Brasil, especialmente no comércio e em serviços. O trabalhador
              cumpre 6 dias consecutivos de trabalho seguidos de 1 dia de folga. Em um mês de 30 dias, isso resulta
              em aproximadamente <strong>26 dias trabalhados</strong>. Com carga horária de 8h/dia, são cerca de{' '}
              <strong>208 horas mensais</strong>. O DSR é obrigatório e corresponde a 1/6 do salário base
              proporcional, conforme o artigo 7º da Lei 605/49. É importante destacar que a folga deve,
              preferencialmente, coincidir com o domingo a cada período de 7 semanas.
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Escala 12×36</h3>
            <p>
              Na escala 12×36, o empregado trabalha por 12 horas consecutivas e descansa nas 36 horas seguintes,
              formando um ciclo contínuo. São aproximadamente <strong>15 dias de trabalho por mês</strong>,
              totalizando <strong>180 horas mensais</strong> (15 dias × 12h). Esta escala é comum em setores como
              segurança patrimonial, portaria, hospitais e indústrias com operação contínua.
            </p>
            <p>
              A <strong>Súmula 444 do Tribunal Superior do Trabalho (TST)</strong> reconhece a validade da escala
              12×36 <em>desde que estabelecida por Acordo Coletivo de Trabalho ou Convenção Coletiva de Trabalho</em>.
              A Súmula determina que, nesta escala, <strong>não são devidas horas extras habituais</strong>, pois a
              jornada de 12 horas já compensa o repouso de 36 horas subsequentes. No entanto, horas extras eventuais
              (não habituais) podem ser realizadas e devem ser pagas com o adicional mínimo de 50% sobre o valor da
              hora normal. A Súmula 444 também afirma que o empregado submetido à escala 12×36 não tem direito ao
              recebimento de horas extras pela simples ultrapassagem da jornada de 8 horas, desde que respeitado o
              limite de 12 horas e concedido o repouso de 36 horas.
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Escala 5×2 (Segunda a Sexta)</h3>
            <p>
              A escala 5×2 é o regime tradicional de segunda-feira a sexta-feira, com folgas aos sábados e domingos.
              Corresponde a aproximadamente <strong>22 dias trabalhados por mês</strong> e, com 8h/dia, cerca de{' '}
              <strong>176 horas mensais</strong>. É amplamente utilizada em escritórios, bancos, escolas e
              administração pública. O DSR está embutido nas folgas de sábado e domingo. Esta escala é a base para o
              cálculo do salário-hora na maioria das convenções coletivas, utilizando-se o divisor 220 (para 44h
              semanais) ou 200 (para 40h semanais).
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Escala 4×3</h3>
            <p>
              A escala 4×3 consiste em 4 dias de trabalho seguidos de 3 dias de descanso. Resulta em cerca de{' '}
              <strong>17 dias trabalhados por mês</strong> e, com jornada de 8h/dia, aproximadamente{' '}
              <strong>136 horas mensais</strong>. Esta escala é menos comum, mas é utilizada em regimes especiais
              de turno, como em algumas indústrias e serviços que operam em regime de turnos ininterruptos de
              revezamento. O DSR também incide sobre esta escala.
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Direitos Trabalhistas e Encargos</h3>
            <p>
              <strong>DSR (Descanso Semanal Remunerado):</strong> Previsto no artigo 7º da Lei 605/49 e no artigo 67
              da CLT, o DSR corresponde a 1/6 do valor do salário base proporcional aos dias efetivamente
              trabalhados no mês. Ou seja, para cada 6 dias trabalhados, o empregado tem direito a 1 dia de
              descanso remunerado. Todas as escalas aqui simuladas geram direito ao DSR.
            </p>
            <p>
              <strong>Adicional Noturno:</strong> O trabalho noturno (22h às 5h para o urbano) tem adicional mínimo
              de 20% sobre o valor da hora diurna, conforme artigo 73 da CLT. A hora noturna é reduzida para 52
              minutos e 30 segundos. Na escala 12×36, o adicional noturno incide sobre as horas trabalhadas entre
              22h e 5h, com o mesmo percentual de 20%.
            </p>
            <p>
              <strong>Salário Proporcional:</strong> Quando o trabalhador não cumpre o mês integral (admissão,
              demissão ou faltas), o salário é calculado proporcionalmente aos dias trabalhados, dividindo-se o
              salário mensal por 30 e multiplicando pelos dias efetivamente laborados.
            </p>

            <h3 className="text-lg font-medium text-slate-700 mt-6 mb-2">Como Utilizar esta Calculadora</h3>
            <p>
              Selecione o tipo de escala, informe seu salário mensal, a carga horária diária e, opcionalmente, o
              percentual de adicional noturno. A calculadora exibirá os dias trabalhados/mês, horas mensais totais,
              valor da hora, salário base proporcional, DSR e adicional noturno. Você também pode ativar a{' '}
              <strong>tabela comparativa</strong> para visualizar lado a lado os resultados de todas as escalas
              com os mesmos parâmetros. Utilize a opção de dias personalizados para simular meses com feriados,
              férias ou admissões no meio do mês.
            </p>
          </article>
        </div>
      </main>

      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .prose {
          line-height: 1.75;
        }
        .prose p {
          margin-bottom: 1rem;
          color: #334155;
        }
        .prose h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
      `}</style>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Escala de Trabalho - Calculadora Trabalhista" />
      </div>
    </>
  );
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className="text-xl font-bold text-slate-800">
        {value}
        {suffix && <span className="text-sm font-normal text-slate-500 ml-1">{suffix}</span>}
      </span>
    </div>
  );
}
