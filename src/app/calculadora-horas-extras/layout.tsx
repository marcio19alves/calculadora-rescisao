import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Horas Extras 50% e 100% Grátis | Calculadora Trabalhista",
  description:
    "Calcule online e grátis o valor das suas horas extras: 50% (dias úteis), 100% (domingos/feriados) e DSR. Simulador completo de horas extras CLT com adicional noturno. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Horas Extras 50% e 100% Grátis",
    description:
      "Calcule o valor exato das suas horas extras: 50% dias úteis, 100% domingos/feriados, DSR e adicional noturno. Resultado imediato.",
  },
  keywords: [
    "calculadora horas extras",
    "calcular horas extras",
    "hora extra 50%",
    "hora extra 100%",
    "cálculo de horas extras CLT",
    "DSR horas extras",
    "adicional noturno horas extras",
    "banco de horas",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
