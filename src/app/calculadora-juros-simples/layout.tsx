import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Juros Simples Online Grátis | Calculadora Trabalhista",
  description:
    "Calcule online e grátis juros simples. Informe capital inicial (R$), taxa % ao mês e período em meses. Veja o valor dos juros e o montante final. Fórmula e explicação completa.",
  openGraph: {
    title: "Calculadora de Juros Simples Online Grátis",
    description:
      "Calcule juros simples com nossa ferramenta gratuita. Resultado imediato com capital inicial, taxa mensal e prazo.",
  },
  keywords: [
    "calculadora juros simples",
    "juros simples",
    "calcular juros simples",
    "simulador juros simples",
    "juros simples fórmula",
    "diferença juros simples e compostos",
    "calculadora financeira",
    "juros ao mês",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
