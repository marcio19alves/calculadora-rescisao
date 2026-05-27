import Link from "next/link";

interface Ferramenta {
  titulo: string;
  descricao: string;
  href: string;
  cor: string;
  icone: string;
  categoria: string;
  badge?: string;
  badgeCor?: string;
}

const FERRAMENTAS: Ferramenta[] = [
  // ═══ TRABALHISTA ═══
  { titulo: "Rescisão CLT", descricao: "Calcule o valor exato da sua rescisão trabalhista: saldo de salário, férias, 13º proporcional, FGTS com multa de 40%.", href: "/calculadora-rescisao", cor: "from-blue-500 to-blue-600", icone: "📋", categoria: "Trabalhista", badge: "Mais usada", badgeCor: "bg-blue-600 text-white" },
  { titulo: "FGTS", descricao: "Calcule a multa de 40% do FGTS na demissão sem justa causa. Simule o saque aniversário.", href: "/calculadora-fgts", cor: "from-green-500 to-green-600", icone: "💰", categoria: "Trabalhista" },
  { titulo: "Férias", descricao: "Calcule suas férias CLT com 1/3 constitucional. Vencidas, proporcionais e abono pecuniário.", href: "/calculadora-ferias", cor: "from-purple-500 to-purple-600", icone: "🏖️", categoria: "Trabalhista" },
  { titulo: "Horas Extras", descricao: "Calcule horas extras 50% e 100% conforme a CLT. Inclui DSR e adicional noturno cumulado.", href: "/calculadora-horas-extras", cor: "from-amber-500 to-amber-600", icone: "⏰", categoria: "Trabalhista", badge: "Popular", badgeCor: "bg-amber-600 text-white" },
  { titulo: "Adicional Noturno", descricao: "Calcule o adicional noturno de 20% sobre a hora reduzida (52:30). Inclui cumulação com HE.", href: "/calculadora-adicional-noturno", cor: "from-indigo-500 to-indigo-600", icone: "🌙", categoria: "Trabalhista" },
  { titulo: "Salário Líquido", descricao: "Calcule seu salário líquido CLT com descontos de INSS e IRRF. Tabelas progressivas 2025.", href: "/calculadora-salario-liquido", cor: "from-cyan-500 to-cyan-600", icone: "💵", categoria: "Trabalhista" },
  { titulo: "Seguro Desemprego", descricao: "Calcule as parcelas do seguro desemprego 2025. Faixas salariais e tempo de trabalho.", href: "/calculadora-seguro-desemprego", cor: "from-teal-500 to-teal-600", icone: "🛡️", categoria: "Trabalhista" },
  { titulo: "13º Salário", descricao: "Calcule o 13º salário proporcional ou integral com INSS, IRRF, 1ª e 2ª parcela.", href: "/calculadora-13o-salario", cor: "from-pink-500 to-pink-600", icone: "🎄", categoria: "Trabalhista" },
  { titulo: "INSS", descricao: "Calcule o desconto de INSS pela tabela progressiva 2025 com alíquotas de 7,5% a 14%.", href: "/calculadora-inss", cor: "from-orange-500 to-orange-600", icone: "🏦", categoria: "Trabalhista" },
  { titulo: "IRRF", descricao: "Calcule o Imposto de Renda Retido na Fonte. Tabela progressiva 2025 com deduções.", href: "/calculadora-irrf", cor: "from-rose-500 to-rose-600", icone: "📊", categoria: "Trabalhista" },
  { titulo: "Salário Mínimo", descricao: "Veja o valor atual do salário mínimo 2025 (R$ 1.518), tabela histórica e cálculo por dia/hora.", href: "/calculadora-salario-minimo", cor: "from-emerald-500 to-emerald-600", icone: "💰", categoria: "Trabalhista" },
  { titulo: "Empregado Doméstico", descricao: "Simule encargos do empregado doméstico: INSS, FGTS, 13º, férias, vale transporte e alimentação.", href: "/calculadora-empregado-domestico", cor: "from-lime-500 to-lime-600", icone: "🏠", categoria: "Trabalhista" },
  { titulo: "Escala de Trabalho", descricao: "Simule escalas 6x1, 12x36, 5x2 e 4x3. Calcule DSR, adicional noturno e valor da hora.", href: "/calculadora-escala-trabalho", cor: "from-violet-500 to-violet-600", icone: "📅", categoria: "Trabalhista" },

  // ═══ FINANCEIRO ═══
  { titulo: "Juros Compostos", descricao: "Simule investimentos com juros compostos. Projeção mês a mês com aportes mensais.", href: "/calculadora-juros", cor: "from-emerald-500 to-emerald-600", icone: "📈", categoria: "Financeiro" },
  { titulo: "Juros Simples", descricao: "Calcule juros simples: capital, taxa e tempo. Veja montante final com fórmula detalhada.", href: "/calculadora-juros-simples", cor: "from-sky-500 to-sky-600", icone: "🧮", categoria: "Financeiro" },
  { titulo: "Porcentagem", descricao: "Calcule porcentagens em 3 modos: X% de Y, X é quantos % de Y, aumento ou desconto.", href: "/calculadora-porcentagem", cor: "from-yellow-500 to-yellow-600", icone: "📐", categoria: "Financeiro" },
  { titulo: "Reajuste de Aluguel", descricao: "Calcule o reajuste do aluguel pelos índices IGP-M, IPCA, INPC, IGP-DI e IVAR.", href: "/calculadora-reajuste-aluguel", cor: "from-red-500 to-red-600", icone: "🏘️", categoria: "Financeiro" },
  { titulo: "Financiamento de Veículos", descricao: "Simule financiamento de veículos pela Tabela Price. Parcela, CET e amortização.", href: "/calculadora-financiamento-veiculos", cor: "from-blue-500 to-blue-600", icone: "🚗", categoria: "Financeiro" },
  { titulo: "Empréstimo Pessoal", descricao: "Simule empréstimo pessoal com Tabela Price. Parcelas fixas, CET e tabela de amortização.", href: "/calculadora-emprestimo-pessoal", cor: "from-cyan-500 to-cyan-600", icone: "🏦", categoria: "Financeiro" },
  { titulo: "Churrasco", descricao: "Calcule carnes, bebidas e acompanhamentos para seu churrasco.", href: "/calculadora-churrasco", cor: "from-red-500 to-orange-600", icone: "🥩", categoria: "Alimentação" },

  // ═══ SAÚDE ═══
  { titulo: "IMC", descricao: "Calcule seu Índice de Massa Corporal. Veja classificação OMS, peso ideal e faixas de risco.", href: "/calculadora-imc", cor: "from-green-500 to-green-600", icone: "⚕️", categoria: "Saúde" },
  { titulo: "Gestacional", descricao: "Calcule a idade gestacional e data provável do parto. Acompanhe por trimestre.", href: "/calculadora-gestacional", cor: "from-pink-500 to-pink-600", icone: "👶", categoria: "Saúde" },

  // ═══ CALENDÁRIO ═══
  { titulo: "Dias entre Datas", descricao: "Calcule a diferença exata entre duas datas em dias, semanas, meses, anos, horas e minutos.", href: "/calculadora-dias-entre-datas", cor: "from-violet-500 to-violet-600", icone: "📅", categoria: "Calendário" },
];

