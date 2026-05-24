// Tabelas INSS e IRRF vigentes em 2026
// ATUALIZAR ANUALMENTE

export const TABELA_INSS_2026 = [
  { faixa: 1, ate: 1518.00, aliquota: 0.075 },
  { faixa: 2, ate: 2793.88, aliquota: 0.09 },
  { faixa: 3, ate: 4190.83, aliquota: 0.12 },
  { faixa: 4, ate: 8157.41, aliquota: 0.14 },
] as const;

export const TETO_INSS = 8157.41;

export const TABELA_IRRF_2026 = [
  { faixa: 1, ate: 2259.20, aliquota: 0, deducao: 0 },
  { faixa: 2, ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { faixa: 3, ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { faixa: 4, ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { faixa: 5, ate: Infinity, aliquota: 0.275, deducao: 896.00 },
] as const;

export const DEPENDENTE_DEDUCAO = 189.59;

// Tipos
export type MotivoRescisao =
  | "sem-justa-causa"
  | "pedido-demissao"
  | "justa-causa"
  | "comum-acordo"
  | "termino-experiencia"
  | "aposentadoria"
  | "falecimento";

export type AvisoPrevio = "trabalhado" | "indenizado" | "dispensado";

export interface DadosRescisao {
  dataAdmissao: Date;
  dataDemissao: Date;
  motivo: MotivoRescisao;
  salario: number;
  avisoPrevio: AvisoPrevio;
  diasAvisoPrevio: number;
  feriasVencidas: boolean;
  incluirFGTS: boolean;
  saldoFGTS?: number;
}
