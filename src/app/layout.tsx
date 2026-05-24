import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Calculadora Trabalhista Online Grátis | CalcularRescisao",
    template: "%s | CalcularRescisao",
  },
  description:
    "Calcule online e grátis o valor exato da sua rescisão trabalhista CLT, férias, FGTS, 13º salário e mais. Resultado imediato, sem cadastro.",
  keywords: [
    "calculadora rescisão",
    "cálculo rescisão trabalhista",
    "simulador rescisão CLT",
    "calcular acerto trabalhista",
    "rescisão de contrato de trabalho",
    "cálculo trabalhista online",
  ],
  authors: [{ name: "CalcularRescisao" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CalcularRescisao",
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
                "Calculadoras trabalhistas online grátis. Calcule rescisão, férias, FGTS e mais.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white antialiased">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-primary">
              CalcularRescisao
            </Link>
            <div className="flex gap-1 sm:gap-4 text-sm font-medium">
              <Link
                href="/calculadora-rescisao"
                className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Rescisão
              </Link>
              <Link
                href="/calculadora-juros"
                className="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Juros
              </Link>
            </div>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-400 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">
                  CalcularRescisao
                </h3>
                <p className="text-sm leading-relaxed">
                  Calculadoras trabalhistas online grátis. Resultado imediato,
                  sem cadastro, sem frescura.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Ferramentas</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/calculadora-rescisao"
                      className="hover:text-white transition-colors"
                    >
                      Calculadora de Rescisão
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-juros"
                      className="hover:text-white transition-colors"
                    >
                      Calculadora de Juros Compostos
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Sobre</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/sobre"
                      className="hover:text-white transition-colors"
                    >
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
              <p>
                &copy; {new Date().getFullYear()} CalcularRescisao. Os
                valores são aproximados. Consulte um contador para cálculos
                oficiais.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
