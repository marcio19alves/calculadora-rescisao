"use client";

import { useState } from "react";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/breadcrumbs";

const FAIXAS = [
  { limite: 1518.0, aliquota: 7.5 },
  { limite: 2793.88, aliquota: 9 },
  { limite: 4190.83, aliquota: 12 },
  { limite: 8157.41, aliquota: 14 },
];

function calcular(salario: number) {
  if (salario <= 0) return { faixas: [], total: 0, aliquotaEfetiva: 0 };
  let restante = salario;
  let total = 0;
  const faixas = [];

  for (const f of FAIXAS) {
    if (restante <= 0) break;
    const base = Math.min(restante, f.limite);
    const valor = base * (f.aliquota / 100);
    total += valor;
    faixas.push({
      ate: f.limite,
      aliquota: f.aliquota,
      base,
      valor,
    });
    restante -= f.limite;
  }

  return {
    faixas,
    total: Math.min(total, 8157.41 * 0.14),
    aliquotaEfetiva: (total / salario) * 100,
  };
}

export default function INSSPage() {
  const [salario, setSalario] = useState("");
  const [resultado, setResultado] = useState<{
    faixas: { ate: number; aliquota: number; base: number; valor: number }[];
    total: number;
    aliquotaEfetiva: number;
  } | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de INSS",
    url: "https://calculadoratrabalhista.net.br/calculadora-inss",
    description:
      "Calcule o desconto de INSS sobre o salário. Tabela progressiva 2025 com alíquotas de 7,5% a 14%.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como calcular o desconto de INSS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O INSS é calculado de forma progressiva: aplicam-se alíquotas diferentes sobre cada faixa salarial. Em 2025, as faixas são: 7,5% até R$ 1.518,00, 9% de R$ 1.518,01 a R$ 2.793,88, 12% de R$ 2.793,89 a R$ 4.190,83 e 14% de R$ 4.190,84 até o teto de R$ 8.157,41.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a tabela do INSS 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tabela INSS 2025: 1ª faixa: até R$ 1.518,00 (7,5%), 2ª faixa: de R$ 1.518,01 a R$ 2.793,88 (9%), 3ª faixa: de R$ 2.793,89 a R$ 4.190,83 (12%), 4ª faixa: de R$ 4.190,84 a R$ 8.157,41 (14%). O teto máximo de contribuição é de R$ 1.142,04.",
        },
      },
      {
        "@type": "Question",
        name: "O que é a alíquota efetiva do INSS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A alíquota efetiva é a porcentagem real de desconto sobre o salário total, considerando o cálculo progressivo. Como cada faixa tem uma alíquota diferente, a alíquota efetiva é sempre menor que a alíquota da faixa mais alta. Exemplo: salário de R$ 5.000 tem alíquota efetiva de aproximadamente 11,7%.",
        },
      },
      {
        "@type": "Question",
        name: "Quem paga o INSS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O INSS é pago por todos os trabalhadores com carteira assinada (CLT), empregados domésticos, trabalhadores avulsos e contribuintes individuais. O valor é descontado diretamente na folha de pagamento pelo empregador, que também contribui com uma parte patronal.",
        },
      },
      {
        "@type": "Question",
        name: "Qual o teto do INSS em 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O teto do INSS em 2025 é de R$ 8.157,41. Isso significa que salários acima desse valor contribuem como se fossem R$ 8.157,41. O desconto máximo de INSS é de R$ 1.142,04 (14% sobre R$ 8.157,41). Esse teto também define o valor máximo dos benefícios previdenciários.",
        },
      },
    ],
  };

  return (
    <>
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'INSS'}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de INSS
        </h1>
        <p className="text-gray-600 mb-8">
          Calcule o valor exato do desconto de INSS sobre o seu salário. Tabela
          progressiva conforme Portaria Interministerial MPS/MF 2025.
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div>
            <label
              htmlFor="salario"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salário Bruto (R$)
            </label>
            <input
              id="salario"
              type="text"
              inputMode="decimal"
              value={salario}
              onChange={(e) => {
                setSalario(e.target.value);
                const v = parseFloat(e.target.value.replace(",", "."));
                if (!isNaN(v) && v > 0) setResultado(calcular(v));
                else setResultado(null);
              }}
              placeholder="Ex: 3500,00"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {resultado && (
            <div className="mt-4 space-y-4">
              <div className="bg-orange-50 rounded-lg p-5 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Desconto de INSS
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  R${" "}
                  {resultado.total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Alíquota efetiva: {resultado.aliquotaEfetiva.toFixed(2)}%
                </p>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600 font-medium">
                        Faixa Salarial
                      </th>
                      <th className="px-4 py-2 text-center text-gray-600 font-medium">
                        Alíquota
                      </th>
                      <th className="px-4 py-2 text-right text-gray-600 font-medium">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {resultado.faixas.map((f, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">
                          Até R$ {f.ate.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-4 py-2 text-center">{f.aliquota}%</td>
                        <td className="px-4 py-2 text-right font-medium">
                          R${" "}
                          {f.valor.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <article className="mt-10 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Tabela INSS 2025
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Até R$ 1.518,00 — 7,5%</li>
            <li>De R$ 1.518,01 a R$ 2.793,88 — 9%</li>
            <li>De R$ 2.793,89 a R$ 4.190,83 — 12%</li>
            <li>De R$ 4.190,84 a R$ 8.157,41 — 14%</li>
            <li>Acima de R$ 8.157,41 — teto (valor máximo)</li>
          </ul>
        </article>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de INSS - Calculadora Trabalhista" />
      </div>
    </>
  );
}
