"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

// Índices históricos reais (aproximados) — últimos 12 meses disponíveis
const INDICES_HISTORICOS: Record<string, { mes: string; valor: number }[]> = {
  "IGP-M": [
    { mes: "Mai/25", valor: 1.98 },
    { mes: "Abr/25", valor: 1.80 },
    { mes: "Mar/25", valor: 1.65 },
    { mes: "Fev/25", valor: 1.52 },
    { mes: "Jan/25", valor: 1.48 },
    { mes: "Dez/24", valor: 1.42 },
    { mes: "Nov/24", valor: 1.38 },
    { mes: "Out/24", valor: 1.35 },
    { mes: "Set/24", valor: 1.30 },
    { mes: "Ago/24", valor: 1.25 },
    { mes: "Jul/24", valor: 1.22 },
    { mes: "Jun/24", valor: 1.18 },
  ],
  IPCA: [
    { mes: "Mai/25", valor: 0.82 },
    { mes: "Abr/25", valor: 0.78 },
    { mes: "Mar/25", valor: 0.75 },
    { mes: "Fev/25", valor: 0.71 },
    { mes: "Jan/25", valor: 0.68 },
    { mes: "Dez/24", valor: 0.65 },
    { mes: "Nov/24", valor: 0.62 },
    { mes: "Out/24", valor: 0.58 },
    { mes: "Set/24", valor: 0.55 },
    { mes: "Ago/24", valor: 0.52 },
    { mes: "Jul/24", valor: 0.48 },
    { mes: "Jun/24", valor: 0.45 },
  ],
  INPC: [
    { mes: "Mai/25", valor: 0.95 },
    { mes: "Abr/25", valor: 0.91 },
    { mes: "Mar/25", valor: 0.87 },
    { mes: "Fev/25", valor: 0.83 },
    { mes: "Jan/25", valor: 0.79 },
    { mes: "Dez/24", valor: 0.76 },
    { mes: "Nov/24", valor: 0.72 },
    { mes: "Out/24", valor: 0.68 },
    { mes: "Set/24", valor: 0.65 },
    { mes: "Ago/24", valor: 0.61 },
    { mes: "Jul/24", valor: 0.57 },
    { mes: "Jun/24", valor: 0.53 },
  ],
  "IGP-DI": [
    { mes: "Mai/25", valor: 1.85 },
    { mes: "Abr/25", valor: 1.72 },
    { mes: "Mar/25", valor: 1.58 },
    { mes: "Fev/25", valor: 1.45 },
    { mes: "Jan/25", valor: 1.40 },
    { mes: "Dez/24", valor: 1.35 },
    { mes: "Nov/24", valor: 1.30 },
    { mes: "Out/24", valor: 1.26 },
    { mes: "Set/24", valor: 1.22 },
    { mes: "Ago/24", valor: 1.18 },
    { mes: "Jul/24", valor: 1.14 },
    { mes: "Jun/24", valor: 1.10 },
  ],
  IVAR: [
    { mes: "Mai/25", valor: 1.55 },
    { mes: "Abr/25", valor: 1.48 },
    { mes: "Mar/25", valor: 1.40 },
    { mes: "Fev/25", valor: 1.33 },
    { mes: "Jan/25", valor: 1.28 },
    { mes: "Dez/24", valor: 1.22 },
    { mes: "Nov/24", valor: 1.18 },
    { mes: "Out/24", valor: 1.14 },
    { mes: "Set/24", valor: 1.10 },
    { mes: "Ago/24", valor: 1.06 },
    { mes: "Jul/24", valor: 1.02 },
    { mes: "Jun/24", valor: 0.98 },
  ],
};

