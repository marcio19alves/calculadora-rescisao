"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";
import { useState } from "react";

export default function EmprestimoPessoalPage() {
  const [valor, setValor] = useState("");
  const [taxaMensal, setTaxaMensal] = useState("");
  const [prazo, setPrazo] = useState("");
  const [resultado, setResultado] = useState<{
    parcela: number;
    totalPagar: number;
    jurosTotais: number;
    cetMensal: number;
    amortizacao: { mes: number; juros: number; amortizacao: number; saldoDevedor: number }[];
  } | null>(null);
  const [erro, setErro] = useState("");

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulador de Empréstimo Pessoal",
    url: "https://calculadoratrabalhista.net.br/calculadora-emprestimo-pessoal",
    description:
      "Simule online e grátis seu empréstimo pessoal com cálculo pela Tabela Price. Informe valor desejado, taxa mensal e prazo. Veja parcela, CET, total a pagar e tabela de amortização.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "O que é a Tabela Price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Tabela Price, também conhecida como sistema francês de amortização, é um método de cálculo de empréstimos onde todas as parcelas têm o mesmo valor ao longo do contrato. Os juros são calculados sobre o saldo devedor atual, diminuindo ao longo do tempo enquanto a amortização (devolução do principal) aumenta. É o sistema mais usado no Brasil para empréstimos pessoais, consignados e financiamentos.",
        },
      },
      {
        "@type": "Question",
        name: "O que é CET (Custo Efetivo Total) em empréstimos?",
        acceptedAnswer: {
          "@type": "Answer",
          "text": "O CET (Custo Efetivo Total) é o indicador que reúne todos os encargos de um empréstimo: taxa de juros, tarifas, seguros e impostos. Ele deve ser informado pela instituição financeira e representa o custo real da operação. No entanto, para fins de simulação, o CET aproximado corresponde à taxa mensal de juros acrescida de encargos adicionais. Sempre compare o CET entre diferentes ofertas antes de contratar.",
        },
      },
      {
        "@type": "Question",
        name: "Como são calculadas as parcelas de um empréstimo pessoal?",
        acceptedAnswer: {
          "@type": "Answer",
          "text": "As parcelas de um empréstimo pessoal no sistema Price são calculadas pela fórmula: PMT = PV × [i × (1+i)^n] / [(1+i)^n - 1], onde PV é o valor presente (valor do empréstimo), i é a taxa de juros mensal em decimal, e n é o número de meses. Cada parcela é composta por uma parte de juros (calculada sobre o saldo devedor atual) e uma parte de amortização do principal.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a taxa de juros média para empréstimo pessoal no Brasil?",
        acceptedAnswer: {
          "@type": "Answer",
          "text": "Segundo dados recentes do Banco Central, a taxa média de juros do crédito pessoal não consignado no Brasil gira em torno de 4% a 8% ao mês, dependendo do perfil de crédito do cliente e da instituição financeira. Para o crédito consignado (desconto em folha), as taxas são significativamente menores, entre 1,5% e 2,5% ao mês. Os juros brasileiros estão entre os mais altos do mundo.",
        },
      },
      {
        "@type": "Question",
        name: "Quantas parcelas posso simular no empréstimo pessoal?",
        acceptedAnswer: {
          "@type": "Answer",
          "text": "O simulador de empréstimo pessoal permite simular prazos de 3 a 60 meses, que é o período mais comum oferecido pelas instituições financeiras para crédito pessoal. Prazos mais longos reduzem o valor da parcela mensal, mas aumentam o total de juros pagos ao final do contrato. Use o simulador para encontrar o equilíbrio ideal entre parcela acessível e custo total do crédito.",
        },
      },
    ],
  };

  function calcularPrice() {
    setErro("");

    const pv = parseFloat(valor.replace(/\./g, "").replace(",", "."));
    const i = parseFloat(taxaMensal.replace(",", "."));
    const n = parseInt(prazo.replace(/\D/g, ""), 10);

    if (isNaN(pv) || pv <= 0) {
      setErro("Informe um valor de empréstimo válido.");
      return;
    }
    if (isNaN(i) || i <= 0) {
      setErro("Informe uma taxa de juros mensal válida.");
      return;
    }
    if (isNaN(n) || n < 3 || n > 60) {
      setErro("O prazo deve ser entre 3 e 60 meses.");
      return;
    }

    const iDecimal = i / 100;
    // Fórmula Price: PMT = PV * [i * (1+i)^n] / [(1+i)^n - 1]
    const factor = Math.pow(1 + iDecimal, n);
    const parcela = pv * ((iDecimal * factor) / (factor - 1));

    const totalPagar = parcela * n;
    const jurosTotais = totalPagar - pv;

    // CET aproximado (mensal) = considera que a taxa de juros já é o principal custo
    // CET mensal ≈ taxa de juros mensal (em cenário sem tarifas adicionais)
    const cetMensal = iDecimal * 100;

    // Tabela de amortização (Price)
    const amortizacao: { mes: number; juros: number; amortizacao: number; saldoDevedor: number }[] = [];
    let saldo = pv;

    for (let mes = 1; mes <= n; mes++) {
      const jurosParcela = saldo * iDecimal;
      const amortParcela = parcela - jurosParcela;
      saldo -= amortParcela;
      if (saldo < 0.01) saldo = 0;

      // Mostrar primeiros 12 meses + último mês (resumo final)
      if (mes <= 12 || mes === n) {
        amortizacao.push({
          mes,
          juros: jurosParcela,
          amortizacao: amortParcela,
          saldoDevedor: saldo,
        });
      }
    }

    setResultado({
      parcela,
      totalPagar,
      jurosTotais,
      cetMensal,
      amortizacao,
    });
  }

  function formatBRL(value: number): string {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Empréstimo Pessoal'}]} />
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
          Simulador de Empréstimo Pessoal
        </h1>
        <p className="text-gray-600 mb-8">
          Simule online e grátis seu empréstimo pessoal com cálculo pela Tabela
          Price. Informe o valor desejado, a taxa de juros mensal e o prazo para
          ver a parcela, o custo total e a tabela de amortização completa.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          {/* Valor Desejado */}
          <div>
            <label
              htmlFor="valor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Valor Desejado (R$)
            </label>
            <input
              id="valor"
              type="text"
              inputMode="decimal"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 5000,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Taxa de Juros Mensal */}
          <div>
            <label
              htmlFor="taxa"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Taxa de Juros Mensal (% ao mês)
            </label>
            <input
              id="taxa"
              type="text"
              inputMode="decimal"
              value={taxaMensal}
              onChange={(e) => setTaxaMensal(e.target.value)}
              placeholder="Ex: 3,5"
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
            <input
              id="prazo"
              type="text"
              inputMode="numeric"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              placeholder="Ex: 12 (mín. 3, máx. 60)"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Mínimo de 3 meses, máximo de 60 meses.</p>
          </div>

          {/* Botão */}
          <button
            onClick={calcularPrice}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Simular Empréstimo
          </button>

          {/* Mensagem de erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
              {erro}
            </div>
          )}

          {/* Resultados */}
          {resultado && (
            <div className="mt-6 border-t pt-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultado da Simulação
              </h2>

              {/* Cards de resumo */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Valor do Empréstimo</p>
                  <p className="text-lg font-bold text-gray-800">
                    R$ {formatBRL(parseFloat(valor.replace(/\./g, "").replace(",", ".")))}
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Parcela Mensal</p>
                  <p className="text-lg font-bold text-indigo-700">
                    R$ {formatBRL(resultado.parcela)}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total a Pagar</p>
                  <p className="text-lg font-bold text-amber-700">
                    R$ {formatBRL(resultado.totalPagar)}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Juros Totais</p>
                  <p className="text-lg font-bold text-red-700">
                    R$ {formatBRL(resultado.jurosTotais)}
                  </p>
                </div>
              </div>

              {/* CET e resumo extra */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">CET Mensal (%)</p>
                  <p className="text-lg font-bold text-green-700">
                    {resultado.cetMensal.toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    *Custo Efetivo Total mensal aproximado (sem tarifas/seguros)
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Prazo</p>
                  <p className="text-lg font-bold text-purple-700">
                    {prazo} {parseInt(prazo) === 1 ? "mês" : "meses"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {prazo} parcelas pela Tabela Price
                  </p>
                </div>
              </div>

              {/* Tabela de Amortização */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">
                    Tabela de Amortização (primeiros 12 meses
                    {parseInt(prazo) > 12 ? " + resumo final" : ""})
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-2 text-left font-medium text-gray-600">
                          Mês
                        </th>
                        <th className="px-4 py-2 text-right font-medium text-gray-600">
                          Parcela
                        </th>
                        <th className="px-4 py-2 text-right font-medium text-gray-600">
                          Juros
                        </th>
                        <th className="px-4 py-2 text-right font-medium text-gray-600">
                          Amortização
                        </th>
                        <th className="px-4 py-2 text-right font-medium text-gray-600">
                          Saldo Devedor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.amortizacao.map((linha, idx) => {
                        const isLast = idx === resultado.amortizacao.length - 1;
                        return (
                          <tr
                            key={linha.mes}
                            className={
                              isLast
                                ? "bg-blue-50 font-semibold border-t-2 border-blue-200"
                                : "border-b border-gray-100 hover:bg-gray-50"
                            }
                          >
                            <td className="px-4 py-2 text-gray-700">
                              {linha.mes}º
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              R$ {formatBRL(resultado.parcela)}
                            </td>
                            <td className="px-4 py-2 text-right text-red-600">
                              R$ {formatBRL(linha.juros)}
                            </td>
                            <td className="px-4 py-2 text-right text-green-600">
                              R$ {formatBRL(linha.amortizacao)}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              R$ {formatBRL(linha.saldoDevedor)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {resultado.amortizacao.length > 0 && (
                  <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
                    Última linha destacada: resumo final (mês{" "}
                    {resultado.amortizacao[resultado.amortizacao.length - 1].mes}º)
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Artigo */}
        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Empréstimo Pessoal: Tudo o que Você Precisa Saber
          </h2>

          <p>
            O <strong>empréstimo pessoal</strong> é uma das modalidades de
            crédito mais procuradas no Brasil. Seja para consolidar dívidas,
            realizar um sonho de consumo, fazer uma reforma ou cobrir uma
            despesa inesperada, milhões de brasileiros recorrem a essa linha de
            crédito todos os meses. No entanto, as altas taxas de juros
            praticadas no país exigem atenção redobrada na hora de contratar.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Como Funciona o Empréstimo Pessoal?
          </h3>
          <p>
            No empréstimo pessoal, o tomador recebe um valor em dinheiro de uma
            instituição financeira (banco, financeira ou fintech) e se
            compromete a devolvê-lo em parcelas fixas mensais, acrescidas de
            juros. A grande maioria dos contratos no Brasil utiliza o sistema de
            amortização conhecido como <strong>Tabela Price</strong>, onde todas
            as parcelas têm o mesmo valor. Nesse sistema, no início do contrato
            a maior parte da parcela corresponde ao pagamento de juros e, com o
            passar do tempo, a amortização do valor principal aumenta
            progressivamente.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Taxas de Juros no Brasil
          </h3>
          <p>
            O Brasil tem uma das maiores taxas de juros do mundo para crédito
            pessoal. Segundo o Banco Central, a taxa média do crédito pessoal
            não consignado pode variar entre 4% e 8% ao mês (cerca de 60% a
            150% ao ano), a depender do perfil de crédito do cliente e da
            instituição. Já o <strong>crédito consignado</strong> — com desconto
            direto em folha de pagamento — possui taxas significativamente
            menores, entre 1,5% e 2,5% ao mês, justamente por ter menor risco de
            inadimplência.
          </p>
          <p className="mt-2">
            Para se ter uma ideia, um empréstimo de R$ 5.000,00 a 5% ao mês em
            12 meses resulta em uma parcela de aproximadamente R$ 564,00 e um
            total de R$ 6.768,00 pagos ao final — ou seja, R$ 1.768,00 apenas em
            juros. Por isso, é essencial simular antes de contratar.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            O que é CET e por que ele é Importante?
          </h3>
          <p>
            O CET (Custo Efetivo Total) é o indicador mais completo para
            comparar ofertas de crédito. Diferente da taxa de juros simples, o
            CET inclui todos os encargos da operação: taxa de juros, tarifas de
            cadastro, seguros prestamistas, IOF e qualquer outro custo
            obrigatório. Por lei, as instituições financeiras são obrigadas a
            informar o CET antes da contratação. Sempre desconfie de ofertas que
            mostram apenas a taxa de juros mensal sem o CET.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Dicas para Contratar um Empréstimo Pessoal
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Pesquise e compare:</strong> Não aceite a primeira oferta.
              Consulte pelo menos 3 instituições diferentes. Use o simulador de
              empréstimo pessoal para comparar o CET e o valor total a pagar.
            </li>
            <li>
              <strong>Prefira o menor prazo possível:</strong> Quanto maior o
              prazo, menor a parcela, mas muito maior o total de juros pagos.
              Encontre o equilíbrio entre parcela acessível e custo total.
            </li>
            <li>
              <strong>Verifique seu score de crédito:</strong> Quanto melhor sua
              pontuação, menores as taxas de juros oferecidas. Pague contas em
              dia e mantenha o nome limpo.
            </li>
            <li>
              <strong>Considere o crédito consignado:</strong> Se você tem
              vínculo empregatício formal, aposentadoria ou pensão do INSS, o
              crédito consignado tem taxas muito mais baixas que o pessoal.
            </li>
            <li>
              <strong>Cuidado com o superendividamento:</strong> A parcela do
              empréstimo não deve comprometer mais que 30% da sua renda mensal.
              Simule antes e planeje seu orçamento.
            </li>
            <li>
              <strong>Leia o contrato com atenção:</strong> Verifique prazos,
              taxas de juros, CET, multa por atraso e possibilidade de
              quitação antecipada com desconto.
            </li>
            <li>
              <strong>Evasão de dívidas antigas:</strong> Evite usar
              empréstimo pessoal para pagar outras dívidas sem renegociar as
              condições. Isso pode gerar um ciclo de endividamento crescente.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            Vantagens do Empréstimo Pessoal
          </h3>
          <p>
            Apesar dos altos juros, o empréstimo pessoal oferece vantagens como:
            agilidade na liberação do crédito (muitas vezes em até 24 horas),
            sem necessidade de comprovação do destino do dinheiro, pagamento em
            parcelas fixas que facilitam o planejamento financeiro e a
            possibilidade de quitação antecipada com redução proporcional dos
            juros. Para quem usa com consciência e pesquisa bem as condições,
            pode ser uma ferramenta útil de planejamento financeiro.
          </p>

          <p className="mt-4">
            Use nosso <strong>simulador de empréstimo pessoal online grátis</strong>{" "}
            acima para testar diferentes valores, taxas e prazos antes de
            contratar. Com alguns cliques, você visualiza a parcela mensal, o
            total a pagar, os juros totais, o CET e a tabela de amortização
            completa.            Informação é poder na hora de tomar decisões financeiras.
          </p>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Empréstimo Pessoal - Calculadora Trabalhista" />
      </div>
    </>
  );
}
