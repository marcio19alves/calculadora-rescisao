import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Empregado Doméstico — INSS, FGTS, 13º, Férias e Encargos',
  description:
    'Calculadora online completa para empregado doméstico. Calcule INSS, FGTS, multa FGTS (40%), 13º proporcional, férias + 1/3, vale transporte e alimentação. Simule custo total do empregador e valor líquido do empregado.',
  keywords: [
    'empregado doméstico',
    'calculadora',
    'INSS',
    'FGTS',
    '13º salário',
    'férias',
    'encargos trabalhistas',
    'PEC das Domésticas',
    'Lei Complementar 150',
    'direitos trabalhistas',
    'eSocial doméstico',
    'Simples Doméstico',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Calculadora de Empregado Doméstico',
    description:
      'Simule todos os encargos trabalhistas do empregado doméstico: INSS, FGTS, 13º, férias e mais.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function CalculadoraEmpregadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