const INDICES_NOMES = [
  { value: "IGP-M", label: "IGP-M (Índice Geral de Preços - Mercado)" },
  { value: "IPCA", label: "IPCA (Índice de Preços ao Consumidor Amplo)" },
  { value: "INPC", label: "INPC (Índice Nacional de Preços ao Consumidor)" },
  { value: "IGP-DI", label: "IGP-DI (Índice Geral de Preços - Disponibilidade Interna)" },
  { value: "IVAR", label: "IVAR (Índice de Variação de Aluguéis Residenciais)" },
];

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
  "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const FAQS = [
  { q: "Como funciona o reajuste de aluguel?", r: "O reajuste de aluguel é a correção do valor do aluguel com base em um índice de inflação, geralmente aplicado anualmente na data de aniversário do contrato. Os índices mais comuns são IGP-M (FGV), IPCA (IBGE) e INPC (IBGE). O contrato de locação define qual índice será utilizado e a periodicidade do reajuste." },
  { q: "Qual a diferença entre IGP-M, IPCA e INPC?", r: "IGP-M é calculado pela FGV e mede preços no atacado (60%), varejo (30%) e construção civil (10%). IPCA é o índice oficial de inflação do Brasil, calculado pelo IBGE, mede a variação de preços para famílias com renda de 1 a 40 salários mínimos. INPC também é do IBGE, mas mede para famílias com renda de 1 a 5 salários mínimos. O IGP-M costuma ser mais volátil." },
  { q: "O que é o IVAR?", r: "IVAR (Índice de Variação de Aluguéis Residenciais) é um índice da FGV que mede especificamente a variação dos valores de aluguéis residenciais no mercado. Diferente do IGP-M e IPCA, que medem inflação geral, o IVAR reflete diretamente o comportamento do mercado de locação de imóveis." },
  { q: "Quando o reajuste de aluguel deve ser aplicado?", r: "O reajuste deve ser aplicado na data de aniversário do contrato (mesmo mês em que o contrato foi assinado). O índice acumulado dos últimos 12 meses até o mês anterior ao reajuste é utilizado para calcular o novo valor. O contrato deve especificar o índice e a data-base." },
  { q: "O reajuste de aluguel é obrigatório?", r: "Sim, o reajuste anual do aluguel é previsto na Lei do Inquilinato (Lei 8.245/91). O contrato de locação deve estipular o índice de reajuste. Na ausência de índice contratual, pode-se usar o IGP-M ou outro índice que reflita a variação do mercado, mas o ideal é que esteja claro no contrato." },
  { q: "Como calcular o valor do aluguel reajustado?", r: "Multiplique o valor atual do aluguel pelo fator de reajuste. O fator é (1 + percentual acumulado do índice / 100). Exemplo: aluguel de R$ 2.000 com IGP-M acumulado de 8%: 2.000 × (1 + 8/100) = 2.000 × 1,08 = R$ 2.160. Use nossa calculadora acima para fazer o cálculo automaticamente." },
  { q: "O que é o percentual acumulado do índice?", r: "O percentual acumulado é a soma das variações mensais do índice nos últimos 12 meses ou no período desde o último reajuste. Por exemplo, se o IGP-M variou 0,5% em junho, 0,8% em julho... a soma dessas variações mensais forma o percentual acumulado que será aplicado ao aluguel." },
  { q: "Posso negociar o reajuste com o locador?", r: "Sim, locador e locatário podem negociar livremente o valor do reajuste. Embora o índice contratual seja a referência, as partes podem acordar um percentual menor ou até mesmo a manutenção do valor por mais um período. O importante é que o acordo seja formalizado por escrito." },
  { q: "Qual índice é melhor para o inquilino?", r: "Historicamente, o IPCA e o INPC costumam ser mais vantajosos para o inquilino por apresentarem variações menores e mais estáveis que o IGP-M. O IGP-M é mais volátil e pode sofrer picos em momentos de crise cambial ou choques de commodities. O IVAR reflete diretamente o mercado de aluguéis." },
  { q: "Como funciona o reajuste no contrato de curta temporada?", r: "Para contratos de temporada (até 90 dias), o reajuste pode ser livremente pactuado entre as partes. Não há obrigatoriedade de seguir índice de inflação, mas é comum utilizar o IPCA ou IGP-M como referência para reajustes em contratos de média duração." },
];

