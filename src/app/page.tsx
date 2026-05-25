import Link from "next/link";

const FERRAMENTAS = [
  {
    titulo: "Calculadora de Rescisão",
    descricao: "Calcule o valor exato da sua rescisão trabalhista CLT: saldo de salário, férias vencidas e proporcionais, 13º proporcional, FGTS com multa de 40%.",
    href: "/calculadora-rescisao",
    cor: "from-blue-50 to-blue-100/60",
    icone: "📋",
    badge: "Mais usada",
    badgeCor: "bg-blue-600 text-white",
    categorias: ["Trabalhista"],
    busca: "rescisão acerto trabalhista CLT demissão sem justa causa pedido demissão",
  },
  {
    titulo: "Calculadora de FGTS",
    descricao: "Calcule a multa de 40% do FGTS na demissão sem justa causa. Simule o saque aniversário e rescisão trabalhista.",
    href: "/calculadora-fgts",
    cor: "from-green-50 to-green-100/60",
    icone: "💰",
    badge: null,
    badgeCor: "",
    categorias: ["Trabalhista"],
    busca: "fgts multa 40 saque aniversário demissão",
  },
  {
    titulo: "Calculadora de Férias",
    descricao: "Calcule suas férias CLT com 1/3 constitucional. Simule férias vencidas, proporcionais e abono pecuniário.",
    href: "/calculadora-ferias",
    cor: "from-purple-50 to-purple-100/60",
    icone: "🏖️",
    badge: null,
    badgeCor: "",
    categorias: ["Trabalhista"],
    busca: "férias CLT 1/3 constitucional abono pecuniário férias proporcionais",
  },
  {
    titulo: "Calculadora de Horas Extras",
    descricao: "Calcule horas extras 50% e 100% conforme a CLT. Inclui DSR sobre horas habituais e adicional noturno cumulado.",
    href: "/calculadora-horas-extras",
    cor: "from-amber-50 to-amber-100/60",
    icone: "⏰",
    badge: "Popular",
    badgeCor: "bg-amber-600 text-white",
    categorias: ["Trabalhista"],
    busca: "horas extras 50 100 CLT DSR adicional noturno calculadora",
  },
  {
    titulo: "Calculadora de Adicional Noturno",
    descricao: "Calcule o adicional noturno de 20% sobre a hora noturna. Inclui hora reduzida (52:30) e cumulação com horas extras.",
    href: "/calculadora-adicional-noturno",
    cor: "from-indigo-50 to-indigo-100/60",
    icone: "🌙",
    badge: "Novo",
    badgeCor: "bg-indigo-600 text-white",
    categorias: ["Trabalhista"],
    busca: "adicional noturno 20 hora reduzida 52:30 cumulação HE",
  },
  {
    titulo: "Calculadora de Juros Compostos",
    descricao: "Simule investimentos com juros compostos. Veja projeção mês a mês com aportes mensais fixos ou variáveis.",
    href: "/calculadora-juros",
    cor: "from-emerald-50 to-emerald-100/60",
    icone: "📈",
    badge: null,
    badgeCor: "",
    categorias: ["Cálculos Financeiros"],
    busca: "juros compostos investimento projeção mensal simulador financeiro",
  },
];

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CalcularRescisao",
    url: "https://calcularrescisao.com.br",
    description:
      "Calculadoras trabalhistas online grátis. Calcule rescisão, férias, FGTS, juros compostos e mais.",
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ========== HERO ========== */}
      <section className="text-center space-y-6 pt-4 sm:pt-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <span className="text-4xl">⚖️</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
          Calculadoras
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Trabalhistas Online
          </span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Calcule online e gratuitamente o valor exato da sua rescisão
          trabalhista, FGTS, férias, horas extras, adicional noturno e juros
          compostos.
          <br />
          <strong className="text-gray-900">
            Resultado imediato. Sem cadastro. 100% gratuito.
          </strong>
        </p>

        {/* Pill badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { text: "⚡ Resultado imediato", cor: "bg-blue-100 text-blue-700" },
            { text: "🔒 Sem cadastro", cor: "bg-green-100 text-green-700" },
            { text: "📱 100% mobile", cor: "bg-purple-100 text-purple-700" },
            { text: "🇧🇷 CLT 2025", cor: "bg-amber-100 text-amber-700" },
          ].map(({ text, cor }) => (
            <span
              key={text}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${cor}`}
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ========== CATEGORIAS ========== */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Nossas Ferramentas
          </h2>
          <p className="text-gray-500 mt-2">
            Selecione uma categoria ou encontre a calculadora ideal para você
          </p>
        </div>

        {/* Tabs de categorias */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/calculadora-rescisao">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <span className="text-2xl">⚖️</span>
                <div className="text-left">
                  <div className="font-semibold">Trabalhista</div>
                  <div className="text-blue-100 text-xs">
                    5 ferramentas
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/calculadora-juros">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <span className="text-2xl">📊</span>
                <div className="text-left">
                  <div className="font-semibold">Financeiro</div>
                  <div className="text-emerald-100 text-xs">
                    1 ferramenta
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ========== GRID DE FERRAMENTAS ========== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FERRAMENTAS.map((f) => (
          <Link key={f.href} href={f.href}>
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 h-full hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">
              {/* Badge flutuante */}
              {f.badge && (
                <span
                  className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${f.badgeCor}`}
                >
                  {f.badge}
                </span>
              )}

              <div className="flex items-start gap-4">
                {/* Ícone com gradiente */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${f.cor} shrink-0`}
                >
                  {f.icone}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-blue-600 transition-colors mb-1">
                    {f.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {f.descricao}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                Usar calculadora →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 sm:p-10 space-y-8 border border-blue-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Como funciona
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              passo: "1",
              titulo: "Preencha os dados",
              desc: "Informe salário, data de admissão e demissão ou valores do cálculo desejado.",
              icone: "✏️",
            },
            {
              passo: "2",
              titulo: "Calcule instantaneamente",
              desc: "Clique em calcular e veja o resultado detalhado em segundos — tudo no seu navegador.",
              icone: "⚡",
            },
            {
              passo: "3",
              titulo: "Use os resultados",
              desc: "Copie, compartilhe ou compare cenários. Sem limite de consultas, sem cadastro.",
              icone: "📤",
            },
          ].map(({ passo, titulo, desc, icone }) => (
            <div
              key={passo}
              className="bg-white rounded-xl p-6 space-y-3 shadow-sm border border-gray-100"
            >
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {passo}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{icone}</span>
                <h3 className="font-semibold text-lg">{titulo}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PARA QUE SERVE ========== */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Para quem são essas calculadoras?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              titulo: "Trabalhadores CLT",
              desc: "Saiba exatamente quanto você tem a receber na rescisão, férias, FGTS ou horas extras antes de assinar qualquer documento.",
              icone: "👨‍💼",
            },
            {
              titulo: "Profissionais de RH",
              desc: "Agilize o cálculo de verbas rescisórias e benefícios trabalhistas com precisão e rapidez.",
              icone: "🏢",
            },
            {
              titulo: "Advogados Trabalhistas",
              desc: "Simule valores para ações trabalhistas, acordos e cálculos de verbas em até segundos.",
              icone: "⚖️",
            },
            {
              titulo: "Estudantes e concurseiros",
              desc: "Entenda na prática como funcionam os cálculos trabalhistas da CLT. Ideal para quem estuda para concursos.",
              icone: "📚",
            },
          ].map(({ titulo, desc, icone }) => (
            <div
              key={titulo}
              className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                {icone}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TEXTO RICO SEO ========== */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Calculadoras Trabalhistas Online: Precisão e Confiança
        </h2>

        <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
          <p>
            Nossas <strong>calculadoras trabalhistas online</strong> foram
            desenvolvidas para oferecer cálculos precisos e atualizados com a
            legislação CLT. Cada ferramenta considera todos os fatores legais
            aplicáveis — desde a <strong>multa de 40% do FGTS</strong> até o{" "}
            <strong>adicional noturno de 20%</strong> com hora reduzida.
          </p>
          <p>
            Diferente de outros sites, nossas calculadoras processam os dados
            diretamente no seu navegador. Isso significa que seus dados{" "}
            <strong>não saem do seu dispositivo</strong> e o resultado é
            instantâneo, sem refresh ou espera.
          </p>
          <p>
            Se você está calculando sua <Link href="/calculadora-rescisao" className="text-blue-600 underline hover:text-blue-800">rescisão trabalhista</Link>,{" "}
            quer saber o valor das suas{" "}
            <Link href="/calculadora-horas-extras" className="text-blue-600 underline hover:text-blue-800">horas extras</Link>, ou precisa
            simular seus{" "}
            <Link href="/calculadora-juros" className="text-blue-600 underline hover:text-blue-800">juros compostos</Link>, você está
            no lugar certo. Simples, rápido e 100% gratuito.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {FERRAMENTAS.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="text-center bg-gray-50 rounded-xl p-3 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              <div className="text-2xl mb-1">{f.icone}</div>
              <div className="text-xs font-medium leading-tight">
                {f.titulo.replace("Calculadora de ", "")}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== DISCLAIMER ========== */}
      <section className="text-center text-sm text-gray-400 max-w-2xl mx-auto space-y-3">
        <p>
          ⚠️ Os valores são aproximados e não substituem o cálculo oficial de
          um contador ou advogado trabalhista. Consulte um profissional
          qualificado para cálculos oficiais.
        </p>
        <p>
          © {new Date().getFullYear()} CalcularRescisao — Todas as
          calculadoras são gratuitas. Nenhum dado pessoal é armazenado.
        </p>
      </section>
    </div>
  );
}
