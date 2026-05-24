import {
  DadosRescisao,
  MotivoRescisao,
  TABELA_INSS_2026,
  TETO_INSS,
  TABELA_IRRF_2026,
} from "@/lib/taxas-2026";

export interface ResultadoRescisao {
  verbas: Verba[];
  totalBruto: number;
  totalDescontos: number;
  totalLiquido: number;
  fgts: FGTSResultado | null;
}

export interface Verba {
  nome: string;
  valor: number;
  tipo: "vencimento" | "desconto" | "informativo";
  detalhes?: string;
}

export interface FGTSResultado {
  saldoFGTS: number;
  multa40: number;
  totalFGTS: number;
}

// Utilitários de data
function diasTrabalhadosNoMes(data: Date): number {
  return data.getDate();
}

function diasNoMes(data: Date): number {
  return new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();
}

function mesesTrabalhados(dataAdmissao: Date, dataDemissao: Date): number {
  const diffAnos = dataDemissao.getFullYear() - dataAdmissao.getFullYear();
  const diffMeses = dataDemissao.getMonth() - dataAdmissao.getMonth();
  const totalMeses = diffAnos * 12 + diffMeses;
  
  // Se a demissão é antes do dia da admissão no mesmo mês, não conta o mês cheio
  if (dataDemissao.getDate() < dataAdmissao.getDate()) {
    return Math.max(0, totalMeses - 1);
  }
  return Math.max(0, totalMeses);
}

function calcularINSS(salario: number): number {
  let desconto = 0;
  let faixaAnterior = 0;

  for (const faixa of TABELA_INSS_2026) {
    const base = Math.min(salario, faixa.ate) - faixaAnterior;
    if (base <= 0) break;
    desconto += base * faixa.aliquota;
    faixaAnterior = faixa.ate;
  }

  return desconto;
}

function calcularIRRF(baseCalculo: number): number {
  let imposto = 0;

  for (const faixa of TABELA_IRRF_2026) {
    if (baseCalculo <= faixa.ate) {
      imposto = baseCalculo * faixa.aliquota - faixa.deducao;
      break;
    }
  }

  return Math.max(0, imposto);
}

function diasAvisoPrevio(anosTrabalhados: number): number {
  // 30 dias base + 3 dias por ano trabalhado (máx 90)
  return Math.min(30 + Math.floor(anosTrabalhados) * 3, 90);
}

function temDireitoMulta40(motivo: MotivoRescisao): boolean {
  return motivo === "sem-justa-causa" || motivo === "falecimento" || motivo === "aposentadoria";
}

function temDireitoMulta20(motivo: MotivoRescisao): boolean {
  return motivo === "comum-acordo";
}

function temDireitoSaqueFGTS(motivo: MotivoRescisao): boolean {
  return motivo === "sem-justa-causa" || motivo === "falecimento" || motivo === "aposentadoria" || motivo === "termino-experiencia";
}

function temDireitoSeguroDesemprego(motivo: MotivoRescisao): boolean {
  return motivo === "sem-justa-causa" || motivo === "falecimento" || motivo === "aposentadoria";
}