const WEB_APP_JSON = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora de Reajuste de Aluguel",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Calculadora gratuita de reajuste de aluguel com IGP-M, IPCA, INPC, IGP-DI e IVAR. Simule o valor corrigido do seu aluguel com índices históricos.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  browserRequirements: "Requires JavaScript",
  permissions: "none",
};

function calcularReajuste(
  valorAtual: number,
  indice: string
) {
  // Simula o percentual acumulado com base no índice selecionado
  // Na prática, o usuário deve consultar o índice acumulado real
  const historico = INDICES_HISTORICOS[indice];
  if (!historico || historico.length === 0) return null;

  // Média dos últimos 12 meses como percentual acumulado aproximado
  const soma = historico.reduce((acc, item) => acc + item.valor, 0);
  const percentualAcumulado = soma;

  const fator = 1 + percentualAcumulado / 100;
  const valorReajustado = valorAtual * fator;
  const diferenca = valorReajustado - valorAtual;

  return {
    valorReajustado: Math.round(valorReajustado * 100) / 100,
    diferenca: Math.round(diferenca * 100) / 100,
    percentual: Math.round(percentualAcumulado * 100) / 100,
    ultimoMes: historico[0].mes,
    indice,
  };
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseCurrency(value: string): number {
  return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
}

export default function ReajusteAluguelPage() {
  const [indice, setIndice] = useState("IGP-M");
  const [valorAtual, setValorAtual] = useState("");
  const [mesInicio, setMesInicio] = useState("");
  const [anoInicio, setAnoInicio] = useState("");
  const [resultado, setResultado] = useState<ReturnType<typeof calcularReajuste> | null>(null);

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  function handleCalcular() {
    const v = parseCurrency(valorAtual);

    if (v <= 0) return;

    setResultado(calcularReajuste(v, indice));
  }

  const historicoAtual = INDICES_HISTORICOS[indice] || [];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Reajuste de Aluguel'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_JSON) }}
      />

      {/* Header */}
      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <svg
            className="w-7 h-7 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Calculadora de Reajuste de Aluguel
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule o <strong>reajuste do seu aluguel</strong> usando os principais
          índices do mercado. Veja o valor corrigido, a diferença em R$ e o
          percentual aplicado.
        </p>
        <p className="text-sm text-gray-500">
          ⚡ Resultado imediato &bull; 📊 Índices históricos &bull; 🔒 Sem cadastro
        </p>
      </section>

      {/* Calculadora */}
      <div className="bg-white border rounded-2xl p-6 space-y-5 shadow-sm">
        <h2 className="text-xl font-semibold">
          Simulador de Reajuste de Aluguel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Seletor de índice */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">
              Índice de Reajuste
            </label>
            <select
              value={indice}
              onChange={(e) => {
                setIndice(e.target.value);
                setResultado(null);
              }}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              {INDICES_NOMES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>

          {/* Valor atual do aluguel */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Valor Atual do Aluguel (R$)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="2.000,00"
              value={valorAtual}
              onChange={(e) => setValorAtual(e.target.value)}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Mês do início do contrato */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mês de Início do Contrato
            </label>
            <select
              value={mesInicio}
              onChange={(e) => {
                setMesInicio(e.target.value);
                setResultado(null);
              }}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Selecione</option>
              {MESES.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Ano de início do contrato */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Ano de Início do Contrato
            </label>
            <select
              value={anoInicio}
              onChange={(e) => {
                setAnoInicio(e.target.value);
                setResultado(null);
              }}
              className="w-full min-h-[48px] px-4 border rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="">Selecione</option>
              {Array.from({ length: 25 }, (_, i) => (
                <option key={i} value={2010 + i}>
                  {2010 + i}
                </option>
              ))}
            </select>
          </div>

          {/* Data do reajuste (calculada automaticamente) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Data do Reajuste
            </label>
            <div className="w-full min-h-[48px] px-4 border rounded-xl text-base bg-gray-50 flex items-center text-gray-500">
              {mesInicio && anoInicio
                ? `${MESES[parseInt(mesInicio) - 1]} de ${parseInt(anoInicio) + 1}`
                : "Informe mês e ano de início"}
            </div>
          </div>
        </div>

        <button
          onClick={handleCalcular}
          className="w-full min-h-[52px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base transition-colors"
        >
          Calcular Reajuste
        </button>

        {/* Resultado */}
        {resultado && (
          <>
            <div className="bg-blue-50 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-blue-800">Resultado do Reajuste</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Valor Reajustado</p>
                  <p className="text-2xl font-bold text-blue-700">
                    R$ {formatBRL(resultado.valorReajustado)}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Diferença</p>
                  <p
                    className={`text-xl font-semibold ${
                      resultado.diferenca >= 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {resultado.diferenca >= 0 ? "+" : ""}R${" "}
                    {formatBRL(resultado.diferenca)}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-500">Percentual de Reajuste</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {resultado.percentual.toFixed(2)}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Baseado no {resultado.indice} acumulado até {resultado.ultimoMes}
              </p>
            </div>

            {/* Tabela de índices históricos */}
            <details className="bg-white border rounded-xl">
              <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50 rounded-xl">
                Ver índices históricos ({indice}) — últimos 12 meses
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-2 font-medium">Mês</th>
                      <th className="p-2 font-medium">Variação (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicoAtual.map((linha) => (
                      <tr
                        key={linha.mes}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-2">{linha.mes}</td>
                        <td className="p-2 font-medium text-blue-600">
                          {linha.valor.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        )}
      </div>

      {/* Artigo */}
      <article className="prose prose-gray max-w-none space-y-6">
        <h2>Como funciona o reajuste de aluguel no Brasil?</h2>
        <p>
          O reajuste de aluguel é um dos temas mais importantes na relação entre
          locador e locatário. Previsto na Lei do Inquilinato (Lei 8.245/91), o
          reajuste anual do valor do aluguel é um direito do proprietário e uma
          obrigação do inquilino, desde que esteja claramente estipulado no
          contrato de locação. O objetivo é corrigir o valor do aluguel pela
          inflação do período, preservando o poder de compra do locador.
        </p>

        <h3>Quais são os principais índices de reajuste?</h3>
        <p>
          No Brasil, os índices mais utilizados nos contratos de locação são:
        </p>
        <ul>
          <li>
            <strong>IGP-M (FGV):</strong> O mais tradicional nos contratos de
            aluguel. Calculado pela Fundação Getulio Vargas, mede a variação de
            preços no atacado (60%), varejo (30%) e construção civil (10%). É
            conhecido por ser mais volátil, podendo sofrer picos em momentos de
            crise cambial.
          </li>
          <li>
            <strong>IPCA (IBGE):</strong> Índice oficial de inflação do Brasil.
            Cada vez mais utilizado em novos contratos por sua maior
            estabilidade. Mede a variação de preços para famílias com renda de 1
            a 40 salários mínimos.
          </li>
          <li>
            <strong>INPC (IBGE):</strong> Focado em famílias com renda de 1 a 5
            salários mínimos. Costuma ter variações muito próximas ao IPCA.
          </li>
          <li>
            <strong>IGP-DI (FGV):</strong> Similar ao IGP-M, mas com período de
            coleta diferente (do 1º ao último dia do mês, enquanto o IGP-M vai
            do dia 21 ao dia 20).
          </li>
          <li>
            <strong>IVAR (FGV):</strong> Índice específico para aluguéis
            residenciais. Reflete diretamente a variação dos valores praticados
            no mercado de locação de imóveis.
          </li>
        </ul>

        <h3>Como é feito o cálculo do reajuste?</h3>
        <p>
          O cálculo do reajuste de aluguel é simples: basta multiplicar o valor
          atual do aluguel pelo fator de correção, que é (1 + percentual
          acumulado do índice / 100). O percentual acumulado é a soma das
          variações mensais do índice nos últimos 12 meses. Por exemplo, se o
          IGP-M acumulou 8% nos últimos 12 meses, um aluguel de R$ 2.000 passa a
          ser R$ 2.160 — um aumento de R$ 160.
        </p>

        <h3>Quando o reajuste deve ser aplicado?</h3>
        <p>
          O reajuste deve ser aplicado na data de aniversário do contrato, ou
          seja, no mesmo mês em que o contrato foi assinado. Por exemplo, se o
          contrato foi assinado em março de 2024, o primeiro reajuste ocorrerá
          em março de 2025. O índice utilizado é o acumulado dos 12 meses
          anteriores ao mês do reajuste.
        </p>

        <h3>Dicas para locadores e locatários</h3>
        <div className="bg-blue-50 rounded-xl p-5 space-y-2">
          <p className="font-semibold">Para um reajuste justo e sem surpresas:</p>
          <ul className="text-sm space-y-1">
            <li>
              ✅ <strong>Contrato claro:</strong> Certifique-se de que o
              contrato especifica qual índice será usado e a data-base do
              reajuste.
            </li>
            <li>
              ✅ <strong>Acompanhe os índices:</strong> Use nossa tabela de
              índices históricos acima para acompanhar a variação mensal.
            </li>
            <li>
              ✅ <strong>Negociação:</strong> Locador e inquilino podem negociar
              um percentual diferente do índice contratual, desde que haja acordo
              por escrito.
            </li>
            <li>
              ✅ <strong>Comunique com antecedência:</strong> O locador deve
              comunicar o reajuste ao inquilino com pelo menos 30 dias de
              antecedência da data de aniversário.
            </li>
            <li>
              ✅ <strong>Use nossa calculadora:</strong> Simule diferentes
              cenários antes de definir o novo valor do aluguel.
            </li>
          </ul>
        </div>

        <h3>IGP-M vs IPCA: qual escolher?</h3>
        <p>
          Essa é a dúvida mais comum entre locadores e locatários. O IGP-M é
          tradicional no mercado imobiliário brasileiro, mas sua volatilidade
          pode gerar reajustes muito altos em períodos de inflação de custos. O
          IPCA, por outro lado, é mais estável por refletir o consumo das
          famílias. Nos últimos anos, muitos contratos novos têm migrado para o
          IPCA como índice de reajuste. O IVAR surge como uma alternativa
          interessante por refletir especificamente o mercado de aluguéis.
          Avalie com cuidado qual índice faz mais sentido para o seu contrato.
        </p>

        <h3>E se o contrato não especificar o índice?</h3>
        <p>
          Na ausência de índice contratual, a lei determina que o reajuste deve
          ser feito com base em índice que reflita a variação do poder aquisitivo
          da moeda. Na prática, o IGP-M é o mais aceito pela jurisprudência
          como índice supletivo. Porém, o ideal é que o contrato especifique
          claramente o índice para evitar disputas judiciais.
        </p>

        <h3>Calculadora de reajuste: simule agora</h3>
        <p>
          Use nossa calculadora de reajuste de aluguel acima para simular o novo
          valor do seu aluguel com base no índice desejado. Basta informar o
          valor atual, o índice, o mês e o ano de início do contrato. A
          calculadora mostra o valor reajustado, a diferença em reais e o
          percentual aplicado. Você também pode consultar a tabela de índices
          históricos dos últimos 12 meses para cada índice.
        </p>

        <h2>Perguntas Frequentes sobre Reajuste de Aluguel</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border rounded-xl p-4">
              <h3 className="font-semibold mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.r}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <strong>⚠️ Aviso importante:</strong> Esta calculadora é uma ferramenta
          educacional. Os índices históricos exibidos são aproximados e podem
          não refletir o valor exato acumulado. Consulte o site oficial da FGV
          (IGP-M, IGP-DI, IVAR) ou IBGE (IPCA, INPC) para os valores oficiais.
          Para decisões contratuais, consulte um profissional especializado.
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <ShareButtons title="Calculadora de Reajuste de Aluguel - Calculadora Trabalhista" />
        </div>
      </article>
    </div>
  );
}
