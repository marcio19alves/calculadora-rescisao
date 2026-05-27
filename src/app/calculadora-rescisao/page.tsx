import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import RescisaoEngine from "@/components/rescisao-client";
import { Calculator, FileText, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão CLT Grátis Online 2025/2026",
  description:
    "Calcule online e grátis o valor exato da sua rescisão de contrato de trabalho CLT. Simulador completo: saldo de salário, férias vencidas e proporcionais com 1/3, 13º proporcional, aviso prévio, FGTS com multa de 40%, INSS e IRRF. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Rescisão CLT Grátis Online",
    description:
      "Calcule o valor exato da sua rescisão trabalhista. Simulador completo com todas as verbas: saldo de salário, férias, 13º, FGTS e multa de 40%. Resultado imediato.",
  },
  keywords: [
    "calculadora de rescisão",
    "calcular rescisão trabalhista",
    "simulador rescisão CLT",
    "cálculo de verbas rescisórias",
    "rescisão de contrato de trabalho",
    "como calcular rescisão",
    "calcular acerto trabalhista",
    "calcular férias proporcionais rescisão",
    "multa FGTS 40% rescisão",
    "cálculo trabalhista online",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como calcular rescisão CLT passo a passo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para calcular a rescisão CLT, siga os passos: 1) Calcule o saldo de salário (dias trabalhados no mês da demissão). 2) Calcule o aviso prévio (30 dias + 3 dias por ano trabalhado, máximo 90 dias). 3) Calcule as férias vencidas (se houver) + 1/3 constitucional. 4) Calcule as férias proporcionais (meses trabalhados no período aquisitivo atual). 5) Calcule o 13º salário proporcional. 6) Para demissão sem justa causa, inclua a multa de 40% sobre o FGTS. Use nossa calculadora acima para obter o resultado exato automaticamente.",
      },
    },
    {
      "@type": "Question",
      name: "O que entra no cálculo da rescisão?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entram no cálculo da rescisão: saldo de salário (dias trabalhados), aviso prévio (indenizado ou trabalhado), férias vencidas (se houver) com 1/3 constitucional, férias proporcionais com 1/3, 13º salário proporcional, FGTS (depósitos mensais de 8%) e multa de 40% sobre o saldo do FGTS (apenas em demissão sem justa causa). Descontos de INSS e IRRF são aplicados conforme as tabelas vigentes.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre aviso prévio indenizado e trabalhado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No aviso prévio trabalhado, o empregado continua trabalhando durante o período de aviso (30 a 90 dias) e recebe normalmente. No aviso prévio indenizado, o empregador dispensa o empregado de trabalhar durante o aviso, mas paga o valor integral como se tivesse trabalhado. Na prática, o aviso prévio indenizado é mais comum, pois evita conflitos durante o período de transição.",
      },
    },
    {
      "@type": "Question",
      name: "Como calcular a multa de 40% do FGTS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A multa de 40% do FGTS é calculada sobre o saldo total da conta do FGTS do trabalhador. Para calcular, multiplique o saldo do FGTS por 0,40 (40%). Exemplo: se o saldo do FGTS for R$ 10.000, a multa será de R$ 4.000. Esta multa é devida apenas nas demissões sem justa causa e nas rescisões por comum acordo (parcialmente).",
      },
    },
    {
      "@type": "Question",
      name: "O que é saldo de salário na rescisão?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saldo de salário é o valor correspondente aos dias trabalhados pelo empregado no mês da demissão. Por exemplo, se o empregado trabalhou 15 dias no mês e seu salário é R$ 3.000, o saldo de salário será R$ 1.500 (R$ 100 por dia × 15 dias). O cálculo considera o salário base dividido por 30 dias, multiplicado pelos dias efetivamente trabalhados.",
      },
    },
    {
      "@type": "Question",
      name: "Quem tem direito ao aviso prévio proporcional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O aviso prévio proporcional é direito de todos os empregados com mais de 1 ano de trabalho, conforme a Lei 12.506/2011. A regra é: 30 dias de aviso prévio + 3 dias para cada ano completo de serviço prestado, limitado a 60 dias adicionais (total máximo de 90 dias). Portanto, um empregado com 5 anos de casa tem direito a 30 + 15 = 45 dias de aviso prévio.",
      },
    },
    {
      "@type": "Question",
      name: "Férias vencidas e proporcionais: qual a diferença?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Férias vencidas são aquelas cujo período aquisitivo já foi completado há mais de 12 meses e o empregador ainda não concedeu as férias. Férias proporcionais são calculadas com base nos meses trabalhados no período aquisitivo atual (incompleto). Ambas têm direito ao adicional de 1/3 constitucional. Na rescisão, o empregador deve pagar ambos os tipos.",
      },
    },
    {
      "@type": "Question",
      name: "Como calcular 13º proporcional na rescisão?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O 13º salário proporcional é calculado dividindo o salário por 12 e multiplicando pelos meses trabalhados no ano da demissão. Cada fração igual ou superior a 15 dias conta como 1 mês. Exemplo: salário de R$ 3.600 ÷ 12 = R$ 300 por mês. Se trabalhou 8 meses no ano, o 13º proporcional será R$ 300 × 8 = R$ 2.400.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo a empresa tem para pagar a rescisão?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A empresa tem 10 dias corridos contados a partir do término do contrato para pagar as verbas rescisórias. Se o aviso prévio foi indenizado, o prazo é de 10 dias da data da comunicação da demissão. Se o pagamento for feito após o prazo, a empresa está sujeita a multa equivalente a um salário do empregado, conforme artigo 477 da CLT.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como calcular a rescisão trabalhista CLT em 6 passos",
  description: "Guia passo a passo para calcular a rescisão de contrato de trabalho CLT com todas as verbas rescisórias: saldo de salário, aviso prévio, férias, 13º, FGTS e multa de 40%.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Calcule o saldo de salário",
      text: "Divida o salário por 30 e multiplique pelos dias trabalhados no mês da demissão. Este é o saldo de salário a receber.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Calcule o aviso prévio",
      text: "Considere 30 dias de aviso prévio + 3 dias para cada ano completo de trabalho, limitado a 90 dias no total. O aviso pode ser indenizado ou trabalhado.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Calcule as férias vencidas e proporcionais",
      text: "Férias vencidas: salário + 1/3 constitucional. Férias proporcionais: (salário / 12 × meses trabalhados no período aquisitivo) + 1/3 constitucional.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Calcule o 13º salário proporcional",
      text: "Divida o salário por 12 e multiplique pelos meses trabalhados no ano da demissão. Cada fração igual ou superior a 15 dias conta como 1 mês.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Calcule o FGTS e a multa de 40%",
      text: "Calcule 8% do salário mensal para depósitos de FGTS. Na demissão sem justa causa, adicione multa de 40% sobre o saldo total do FGTS. Na rescisão por comum acordo, a multa é de 20%.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Aplique os descontos de INSS e IRRF",
      text: "Sobre as verbas rescisórias, aplique os descontos de INSS (tabela progressiva) e IRRF (tabela progressiva com deduções). O 1/3 de férias não sofre desconto de INSS.",
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Calculadora de Rescisão CLT",
  url: "https://calculadoratrabalhista.net.br/calculadora-rescisao",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Calculadora gratuita de rescisão trabalhista CLT. Calcule saldo de salário, férias, 13º, FGTS e multa de 40% online.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
};

