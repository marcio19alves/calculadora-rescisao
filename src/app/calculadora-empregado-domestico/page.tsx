"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState, useMemo, useCallback } from 'react';
import ShareButtons from "@/components/ShareButtons";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Calculos {
  salarioBruto: number;
  inss: number;
  inssAliquota: number;
  fgts: number;
  multaFGTS: number;
  decimoTerceiro: number;
  ferias: number;
  feriasAdicional: number;
  valeTransporte: number;
  valeAlimentacao: number;
  totalEncargos: number;
  custoTotalEmpregador: number;
  valorLiquidoEmpregado: number;
  seguroDesemprego: boolean;
  mesesTrabalhados: number;
}

interface Inputs {
  salario: number;
  horasSemanais: number;
  valeTransporte: number;
  valeAlimentacao: number;
  dependentes: number;
  mesesTrabalho: number;
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const DEFAULT_SALARIO = 1518; // Salário mínimo 2025 (estimado)
const DEFAULT_HORAS_SEMANAIS = 44;
const SALARIO_MINIMO = 1518;
const MESES_NO_ANO = 12;

// Faixas INSS empregado doméstico (2025 - alíquotas progressivas)
const FAIXAS_INSS: { ate: number; aliquota: number }[] = [
  { ate: 1518.00, aliquota: 0.08 },
  { ate: 2793.88, aliquota: 0.09 },
  { ate: 4190.83, aliquota: 0.11 },
  { ate: 8157.41, aliquota: 0.14 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcularINSS(salario: number): { valor: number; aliquota: number } {
  let total = 0;
  let aliquotaEfetiva = 0;
  let faixaAnterior = 0;

  for (const faixa of FAIXAS_INSS) {
    if (salario > faixaAnterior) {
      const base = Math.min(salario, faixa.ate) - faixaAnterior;
      total += base * faixa.aliquota;
      faixaAnterior = faixa.ate;
    }
  }

  // Cap no teto
  if (salario > FAIXAS_INSS[FAIXAS_INSS.length - 1].ate) {
    // Já calculou progressivamente até o teto
  }

  aliquotaEfetiva = salario > 0 ? total / salario : 0;

  return { valor: total, aliquota: aliquotaEfetiva };
}

function formatCurrency(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function calcular(salario: number, horasSemanais: number, vt: number, va: number, dependentes: number, mesesTrabalho: number): Calculos {
  // Salário bruto informado
  const salarioBruto = salario;

  // INSS
  const { valor: inss, aliquota: inssAliquota } = calcularINSS(salarioBruto);

  // FGTS 8%
  const fgts = salarioBruto * 0.08;

  // Multa FGTS 40% (demissão sem justa causa)
  const multaFGTS = fgts * 0.40;

  // 13º proporcional (salário / 12 * meses trabalhados)
  const decimoTerceiro = (salarioBruto / MESES_NO_ANO) * Math.min(mesesTrabalho, MESES_NO_ANO);

  // Férias + 1/3 (proporcional)
  const ferias = (salarioBruto / MESES_NO_ANO) * Math.min(mesesTrabalho, MESES_NO_ANO);
  const feriasAdicional = ferias / 3;

  // Vale Transporte (desconto máximo 6% do salário)
  const descontoVTMax = salarioBruto * 0.06;
  const valeTransporte = Math.min(vt, descontoVTMax);

  // Vale Alimentação (não tem desconto obrigatório - é benefício)
  const valeAlimentacao = va;

  // Total de encargos (INSS + FGTS + multa FGTS proporcional + 13º + férias + 1/3)
  const totalEncargos = inss + fgts + multaFGTS + decimoTerceiro + ferias + feriasAdicional;

  // Custo total para o empregador (salário + encargos + VT + VA)
  const custoTotalEmpregador = salarioBruto + totalEncargos + valeTransporte + valeAlimentacao;

  // Valor líquido para o empregado (salário - INSS - VT)
  const valorLiquidoEmpregado = salarioBruto - inss - valeTransporte;

  // Seguro desemprego elegibilidade (mínimo 15 meses trabalhados nos últimos 24 meses)
  // Critério simplificado: ter trabalhado pelo menos 15 meses no período
  const seguroDesemprego = mesesTrabalho >= 15;

  return {
    salarioBruto,
    inss,
    inssAliquota,
    fgts,
    multaFGTS,
    decimoTerceiro,
    ferias,
    feriasAdicional,
    valeTransporte,
    valeAlimentacao,
    totalEncargos,
    custoTotalEmpregador,
    valorLiquidoEmpregado,
    seguroDesemprego,
    mesesTrabalhados: mesesTrabalho,
  };
}

// ─── Componente Principal ────────────────────────────────────────────────────

export default function CalculadoraEmpregadoDomesticoPage() {
  const [inputs, setInputs] = useState<Inputs>({
    salario: DEFAULT_SALARIO,
    horasSemanais: DEFAULT_HORAS_SEMANAIS,
    valeTransporte: 0,
    valeAlimentacao: 0,
    dependentes: 0,
    mesesTrabalho: MESES_NO_ANO,
  });

  const updateField = useCallback((field: keyof Inputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const calculos = useMemo<Calculos>(
    () => calcular(
      inputs.salario,
      inputs.horasSemanais,
      inputs.valeTransporte,
      inputs.valeAlimentacao,
      inputs.dependentes,
      inputs.mesesTrabalho,
    ),
    [inputs],
  );

  // JSON-LD
  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Empregado Doméstico',
    description: 'Calcule INSS, FGTS, multa FGTS, 13º salário, férias e encargos trabalhistas para empregados domésticos. Simule o custo total do empregador e valor líquido do empregado.',
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
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quais são os direitos do empregado doméstico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Os empregados domésticos têm direito a salário mínimo, jornada de trabalho de 44 horas semanais, horas extras, adicional noturno, FGTS obrigatório (8%), INSS, 13º salário, férias remuneradas com 1/3, seguro desemprego, licença-maternidade de 120 dias, licença-paternidade e auxílio-doença.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que é a PEC das Domésticas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A PEC das Domésticas (Emenda Constitucional nº 72/2013) estendeu aos empregados domésticos direitos trabalhistas antes exclusivos de outros trabalhadores urbanos e rurais, como jornada de trabalho controlada, horas extras, adicional noturno, FGTS, seguro desemprego e auxílio-creche.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que diz a Lei Complementar 150/2015?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Lei Complementar 150/2015 regulamentou a EC 72/2013, estabelecendo as regras específicas para o empregado doméstico: jornada de 44h semanais, controle de ponto, FGTS obrigatório de 8%, adicional de 3,2% para multa rescisória, seguro desemprego, salário-família, auxílio-creche e prazo de 7 dias para anotação na CTPS.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como calcular o INSS do empregado doméstico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O INSS do empregado doméstico segue as alíquotas progressivas de 8% a 14% conforme a faixa salarial. O desconto é aplicado sobre o salário bruto mensal. Em 2025, as faixas são: até R$ 1.518,00 (8%), de R$ 1.518,01 a R$ 2.793,88 (9%), de R$ 2.793,89 a R$ 4.190,83 (11%) e de R$ 4.190,84 até o teto de R$ 8.157,41 (14%).',
        },
      },
      {
        '@type': 'Question',
        name: 'O FGTS é obrigatório para empregado doméstico?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim, desde a Lei Complementar 150/2015, o FGTS é obrigatório para empregados domésticos. O empregador deve depositar 8% do salário bruto mensal em conta vinculada ao FGTS, além de 3,2% para constituição do fundo de multa rescisória, totalizando 11,2% de recolhimento mensal obrigatório.',
        },
      },
    ],
  };

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Empregado Doméstico'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* ── Cabeçalho ─────────────────────────────────────────────────── */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
              Calculadora de Empregado Doméstico
            </h1>
            <p className="text-slate-600 text-lg">
              Simule INSS, FGTS, 13º salário, férias e o custo total do empregado doméstico.
            </p>
          </div>

          {/* ── Card do formulário ────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-6">
              Dados do Empregado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Salário */}
              <div>
                <label htmlFor="salario" className="block text-sm font-medium text-slate-700 mb-1">
                  Salário Mensal (R$)
                </label>
                <input
                  id="salario"
                  type="number"
                  min={SALARIO_MINIMO}
                  step={1}
                  value={inputs.salario}
                  onChange={(e) => updateField('salario', Math.max(SALARIO_MINIMO, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Mínimo: R$ {SALARIO_MINIMO.toLocaleString('pt-BR')}</p>
              </div>

              {/* Horas Semanais */}
              <div>
                <label htmlFor="horas" className="block text-sm font-medium text-slate-700 mb-1">
                  Horas Semanais
                </label>
                <input
                  id="horas"
                  type="number"
                  min={1}
                  max={44}
                  step={1}
                  value={inputs.horasSemanais}
                  onChange={(e) => updateField('horasSemanais', Math.min(44, Math.max(1, parseInt(e.target.value, 10) || 44)))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Máximo legal: 44h/semana</p>
              </div>

              {/* Dependentes */}
              <div>
                <label htmlFor="dependentes" className="block text-sm font-medium text-slate-700 mb-1">
                  Dependentes
                </label>
                <input
                  id="dependentes"
                  type="number"
                  min={0}
                  max={20}
                  step={1}
                  value={inputs.dependentes}
                  onChange={(e) => updateField('dependentes', Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Para IRRF e salário-família</p>
              </div>

              {/* Vale Transporte */}
              <div>
                <label htmlFor="vt" className="block text-sm font-medium text-slate-700 mb-1">
                  Vale Transporte (R$)
                </label>
                <input
                  id="vt"
                  type="number"
                  min={0}
                  step={0.5}
                  value={inputs.valeTransporte}
                  onChange={(e) => updateField('valeTransporte', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Desconto máximo: 6% do salário</p>
              </div>

              {/* Vale Alimentação */}
              <div>
                <label htmlFor="va" className="block text-sm font-medium text-slate-700 mb-1">
                  Vale Alimentação (R$)
                </label>
                <input
                  id="va"
                  type="number"
                  min={0}
                  step={0.5}
                  value={inputs.valeAlimentacao}
                  onChange={(e) => updateField('valeAlimentacao', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Valor mensal do benefício</p>
              </div>

              {/* Meses Trabalhados */}
              <div>
                <label htmlFor="meses" className="block text-sm font-medium text-slate-700 mb-1">
                  Meses Trabalhados
                </label>
                <input
                  id="meses"
                  type="number"
                  min={1}
                  max={12}
                  step={1}
                  value={inputs.mesesTrabalho}
                  onChange={(e) => updateField('mesesTrabalho', Math.min(MESES_NO_ANO, Math.max(1, parseInt(e.target.value, 10) || MESES_NO_ANO)))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
                <p className="text-xs text-slate-500 mt-1">Para 13º proporcional e férias</p>
              </div>
            </div>
          </div>

          {/* ── Resultados ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card: Totais Principais */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:col-span-3">
              <h2 className="text-xl font-semibold text-slate-700 mb-6">
                Resultados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <ResultCard
                  label="Total de Encargos"
                  value={formatCurrency(calculos.totalEncargos)}
                  bgColor="bg-amber-50 border-amber-200"
                  textColor="text-amber-800"
                />
                <ResultCard
                  label="Custo Total Empregador"
                  value={formatCurrency(calculos.custoTotalEmpregador)}
                  bgColor="bg-red-50 border-red-200"
                  textColor="text-red-800"
                />
                <ResultCard
                  label="Valor Líquido Empregado"
                  value={formatCurrency(calculos.valorLiquidoEmpregado)}
                  bgColor="bg-emerald-50 border-emerald-200"
                  textColor="text-emerald-800"
                />
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
                  Detalhamento Mensal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <DetalheCard label="Salário Bruto" value={formatCurrency(calculos.salarioBruto)} />
                  <DetalheCard label="INSS" value={formatCurrency(calculos.inss)} sub={`alíquota efetiva: ${(calculos.inssAliquota * 100).toFixed(1)}%`} />
                  <DetalheCard label="FGTS (8%)" value={formatCurrency(calculos.fgts)} />
                  <DetalheCard label="Multa FGTS (40%)" value={formatCurrency(calculos.multaFGTS)} sub="demissão sem justa causa" />
                  <DetalheCard label="13º Proporcional" value={formatCurrency(calculos.decimoTerceiro)} sub={`${calculos.mesesTrabalhados}/12 avos`} />
                  <DetalheCard label="Férias" value={formatCurrency(calculos.ferias)} sub={`+ 1/3: ${formatCurrency(calculos.feriasAdicional)}`} />
                  <DetalheCard label="Vale Transporte" value={formatCurrency(calculos.valeTransporte)} sub="desconto máximo 6%" />
                  <DetalheCard label="Vale Alimentação" value={formatCurrency(calculos.valeAlimentacao)} />
                  <DetalheCard label="Dependentes" value={String(inputs.dependentes)} sub="para cálculo IRRF" />
                </div>
              </div>

              {/* Seguro Desemprego */}
              <div className={`mt-6 p-4 rounded-xl ${calculos.seguroDesemprego ? 'bg-emerald-50 border border-emerald-300' : 'bg-slate-50 border border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    Seguro Desemprego — Elegibilidade
                  </span>
                  <span className={`text-lg font-bold ${calculos.seguroDesemprego ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {calculos.seguroDesemprego ? '✅ Elegível' : '❌ Não elegível'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {calculos.seguroDesemprego
                    ? 'Empregado doméstico com 15+ meses trabalhados nos últimos 24 meses pode solicitar seguro desemprego.'
                    : 'Mínimo de 15 meses trabalhados nos últimos 24 meses para solicitar seguro desemprego.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Artigo ────────────────────────────────────────────────────── */}
          <article className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Direitos do Empregado Doméstico no Brasil
            </h2>

            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                A categoria dos empregados domésticos no Brasil passou por uma verdadeira revolução jurídica a partir de 2013. Antes da <strong>PEC das Domésticas</strong> (Emenda Constitucional nº 72/2013), milhões de trabalhadores que exerciam funções como faxineiros, cozinheiros, babás, jardineiros, motoristas particulares e cuidadores de idosos não tinham acesso a direitos trabalhistas básicos como horas extras, adicional noturno, FGTS obrigatório e seguro desemprego.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">A PEC das Domésticas (EC 72/2013)</h3>
              <p>
                Aprovada em 2 de abril de 2013, a <strong>Emenda Constitucional nº 72</strong> finalmente estendeu aos empregados domésticos os direitos previstos no artigo 7º da Constituição Federal que antes eram exclusivos de outros trabalhadores urbanos e rurais. Foram garantidos: jornada de trabalho de 44 horas semanais, horas extras com adicional mínimo de 50%, adicional noturno de 20%, FGTS obrigatório (8%), seguro desemprego, salário-família, auxílio-creche para filhos até 6 anos, licença-maternidade de 120 dias, licença-paternidade e aviso prévio proporcional ao tempo de serviço.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">Lei Complementar 150/2015</h3>
              <p>
                Promulgada em 1º de junho de 2015, a <strong>Lei Complementar nº 150</strong> veio para regulamentar na prática os direitos da PEC das Domésticas. Ela estabeleceu regras claras para o controle de jornada, definiu o prazo de 7 dias para anotação na CTPS, criou o Simples Doméstico (eSocial) para unificar o recolhimento de tributos e encargos, e instituiu o FGTS obrigatório com alíquota de 8% mais 3,2% de multa rescisória. A lei também definiu as hipóteses de demissão com e sem justa causa, e regulamentou o seguro desemprego específico para a categoria.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">Principais Direitos Garantidos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Salário mínimo</strong> — Garantia de piso salarial nacional, atualmente R$ 1.518,00 (2025).</li>
                <li><strong>Jornada de trabalho</strong> — Máximo de 44 horas semanais e 8 horas diárias, com horas extras remuneradas em no mínimo 50% acima do valor normal.</li>
                <li><strong>FGTS obrigatório</strong> — Depósito mensal de 8% sobre o salário bruto, mais 3,2% para multa rescisória, totalizando 11,2% mensais.</li>
                <li><strong>INSS</strong> — Alíquotas progressivas de 8% a 14% conforme faixa salarial, garantindo acesso à aposentadoria, auxílio-doença, salário-maternidade e pensão por morte.</li>
                <li><strong>13º salário</strong> — Gratificação natalina proporcional aos meses trabalhados.</li>
                <li><strong>Férias</strong> — 30 dias de férias remuneradas + adicional de 1/3 do salário a cada 12 meses de trabalho.</li>
                <li><strong>Seguro desemprego</strong> — Direito a 3 a 5 parcelas do seguro desemprego em caso de demissão sem justa causa, desde que cumpridos os requisitos de tempo de serviço.</li>
                <li><strong>Adicional noturno</strong> — Trabalho entre 22h e 5h com acréscimo de 20% sobre o valor da hora diurna.</li>
                <li><strong>Aviso prévio</strong> — Proporcional ao tempo de serviço, mínimo de 30 dias.</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">Obrigações do Empregador</h3>
              <p>
                O empregador doméstico deve registrar o empregado na CTPS no prazo de 7 dias, recolher mensalmente o FGTS e o INSS através do eSocial Doméstico (Simples Doméstico), controlar a jornada de trabalho (especialmente se houver horas extras), conceder intervalos intrajornada e interjornada, e providenciar o pagamento de todos os encargos trabalhistas. O não cumprimento dessas obrigações pode resultar em multas, ações trabalhistas e passivo previdenciário.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">Simples Doméstico (eSocial)</h3>
              <p>
                O <strong>Simples Doméstico</strong> é o sistema criado pelo governo federal para facilitar o recolhimento unificado dos tributos e encargos do empregado doméstico. Através do portal <a href="https://www.esocial.gov.br" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline">eSocial Doméstico</a>, o empregador pode gerar a guia DAE (Documento de Arrecadação do eSocial) que reúne em uma única guia: INSS, FGTS, multa rescisória e Imposto de Renda Retido na Fonte (quando aplicável). O sistema também permite o controle de férias, comunicação de rescisão e consulta de pendências.
              </p>
            </div>
          </article>

          {/* ── Disclaimer ────────────────────────────────────────────────── */}
          <div className="mt-6 text-xs text-slate-500 space-y-1">
            <p>* Os valores calculados são estimativas baseadas nas regras vigentes em 2025.</p>
            <p>* Consulte um contador ou profissional de RH para cálculos oficiais e específicos ao seu caso.</p>
            <p>* Alíquotas do INSS seguem tabela progressiva da Previdência Social.</p>
            <p>* FGTS: 8% sobre salário bruto; multa rescisória de 40% sobre o saldo do FGTS em demissão sem justa causa.</p>
          </div>
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
      `}</style>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Empregado Doméstico - Calculadora Trabalhista" />
      </div>
    </>
  );
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

function ResultCard({
  label,
  value,
  bgColor = 'bg-slate-50 border-slate-200',
  textColor = 'text-slate-800',
}: {
  label: string;
  value: string;
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <div className={`flex flex-col rounded-xl border p-5 ${bgColor}`}>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
        {label}
      </span>
      <span className={`text-2xl font-bold ${textColor}`}>
        {value}
      </span>
    </div>
  );
}

function DetalheCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </span>
      <span className="text-lg font-bold text-slate-800">
        {value}
      </span>
      {sub && <span className="text-xs text-slate-400 mt-1">{sub}</span>}
    </div>
  );
}
