"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Calculator, PiggyBank, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export default function CalculadoraFGTS() {
  const [saldo, setSaldo] = useState("");
  const [motivo, setMotivo] = useState("sem-justa-causa");
  const [resultado, setResultado] = useState<{
    saldoFGTS: number;
    multa40: number;
    multa20: number;
    total: number;
  } | null>(null);
  const [erro, setErro] = useState("");

  function handleCalcular() {
    setErro("");

    if (!saldo) {
      setErro("Preencha o saldo do FGTS.");
      return;
    }

    const saldoNum = parseFloat(
      saldo.replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(saldoNum) || saldoNum <= 0) {
      setErro("Informe um saldo de FGTS válido.");
      return;
    }

    const multa40 = saldoNum * 0.4;
    const multa20 = saldoNum * 0.2;

    if (motivo === "sem-justa-causa") {
      setResultado({
        saldoFGTS: saldoNum,
        multa40,
        multa20: 0,
        total: saldoNum + multa40,
      });
    } else {
      setResultado({
        saldoFGTS: saldoNum,
        multa40: 0,
        multa20,
        total: saldoNum + multa20,
      });
    }
  }

  function handleLimpar() {
    setSaldo("");
    setMotivo("sem-justa-causa");
    setResultado(null);
    setErro("");
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'FGTS'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que é FGTS e quem tem direito?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "FGTS (Fundo de Garantia do Tempo de Serviço) é um direito de todo trabalhador com carteira assinada no Brasil. O empregador deposita 8% do salário em uma conta vinculada ao trabalhador na Caixa Econômica Federal. O saldo fica disponível para saque em situações específicas como demissão sem justa causa, aposentadoria, doenças graves ou compra da casa própria.",
                },
              },
              {
                "@type": "Question",
                name: "Como calcular a multa de 40% do FGTS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A multa de 40% do FGTS é calculada multiplicando o saldo total da conta do FGTS por 0,40 (40%). Por exemplo: se o saldo do FGTS for R$ 15.000,00, a multa será de R$ 6.000,00 (15.000 × 0,40). Esta multa é paga pelo empregador ao trabalhador nas demissões sem justa causa.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a diferença entre Saque Rescisão e Saque Aniversário?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No Saque Rescisão, o trabalhador demitido sem justa causa pode sacar todo o saldo do FGTS mais a multa de 40% paga pelo empregador. No Saque Aniversário, o trabalhador pode sacar anualmente um percentual do saldo no mês do seu aniversário, mas perde o direito ao saque total na demissão sem justa causa (fica apenas com a multa de 40%).",
                },
              },
              {
                "@type": "Question",
                name: "Quanto é a multa do FGTS por comum acordo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Na rescisão por comum acordo (Reforma Trabalhista de 2017), a multa do FGTS é de 20% sobre o saldo, não 40%. O empregado pode sacar 80% do saldo do FGTS. O empregador paga metade (20%) da multa total, e o trabalhador recebe a outra metade. É uma opção intermediária entre demissão sem justa causa e pedido de demissão.",
                },
              },
              {
                "@type": "Question",
                name: "Quem tem direito à multa de 40% do FGTS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Têm direito à multa de 40% do FGTS os trabalhadores demitidos sem justa causa. Também têm direito os trabalhadores em rescisão indireta (quando o empregador comete falta grave). No pedido de demissão não há direito à multa. Na demissão por justa causa também não há multa. Na rescisão por comum acordo, a multa é reduzida para 20%.",
                },
              },
              {
                "@type": "Question",
                name: "Como sacar o FGTS após a demissão?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Após a demissão sem justa causa, o trabalhador pode sacar o FGTS pelo aplicativo FGTS da Caixa, app Caixa Tem, ou em qualquer agência da Caixa Econômica Federal. O prazo para saque começa após o empregador informar a rescisão no sistema eSocial/CAGED. O trabalhador precisa ter a chave de segurança (código do sindicato ou termo de rescisão) e o documento de identificação.",
                },
              },
              {
                "@type": "Question",
                name: "O saldo do FGTS rende juros?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim, o FGTS rende 3% ao ano (correção pela TR — Taxa Referencial) mais distribuição de resultados. Historicamente, o rendimento do FGTS é inferior à poupança e à inflação. Por isso, muitos trabalhadores optam pelo Saque Aniversário para usar o saldo em outras aplicações financeiras, embora isso signifique perder o direito ao saque total na demissão.",
                },
              },
              {
                "@type": "Question",
                name: "Como saber o saldo do meu FGTS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Para consultar o saldo do FGTS, use o aplicativo FGTS (disponível para Android e iOS), o Internet Banking da Caixa, ou visite uma agência da Caixa Econômica Federal. Você precisará do número do CPF e da senha cadastrada. O extrato mostra todos os depósitos mensais feitos pelos empregadores durante o período trabalhado.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Calculadora de FGTS com Multa 40%",
            url: "https://calculadoratrabalhista.net.br/calculadora-fgts",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description:
              "Calculadora gratuita de FGTS com multa de 40%. Calcule online o valor da multa do FGTS para demissão sem justa causa e comum acordo.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <PiggyBank className="w-7 h-7 text-green-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Calculadora de FGTS com Multa 40%
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule gratuitamente o valor da <strong>multa do FGTS</strong> para
          demissão sem justa causa e rescisão por comum acordo. Informe o saldo
          do seu FGTS e descubra quanto você tem direito a receber.
        </p>
        <p className="text-sm text-gray-500">
          ⚡ Resultado imediato &bull; 🔒 Sem cadastro &bull; 📱 100% mobile
        </p>
      </section>

      {/* Calculadora */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Calculadora de FGTS
          </h2>
        </div>
        <div className="p-5 sm:p-6 space-y-5">
          {/* Saldo do FGTS */}
          <div className="space-y-2">
            <label
              htmlFor="saldoFGTS"
              className="text-sm font-medium text-gray-700 block"
            >
              Saldo do FGTS (R$)
            </label>
            <input
              id="saldoFGTS"
              type="text"
              inputMode="decimal"
              placeholder="10.000,00"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          {/* Motivo da rescisão */}
          <div className="space-y-2">
            <label
              htmlFor="motivo"
              className="text-sm font-medium text-gray-700 block"
            >
              Motivo da Rescisão
            </label>
            <select
              id="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5rem 1.5rem",
              }}
            >
              <option value="sem-justa-causa">Demissão sem justa causa</option>
              <option value="comum-acordo">Rescisão por comum acordo</option>
            </select>
          </div>

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {erro}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCalcular}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl text-base flex items-center justify-center gap-2 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Calcular
            </button>
            <button
              onClick={handleLimpar}
              className="h-12 px-5 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-xl text-base flex items-center justify-center gap-2 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Resultado */}
        {resultado && (
          <div className="mx-5 sm:mx-6 mb-5 sm:mb-6 bg-green-50 border border-green-200 rounded-xl p-5 space-y-3">
            <h3 className="font-semibold text-green-800 text-sm uppercase tracking-wide">
              Resultado do Cálculo
            </h3>

            <div className="flex justify-between items-center py-2 border-b border-green-100">
              <span className="text-sm sm:text-base text-gray-700">
                Saldo do FGTS
              </span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(resultado.saldoFGTS)}
              </span>
            </div>

            {resultado.multa40 > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-green-100">
                <span className="text-sm sm:text-base text-gray-700">
                  Multa 40% (sem justa causa)
                </span>
                <span className="font-semibold text-green-700">
                  {formatCurrency(resultado.multa40)}
                </span>
              </div>
            )}

            {resultado.multa20 > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-green-100">
                <span className="text-sm sm:text-base text-gray-700">
                  Multa 20% (comum acordo)
                </span>
                <span className="font-semibold text-amber-600">
                  {formatCurrency(resultado.multa20)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t-2 border-green-300">
              <span className="font-bold text-gray-900">Total a Receber</span>
              <span className="font-bold text-green-700 text-lg">
                {formatCurrency(resultado.total)}
              </span>
            </div>

            <p className="text-xs text-gray-500 pt-2 border-t border-green-100">
              * Este cálculo considera apenas o saldo informado e o percentual
              de multa correspondente ao motivo selecionado. O valor real pode
                  variar com base em depósitos adicionais (13º, horas extras,
                  etc.) e data de afastamento.
            </p>
          </div>
        )}
      </div>

      {/* Artigo completo */}
      <article className="prose prose-gray max-w-none space-y-6">
        <h2>O que é o FGTS?</h2>

        <p>
          O <strong>Fundo de Garantia do Tempo de Serviço (FGTS)</strong> é um
          direito trabalhista criado em 1966 para proteger o trabalhador
          demitido sem justa causa. Todo empregado contratado sob o regime CLT
          (carteira assinada) possui uma conta vinculada ao FGTS na Caixa
          Econômica Federal.
        </p>

        <p>
          Mensalmente, o empregador deposita o equivalente a{" "}
          <strong>8% do salário bruto</strong> do trabalhador nessa conta. Esse
          valor não é descontado do salário — é uma obrigação adicional do
          empregador. Além do salário mensal, também incidem FGTS sobre 13º
          salário, férias, horas extras, adicional noturno e outras verbas
          salariais.
        </p>

        <p>
          O saldo do FGTS fica disponível para saque em situações específicas
          previstas em lei, como demissão sem justa causa, aposentadoria,
          doenças graves (câncer, HIV), compra da casa própria pelo SFH, ou em
          casos de calamidade pública. O objetivo principal do FGTS é funcionar
          como uma <strong>poupança forçada</strong> que garante uma reserva
          financeira ao trabalhador em momentos de necessidade.
        </p>

        <h2>Como funciona a multa de 40% do FGTS?</h2>

        <p>
          A multa de 40% do FGTS é uma penalidade aplicada ao empregador quando
          este demite um funcionário sem justa causa. Ela não é descontada do
          saldo do FGTS do trabalhador — é um valor <strong>adicional</strong>{" "}
          pago pelo empregador diretamente ao trabalhador.
        </p>

        <p>
          O cálculo é simples: multiplica-se o saldo total da conta do FGTS por
          0,40 (40%). Por exemplo, se o trabalhador tem R$ 12.000,00 de saldo
          no FGTS, a multa será de <strong>R$ 4.800,00</strong>. Esse valor é
          pago junto com as demais verbas rescisórias no momento do acerto.
        </p>

        <p>
          É importante destacar que a multa de 40% incide sobre{" "}
          <strong>todo o saldo</strong> da conta do FGTS, incluindo os
          depósitos mensais, o 13º salário depositado e os rendimentos
          acumulados ao longo do tempo. Quanto maior o tempo de serviço e o
          salário, maior será o saldo e, consequentemente, maior a multa.
        </p>

        <h3>Multa de 20% na rescisão por comum acordo</h3>

        <p>
          Com a Reforma Trabalhista de 2017 (Lei 13.467/2017), foi criada a
          possibilidade de rescisão por comum acordo entre empregado e
          empregador. Nessa modalidade, a multa do FGTS é reduzida pela metade:
          de 40% para <strong>20%</strong>. O trabalhador pode sacar 80% do
          saldo do FGTS, e o empregador paga 20% de multa.
        </p>

        <p>
          A rescisão por comum acordo é uma opção interessante para quem deseja
          sair do emprego mas ainda quer receber parte dos direitos
          rescisórios, diferente do pedido de demissão tradicional onde não há
          multa nem saque do FGTS.
        </p>

        <h2>Diferença entre Saque Rescisão e Saque Aniversário</h2>

        <p>
          Desde 2020, o trabalhador pode optar entre duas modalidades de saque
          do FGTS: o <strong>Saque Rescisão</strong> (tradicional) e o{" "}
          <strong>Saque Aniversário</strong>. Entender a diferença entre eles é
          fundamental para tomar a melhor decisão financeira.
        </p>

        <p>
          No <strong>Saque Rescisão</strong>, ao ser demitido sem justa causa,
          o trabalhador pode sacar <strong>todo o saldo</strong> da conta do
          FGTS, além de receber a multa de 40% paga pelo empregador. Esta é a
          modalidade padrão para quem não fez a opção pelo Saque Aniversário.
        </p>

        <p>
          No <strong>Saque Aniversário</strong>, o trabalhador pode sacar
          anualmente um percentual do saldo do FGTS no mês do seu aniversário.
          O percentual varia de 5% a 50% do saldo, dependendo do valor total,
          mais uma parcela adicional fixa. Porém, ao optar por esta modalidade,
          o trabalhador <strong>perde o direito</strong> de sacar o saldo total
          na demissão sem justa causa — fica apenas com a multa de 40%.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Atenção:</strong> A opção pelo Saque Aniversário é
              <strong> irreversível</strong> para cada conta do FGTS. Depois de
              optar, você precisa esperar 24 meses para voltar ao Saque
              Rescisão. Avalie bem antes de escolher.
            </div>
          </div>
        </div>

        <h2>Como calcular a multa do FGTS passo a passo</h2>

        <p>
          Calcular a multa do FGTS é simples. Siga o passo a passo abaixo:
        </p>

        <ol className="space-y-3">
          <li>
            <strong>Consulte o saldo do seu FGTS</strong> — Acesse o aplicativo
            FGTS da Caixa ou o Internet Banking e verifique o saldo total
            disponível em sua conta.
          </li>
          <li>
            <strong>Identifique o motivo da rescisão</strong> — Demissão sem
            justa causa = multa de 40%. Rescisão por comum acordo = multa de
            20%. Pedido de demissão ou justa causa = sem multa.
          </li>
          <li>
            <strong>Aplique o percentual sobre o saldo</strong> — Multiplique o
            saldo do FGTS por 0,40 (40%) ou 0,20 (20%), conforme o caso.
          </li>
          <li>
            <strong>Some ao saldo do FGTS</strong> — O valor total a receber é
            o saldo do FGTS + a multa calculada. Este é o valor que o
            empregador deve depositar em sua conta.
          </li>
        </ol>

        <p>
          Use nossa{" "}
          <strong>calculadora de FGTS com multa 40%</strong> acima para fazer
          o cálculo automaticamente. Basta informar o saldo e o motivo da
          rescisão.
        </p>

        <h2>Tabela comparativa dos tipos de saque</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold border">
                  Característica
                </th>
                <th className="p-3 text-left font-semibold border">
                  Saque Rescisão
                </th>
                <th className="p-3 text-left font-semibold border">
                  Saque Aniversário
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">
                  Saque na demissão sem justa causa
                </td>
                <td className="p-3 border text-green-700 font-medium">
                  ✅ Saldo total + multa 40%
                </td>
                <td className="p-3 border text-amber-600 font-medium">
                  ⚠️ Só a multa 40% (sem saldo)
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">
                  Saque mensal/anual
                </td>
                <td className="p-3 border text-red-600">❌ Não permite</td>
                <td className="p-3 border text-green-700">
                  ✅ Sim, no mês do aniversário
                </td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">Multa na demissão</td>
                <td className="p-3 border text-green-700">✅ 40%</td>
                <td className="p-3 border text-green-700">✅ 40%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">
                  Saque por doenças graves
                </td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">
                  Saque para compra de imóvel
                </td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">
                  Reversibilidade
                </td>
                <td className="p-3 border text-green-700">✅ Padrão</td>
                <td className="p-3 border text-amber-600">
                  ⚠️ 24 meses para voltar
                </td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">Indicado para</td>
                <td className="p-3 border text-sm">
                  Quem prioriza segurança na demissão
                </td>
                <td className="p-3 border text-sm">
                  Quem quer acessar o saldo regularmente
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Exemplo prático com números</h2>

        <div className="bg-green-50 rounded-xl p-6 space-y-3">
          <p className="font-semibold">Exemplo 1: Demissão sem justa causa</p>
          <ul className="text-sm space-y-1">
            <li>Saldo do FGTS: R$ 15.000,00</li>
            <li>Multa 40%: R$ 15.000 × 0,40 = R$ 6.000,00</li>
            <li>
              <strong>Total a receber: R$ 21.000,00</strong>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 space-y-3">
          <p className="font-semibold">Exemplo 2: Rescisão por comum acordo</p>
          <ul className="text-sm space-y-1">
            <li>Saldo do FGTS: R$ 15.000,00</li>
            <li>Multa 20%: R$ 15.000 × 0,20 = R$ 3.000,00</li>
            <li>Saque permitido: 80% do saldo = R$ 12.000,00</li>
            <li>
              <strong>Total a receber: R$ 15.000,00</strong> (R$ 12.000 de saque
              + R$ 3.000 de multa)
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 space-y-3">
          <p className="font-semibold">Exemplo 3: Pedido de demissão</p>
          <ul className="text-sm space-y-1">
            <li>Saldo do FGTS: R$ 15.000,00</li>
            <li>Multa: R$ 0,00 (não há direito à multa)</li>
            <li>Saque: Não permitido</li>
            <li>
              <strong>Total a receber: R$ 0,00</strong> (o saldo permanece na
              conta para saque futuro)
            </li>
          </ul>
        </div>

        <h2>Perguntas Frequentes sobre FGTS</h2>

        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              O FGTS pode ser penhorado para pagar dívidas?
            </h3>
            <p className="text-sm text-gray-600">
              Em regra, o FGTS é impenhorável. No entanto, o STJ tem decidido
              que é possível a penhora do FGTS para pagamento de pensão
              alimentícia, desde que não comprometa a subsistência do devedor.
              Dívidas comuns não podem ser cobradas via penhora do FGTS.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              O empregador pode atrasar o depósito do FGTS?
            </h3>
            <p className="text-sm text-gray-600">
              Não. O empregador tem até o dia 7 de cada mês para depositar o
              FGTS referente ao mês anterior. O atraso gera multa de 0,5% ao
              mês, além de juros de mora de 1% ao mês e correção monetária. O
              trabalhador pode denunciar o atraso ao Ministério do Trabalho ou
              ao sindicato da categoria.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              Como funciona o FGTS para o trabalhador doméstico?
            </h3>
            <p className="text-sm text-gray-600">
              Desde a Emenda Constitucional 72/2013, o trabalhador doméstico
              tem direito ao FGTS. O empregador doméstico deve depositar 8% do
              salário mensal, mais 3,2% de indenização para demissão sem justa
              causa (total de 11,2%), através do eSocial Doméstico. Na prática,
              o depósito mensal é de 11,2% sobre o salário.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              O que acontece com o FGTS se a empresa falir?
            </h3>
            <p className="text-sm text-gray-600">
              Se a empresa não depositou o FGTS e faliu, o trabalhador pode
              acionar a Justiça do Trabalho para reaver os valores. Em caso de
              falência, os créditos trabalhistas (incluindo FGTS não depositado)
              têm prioridade no pagamento. O Fundo de Garantia também possui um
              fundo garantidor (FGTS — Fundo de Garantia) que pode cobrir
              valores em algumas situações.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso importante:</strong> Os valores calculados são
              aproximados. O cálculo exato da multa do FGTS depende do saldo
              real da conta, incluindo depósitos de 13º salário, férias, horas
              extras e outros adicionais. Recomendamos consultar o extrato
              oficial do FGTS no aplicativo da Caixa e um contador ou advogado
              trabalhista para o cálculo oficial das verbas rescisórias.
            </div>
          </div>
        </div>
      </article>

      {/* Links internos para outras calculadoras */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">
          📌 Continue calculando
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculadora-rescisao"
            className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <span className="font-medium">Calculadora de Rescisão</span>
              <p className="text-xs text-gray-500">
                Calcule todas as verbas rescisórias
              </p>
            </div>
          </Link>
          <Link
            href="/calculadora-ferias"
            className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <span className="font-medium">Calculadora de Férias</span>
              <p className="text-xs text-gray-500">
                Férias vencidas e proporcionais
              </p>
            </div>
          </Link>
        </div>
      </section>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de FGTS - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
