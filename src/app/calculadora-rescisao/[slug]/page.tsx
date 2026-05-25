import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cargos } from "@/lib/cbo-data";
import {
  generateFAQSchema,
  generateSoftwareSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo-utils";
import RescisaoEngine from "@/components/rescisao-client";
import { Calculator, FileText, AlertTriangle } from "lucide-react";

// ----- GENERATE STATIC PARAMS -----

export function generateStaticParams() {
  return cargos.map((cargo) => ({
    slug: cargo.slug,
  }));
}

// ----- METADATA -----

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cargo = cargos.find((c) => c.slug === params.slug);
  if (!cargo) return {};

  const title = `Calculadora de Rescisão para ${cargo.nome} | CalcularRescisao`;
  const description = `Calcule online e grátis a rescisão trabalhista CLT para ${cargo.nomeMasculino}. Simulador completo: saldo de salário, férias, 13º, FGTS com multa de 40%. Resultado imediato, sem cadastro.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    keywords: [
      `calculadora de rescisão para ${cargo.nomeMasculino}`,
      `calcular rescisão ${cargo.nomeMasculino}`,
      `rescisão de ${cargo.nomeMasculino}`,
      `acerto trabalhista ${cargo.nomeMasculino}`,
      `verbas rescisórias ${cargo.nomeMasculino}`,
      `cálculo trabalhista ${cargo.nomeMasculino}`,
    ],
  };
}

// ----- PAGE COMPONENT -----

export default function RescisaoCargoPage({
  params,
}: {
  params: { slug: string };
}) {
  const cargo = cargos.find((c) => c.slug === params.slug);
  if (!cargo) {
    notFound();
  }

  const baseUrl = "https://calcularrescisao.com.br";
  const pageUrl = `${baseUrl}/calculadora-rescisao/${cargo.slug}`;

  // Schemas
  const faqSchema = generateFAQSchema([
    {
      question: `Como calcular a rescisão de ${cargo.nomeMasculino} CLT?`,
      answer: `Para calcular a rescisão de ${cargo.nomeMasculino}, siga os passos: 1) Calcule o saldo de salário (dias trabalhados no mês da demissão). 2) Calcule o aviso prévio (30 dias + 3 dias por ano trabalhado, máximo 90 dias). 3) Calcule as férias vencidas (se houver) + 1/3 constitucional. 4) Calcule as férias proporcionais (meses trabalhados no período aquisitivo atual). 5) Calcule o 13º salário proporcional. 6) Para demissão sem justa causa, inclua a multa de 40% sobre o FGTS. Use nossa calculadora acima para obter o resultado exato automaticamente.`,
    },
    {
      question: `O que ${cargo.nomeMasculino} recebe na rescisão?`,
      answer: `${cargo.nome.charAt(0).toUpperCase() + cargo.nome.slice(1)} recebe na rescisão: saldo de salário (dias trabalhados), aviso prévio (indenizado ou trabalhado), férias vencidas (se houver) com 1/3 constitucional, férias proporcionais com 1/3, 13º salário proporcional, FGTS (depósitos mensais de 8%) e multa de 40% sobre o saldo do FGTS (apenas em demissão sem justa causa). Descontos de INSS e IRRF são aplicados conforme as tabelas vigentes.`,
    },
    {
      question: `Qual o valor da multa do FGTS para ${cargo.nomeMasculino}?`,
      answer: `Para ${cargo.nomeMasculino}, a multa do FGTS é de 40% sobre o saldo total da conta do FGTS em caso de demissão sem justa causa. Se a rescisão for por comum acordo, a multa cai para 20%. No pedido de demissão, não há direito à multa do FGTS.`,
    },
    {
      question: `${cargo.nome.charAt(0).toUpperCase() + cargo.nome.slice(1)} tem direito a seguro-desemprego?`,
      answer: `${cargo.nome.charAt(0).toUpperCase() + cargo.nome.slice(1)} tem direito ao seguro-desemprego se for demitido sem justa causa e cumprir os requisitos: ter recebido salários por pelo menos 12 meses nos últimos 18 meses (primeira solicitação), ou 9 meses nos últimos 12 (segunda), ou 6 meses consecutivos (terceira em diante).`,
    },
  ]);

  const softwareSchema = generateSoftwareSchema(
    `Calculadora de Rescisão para ${cargo.nome}`,
    `Calcule online e grátis a rescisão trabalhista CLT de ${cargo.nomeMasculino}. Simulador completo: saldo de salário, férias, 13º, FGTS e multa de 40%.`,
    pageUrl,
    { applicationCategory: "FinanceApplication" },
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Início", item: baseUrl },
    { name: "Calculadora de Rescisão", item: `${baseUrl}/calculadora-rescisao` },
    { name: `Rescisão para ${cargo.nome}`, item: pageUrl },
  ]);

  // Lista de outros cargos (menos o atual)
  const outrosCargos = cargos.filter((c) => c.slug !== cargo.slug);

  return (
    <div className="space-y-8">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <FileText className="w-7 h-7 text-blue-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Calculadora de Rescisão para {cargo.nome}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          {cargo.descricao}
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

        <h2>Perguntas Frequentes sobre Rescisão para {cargo.nome}</h2>

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

      {/* Links internos para outros cargos */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-center">
          📌 Calculadoras de Rescisão por Cargo
        </h2>
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto">
          Veja também a calculadora de rescisão específica para outros cargos:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {outrosCargos.slice(0, 24).map((c) => (
            <Link
              key={c.slug}
              href={`/calculadora-rescisao/${c.slug}`}
              className="flex items-center gap-2 bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-sm"
            >
              <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium truncate">{c.nome}</span>
            </Link>
          ))}
        </div>
        {outrosCargos.length > 24 && (
          <details className="text-center">
            <summary className="text-sm text-blue-600 cursor-pointer hover:underline">
              Ver mais cargos
            </summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {outrosCargos.slice(24).map((c) => (
                <Link
                  key={c.slug}
                  href={`/calculadora-rescisao/${c.slug}`}
                  className="flex items-center gap-2 bg-white rounded-lg p-3 hover:shadow-md transition-shadow text-sm"
                >
                  <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium truncate">{c.nome}</span>
                </Link>
              ))}
            </div>
          </details>
        )}
        <div className="text-center pt-2">
          <Link
            href="/calculadora-rescisao"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
          >
            ← Voltar para a calculadora principal de rescisão
          </Link>
        </div>
      </section>

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
    </div>
  );
}
