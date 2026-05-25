import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de FGTS com Multa 40% Grátis | CalcularRescisao",
  description:
    "Calcule online e grátis a multa de 40% do FGTS. Simulador completo para demissão sem justa causa e rescisão por comum acordo. Informe o saldo e descubra quanto você tem direito a receber.",
  openGraph: {
    title: "Calculadora de FGTS com Multa 40% Grátis Online",
    description:
      "Calcule o valor da multa do FGTS para demissão sem justa causa (40%) e comum acordo (20%). Resultado imediato, sem cadastro.",
  },
  keywords: [
    "calculadora de FGTS",
    "multa 40% FGTS",
    "calcular multa FGTS",
    "simulador FGTS",
    "cálculo FGTS rescisão",
    "como calcular multa FGTS 40%",
    "FGTS demissão sem justa causa",
    "multa FGTS 20% comum acordo",
    "saque FGTS rescisão",
    "calcular multa rescisória FGTS",
  ],
};

export default function FgtsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
