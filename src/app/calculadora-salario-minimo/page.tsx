import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

const SALARIO_MINIMO_ATUAL = 1518;
const ANO_ATUAL = 2025;
const JORNADA_MENSAL = 220;
const DIAS_UTEIS_MES = 21;

const VALOR_POR_DIA = (SALARIO_MINIMO_ATUAL / 30).toFixed(2);
const VALOR_POR_HORA = (SALARIO_MINIMO_ATUAL / JORNADA_MENSAL).toFixed(2);
const VALOR_POR_DIA_UTIL = (SALARIO_MINIMO_ATUAL / DIAS_UTEIS_MES).toFixed(2);

const TABELA_HISTORICA = [
  { ano: 2020, valor: 1045, decreto: "Decreto 10.464/2020" },
  { ano: 2021, valor: 1100, decreto: "Decreto 10.699/2021" },
  { ano: 2022, valor: 1212, decreto: "Decreto 10.948/2022" },
  { ano: 2023, valor: 1320, decreto: "MP 1.143/2022" },
  { ano: 2024, valor: 1412, decreto: "Decreto 11.864/2023" },
  { ano: 2025, valor: 1518, decreto: "Decreto 12.275/2024" },
];

const PERGUNTAS_FAQ = [
  {
    question: "Qual é o valor do salário mínimo em 2025?",
    answer:
      "O salário mínimo em 2025 é de R$ 1.518,00 (mil quinhentos e dezoito reais), conforme o Decreto 12.275/2024. O valor representa um aumento de 7,5% em relação aos R$ 1.412,00 de 2024.",
  },
  {
    question: "Quanto é o salário mínimo por dia e por hora?",
    answer:
      "Com base na jornada de 44 horas semanais (220 horas mensais), o salário mínimo de R$ 1.518,00 equivale a aproximadamente R$ 72,29 por dia (considerando 30 dias) e R$ 6,90 por hora trabalhada.",
  },
  {
    question: "O salário mínimo cobre as necessidades básicas do trabalhador?",
    answer:
      "Segundo o DIEESE, o salário mínimo necessário para cobrir as necessidades básicas de uma família de 4 pessoas em 2025 seria de aproximadamente R$ 6.500,00 a R$ 7.000,00, valor cerca de 4,5 vezes maior que o salário mínimo oficial. O salário mínimo atual cobre cerca de 22% do necessário.",
  },
  {
    question: "O que define o valor do salário mínimo?",
    answer:
      "O salário mínimo é reajustado anualmente com base em dois fatores principais: (1) a inflação do ano anterior medida pelo INPC (Índice Nacional de Preços ao Consumidor) e (2) o crescimento real do PIB de dois anos anteriores, quando houver. Essa regra foi estabelecida pela política de valorização do salário mínimo.",
  },
  {
    question: "Qual a diferença entre salário mínimo, piso salarial e salário base?",
    answer:
      "O salário mínimo é o menor valor permitido por lei nacional. O piso salarial é o mínimo estabelecido por convenção coletiva para uma categoria específica (ex: R$ 2.500 para comerciários). O salário base é o valor contratual do trabalhador, que pode ser maior que o mínimo ou o piso. O piso salarial pode ser maior que o salário mínimo, mas nunca menor.",
  },
  {
    question: "O salário mínimo pode ser usado para pagar jornada reduzida?",
    answer:
      "Sim. Para jornadas inferiores a 44 horas semanais, o salário mínimo é pago proporcionalmente às horas trabalhadas. Exemplo: para uma jornada de 6 horas diárias (30h/semana), o salário mínimo proporcional seria de R$ 1.035,00 (30/44 × R$ 1.518,00). O valor da hora mínima é de R$ 6,90.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PERGUNTAS_FAQ.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function SalarioMinimoPage() {
  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Salário Mínimo'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Calculadora de Salário Mínimo 2025
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Consulte o valor atual do salário mínimo, calcule valores por hora,
            dia e mês. Histórico completo desde 2020 e respostas para as
            principais dúvidas.
          </p>
        </header>

        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📊 Salário Mínimo Atual
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Valor Mensal</p>
              <p className="text-2xl font-bold text-purple-700">
                R$ {SALARIO_MINIMO_ATUAL.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Valor por Dia</p>
              <p className="text-2xl font-bold text-blue-700">
                R$ {VALOR_POR_DIA}
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Valor por Hora</p>
              <p className="text-2xl font-bold text-emerald-700">
                R$ {VALOR_POR_HORA}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>📅 Vigência:</strong> Janeiro de 2025 — Janeiro de 2026 |
            Decreto 12.275/2024 | Reajuste de 7,5% sobre o valor de 2024 (R$
            1.412,00)
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            📈 Histórico do Salário Mínimo
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-semibold">Ano</th>
                  <th className="pb-2 font-semibold">Valor</th>
                  <th className="pb-2 font-semibold">Decreto / MP</th>
                </tr>
              </thead>
              <tbody>
                {TABELA_HISTORICA.map((item) => (
                  <tr key={item.ano} className="border-b last:border-0">
                    <td className="py-2">{item.ano}</td>
                    <td className="py-2 font-medium">
                      R$ {item.valor.toLocaleString("pt-BR")}
                    </td>
                    <td className="py-2 text-gray-500">{item.decreto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            ❓ Perguntas Frequentes sobre Salário Mínimo
          </h2>
          <div className="space-y-4">
            {PERGUNTAS_FAQ.map((faq, i) => (
              <details key={i} className="group">
                <summary className="cursor-pointer font-medium text-gray-900 hover:text-purple-700 transition-colors list-none flex items-center gap-2">
                  <span className="text-purple-500 group-open:rotate-90 transition-transform">
                    ▶
                  </span>
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600 pl-6 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <article className="prose prose-gray max-w-none space-y-6">
          <h2>Entendendo o Salário Mínimo no Brasil</h2>

          <h3>O que é o salário mínimo?</h3>
          <p>
            O salário mínimo é o menor valor que um empregador pode pagar a um
            trabalhador no Brasil. Instituído pela Lei nº 185/1936 e
            regulamentado pelo artigo 7º, inciso IV, da Constituição Federal,
            ele deve ser capaz de atender às necessidades básicas do trabalhador
            e sua família: moradia, alimentação, educação, saúde, lazer,
            vestuário, higiene, transporte e previdência social.
          </p>

          <h3>Como é calculado o reajuste do salário mínimo?</h3>
          <p>
            O reajuste anual do salário mínimo considera dois fatores: a
            inflação medida pelo INPC (Índice Nacional de Preços ao Consumidor)
            do ano anterior e a variação do PIB (Produto Interno Bruto) de dois
            anos antes. Se o PIB não cresceu, o reajuste é apenas a reposição da
            inflação. A política de valorização do salário mínimo foi
            estabelecida pela Lei 13.152/2015.
          </p>

          <h3>Salário mínimo vs. salário mínimo necessário (DIEESE)</h3>
          <p>
            O DIEESE calcula mensalmente o salário mínimo necessário, que
            considera o custo da cesta básica e o percentual do salário mínimo
            comprometido com alimentação conforme a Constituição. Em 2025,
            enquanto o salário mínimo oficial é de R$ 1.518,00, o necessário
            seria de aproximadamente R$ 6.500 a R$ 7.000 — cerca de 4,5 vezes
            maior.
          </p>

          <h3>Direitos trabalhistas vinculados ao salário mínimo</h3>
          <ul>
            <li>Piso de remuneração para qualquer trabalhador formal</li>
            <li>Base para cálculo do 13º salário proporcional</li>
            <li>Referência para o seguro-desemprego</li>
            <li>Base para benefícios do INSS (aposentadoria, pensão, auxílio)</li>
            <li>Referência para o abono salarial do PIS/PASEP</li>
            <li>
              Parâmetro para ações judiciais trabalhistas (danos morais, multas)
            </li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
            <strong>⚠️ Importante:</strong> Valores com base no salário mínimo
            nacional. Estados como SP, RJ, RS, PR, SC, e outros podem ter pisos
            regionais diferentes por lei estadual ou convenção coletiva. Verifique
            o piso da sua categoria no sindicato correspondente.
          </div>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Salário Mínimo - Calculadora Trabalhista" />
      </div>
    </>
  );
}
