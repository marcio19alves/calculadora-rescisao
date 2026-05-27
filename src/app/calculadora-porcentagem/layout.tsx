import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem Online Grátis | Calculadora Trabalhista",
  description:
    "Calcule porcentagens online grátis: X% de Y, X é quantos % de Y, aumento/desconto percentual. Resultado imediato, sem cadastro.",
  openGraph: {
    title: "Calculadora de Porcentagem Online Grátis",
    description:
      "Calcule porcentagens online grátis: X% de Y, X é quantos % de Y, aumento/desconto percentual.",
  },
};

export default function PorcentagemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
