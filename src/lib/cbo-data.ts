export interface CargoInfo {
  slug: string;
  nome: string;
  nomeMasculino: string;
  nomeFeminino: string;
  descricao: string;
}

export const cargos: CargoInfo[] = [
  {
    slug: "analista-de-sistemas",
    nome: "Analista de Sistemas",
    nomeMasculino: "analista de sistemas",
    nomeFeminino: "analista de sistemas",
    descricao:
      "Analistas de sistemas geralmente têm salários acima da média e podem ter direito a horas extras por sobreaviso dependendo do contrato. Na rescisão, é comum que tenham banco de horas acumulado e verbas de PLR (Participação nos Lucros e Resultados) a receber.",
  },
  {
    slug: "auxiliar-administrativo",
    nome: "Auxiliar Administrativo",
    nomeMasculino: "auxiliar administrativo",
    nomeFeminino: "auxiliar administrativa",
    descricao:
      "Auxiliares administrativos geralmente recebem salário próximo ao piso da categoria e podem ter direito a vale-transporte e vale-refeição que integram a base de cálculo de algumas verbas rescisórias.",
  },
  {
    slug: "vendedor",
    nome: "Vendedor",
    nomeMasculino: "vendedor",
    nomeFeminino: "vendedora",
    descricao:
      "Vendedores costumam ter salário variável com comissões, o que impacta diretamente o cálculo da rescisão, pois a média das comissões dos últimos 12 meses deve ser considerada no aviso prévio e 13º proporcional.",
  },
  {
    slug: "professor",
    nome: "Professor",
    nomeMasculino: "professor",
    nomeFeminino: "professora",
    descricao:
      "Professores têm regras específicas na CLT, incluindo o período de férias escolares e o recesso. Na rescisão, é importante considerar o salário-base por hora-aula e o adicional de hora-atividade.",
  },
  {
    slug: "motorista",
    nome: "Motorista",
    nomeMasculino: "motorista",
    nomeFeminino: "motorista",
    descricao:
      "Motoristas profissionais podem ter jornadas especiais de trabalho e horas extras habituais, além de adicional de periculosidade de 30% sobre o salário base que integra todas as verbas rescisórias.",
  },
  {
    slug: "pedreiro",
    nome: "Pedreiro",
    nomeMasculino: "pedreiro",
    nomeFeminino: "pedreira",
    descricao:
      "Pedreiros geralmente trabalham em regime de empreitada ou por produção, o que exige atenção especial no cálculo das verbas rescisórias. Horas extras habituais e adicional de insalubridade são comuns na categoria.",
  },
  {
    slug: "enfermeiro",
    nome: "Enfermeiro",
    nomeMasculino: "enfermeiro",
    nomeFeminino: "enfermeira",
    descricao:
      "Enfermeiros cumprem escala de plantão de 12x36 ou 12x60 horas, o que gera impacto direto no cálculo de horas extras e adicional noturno na rescisão. O adicional de insalubridade também deve ser considerado.",
  },
  {
    slug: "advogado",
    nome: "Advogado",
    nomeMasculino: "advogado",
    nomeFeminino: "advogada",
    descricao:
      "Advogados empregados têm salário mínimo profissional definido por lei e jornada de 4 horas diárias ou 8 horas para bancas. Na rescisão, honorários contratuais e horas extras acima da jornada contratual devem ser apurados.",
  },
  {
    slug: "contador",
    nome: "Contador",
    nomeMasculino: "contador",
    nomeFeminino: "contadora",
    descricao:
      "Contadores geralmente têm salários compatíveis com o piso da categoria contábil e podem acumular horas extras em períodos de fechamento fiscal. O salário-base e adicionais devem ser corretamente provisionados na rescisão.",
  },
  {
    slug: "engenheiro",
    nome: "Engenheiro",
    nomeMasculino: "engenheiro",
    nomeFeminino: "engenheira",
    descricao:
      "Engenheiros possuem salário mínimo profissional definido por lei (piso do CREA) e jornada de 6 a 8 horas diárias. Na rescisão, é comum haver adicional de periculosidade e horas extras acima da jornada contratual.",
  },
  {
    slug: "medico",
    nome: "Médico",
    nomeMasculino: "médico",
    nomeFeminino: "médica",
    descricao:
      "Médicos têm piso salarial da categoria médica e podem trabalhar em múltiplos vínculos. Na rescisão, é fundamental considerar plantões extras, adicional noturno e sobreaviso, comuns na área da saúde.",
  },
  {
    slug: "dentista",
    nome: "Dentista",
    nomeMasculino: "dentista",
    nomeFeminino: "dentista",
    descricao:
      "Dentistas empregados em clínicas têm piso salarial definido pela categoria odontológica. Na rescisão, horas extras além da jornada contratual e percentuais sobre procedimentos realizados podem fazer parte do acerto.",
  },
  {
    slug: "psicologo",
    nome: "Psicólogo",
    nomeMasculino: "psicólogo",
    nomeFeminino: "psicóloga",
    descricao:
      "Psicólogos clínicos e organizacionais geralmente atuam com carga horária de 6 a 8 horas diárias. Na rescisão, o salário-base e eventuais horas extras ou adicional de insalubridade devem ser considerados no cálculo.",
  },
  {
    slug: "farmaceutico",
    nome: "Farmacêutico",
    nomeMasculino: "farmacêutico",
    nomeFeminino: "farmacêutica",
    descricao:
      "Farmacêuticos têm piso salarial definido pela categoria e jornada de 6 horas diárias (ou 8, com acordo). Na rescisão, adicional de insalubridade e horas extras sobre a jornada legal são verbas comuns na categoria.",
  },
  {
    slug: "arquiteto",
    nome: "Arquiteto",
    nomeMasculino: "arquiteto",
    nomeFeminino: "arquiteta",
    descricao:
      "Arquitetos têm piso salarial do CAU e jornada de 6 a 8 horas. Na rescisão, horas extras habituais e adicional de periculosidade em visitas a obras podem integrar o cálculo das verbas rescisórias.",
  },
  {
    slug: "administrador",
    nome: "Administrador",
    nomeMasculino: "administrador",
    nomeFeminino: "administradora",
    descricao:
      "Administradores de empresas têm piso salarial regulamentado e jornada de 8 horas. Na rescisão, é comum haver participação nos lucros (PLR) e banco de horas que devem ser quitados no acerto trabalhista.",
  },
  {
    slug: "assistente-social",
    nome: "Assistente Social",
    nomeMasculino: "assistente social",
    nomeFeminino: "assistente social",
    descricao:
      "Assistentes sociais atuam com jornada de 30 horas semanais. Na rescisão, o salário proporcional às horas trabalhadas e eventuais adicionais de insalubridade por atuação em áreas de risco devem ser calculados.",
  },
  {
    slug: "nutricionista",
    nome: "Nutricionista",
    nomeMasculino: "nutricionista",
    nomeFeminino: "nutricionista",
    descricao:
      "Nutricionistas têm piso salarial da categoria e jornada de 6 a 8 horas diárias. Na rescisão, adicional de insalubridade para quem atua em hospitais e horas extras habituais devem ser incluídos no cálculo.",
  },
  {
    slug: "tecnico-de-enfermagem",
    nome: "Técnico de Enfermagem",
    nomeMasculino: "técnico de enfermagem",
    nomeFeminino: "técnica de enfermagem",
    descricao:
      "Técnicos de enfermagem cumprem escalas de plantão e têm adicional de insalubridade de 20% sobre o salário mínimo. Na rescisão, adicional noturno, horas extras e plantões não pagos devem ser cuidadosamente apurados.",
  },
  {
    slug: "analista-de-rh",
    nome: "Analista de RH",
    nomeMasculino: "analista de RH",
    nomeFeminino: "analista de RH",
    descricao:
      "Analistas de RH geralmente têm salário fixo com possibilidade de bônus e PLR. Na rescisão, é importante calcular corretamente as verbas, já que o profissional conhece seus direitos trabalhistas em detalhes.",
  },
  {
    slug: "analista-financeiro",
    nome: "Analista Financeiro",
    nomeMasculino: "analista financeiro",
    nomeFeminino: "analista financeira",
    descricao:
      "Analistas financeiros geralmente recebem salário acima da média do setor administrativo e podem ter bônus anuais. Na rescisão, PLR e horas extras em períodos de fechamento devem ser incluídas no cálculo.",
  },
  {
    slug: "analista-de-marketing",
    nome: "Analista de Marketing",
    nomeMasculino: "analista de marketing",
    nomeFeminino: "analista de marketing",
    descricao:
      "Analistas de marketing têm salário variável com possibilidade de comissões por resultados. Na rescisão, a média de comissões dos últimos 12 meses deve integrar o cálculo do aviso prévio e demais verbas.",
  },
  {
    slug: "coordenador-pedagogico",
    nome: "Coordenador Pedagógico",
    nomeMasculino: "coordenador pedagógico",
    nomeFeminino: "coordenadora pedagógica",
    descricao:
      "Coordenadores pedagógicos têm regime especial de trabalho na educação básica. Na rescisão, o salário-base e a gratificação de função devem ser considerados, além do período de férias escolares que pode influenciar o cálculo.",
  },
  {
    slug: "gerente-comercial",
    nome: "Gerente Comercial",
    nomeMasculino: "gerente comercial",
    nomeFeminino: "gerente comercial",
    descricao:
      "Gerentes comerciais geralmente têm salário fixo mais comissionamento variável. Na rescisão, a média de comissões dos últimos 12 meses e eventuais bônus por metas são verbas que devem ser calculadas.",
  },
  {
    slug: "supervisor-de-producao",
    nome: "Supervisor de Produção",
    nomeMasculino: "supervisor de produção",
    nomeFeminino: "supervisora de produção",
    descricao:
      "Supervisores de produção atuam em indústrias com jornada de 8 horas e turnos de revezamento. Na rescisão, adicional noturno, horas extras e adicional de periculosidade são comuns na categoria.",
  },
  {
    slug: "operador-de-caixa",
    nome: "Operador de Caixa",
    nomeMasculino: "operador de caixa",
    nomeFeminino: "operadora de caixa",
    descricao:
      "Operadores de caixa trabalham em escalas de 6 a 8 horas no comércio. Na rescisão, horas extras habituais, adicional noturno em turnos estendidos e descontos de faltas devem ser considerados no cálculo.",
  },
  {
    slug: "recepcionista",
    nome: "Recepcionista",
    nomeMasculino: "recepcionista",
    nomeFeminino: "recepcionista",
    descricao:
      "Recepcionistas têm jornada de 6 a 8 horas diárias com possibilidade de horas extras. Na rescisão, o salário-base e eventuais adicionais de periculosidade para recepções em áreas de risco devem ser apurados.",
  },
  {
    slug: "auxiliar-de-limpeza",
    nome: "Auxiliar de Limpeza",
    nomeMasculino: "auxiliar de limpeza",
    nomeFeminino: "auxiliar de limpeza",
    descricao:
      "Auxiliares de limpeza geralmente recebem salário mínimo ou piso da categoria. Na rescisão, adicional de insalubridade de 20% (grau médio) sobre o salário mínimo é um direito comum que deve ser incluído no cálculo.",
  },
  {
    slug: "porteiro",
    nome: "Porteiro",
    nomeMasculino: "porteiro",
    nomeFeminino: "porteira",
    descricao:
      "Porteiros trabalham em regime de escala 12x36 ou 6x1, com frequente adicional noturno. Na rescisão, é essencial calcular corretamente as horas noturnas reduzidas e o adicional de periculosidade em condomínios.",
  },
  {
    slug: "copeira",
    nome: "Copeira",
    nomeMasculino: "copeiro",
    nomeFeminino: "copeira",
    descricao:
      "Copeiras atuam em empresas, hotéis e hospitais com jornada de 6 a 8 horas. Na rescisão, adicional de insalubridade (grau médio) e horas extras habituais são verbas comuns que devem fazer parte do acerto trabalhista.",
  },
];
