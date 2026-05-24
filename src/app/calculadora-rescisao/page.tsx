import type { Metadata } from "next";
import RescisaoEngine from "@/components/rescisao-client";
import { Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão CLT Grátis | CalcularRescisao",
  description:
    "Calcule online e grátis o valor exato da sua rescisão de contrato de trabalho CLT. Simule saldo de salário, férias, 13º, FGTS e multa de 40%. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Rescisão CLT Grátis",
    description:
      "Calcule o valor exato da sua rescisão trabalhista online. Resultado imediato, sem cadastro.",
  },
};

export default function RescisaoPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-3">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Calculadora de Rescisão CLT
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calcule o valor exato da sua rescisão de contrato de trabalho (acerto)
          — com ou sem FGTS e multa de 40%. Resultado imediato,{" "}
          <strong>sem cadastro e sem pedir WhatsApp</strong>.
        </p>
      </section>

      {/* Engine */}
      <RescisaoEngine />

      {/* Explicação */}
      <article className="prose prose-gray max-w-none space-y-4">
        <h2>Como é calculada a rescisão trabalhista?</h2>
        <p>
          A rescisão de contrato de trabalho é o acerto de contas entre
          empregado e empregador no momento do desligamento. Com base na
          Consolidação das Leis do Trabalho (CLT), o trabalhador tem direito a
          receber:
        </p>

        <h3>Direitos em caso de demissão sem justa causa</h3>
        <ul>
          <li>
            <strong>Saldo de salário</strong> — dias trabalhados no mês da
            demissão
          </li>
          <li>
            <strong>Aviso prévio</strong> — 30 dias + 3 dias por ano trabalhado
            (máx. 90 dias), podendo ser indenizado ou trabalhado
          </li>
          <li>
            <strong>Férias vencidas</strong> — se houver período de férias não
            gozado, + 1/3 constitucional
          </li>
          <li>
            <strong>Férias proporcionais</strong> — meses trabalhados no período
            aquisitivo atual, + 1/3
          </li>
          <li>
            <strong>13º salário proporcional</strong> — meses trabalhados no ano
          </li>
          <li>
            <strong>FGTS</strong> — depósito de 8% sobre verbas salariais +
            multa de 40% sobre o saldo total do FGTS
          </li>
          <li>
            <strong>Seguro-desemprego</strong> — direito a solicitar nas
            condições da lei
          </li>
        </ul>

        <h3>E em caso de pedido de demissão?</h3>
        <p>
          O empregado que pede demissão perde o direito ao aviso prévio
          indenizado, à multa de 40% do FGTS e ao seguro-desemprego. Mantém
          direito a saldo de salário, férias vencidas e proporcionais, e 13º
          proporcional.
        </p>

        <h3>Demissão por justa causa</h3>
        <p>
          Na justa causa, o empregado perde praticamente todos os direitos:
          aviso prévio, multa do FGTS, férias proporcionais e 13º proporcional.
          Recebe apenas o saldo de salário e férias vencidas (se houver).
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>⚠️ Aviso importante:</strong> Os valores calculados são
          aproximados. O cálculo exato da rescisão depende de verbas
          específicas (horas extras, comissões, adicionais, descontos
          judiciais) que podem variar caso a caso. Consulte um contador ou
          advogado trabalhista para o cálculo oficial.
        </div>

        <h3>Tabela INSS 2026</h3>
        <ul>
          <li>Até R$ 1.518,00 — 7,5%</li>
          <li>De R$ 1.518,01 até R$ 2.793,88 — 9%</li>
          <li>De R$ 2.793,89 até R$ 4.190,83 — 12%</li>
          <li>De R$ 4.190,84 até R$ 8.157,41 — 14%</li>
        </ul>

        <h3>Tabela IRRF 2026</h3>
        <ul>
          <li>Até R$ 2.259,20 — Isento</li>
          <li>De R$ 2.259,21 até R$ 2.826,65 — 7,5%</li>
          <li>De R$ 2.826,66 até R$ 3.751,05 — 15%</li>
          <li>De R$ 3.751,06 até R$ 4.664,68 — 22,5%</li>
          <li>Acima de R$ 4.664,68 — 27,5%</li>
        </ul>
      </article>
    </div>
  );
}