const CATEGORIAS = [
  { nome: "Trabalhista", slug: "/calculadora-rescisao", cor: "from-blue-600 to-blue-700", icone: "⚖️", count: 13 },
  { nome: "Financeiro", slug: "/calculadora-juros", cor: "from-emerald-600 to-emerald-700", icone: "📊", count: 6 },
  { nome: "Saúde", slug: "/calculadora-imc", cor: "from-green-600 to-green-700", icone: "⚕️", count: 2 },
  { nome: "Calendário", slug: "/calculadora-dias-entre-datas", cor: "from-violet-600 to-violet-700", icone: "📅", count: 1 },
  { nome: "Alimentação", slug: "/calculadora-churrasco", cor: "from-red-500 to-orange-600", icone: "🥩", count: 1 },
];

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Calculadora Trabalhista",
    url: "https://calculadoratrabalhista.net.br",
    description:
      "Mais de 20 calculadoras online grátis: trabalhistas, financeiras, saúde e calendário. Calcule rescisão, FGTS, férias, IMC, juros e mais.",
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Calculadora Trabalhista
          </span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Mais de <strong className="text-gray-900">20 calculadoras online e gratuitas</strong> para você
          calcular rescisão trabalhista, FGTS, férias, IMC, juros compostos e muito mais.
          <br />
          <strong className="text-gray-900">
            Resultado imediato. Sem cadastro. 100% gratuito.
          </strong>
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {[
            { text: "⚡ Resultado imediato", cor: "bg-blue-100 text-blue-700" },
            { text: "🔒 Sem cadastro", cor: "bg-green-100 text-green-700" },
            { text: "📱 100% mobile", cor: "bg-purple-100 text-purple-700" },
            { text: "🇧🇷 19 calculadoras", cor: "bg-amber-100 text-amber-700" },
          ].map(({ text, cor }) => (
            <span key={text} className={`px-3 py-1.5 rounded-full text-sm font-medium ${cor}`}>
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
            {FERRAMENTAS.length} calculadoras organizadas em {CATEGORIAS.length} categorias
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.nome} href={cat.slug}>
              <div className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${cat.cor} text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
                  <span className="text-2xl">{cat.icone}</span>
                  <div className="text-left">
                    <div className="font-semibold">{cat.nome}</div>
                    <div className="text-white/80 text-xs">
                      {cat.count} {cat.count === 1 ? "ferramenta" : "ferramentas"}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== GRID DE FERRAMENTAS ========== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FERRAMENTAS.map((f) => (
          <Link key={f.href} href={f.href}>
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 h-full hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 relative overflow-hidden">
              {f.badge && (
                <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${f.badgeCor}`}>
                  {f.badge}
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${f.cor} shrink-0 shadow-sm`}>
                  {f.icone}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold group-hover:text-blue-600 transition-colors mb-1">
                    {f.titulo}
                  </h3>
                  <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                    {f.categoria}
                  </div>
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
            { passo: "1", titulo: "Preencha os dados", desc: "Informe os valores que deseja calcular. Cada calculadora tem campos específicos para o seu tipo de cálculo.", icone: "✏️" },
            { passo: "2", titulo: "Calcule instantaneamente", desc: "Clique em calcular e veja o resultado detalhado em segundos — tudo no seu navegador.", icone: "⚡" },
            { passo: "3", titulo: "Use os resultados", desc: "Copie, compartilhe ou compare cenários. Sem limite de consultas, sem cadastro.", icone: "📤" },
          ].map(({ passo, titulo, desc, icone }) => (
            <div key={passo} className="bg-white rounded-xl p-6 space-y-3 shadow-sm border border-gray-100">
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

      {/* ========== TEXTO RICO SEO ========== */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Calculadoras Online Grátis: Trabalhista, Financeira e Saúde
        </h2>

        <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
          <p>
            Nossas <strong>calculadoras online gratuitas</strong> foram desenvolvidas para oferecer
            cálculos precisos em diversas áreas: trabalhista (rescisão CLT, FGTS, férias, horas extras),
            financeira (juros compostos, juros simples, porcentagem, financiamento), saúde (IMC,
            gestacional) e calendário (dias entre datas).
          </p>
          <p>
            Diferente de outros sites, todas as calculadoras processam os dados diretamente no seu
            navegador. Isso significa que seus dados <strong>não saem do seu dispositivo</strong> e
            o resultado é instantâneo, sem refresh ou espera.
          </p>
          <p>
            Se você está calculando sua <Link href="/calculadora-rescisao" className="text-blue-600 underline hover:text-blue-800">rescisão trabalhista</Link>,
            quer saber seu <Link href="/calculadora-imc" className="text-blue-600 underline hover:text-blue-800">IMC</Link>,
            simular <Link href="/calculadora-juros" className="text-blue-600 underline hover:text-blue-800">juros compostos</Link>
            ou calcular <Link href="/calculadora-dias-entre-datas" className="text-blue-600 underline hover:text-blue-800">dias entre datas</Link>,
            você está no lugar certo. Simples, rápido e 100% gratuito.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {FERRAMENTAS.map((f) => (
            <Link key={f.href} href={f.href} className="text-center bg-gray-50 rounded-xl p-3 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <div className="text-2xl mb-1">{f.icone}</div>
              <div className="text-xs font-medium leading-tight">
                {f.titulo}
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
          © {new Date().getFullYear()} Calculadora Trabalhista — Todas as
          calculadoras são gratuitas. Nenhum dado pessoal é armazenado.
        </p>
      </section>
    </div>
  );
}
