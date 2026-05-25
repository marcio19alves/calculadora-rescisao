import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Analytics from "@/components/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default:
      "Calculadora Trabalhista Online Grátis | CalcularRescisao",
    template: "%s | CalcularRescisao",
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
  authors: [{ name: "CalcularRescisao" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CalcularRescisao",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CalcularRescisao",
              url: "https://calcularrescisao.com.br",
              description:
                "Calculadoras trabalhistas online grátis. Calcule rescisão, férias, FGTS, horas extras e mais.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://calcularrescisao.com.br/busca?q={search_term_string}",
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
                CR
              </div>
              <span className="font-bold text-lg text-gray-900 hidden sm:inline">
                CalcularRescisao
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
              <Link
                href="/calculadora-rescisao"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Rescisão
              </Link>
              <Link
                href="/calculadora-horas-extras"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Horas Extras
              </Link>
              <Link
                href="/calculadora-adicional-noturno"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Adicional Noturno
              </Link>
              <Link
                href="/calculadora-fgts"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                FGTS
              </Link>
              <Link
                href="/calculadora-ferias"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Férias
              </Link>
              <Link
                href="/calculadora-juros"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Juros
              </Link>
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
                    CR
                  </div>
                  <span className="text-white font-bold text-lg">
                    CalcularRescisao
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">
                  Calculadoras trabalhistas online e gratuitas. Resultado
                  imediato, sem cadastro, sem frescura. 🇧🇷
                </p>
              </div>

              {/* Coluna 2 - Ferramentas Trabalhistas */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Trabalhista
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/calculadora-rescisao"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de Rescisão
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-horas-extras"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de Horas Extras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-adicional-noturno"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de Adicional Noturno
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-fgts"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de FGTS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-ferias"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de Férias
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Coluna 3 - Financeiro + Links */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Financeiro
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/calculadora-juros"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Calculadora de Juros Compostos
                    </Link>
                  </li>
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
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
              <p>
                &copy; {new Date().getFullYear()} CalcularRescisao — Todos os
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
      </body>
    </html>
  );
}
