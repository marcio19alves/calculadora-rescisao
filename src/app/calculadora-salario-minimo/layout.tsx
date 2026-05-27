import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salário Mínimo 2025 — Valor Atual R$1.518 e Tabela Histórica',
  description:
    'Saiba o valor atual do salário mínimo em 2025 (R$1.518), quanto é por dia (R$72,29) e por hora (R$6,90). Veja a tabela histórica 2020–2025, jornada de 44h/semana e 220h/mês. Guia completo e gratuito.',
  keywords: [
    'salário mínimo 2025',
    'valor salário mínimo',
    'R$ 1.518',
    'salário mínimo por dia',
    'salário mínimo por hora',
    'tabela histórica salário mínimo',
    'salário mínimo 2024',
    'salário mínimo 2023',
    'jornada 44 horas semanais',
    '220 horas mensais',
    'reajuste salário mínimo',
    'quem tem direito ao salário mínimo',
    'como é calculado o salário mínimo',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Salário Mínimo 2025 — Valor Atual R$1.518 e Tabela Histórica',
    description:
      'Valor atual do salário mínimo 2025: R$1.518. Cálculo por dia (R$72,29), por hora (R$6,90) e jornada de 44h/semana. Tabela completa de 2020 a 2025.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function SalarioMinimoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
