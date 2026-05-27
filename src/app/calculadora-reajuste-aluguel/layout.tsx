import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Reajuste de Aluguel Grátis | Calculadora Trabalhista",
  description:
    "Calcule online e grátis o valor do reajuste do seu aluguel com IGP-M, IPCA, INPC, IGP-DI ou IVAR. Veja o valor corrigido, diferença e percentual. Tabela com índices históricos dos últimos 12 meses.",
  openGraph: {
    title: "Calculadora de Reajuste de Aluguel Grátis",
    description:
      "Calcule o reajuste do seu aluguel com os principais índices do mercado. IGP-M, IPCA, INPC, IGP-DI e IVAR. Resultado imediato.",
  },
  keywords: [
    "calculadora reajuste aluguel",
    "reajuste de aluguel",
    "calculadora IGP-M",
    "calculadora IPCA",
    "reajuste aluguel IGP-M",
    "índice de reajuste aluguel",
    "correção aluguel",
    "simulador reajuste aluguel",
    "aumento aluguel calculadora",
    "aluguel reajuste anual",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
