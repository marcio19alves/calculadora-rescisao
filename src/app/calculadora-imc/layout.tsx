import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IMC Online Grátis | Calculadora Trabalhista",
  description:
    "Calcule seu IMC (Índice de Massa Corporal) online grátis. Descubra sua classificação, peso ideal mínimo e máximo. Tabela da OMS completa. Resultado imediato.",
  openGraph: {
    title: "Calculadora de IMC Online Grátis",
    description:
      "Calcule seu IMC e descubra sua classificação segundo a OMS. Peso ideal mínimo e máximo incluídos.",
  },
};

export default function ImcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
