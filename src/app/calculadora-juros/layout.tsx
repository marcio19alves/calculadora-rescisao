import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos Grátis | Calculadora Trabalhista",
  description:
    "Calcule online e grátis o montante final de investimentos com juros compostos. Simule aporte mensal, taxa de juros e período. Veja projeção mês a mês. Resultado imediato.",
  openGraph: {
    title: "Calculadora de Juros Compostos Grátis",
    description:
      "Simule investimentos com juros compostos. Veja projeção do seu dinheiro mês a mês com aportes mensais.",
  },
  keywords: [
    "calculadora juros compostos",
    "juros compostos",
    "simulador investimentos",
    "calcular juros compostos",
    "montante com aporte mensal",
    "simulador financeiro",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
