import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Financiamento de Veículos Online Grátis | Simulador de Carro",
  description:
    "Calcule online e grátis o financiamento do seu veículo pela Tabela Price. Informe valor do veículo, entrada, taxa de juros anual e prazo. Veja parcela, total a pagar, juros totais, CET e tabela de amortização detalhada.",
  openGraph: {
    title: "Calculadora de Financiamento de Veículos Online Grátis",
    description:
      "Simule o financiamento do seu carro com nossa calculadora gratuita. Tabela Price com amortização mensal, CET aproximado e resumo financeiro completo.",
  },
  keywords: [
    "calculadora financiamento veículos",
    "simulador financiamento carro",
    "tabela price financiamento",
    "calcular parcela financiamento veículo",
    "simulador crédito automotivo",
    "CET financiamento veículo",
    "tabela amortização price",
    "financiamento automotivo Brasil",
    "taxa juros financiamento carro",
    "simulação financiamento veículo grátis",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
