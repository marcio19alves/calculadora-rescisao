import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão — Widget Embedável",
  description:
    "Widget embedável da calculadora de rescisão CLT. Adicione gratuitamente ao seu site com iframe.",
  robots: { index: true, follow: true },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
