import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Empréstimo Pessoal Online Grátis | Calculadora Trabalhista",
  description:
    "Simule seu empréstimo pessoal online grátis. Calcule parcelas fixas pela Tabela Price, total a pagar, juros totais e CET mensal. Compare taxas e prazos de 3 a 60 meses.",
  openGraph: {
    title: "Simulador de Empréstimo Pessoal Online Grátis",
    description:
      "Simule seu empréstimo pessoal com cálculo completo: parcela mensal, total a pagar, juros totais e CET. Tabela Price com amortização detalhada.",
  },
  keywords: [
    "simulador de empréstimo pessoal",
    "calculadora de empréstimo pessoal",
    "tabela price",
    "simulação de empréstimo",
    "taxa de juros pessoal",
    "CET empréstimo pessoal",
    "cálculo de parcela",
    "emprestimo pessoal online",
    "simulador de crédito pessoal",
    "juros de empréstimo pessoal Brasil",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