export default function RescisaoPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{label:'Início',href:'/'},{label:'Rescisão CLT'}]} />
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <FileText className="w-7 h-7 text-blue-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Calculadora de Rescisão CLT
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule o valor exato da sua rescisão de contrato de trabalho
          gratuitamente. Nossa calculadora considera{" "}
          <strong>todas as verbas rescisórias</strong>: saldo de salário, aviso
          prévio, férias vencidas e proporcionais com 1/3 constitucional, 13º
          salário proporcional, FGTS com multa de 40%, INSS e IRRF.
        </p>
        <p className="text-sm text-gray-500">
          ⚡ Resultado imediato &bull; 🔒 Sem cadastro &bull; 📱 100% mobile
        </p>
      </section>

      {/* Calculadora */}
      <RescisaoEngine />

      {/* Artigo completo */}
      <article className="prose prose-gray max-w-none space-y-6">
        <h2>Como calcular a rescisão trabalhista CLT?</h2>

        <p>
          Sair de um emprego — seja por demissão ou pedido de demissão — é um
          momento que gera muitas dúvidas. A principal delas é:{" "}
          <strong>
            quanto vou receber de rescisão? Quais são meus direitos?
          </strong>
        </p>

        <p>
          A rescisão de contrato de trabalho é o acerto de contas entre
          empregado e empregador no momento do desligamento. Com base na
          Consolidação das Leis do Trabalho (CLT), o trabalhador tem direito a
          receber um conjunto de verbas que variam conforme o tipo de demissão.
          Abaixo, explicamos cada uma delas em detalhes.
        </p>

        <h3>1. Saldo de Salário</h3>
        <p>
          Corresponde aos dias trabalhados no mês da demissão. O cálculo é
          simples: divida o salário por 30 e multiplique pelos dias
          trabalhados. Por exemplo, um salário de R$ 3.600 com 20 dias
          trabalhados resulta em R$ 2.400 de saldo de salário.
        </p>

        <h3>2. Aviso Prévio</h3>
        <p>
          O aviso prévio é de 30 dias para empregados com até 1 ano de serviço.
          Pela Lei 12.506/2011, acrescentam-se 3 dias para cada ano completo de
          trabalho, limitado a 90 dias no total. O aviso prévio pode ser:
        </p>
        <ul>
          <li>
            <strong>Indenizado</strong>: o empregador dispensa o trabalho
            durante o período e paga o valor integral.
          </li>
          <li>
            <strong>Trabalhado</strong>: o empregado continua trabalhando
            durante o aviso, com redução de 2 horas diárias ou 7 dias corridos
            no final.
          </li>
          <li>
            <strong>Dispensado</strong>: dispensado do cumprimento do aviso
            (geralmente em pedidos de demissão).
          </li>
        </ul>

        <h3>3. Férias Vencidas e Proporcionais</h3>
        <p>
          <strong>Férias vencidas</strong>: são aquelas cujo período aquisitivo
          foi completado há mais de 12 meses e não foram gozadas. O valor
          corresponde ao salário + 1/3 constitucional.
        </p>
        <p>
          <strong>Férias proporcionais</strong>: calculadas com base nos meses
          trabalhados no período aquisitivo atual. Cada fração igual ou superior
          a 15 dias conta como 1 mês. Também incidem 1/3 constitucional.
        </p>

        <h3>4. 13º Salário Proporcional</h3>
        <p>
          Corresponde aos meses trabalhados no ano da demissão. Divide-se o
          salário por 12 e multiplica-se pelos meses trabalhados. Exemplo:
          salário de R$ 4.200 ÷ 12 = R$ 350/mês. Se trabalhou 7 meses, recebe
          R$ 2.450 de 13º proporcional.
        </p>

        <h3>5. FGTS e Multa de 40%</h3>
        <p>
          Durante o contrato, o empregador deposita 8% do salário em conta
          vinculada ao FGTS. Na demissão sem justa causa, o empregado tem
          direito a sacar o saldo e receber a{" "}
          <strong>multa de 40% sobre todo o saldo do FGTS</strong>. Na rescisão
          por comum acordo, a multa é de 20%.
        </p>

        <h3>6. Descontos: INSS e IRRF</h3>
        <p>
          Sobre as verbas rescisórias incidem os descontos de INSS (conforme
          tabela progressiva) e IRRF (tabela progressiva). As férias (vencidas
          e proporcionais) <strong>não sofrem desconto de INSS</strong> sobre
          o 1/3 constitucional. O IRRF tem dedução por dependente e desconto
          simplificado mensal.
        </p>

        <h2>Tipos de Demissão e Direitos</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold border">Verba</th>
                <th className="p-3 text-left font-semibold border">Sem Justa Causa</th>
                <th className="p-3 text-left font-semibold border">Pedido de Demissão</th>
                <th className="p-3 text-left font-semibold border">Justa Causa</th>
                <th className="p-3 text-left font-semibold border">Comum Acordo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-medium">Saldo de Salário</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">Aviso Prévio</td>
                <td className="p-3 border text-green-700">✅ Integral</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-green-700">✅ Integral</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">13º Proporcional</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-green-700">✅ Sim (metade)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">Férias Proporcionais</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-green-700">✅ Sim (metade)</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium">Multa FGTS 40%</td>
                <td className="p-3 border text-green-700">✅ 40%</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-green-700">✅ 20%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border font-medium">Seguro-Desemprego</td>
                <td className="p-3 border text-green-700">✅ Sim</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
                <td className="p-3 border text-red-600">❌ Não tem</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Exemplo Prático de Cálculo de Rescisão</h2>

        <div className="bg-blue-50 rounded-xl p-6 space-y-3">
          <p className="font-semibold">Dados do exemplo:</p>
          <ul className="text-sm space-y-1">
            <li>Salário: R$ 3.600,00</li>
            <li>Data de admissão: 01/01/2020</li>
            <li>Data de demissão: 15/03/2025</li>
            <li>Motivo: Demissão sem justa causa</li>
            <li>Aviso prévio: Indenizado (30 dias)</li>
            <li>Férias vencidas: Não</li>
            <li>Saldo FGTS estimado: R$ 15.000,00</li>
          </ul>

          <div className="border-t border-blue-200 pt-3 text-sm">
            <p className="font-semibold">Resultado aproximado:</p>
            <ul className="space-y-1 mt-2">
              <li>Saldo de salário (15 dias): R$ 1.800,00</li>
              <li>Aviso prévio indenizado (30 dias): R$ 3.600,00</li>
              <li>Aviso prévio proporcional (3 anos): R$ 360,00</li>
              <li>Férias proporcionais (3/12): R$ 900,00</li>
              <li>+ 1/3 férias: R$ 300,00</li>
              <li>13º proporcional (3/12): R$ 900,00</li>
              <li>Multa FGTS 40%: R$ 6.000,00</li>
              <li className="border-t border-blue-200 pt-1 font-bold">
                Total líquido estimado: R$ 12.960,00
              </li>
            </ul>
          </div>
        </div>

        <h2>Perguntas Frequentes sobre Rescisão</h2>

        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              O que é rescisão indireta?
            </h3>
            <p className="text-sm text-gray-600">
              A rescisão indireta é o &quot;justa causa do empregador&quot;. Ocorre
              quando o empregador comete falta grave (atraso de salário,
              assédio moral, condições degradantes) e o empregado pede a
              rescisão. Neste caso, o trabalhador mantém todos os direitos de
              uma demissão sem justa causa.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              Posso sacar o FGTS na rescisão?
            </h3>
            <p className="text-sm text-gray-600">
              Sim. Na demissão sem justa causa, o empregado pode sacar todo o
              saldo do FGTS, além de receber a multa de 40% paga pelo
              empregador. No pedido de demissão, não há direito ao saque do
              FGTS nem à multa.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
              A empresa tem prazo para pagar a rescisão?
            </h3>
            <p className="text-sm text-gray-600">
              Sim. O prazo legal é de 10 dias corridos após o término do
              contrato. Se o pagamento for feito após esse prazo, a empresa
              está sujeita a multa equivalente a um salário do empregado (art.
              477 da CLT).
            </p>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold mb-2">
            Como funciona a homologação da rescisão?
            </h3>
            <p className="text-sm text-gray-600">
              Desde a Reforma Trabalhista (2017), a homologação da rescisão
              não é mais obrigatória no sindicato para contratos com mais de 1
              ano. A empresa pode fazer o pagamento diretamente, desde que o
              empregado dê quitação. No entanto, o sindicato ainda pode ser
              acionado para assistência se houver dúvidas.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Aviso importante:</strong> Os valores calculados são
              aproximados. O cálculo exato da rescisão depende de verbas
              específicas (horas extras habituais, comissões, adicionais de
              periculosidade/insalubridade, PLR, descontos judiciais) que
              variam caso a caso. Recomendamos consultar um contador ou
              advogado trabalhista para o cálculo oficial das verbas
              rescisórias.
            </div>
          </div>
        </div>
      </article>

      {/* Links internos para outras calculadoras */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">
          📌 Continue calculando
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/calculadora-fgts"
            className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <span className="font-medium">Calculadora de FGTS</span>
              <p className="text-xs text-gray-500">
                Calcule a multa de 40%
              </p>
            </div>
          </Link>
          <Link
            href="/calculadora-ferias"
            className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-purple-700" />
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
        <ShareButtons title="Calculadora de Rescisão CLT - Calculadora Trabalhista" />
      </div>
    </div>
  );
}
