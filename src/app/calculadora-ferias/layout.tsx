import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Férias CLT Grátis Online | CalcularRescisao",
  description:
    "Calcule online e grátis o valor das suas férias CLT: férias vencidas, proporcionais, 1/3 constitucional e abono pecuniário (venda de férias). Simule com ou sem faltas. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Férias CLT Grátis Online",
    description:
      "Calcule o valor exato das suas férias trabalhistas. Simule férias vencidas, proporcionais, 1/3 constitucional e abono pecuniário.",
  },
  keywords: [
    "calculadora de férias",
    "calcular férias CLT",
    "1/3 constitucional férias",
    "abono pecuniário",
    "venda de férias",
    "férias proporcionais",
    "férias vencidas",
    "cálculo de férias online",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
