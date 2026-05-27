"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

interface AmortizacaoRow {
  mes: number;
  saldoDevedor: number;
  amortizacao: number;
  juros: number;
  parcela: number;
}

export default function FinanciamentoVeiculosPage() {
  const [valorVeiculo, setValorVeiculo] = useState("");
  const [entrada, setEntrada] = useState("");
  const [taxaAnual, setTaxaAnual] = useState("");
  const [prazo, setPrazo] = useState("36");
  const [resultado, setResultado] = useState<{
    valorFinanciado: number;
    taxaMensal: number;
    parcela: number;
    totalPagar: number;
    jurosTotais: number;
    cetAproximado: number;
    amortizacao: AmortizacaoRow[];
  } | null>(null);

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Financiamento de Veículos",
    url: "https://calculadoratrabalhista.net.br/calculadora-financiamento-veiculos",
    description:
      "Simule online e grátis o financiamento do seu veículo pela Tabela Price. Informe valor do veículo, entrada, taxa de juros anual e prazo.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como funciona o financiamento de veículos no Brasil?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O financiamento de veículos no Brasil funciona com o banco ou financeira comprando o carro e você pagando em parcelas mensais com juros. O veículo fica alienado ao credor até a quitação total. As taxas variam conforme o banco, seu score de crédito, valor de entrada e prazo do financiamento.",
        },
      },
      {
        "@type": "Question",
        name: "O que é Tabela Price no financiamento de veículos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Tabela Price, também chamada de Sistema Francês de Amortização, é o método mais usado em financiamentos de veículos no Brasil. As parcelas são fixas durante todo o contrato. No início, a maior parte da parcela paga juros e uma pequena parte amortiza a dívida; com o tempo, a proporção se inverte.",
        },
      },
      {
        "@type": "Question",
        name: "O que é CET no financiamento de veículos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CET significa Custo Efetivo Total. É o indicador que reúne todos os encargos de uma operação de crédito: juros, tarifas, seguros e impostos. Por lei, todas as instituições financeiras são obrigadas a informar o CET antes da contratação. Ele é sempre maior que a taxa de juros nominal.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a taxa de juros média para financiamento de veículos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As taxas de juros para financiamento de veículos no Brasil variam conforme o cenário econômico. Historicamente, ficam entre 1,5% e 3,5% ao mês, dependendo do banco, do perfil do cliente, do valor de entrada e do prazo. Bancos de montadoras costumam oferecer taxas mais baixas em promoções.",
        },
      },
    ],
  };

  function calcularPrice(
    saldo: number,
    taxaMensal: number,
    meses: number
  ): { parcela: number; amortizacao: AmortizacaoRow[] } {
    const i = taxaMensal / 100;
    // PMT = PV * [i * (1+i)^n] / [(1+i)^n - 1]
    const fator = Math.pow(1 + i, meses);
    const parcela = saldo * ((i * fator) / (fator - 1));
    const amortizacao: AmortizacaoRow[] = [];
    let sd = saldo;

    const totalLinhas = Math.min(12, meses);

    for (let mes = 1; mes <= meses; mes++) {
      const jurosMes = sd * i;
      const amortMes = parcela - jurosMes;
      sd = sd - amortMes;
      if (sd < 0) sd = 0; // evitar negativos por arredondamento

      if (mes <= totalLinhas || mes === meses) {
        amortizacao.push({
          mes,
          saldoDevedor: mes === meses ? 0 : Math.max(0, sd),
          amortizacao: amortMes,
          juros: jurosMes,
          parcela,
        });
      }
    }

    return { parcela, amortizacao };
  }

  function calcular() {
    const vv = parseFloat(valorVeiculo.replace(",", "."));
    const en = parseFloat(entrada.replace(",", "."));
    const ta = parseFloat(taxaAnual.replace(",", "."));
    const pr = parseInt(prazo, 10);

    if (isNaN(vv) || vv <= 0) return;
    if (isNaN(pr) || pr < 12 || pr > 72) return;

    const entradaVal = isNaN(en) ? 0 : en;
    const valorFinanciado = vv - entradaVal;
    if (valorFinanciado <= 0) return;

    const taxaMensal = isNaN(ta) ? 0 : ta / 12;

    if (taxaMensal <= 0) return;

    const { parcela, amortizacao } = calcularPrice(
      valorFinanciado,
      taxaMensal,
      pr
    );

    const totalPagar = parcela * pr;
    const jurosTotais = totalPagar - valorFinanciado;

    // CET aproximado: considera apenas juros + IOF simplificado (0,38% ao ano sobre o valor financiado)
    const iofAproximado = valorFinanciado * 0.0038 * (pr / 12);
    const cetAnual = ((totalPagar + iofAproximado - valorFinanciado) / valorFinanciado) * (12 / pr) * 100;

    setResultado({
      valorFinanciado,
      taxaMensal,
      parcela,
      totalPagar,
      jurosTotais,
      cetAproximado: cetAnual,
      amortizacao,
    });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Financiamento de Veículos'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de Financiamento de Veículos
        </h1>
        <p className="text-gray-600 mb-8">
          Simule online e grátis o financiamento do seu veículo pela Tabela
          Price. Informe os dados abaixo e veja o valor das parcelas, total a
          pagar, juros, CET aproximado e a tabela de amortização detalhada.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Valor do Veículo */}
          <div>
            <label
              htmlFor="valorVeiculo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Valor do Veículo (R$)
            </label>
            <input
              id="valorVeiculo"
              type="text"
              inputMode="decimal"
              value={valorVeiculo}
              onChange={(e) => setValorVeiculo(e.target.value)}
              placeholder="Ex: 50000,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Entrada */}
          <div>
            <label
              htmlFor="entrada"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Entrada (R$) — opcional
            </label>
            <input
              id="entrada"
              type="text"
              inputMode="decimal"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Ex: 10000,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Taxa de Juros Anual */}
          <div>
            <label
              htmlFor="taxaAnual"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Taxa de Juros Anual (%)
            </label>
            <input
              id="taxaAnual"
              type="text"
              inputMode="decimal"
              value={taxaAnual}
              onChange={(e) => setTaxaAnual(e.target.value)}
              placeholder="Ex: 25"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Prazo */}
          <div>
            <label
              htmlFor="prazo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prazo (meses)
            </label>
            <select
              id="prazo"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {Array.from({ length: 61 }, (_, i) => i + 12).map((m) => (
                <option key={m} value={m}>
                  {m} meses ({Math.floor(m / 12)} ano{m >= 24 ? "s" : ""}
                  {m % 12 > 0 ? ` e ${m % 12} meses` : ""})
                </option>
              ))}
            </select>
          </div>

          {/* Botão */}
          <button
            onClick={calcular}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Calcular Financiamento
          </button>

          {/* Resultado */}
          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Resumo do Financiamento
              </h2>

              {/* Cards de Resumo */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">Valor Financiado</p>
                  <p className="text-lg font-bold text-blue-600">
                    R${" "}
                    {resultado.valorFinanciado.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">Taxa Mensal</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {resultado.taxaMensal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">Valor da Parcela</p>
                  <p className="text-lg font-bold text-green-700">
                    R${" "}
                    {resultado.parcela.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">Total a Pagar</p>
                  <p className="text-lg font-bold text-orange-700">
                    R${" "}
                    {resultado.totalPagar.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">Juros Totais</p>
                  <p className="text-lg font-bold text-red-600">
                    R${" "}
                    {resultado.jurosTotais.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">CET Aproximado (a.a.)</p>
                  <p className="text-lg font-bold text-purple-700">
                    {resultado.cetAproximado.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    %
                  </p>
                </div>
              </div>

              {/* Relação Custo x Benefício */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-1">
                <p className="font-medium text-gray-900 mb-2">
                  Relação Custo x Benefício
                </p>
                <p>
                  <strong>Valor do Veículo:</strong> R${" "}
                  {parseFloat(valorVeiculo.replace(",", ".")).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}
                </p>
                <p>
                  <strong>Entrada:</strong> R${" "}
                  {(
                    parseFloat(entrada.replace(",", ".")) || 0
                  ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <p>
                  <strong>Valor Financiado:</strong> R${" "}
                  {resultado.valorFinanciado.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>Total de Parcelas:</strong> {prazo}× de R${" "}
                  {resultado.parcela.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <hr className="my-1" />
                <p>
                  <strong>Total Pago:</strong> R${" "}
                  {resultado.totalPagar.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>Juros Pagos:</strong> R${" "}
                  {resultado.jurosTotais.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>Proporção de Juros:</strong>{" "}
                  {(
                    (resultado.jurosTotais / resultado.totalPagar) *
                    100
                  ).toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                  % do total pago
                </p>
              </div>

              {/* Tabela de Amortização */}
              {resultado.amortizacao.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-3">
                    Tabela de Amortização — Primeiros{" "}
                    {Math.min(12, parseInt(prazo, 10))} Meses
                  </h3>

                  {/* Mobile: cards */}
                  <div className="sm:hidden space-y-3">
                    {resultado.amortizacao.map((row) => (
                      <div
                        key={row.mes}
                        className="bg-white border border-gray-200 rounded-lg p-3 text-sm space-y-1"
                      >
                        <p className="font-medium text-gray-900">
                          Mês {row.mes}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-gray-500">Saldo Devedor:</span>
                          <span className="text-right font-medium">
                            R${" "}
                            {row.saldoDevedor.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-gray-500">Amortização:</span>
                          <span className="text-right font-medium text-green-600">
                            R${" "}
                            {row.amortizacao.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-gray-500">Juros:</span>
                          <span className="text-right font-medium text-red-600">
                            R${" "}
                            {row.juros.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-gray-500">Parcela:</span>
                          <span className="text-right font-medium">
                            R${" "}
                            {row.parcela.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop: tabela */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-2.5 px-3 font-medium text-gray-700">
                            Mês
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-gray-700">
                            Saldo Devedor
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-gray-700">
                            Amortização
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-gray-700">
                            Juros
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-gray-700">
                            Parcela
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.amortizacao.map((row) => (
                          <tr
                            key={row.mes}
                            className={`border-b border-gray-100 ${
                              row.mes === parseInt(prazo, 10)
                                ? "bg-green-50 font-medium"
                                : ""
                            }`}
                          >
                            <td className="py-2 px-3 text-gray-900">
                              {row.mes}
                            </td>
                            <td className="py-2 px-3 text-right">
                              R${" "}
                              {row.saldoDevedor.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="py-2 px-3 text-right text-green-600">
                              R${" "}
                              {row.amortizacao.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="py-2 px-3 text-right text-red-600">
                              R${" "}
                              {row.juros.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                            <td className="py-2 px-3 text-right">
                              R${" "}
                              {row.parcela.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    * Exibindo os primeiros 12 meses do contrato
                    {parseInt(prazo, 10) > 12 && (
                      <>
                        {" "}
                        + último mês (mês {parseInt(prazo, 10)}).
                        {parseInt(prazo, 10) > 13 &&
                          ` ${parseInt(prazo, 10) - 13} meses intermediários omitidos.`}
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Artigo */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Financiamento de Veículos no Brasil
          </h2>
          <p>
            O financiamento de veículos é uma das modalidades de crédito mais
            populares no Brasil. Segundo dados da Associação Nacional das
            Empresas Financeiras das Montadoras (ANEF), aproximadamente 60% dos
            carros novos e seminovos são adquiridos por meio de financiamento. A
            facilidade de parcelar o valor do bem, combinada com prazos longos
            que podem chegar a 72 meses, torna o crédito automotivo acessível a
            uma parcela significativa da população.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Como Funciona o Financiamento de Veículos
          </h3>
          <p>
            No financiamento tradicional, o banco ou instituição financeira
            compra o veículo e você assume a dívida em parcelas mensais. O carro
            fica alienado ao credor — ou seja, o veículo serve como garantia do
            pagamento. Enquanto as parcelas não forem quitadas, o veículo não
            pode ser vendido sem a autorização do banco. Essa modalidade, por
            ter garantia real, oferece taxas de juros mais baixas que o crédito
            pessoal não consignado. O valor da entrada é um dos fatores mais
            importantes: quanto maior a entrada, menor o valor financiado e,
            consequentemente, menores os juros totais pagos.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Sistema de Amortização — Tabela Price
          </h3>
          <p>
            A grande maioria dos financiamentos de veículos no Brasil utiliza a
            Tabela Price, também conhecida como Sistema Francês de Amortização.
            Nesse sistema, as parcelas são fixas durante todo o contrato, o que
            facilita o planejamento financeiro do comprador. A característica
            principal da Tabela Price é que, no início do contrato, a maior
            parte da parcela é composta por juros; com o passar do tempo, a
            proporção se inverte e a amortização do saldo devedor passa a ser o
            componente principal. É importante que o consumidor entenda esse
            mecanismo antes de contratar, pois ele impacta diretamente no custo
            total do financiamento.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            CET — Custo Efetivo Total
          </h3>
          <p>
            O Custo Efetivo Total (CET) é um indicador obrigatório por
            determinação do Banco Central. Ele reúne todos os encargos da
            operação de crédito: taxa de juros nominal, tarifas de cadastro e
            avaliação do veículo, seguros (como o seguro de proteção financeira
            e o seguro do bem), IOF (Imposto sobre Operações Financeiras) e
            outros custos administrativos. O CET é sempre maior que a taxa de
            juros informada inicialmente, e é o verdadeiro custo do
            financiamento. Use nossa{" "}
            <strong>
              calculadora de financiamento de veículos online grátis
            </strong>{" "}
            para simular diferentes cenários antes de fechar negócio.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Dicas para Conseguir um Financiamento Mais Barato
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Dê uma entrada maior:</strong> Quanto mais você der de
              entrada, menor será o valor financiado e os juros totais. O ideal
              é dar pelo menos 30% a 50% do valor do veículo.
            </li>
            <li>
              <strong>Pesquise taxas em diferentes bancos:</strong> As taxas
              variam muito entre instituições. Bancos de montadoras costumam
              oferecer condições promocionais.
            </li>
            <li>
              <strong>Negocie o prazo:</strong> Prazos mais curtos têm parcelas
              maiores, mas juros totais menores. Prazos mais longos reduzem a
              parcela mensal, mas aumentam significativamente os juros totais.
            </li>
            <li>
              <strong>Mantenha um bom score de crédito:</strong> Pagar contas em
              dia e manter o nome limpo no SPC e Serasa aumenta suas chances de
              conseguir taxas menores.
            </li>
            <li>
              <strong>Verifique o CET:</strong> Não se guie apenas pela taxa de
              juros mensal. Compare sempre o CET entre as propostas, pois ele
              inclui todos os custos.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Alternativas ao Financiamento Tradicional
          </h3>
          <p>
            Além do financiamento bancário tradicional, existem outras formas de
            adquirir um veículo, como o leasing (arrendamento mercantil), o
            consórcio (autofinanciamento sem juros, mas com taxa de
            administração) e o crédito direto ao consumidor (CDC). O consórcio é
            uma alternativa interessante para quem não tem pressa e quer evitar
            o pagamento de juros. Já o CDC é semelhante ao financiamento
            tradicional, mas com algumas diferenças na estrutura de cobrança.
          </p>
          <p className="mt-2">
            Independentemente da modalidade escolhida, o mais importante é
            planejar-se financeiramente. Use nossa{" "}
            <strong>
              calculadora de financiamento de veículos online grátis
            </strong>{" "}
            para simular diferentes combinações de valor, entrada, taxa e prazo.
            Com os resultados em mãos, você poderá tomar uma decisão mais
            consciente e evitar o superendividamento.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Financiamento de Veículos - Calculadora Trabalhista" />
      </div>
    </>
  );
}
