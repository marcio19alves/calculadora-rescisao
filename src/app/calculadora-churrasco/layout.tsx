import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Churrasco Grátis | Calculadora Trabalhista",
  description:
    "Calcule a quantidade ideal de carnes, bebidas e acompanhamentos para seu churrasco. Calculadora completa: picanha, alcatra, frango, cerveja, refrigerante e mais. Grátis e sem cadastro.",
  openGraph: {
    title: "Calculadora de Churrasco Grátis",
    description:
      "Calcule carnes, bebidas e acompanhamentos para seu churrasco perfeito. Grátis.",
  },
};

export default function ChurrascoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
