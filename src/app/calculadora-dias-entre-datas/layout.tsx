import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Calculadora de Dias entre Datas Online Grátis | Calculadora Trabalhista",
  description:
    "Calcule online e grátis a diferença exata entre duas datas: dias corridos, dias úteis, semanas, meses, anos, horas e minutos. Ferramenta gratuita com resultado instantâneo.",
  openGraph: {
    title: "Calculadora de Dias entre Datas Online Grátis",
    description:
      "Descubra a diferença exata entre duas datas: dias, semanas, meses, anos, horas e minutos. Opção de dias úteis inclusa.",
  },
  keywords: [
    "calculadora de dias entre datas",
    "diferença entre datas",
    "calcular dias entre datas",
    "dias úteis entre datas",
    "contador de dias",
    "dias corridos",
    "calculadora de dias online",
    "quantos dias entre duas datas",
    "simulador de datas",
    "cálculo de prazos",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
