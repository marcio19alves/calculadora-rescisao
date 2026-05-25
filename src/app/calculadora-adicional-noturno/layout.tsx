import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Adicional Noturno CLT Grátis | CalcularRescisao",
  description:
    "Calcule online e grátis o adicional noturno CLT: 20% sobre hora normal, hora reduzida de 52min30s, cumulação com horas extras 50% e 100%. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Adicional Noturno CLT Grátis",
    description:
      "Calcule o adicional noturno trabalhista: 20% sobre a hora normal, hora reduzida e cumulação com horas extras.",
  },
  keywords: [
    "adicional noturno",
    "calcular adicional noturno",
    "adicional noturno CLT",
    "hora noturna reduzida",
    "adicional noturno 20%",
    "cálculo de adicional noturno",
    "hora extra noturna",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
