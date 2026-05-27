import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Busca",
  description:
    "Busque calculadoras trabalhistas, financeiras e mais no Calculadora Trabalhista.",
  robots: { index: false, follow: true },
};

const allCalculadoras = [
  { nome: "Rescisão CLT", url: "/calculadora-rescisao", categoria: "Trabalhista", desc: "Calcule o valor exato da sua rescisão trabalhista" },
  { nome: "FGTS", url: "/calculadora-fgts", categoria: "Trabalhista", desc: "Calcule a multa de 40% do FGTS" },
  { nome: "Férias", url: "/calculadora-ferias", categoria: "Trabalhista", desc: "Calcule suas férias CLT com 1/3 constitucional" },
  { nome: "Horas Extras", url: "/calculadora-horas-extras", categoria: "Trabalhista", desc: "Calcule horas extras 50% e 100%" },
  { nome: "Adicional Noturno", url: "/calculadora-adicional-noturno", categoria: "Trabalhista", desc: "Calcule adicional noturno de 20%" },
  { nome: "Salário Líquido", url: "/calculadora-salario-liquido", categoria: "Trabalhista", desc: "Calcule seu salário líquido CLT" },
  { nome: "Seguro Desemprego", url: "/calculadora-seguro-desemprego", categoria: "Trabalhista", desc: "Calcule as parcelas do seguro desemprego" },
  { nome: "13º Salário", url: "/calculadora-13o-salario", categoria: "Trabalhista", desc: "Calcule o 13º salário proporcional" },
  { nome: "INSS", url: "/calculadora-inss", categoria: "Trabalhista", desc: "Calcule o desconto de INSS" },
  { nome: "IRRF", url: "/calculadora-irrf", categoria: "Trabalhista", desc: "Calcule o Imposto de Renda Retido na Fonte" },
  { nome: "Salário Mínimo", url: "/calculadora-salario-minimo", categoria: "Trabalhista", desc: "Valor do salário mínimo 2025" },
  { nome: "Empregado Doméstico", url: "/calculadora-empregado-domestico", categoria: "Trabalhista", desc: "Simule encargos do empregado doméstico" },
  { nome: "Escala de Trabalho", url: "/calculadora-escala-trabalho", categoria: "Trabalhista", desc: "Simule escalas de trabalho" },
  { nome: "Juros Compostos", url: "/calculadora-juros", categoria: "Financeiro", desc: "Simule investimentos com juros compostos" },
  { nome: "Juros Simples", url: "/calculadora-juros-simples", categoria: "Financeiro", desc: "Calcule juros simples" },
  { nome: "Porcentagem", url: "/calculadora-porcentagem", categoria: "Financeiro", desc: "Calcule porcentagens" },
  { nome: "Reajuste Aluguel", url: "/calculadora-reajuste-aluguel", categoria: "Financeiro", desc: "Calcule reajuste de aluguel" },
  { nome: "Financiamento Veículos", url: "/calculadora-financiamento-veiculos", categoria: "Financeiro", desc: "Simule financiamento de veículos" },
  { nome: "Empréstimo Pessoal", url: "/calculadora-emprestimo-pessoal", categoria: "Financeiro", desc: "Simule empréstimo pessoal" },
  { nome: "IMC", url: "/calculadora-imc", categoria: "Saúde", desc: "Calcule seu IMC" },
  { nome: "Gestacional", url: "/calculadora-gestacional", categoria: "Saúde", desc: "Calculadora gestacional" },
  { nome: "Dias Entre Datas", url: "/calculadora-dias-entre-datas", categoria: "Calendário", desc: "Calcule a diferença entre datas" },
  { nome: "Churrasco", url: "/calculadora-churrasco", categoria: "Alimentação", desc: "Calcule a quantidade ideal para churrasco" },
];

export default function BuscaPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.toLowerCase() || "";

  const results = query
    ? allCalculadoras.filter(
        (c) =>
          c.nome.toLowerCase().includes(query) ||
          c.categoria.toLowerCase().includes(query) ||
          c.desc.toLowerCase().includes(query)
      )
    : [];

  const grouped = results.reduce<Record<string, typeof allCalculadoras>>(
    (acc, r) => {
      if (!acc[r.categoria]) acc[r.categoria] = [];
      acc[r.categoria].push(r);
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {query ? `Resultados para "${searchParams.q}"` : "Buscar Calculadora"}
      </h1>

      {!query && (
        <p className="text-gray-500">
          Digite o nome da calculadora ou palavra-chave na barra de busca.
        </p>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">
            Nenhuma calculadora encontrada para "{searchParams.q}"
          </p>
          <p className="text-gray-400 text-sm">
            Tente outros termos como: rescisão, FGTS, férias, juros, IMC
          </p>
        </div>
      )}

      {query && results.length > 0 && (
        <div className="space-y-8">
          {Object.entries(grouped).map(([categoria, calcList]) => (
            <div key={categoria}>
              <h2 className="text-lg font-semibold text-blue-700 mb-3">
                {categoria}
              </h2>
              <div className="grid gap-3">
                {calcList.map((calc) => (
                  <Link
                    key={calc.url}
                    href={calc.url}
                    className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-medium text-gray-900">{calc.nome}</h3>
                    <p className="text-sm text-gray-500 mt-1">{calc.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-8">
        {results.length} resultado(s) encontrado(s)
      </p>
    </div>
  );
}
