import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Analytics from "@/components/analytics";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  verification: {
    google: "5HGpDYp0bhmS27A_x5-qZVxZ0XYLoSUR4BIIsUXP5bg",
  },
  title: {
    default:
      "Calculadora Trabalhista Online Grátis | Calculadora Trabalhista",
    template: "%s | Calculadora Trabalhista",
  },
  description:
    "Calcule online e grátis o valor exato da sua rescisão trabalhista CLT, férias, FGTS, horas extras, adicional noturno, juros compostos e mais. Resultado imediato, sem cadastro.",
  keywords: [
    "calculadora rescisão",
    "cálculo rescisão trabalhista",
    "simulador rescisão CLT",
    "calcular acerto trabalhista",
    "rescisão de contrato de trabalho",
    "cálculo trabalhista online",
    "calculadora férias",
    "calculadora FGTS multa 40",
    "calculadora horas extras",
    "adicional noturno cálculo",
    "juros compostos simulador",
  ],
  authors: [{ name: "Calculadora Trabalhista" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Calculadora Trabalhista",
    title: "Calculadora Trabalhista Online Grátis",
    description:
      "Calcule online sua rescisão CLT, férias, FGTS, horas extras e mais. Grátis e sem cadastro.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CTrabalhista" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Calculadora Trabalhista",
              url: "https://calculadoratrabalhista.net.br",
              description:
                "Calculadoras trabalhistas online grátis. Calcule rescisão, férias, FGTS, horas extras e mais.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://calculadoratrabalhista.net.br/busca?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white antialiased flex flex-col">
        {/* ===== HEADER ===== */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
                CT
              </div>
              <span className="font-bold text-lg text-gray-900 hidden sm:inline">
                Calculadora Trabalhista
              </span>
            </Link>

            {/* Menu - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Início
              </Link>
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-1">
                  Trabalhista
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 space-y-0.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <Link href="/calculadora-rescisao" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">📋 Rescisão</Link>
                  <Link href="/calculadora-fgts" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">💰 FGTS</Link>
                  <Link href="/calculadora-ferias" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🏖️ Férias</Link>
                  <Link href="/calculadora-horas-extras" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">⏰ Horas Extras</Link>
                  <Link href="/calculadora-adicional-noturno" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🌙 Adicional Noturno</Link>
                  <Link href="/calculadora-salario-liquido" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">💵 Salário Líquido</Link>
                  <Link href="/calculadora-seguro-desemprego" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🛡️ Seguro Desemprego</Link>
                  <Link href="/calculadora-13o-salario" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🎄 13º Salário</Link>
                  <Link href="/calculadora-inss" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🏦 INSS</Link>
                  <Link href="/calculadora-irrf" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">📊 IRRF</Link>
                  <Link href="/calculadora-salario-minimo" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">💰 Salário Mínimo</Link>
                  <Link href="/calculadora-empregado-domestico" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🏠 Empregado Doméstico</Link>
                  <Link href="/calculadora-escala-trabalho" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">📅 Escala de Trabalho</Link>
                </div>
              </div>
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-1">
                  Financeiro
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 space-y-0.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <Link href="/calculadora-juros" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">📈 Juros Compostos</Link>
                  <Link href="/calculadora-juros-simples" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🧮 Juros Simples</Link>
                  <Link href="/calculadora-porcentagem" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">📐 Porcentagem</Link>
                  <Link href="/calculadora-reajuste-aluguel" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🏘️ Reajuste Aluguel</Link>
                  <Link href="/calculadora-financiamento-veiculos" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🚗 Financiamento</Link>
                  <Link href="/calculadora-emprestimo-pessoal" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">🏦 Empréstimo</Link>
                </div>
              </div>
              <Link href="/calculadora-imc" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                IMC
              </Link>
              <Link href="/calculadora-dias-entre-datas" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Datas
              </Link>
            </div>

            {/* Busca */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Menu - Mobile (hamburguer dropdown) */}
            <div className="md:hidden flex gap-1">
              <details className="relative group">
                <summary className="list-none px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100 transition-colors">
                  ☰ Menu
                </summary>
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2 space-y-0.5 z-50">
                  <Link
                    href="/"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    🏠 Início
                  </Link>
                  <Link
                    href="/calculadora-rescisao"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    📋 Rescisão
                  </Link>
                  <Link
                    href="/calculadora-horas-extras"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    ⏰ Horas Extras
                  </Link>
                  <Link
                    href="/calculadora-adicional-noturno"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    🌙 Adicional Noturno
                  </Link>
                  <Link
                    href="/calculadora-fgts"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    💰 FGTS
                  </Link>
                  <Link
                    href="/calculadora-ferias"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    🏖️ Férias
                  </Link>
                  <Link
                    href="/calculadora-juros"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    📈 Juros Compostos
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <Link
                    href="/sobre"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    ℹ️ Sobre
                  </Link>
                  <Link
                    href="/contato"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    📧 Contato
                  </Link>
                  <Link
                    href="/politica-de-privacidade"
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    🔒 Privacidade
                  </Link>
                </div>
              </details>
            </div>
          </nav>
        </header>

        {/* ===== MAIN ===== */}
        <main className="flex-1 max-w-6xl mx-auto px-4 py-6 sm:py-10 w-full">
          {children}
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-gray-900 text-gray-400 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Coluna 1 - Marca */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                    CT
                  </div>
                  <span className="text-white font-bold text-lg">
                    Calculadora Trabalhista
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  Mais de 20 calculadoras online grátis. Trabalhistas, financeiras, saúde e calendário.
                </p>
              </div>

              {/* Coluna 2 - Ferramentas Trabalhistas */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Trabalhista
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/calculadora-rescisao" className="text-sm hover:text-white transition-colors">Rescisão CLT</Link></li>
                  <li><Link href="/calculadora-fgts" className="text-sm hover:text-white transition-colors">FGTS</Link></li>
                  <li><Link href="/calculadora-ferias" className="text-sm hover:text-white transition-colors">Férias</Link></li>
                  <li><Link href="/calculadora-horas-extras" className="text-sm hover:text-white transition-colors">Horas Extras</Link></li>
                  <li><Link href="/calculadora-salario-liquido" className="text-sm hover:text-white transition-colors">Salário Líquido</Link></li>
                  <li><Link href="/calculadora-seguro-desemprego" className="text-sm hover:text-white transition-colors">Seguro Desemprego</Link></li>
                  <li><Link href="/calculadora-13o-salario" className="text-sm hover:text-white transition-colors">13º Salário</Link></li>
                  <li><Link href="/calculadora-inss" className="text-sm hover:text-white transition-colors">INSS</Link></li>
                  <li><Link href="/calculadora-irrf" className="text-sm hover:text-white transition-colors">IRRF</Link></li>
                  <li><Link href="/calculadora-escala-trabalho" className="text-sm hover:text-white transition-colors">Escala de Trabalho</Link></li>
                </ul>
              </div>

              {/* Coluna 3 - Financeiro + Saúde + Calendário */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Financeiro
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/calculadora-juros" className="text-sm hover:text-white transition-colors">Juros Compostos</Link></li>
                  <li><Link href="/calculadora-juros-simples" className="text-sm hover:text-white transition-colors">Juros Simples</Link></li>
                  <li><Link href="/calculadora-porcentagem" className="text-sm hover:text-white transition-colors">Porcentagem</Link></li>
                  <li><Link href="/calculadora-reajuste-aluguel" className="text-sm hover:text-white transition-colors">Reajuste Aluguel</Link></li>
                  <li><Link href="/calculadora-financiamento-veiculos" className="text-sm hover:text-white transition-colors">Financiamento Veículos</Link></li>
                  <li><Link href="/calculadora-emprestimo-pessoal" className="text-sm hover:text-white transition-colors">Empréstimo Pessoal</Link></li>
                </ul>
                <h3 className="text-white font-semibold mt-6 mb-4 text-sm uppercase tracking-wider">
                  Saúde
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/calculadora-imc" className="text-sm hover:text-white transition-colors">Calculadora de IMC</Link></li>
                  <li><Link href="/calculadora-gestacional" className="text-sm hover:text-white transition-colors">Calculadora Gestacional</Link></li>
                </ul>
                <h3 className="text-white font-semibold mt-6 mb-4 text-sm uppercase tracking-wider">
                  Alimentação
                </h3>
                <ul className="space-y-3">
                  <li><Link href="/calculadora-churrasco" className="text-sm hover:text-white transition-colors">Calculadora de Churrasco</Link></li>
                </ul>
              </div>

              {/* Coluna 4 - Institucional */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Institucional
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/sobre"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contato"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/politica-de-privacidade"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Política de Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/embed"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Widget Embedável
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recomendados"
                      className="text-sm hover:text-white transition-colors"
                    >
                      🛒 Recomendados
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} Calculadora Trabalhista — Todos os
                direitos reservados.
              </p>
              <p className="text-xs">
                Os valores são aproximados. Consulte um contador para cálculos
                oficiais.
              </p>
            </div>
          </div>
        </footer>

        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
