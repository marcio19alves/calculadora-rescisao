import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Escala de Trabalho — Simulador Online Grátis',
  description:
    'Calcule dias trabalhados/mês, horas mensais totais, valor-hora, DSR (Descanso Semanal Remunerado), salário proporcional e adicional noturno para escalas 6x1, 12x36, 5x2 e 4x3. Grátis e online.',
  keywords: [
    'calculadora escala de trabalho',
    'simulador escala 6x1',
    'escala 12x36 calculadora',
    'DSR descanso semanal',
    'adicional noturno',
    'salário proporcional',
    'valor hora',
    'jornada de trabalho',
    'Súmula 444 TST',
    'escala 5x2',
    'escala 4x3',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Calculadora de Escala de Trabalho',
    description:
      'Simule sua escala de trabalho com DSR, adicional noturno e salário proporcional. Compare escalas 6x1, 12x36, 5x2 e 4x3.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function EscalaTrabalhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