export function calcularRescisao(dados: DadosRescisao): ResultadoRescisao {
  const verbas: Verba[] = [];
  const {
    dataAdmissao,
    dataDemissao,
    motivo,
    salario,
    avisoPrevio,
    diasAvisoPrevio: diasAP,
    feriasVencidas,
    incluirFGTS,
    saldoFGTS,
  } = dados;

  const salarioDia = salario / 30;
  const diasTrab = diasTrabalhadosNoMes(dataDemissao);
  const totalDiasMes = diasNoMes(dataDemissao);
  const mesesTrab = mesesTrabalhados(dataAdmissao, dataDemissao);
  const anosTrab = mesesTrab / 12;
  const diasAPCalculados = diasAP || diasAvisoPrevio(anosTrab);

  // --- VENCIMENTOS ---

  // 1. Saldo de salário
  const saldoSalario = salarioDia * diasTrab;
  verbas.push({
    nome: "Saldo de Salário",
    valor: saldoSalario,
    tipo: "vencimento",
    detalhes: `${diasTrab}/${totalDiasMes} dias`,
  });

  // 2. Aviso prévio
  let valorAvisoPrevio = 0;
  if (avisoPrevio === "indenizado" && motivo !== "pedido-demissao") {
    valorAvisoPrevio = salarioDia * diasAPCalculados;
    verbas.push({
      nome: "Aviso Prévio Indenizado",
      valor: valorAvisoPrevio,
      tipo: "vencimento",
      detalhes: `${diasAPCalculados} dias`,
    });
  } else if (avisoPrevio === "trabalhado" || avisoPrevio === "dispensado") {
    // Aviso trabalhado ou dispensado - recebe pelo período
    valorAvisoPrevio = salarioDia * Math.min(diasAPCalculados, 30);
    verbas.push({
      nome: "Aviso Prévio",
      valor: valorAvisoPrevio,
      tipo: "vencimento",
    });
  }

  // 3. Projeção do aviso prévio no cálculo de outros direitos
  const dataProjetada = new Date(dataDemissao);
  if (avisoPrevio === "indenizado") {
    dataProjetada.setDate(dataProjetada.getDate() + diasAPCalculados);
  }

  const mesesProjetados = mesesTrabalhados(dataAdmissao, dataProjetada);

  // 4. Férias vencidas (se houver e for demissão sem justa causa)
  if (feriasVencidas && motivo !== "justa-causa" && motivo !== "pedido-demissao") {
    const valorFeriasVencidas = salario + salario / 3;
    verbas.push({
      nome: "Férias Vencidas",
      valor: valorFeriasVencidas,
      tipo: "vencimento",
      detalhes: "incluindo 1/3 constitucional",
    });
  }

  // 5. Férias proporcionais
  const mesesUltimoPeriodo = mesesProjetados % 12;
  if (mesesUltimoPeriodo > 0 && motivo !== "justa-causa") {
    const avos = Math.min(Math.ceil(mesesUltimoPeriodo / 30 > 0 ? mesesUltimoPeriodo / 30 : mesesUltimoPeriodo / (365/12)), 12);
    const feriasProporcionais = (salario / 12) * avos + (salario / 12) * avos / 3;
    verbas.push({
      nome: "Férias Proporcionais",
      valor: feriasProporcionais,
      tipo: "vencimento",
      detalhes: `${avos}/12 avos + 1/3`,
    });
  }

  // 6. 13º Salário proporcional
  const meses13 = Math.min(Math.ceil(mesesProjetados > 0 ? mesesProjetados : 0.1), 12);
  let valor13 = 0;
  if (meses13 > 1) {
    valor13 = (salario / 12) * (meses13 - 1); // -1 porque saldo de salário já conta
    // Mas para demissão no mesmo mês, não tem 13º
    if (meses13 > 1) {
      verbas.push({
        nome: "13º Salário Proporcional",
        valor: valor13,
        tipo: "vencimento",
        detalhes: `${meses13 - 1}/12 avos`,
      });
    }
  }

  // 7. (reservado para indenização adicional)
  //

  // --- DESCONTOS ---

  // Calcular base para INSS
  const baseINSS = saldoSalario;
  const inss = calcularINSS(baseINSS);
  
  // INSS sobre 13º
  const inss13 = calcularINSS(valor13);
  
  // INSS sobre aviso prévio indenizado (se aplicável)
  const inssAP = avisoPrevio === "indenizado" ? calcularINSS(valorAvisoPrevio) : 0;

  // Total descontos INSS (não pode ultrapassar o teto)
  const totalINSS = Math.min(inss + inss13 + inssAP, calcularINSS(TETO_INSS));
  
  if (totalINSS > 0) {
    verbas.push({
      nome: "Desconto INSS",
      valor: -totalINSS,
      tipo: "desconto",
    });
  }

  // Base IRRF (saldo + aviso indenizado - INSS - dependentes)
  const baseIRRF = baseINSS + (avisoPrevio === "indenizado" ? valorAvisoPrevio : 0) - totalINSS;
  const irrf = calcularIRRF(Math.max(0, baseIRRF));
  
  if (irrf > 0) {
    verbas.push({
      nome: "Desconto IRRF",
      valor: -irrf,
      tipo: "desconto",
    });
  }

  // --- FGTS ---
  let resultadoFGTS: FGTSResultado | null = null;

  if (incluirFGTS && saldoFGTS !== undefined) {
    const baseFGTS = saldoSalario + valorAvisoPrevio + valor13;
    const depositoMes = baseFGTS * 0.08;
    const saldoTotal = saldoFGTS + depositoMes;

    let multa = 0;
    if (temDireitoMulta40(motivo)) {
      multa = saldoTotal * 0.40;
    } else if (temDireitoMulta20(motivo)) {
      multa = saldoTotal * 0.20;
    }

    resultadoFGTS = {
      saldoFGTS: saldoTotal,
      multa40: multa,
      totalFGTS: saldoTotal + multa,
    };
  }

  // Totais
  const totalBruto = verbas
    .filter((v) => v.tipo === "vencimento")
    .reduce((acc, v) => acc + v.valor, 0);

  const totalDescontos = verbas
    .filter((v) => v.tipo === "desconto")
    .reduce((acc, v) => acc + Math.abs(v.valor), 0);

  const totalLiquido = totalBruto - totalDescontos;

  // Verbas informativas
  if (temDireitoSaqueFGTS(motivo)) {
    verbas.push({
      nome: "Saque do FGTS",
      valor: 0,
      tipo: "informativo",
      detalhes: "Você tem direito ao saque do FGTS",
    });
  }

  if (temDireitoSeguroDesemprego(motivo)) {
    verbas.push({
      nome: "Seguro-Desemprego",
      valor: 0,
      tipo: "informativo",
      detalhes: "Você pode ter direito ao seguro-desemprego",
    });
  }

  return {
    verbas,
    totalBruto,
    totalDescontos,
    totalLiquido,
    fgts: resultadoFGTS,
  };
}
