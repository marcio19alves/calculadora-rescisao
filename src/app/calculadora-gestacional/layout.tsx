import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora Gestacional Online Grátis | Calculadora Trabalhista",
  description:
    "Calcule sua idade gestacional em semanas e dias, data provável do parto (DPP), trimestre atual e semanas restantes. Calculadora de gestação online grátis, sem cadastro.",
  openGraph: {
    title: "Calculadora Gestacional Online Grátis",
    description:
      "Calcule sua idade gestacional, DPP, trimestre e semanas restantes. Grátis e sem cadastro.",
  },
};

export default function GestacionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
