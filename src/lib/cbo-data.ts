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
  {
    slug: "auxiliar-de-cozinha",
    nome: "Auxiliar de Cozinha",
    nomeMasculino: "auxiliar de cozinha",
    nomeFeminino: "auxiliar de cozinha",
    descricao:
      "Auxiliares de cozinha trabalham em restaurantes, hotéis e hospitais com jornada de 6 a 8 horas. Na rescisão, adicional de insalubridade de 20% sobre o salário mínimo e horas extras habituais são direitos comuns na categoria.",
  },
  {
    slug: "faxineiro",
    nome: "Faxineiro",
    nomeMasculino: "faxineiro",
    nomeFeminino: "faxineira",
    descricao:
      "Faxineiros atuam na limpeza de empresas, condomínios e residências. Na rescisão, adicional de insalubridade de 20% (grau médio) sobre o salário mínimo é um direito comum que deve ser incluído no cálculo trabalhista.",
  },
  {
    slug: "carpinteiro",
    nome: "Carpinteiro",
    nomeMasculino: "carpinteiro",
    nomeFeminino: "carpinteira",
    descricao:
      "Carpinteiros atuam na construção civil com jornada de 8 horas. Na rescisão, adicional de periculosidade e insalubridade são comuns na categoria, além de horas extras habituais em períodos de obra intensa.",
  },
  {
    slug: "jardineiro",
    nome: "Jardineiro",
    nomeMasculino: "jardineiro",
    nomeFeminino: "jardineira",
    descricao:
      "Jardineiros trabalham na manutenção de áreas verdes em condomínios, empresas e residências. Na rescisão, adicional de insalubridade de 20% sobre o salário mínimo e horas extras são verbas comuns na categoria.",
  },
  {
    slug: "zelador",
    nome: "Zelador",
    nomeMasculino: "zelador",
    nomeFeminino: "zeladora",
    descricao:
      "Zeladores trabalham em condomínios com jornada de 8 horas ou escala 6x1. Na rescisão, adicional noturno e horas extras habituais são comuns, além do vale-transporte que integra o salário para algumas verbas.",
  },
  {
    slug: "padeiro",
    nome: "Padeiro",
    nomeMasculino: "padeiro",
    nomeFeminino: "padeira",
    descricao:
      "Padeiros trabalham em padarias e confeitarias com jornada noturna frequente. Na rescisão, adicional noturno de 20% e horas extras habituais são direitos comuns, além do adicional de insalubridade por trabalho em ambiente com altas temperaturas.",
  },
  {
    slug: "seguranca",
    nome: "Segurança",
    nomeMasculino: "segurança",
    nomeFeminino: "segurança",
    descricao:
      "Seguranças patrimoniais trabalham em escala 12x36 com frequente adicional noturno. Na rescisão, adicional de periculosidade de 30% sobre o salário base integra todas as verbas, incluindo FGTS e férias.",
  },
  {
    slug: "eletricista",
    nome: "Eletricista",
    nomeMasculino: "eletricista",
    nomeFeminino: "eletricista",
    descricao:
      "Eletricistas atuam na construção civil e manutenção predial. Na rescisão, adicional de periculosidade de 30% sobre o salário base e horas extras habituais são verbas que devem ser incluídas no cálculo trabalhista.",
  },
  {
    slug: "mecanico",
    nome: "Mecânico",
    nomeMasculino: "mecânico",
    nomeFeminino: "mecânica",
    descricao:
      "Mecânicos trabalham em oficinas e concessionárias com jornada de 8 horas. Na rescisão, adicional de insalubridade de 20% (grau médio) por exposição a óleos e graxas e horas extras habituais são direitos comuns.",
  },
  {
    slug: "servente-de-obras",
    nome: "Servente de Obras",
    nomeMasculino: "servente de obras",
    nomeFeminino: "servente de obras",
    descricao:
      "Serventes de obras trabalham na construção civil auxiliando pedreiros e mestres de obras. Na rescisão, é comum haver horas extras habituais, adicional de insalubridade e adicional de periculosidade que devem integrar o cálculo das verbas rescisórias.",
  },
  {
    slug: "pintor",
    nome: "Pintor",
    nomeMasculino: "pintor",
    nomeFeminino: "pintora",
    descricao:
      "Pintores da construção civil trabalham com jornada de 8 horas diárias. Na rescisão, adicional de insalubridade de 20% sobre o salário mínimo por exposição a solventes e tintas, além de horas extras habituais, devem ser incluídos no cálculo.",
  },
  {
    slug: "encanador",
    nome: "Encanador",
    nomeMasculino: "encanador",
    nomeFeminino: "encanadora",
    descricao:
      "Encanadores atuam na instalação e manutenção de sistemas hidráulicos. Na rescisão, adicional de periculosidade de 30% sobre o salário base e horas extras habituais são verbas comuns que devem ser calculadas corretamente.",
  },
  {
    slug: "gesseiro",
    nome: "Gesseiro",
    nomeMasculino: "gesseiro",
    nomeFeminino: "gesseira",
    descricao:
      "Gesseiros atuam na construção civil com instalação de forros e drywall. Na rescisão, adicional de insalubridade de 20% por exposição ao pó de gesso e horas extras habituais são direitos comuns na categoria.",
  },
  {
    slug: "mestre-de-obras",
    nome: "Mestre de Obras",
    nomeMasculino: "mestre de obras",
    nomeFeminino: "mestra de obras",
    descricao:
      "Mestres de obras supervisionam equipes na construção civil com jornada de 8 horas. Na rescisão, adicional de periculosidade, horas extras e gratificação de função devem ser considerados no cálculo das verbas rescisórias.",
  },
  {
    slug: "operador-de-maquinas",
    nome: "Operador de Máquinas",
    nomeMasculino: "operador de máquinas",
    nomeFeminino: "operadora de máquinas",
    descricao:
      "Operadores de máquinas pesadas atuam em construção e mineração. Na rescisão, adicional de periculosidade de 30% sobre o salário base e horas extras habituais devem ser incluídos no cálculo das verbas rescisórias.",
  },
  {
    slug: "camareira",
    nome: "Camareira",
    nomeMasculino: "camareiro",
    nomeFeminino: "camareira",
    descricao:
      "Camareiras trabalham em hotéis com jornada de 6 a 8 horas. Na rescisão, adicional de insalubridade de 20% sobre o salário mínimo e horas extras habituais são direitos comuns que devem ser calculados.",
  },
  {
    slug: "cozinheiro",
    nome: "Cozinheiro",
    nomeMasculino: "cozinheiro",
    nomeFeminino: "cozinheira",
    descricao:
      "Cozinheiros atuam em restaurantes, hotéis e hospitais com jornada de 8 horas. Na rescisão, adicional de insalubridade de 20% por exposição ao calor excessivo e horas extras habituais são verbas comuns na categoria.",
  },
  {
    slug: "garcom",
    nome: "Garçom",
    nomeMasculino: "garçom",
    nomeFeminino: "garçonete",
    descricao:
      "Garçons trabalham em bares e restaurantes com salário variável composto por gorjetas. Na rescisão, a média de gorjetas dos últimos 12 meses e horas extras devem ser incluídas no cálculo das verbas rescisórias.",
  },
  {
    slug: "cabeleireiro",
    nome: "Cabeleireiro",
    nomeMasculino: "cabeleireiro",
    nomeFeminino: "cabeleireira",
    descricao:
      "Cabeleireiros empregados em salões de beleza têm jornada de 6 a 8 horas. Na rescisão, comissões sobre serviços e vendas de produtos devem integrar o cálculo das verbas rescisórias.",
  },
  {
    slug: "manicure",
    nome: "Manicure",
    nomeMasculino: "manicure",
    nomeFeminino: "manicure",
    descricao:
      "Manicures empregadas em salões de beleza têm jornada de 6 horas. Na rescisão, comissões sobre serviços e adicional de insalubridade de 20% por exposição a produtos químicos devem ser considerados.",
  },
  {
    slug: "lavadeira",
    nome: "Lavadeira",
    nomeMasculino: "lavadeiro",
    nomeFeminino: "lavadeira",
    descricao:
      "Lavadeiras trabalham em lavanderias comerciais com jornada de 8 horas. Na rescisão, adicional de insalubridade de 20% por contato com produtos químicos e horas extras habituais devem ser incluídos no cálculo.",
  },
  {
    slug: "passadeira",
    nome: "Passadeira",
    nomeMasculino: "passadeiro",
    nomeFeminino: "passadeira",
    descricao:
      "Passadeiras atuam em lavanderias e empresas de serviços com jornada de 8 horas. Na rescisão, adicional de insalubridade de 20% e horas extras habituais são direitos comuns na categoria.",
  },
  {
    slug: "atendente",
    nome: "Atendente",
    nomeMasculino: "atendente",
    nomeFeminino: "atendente",
    descricao:
      "Atendentes trabalham no comércio e serviços com jornada de 6 a 8 horas. Na rescisão, comissões sobre vendas e horas extras habituais devem ser incluídas no cálculo das verbas rescisórias.",
  },
  {
    slug: "balconista",
    nome: "Balconista",
    nomeMasculino: "balconista",
    nomeFeminino: "balconista",
    descricao:
      "Balconistas atuam no comércio varejista com jornada de 6 a 8 horas. Na rescisão, comissões sobre vendas e horas extras aos domingos e feriados devem integrar o cálculo das verbas rescisórias.",
  },
  {
    slug: "frentista",
    nome: "Frentista",
    nomeMasculino: "frentista",
    nomeFeminino: "frentista",
    descricao:
      "Frentistas trabalham em postos de combustível com escala de 6x1. Na rescisão, adicional de periculosidade de 30% sobre o salário base e adicional noturno frequente devem ser considerados no cálculo.",
  },
  {
    slug: "repositor",
    nome: "Repositor",
    nomeMasculino: "repositor",
    nomeFeminino: "repositora",
    descricao:
      "Repositores atuam em supermercados com jornada de 8 horas. Na rescisão, horas extras habituais e adicional noturno para turnos de reposição noturna são verbas comuns na categoria.",
  },
  {
    slug: "conferente",
    nome: "Conferente",
    nomeMasculino: "conferente",
    nomeFeminino: "conferente",
    descricao:
      "Conferentes trabalham em estoques e almoxarifados conferindo mercadorias. Na rescisão, horas extras habituais e adicional de insalubridade são direitos comuns na categoria.",
  },
  {
    slug: "empacotador",
    nome: "Empacotador",
    nomeMasculino: "empacotador",
    nomeFeminino: "empacotadora",
    descricao:
      "Empacotadores atuam em supermercados com jornada parcial de 6 horas. Na rescisão, horas extras habituais e adicional noturno são verbas que devem ser consideradas no cálculo.",
  },
  {
    slug: "acougueiro",
    nome: "Açougueiro",
    nomeMasculino: "açougueiro",
    nomeFeminino: "açougueira",
    descricao:
      "Açougueiros trabalham em supermercados e açougues com jornada de 8 horas. Na rescisão, adicional de insalubridade de 20% por manuseio de carnes e horas extras habituais devem ser incluídos.",
  },
  {
    slug: "secretaria",
    nome: "Secretária",
    nomeMasculino: "secretário",
    nomeFeminino: "secretária",
    descricao:
      "Secretárias atuam em escritórios com jornada de 8 horas. Na rescisão, horas extras habituais e gratificação de função são verbas comuns que devem ser incluídas no cálculo.",
  },
  {
    slug: "office-boy",
    nome: "Office Boy",
    nomeMasculino: "office boy",
    nomeFeminino: "office girl",
    descricao:
      "Office boys atuam em escritórios realizando entregas externas com jornada de 8 horas. Na rescisão, vale-transporte que integra o salário e horas extras devem ser considerados no cálculo.",
  },
  {
    slug: "almoxarife",
    nome: "Almoxarife",
    nomeMasculino: "almoxarife",
    nomeFeminino: "almoxarife",
    descricao:
      "Almoxarifes gerenciam estoques e almoxarifados com jornada de 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade são direitos comuns na categoria.",
  },
  {
    slug: "estoquista",
    nome: "Estoquista",
    nomeMasculino: "estoquista",
    nomeFeminino: "estoquista",
    descricao:
      "Estoquistas controlam inventários em empresas com jornada de 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade por trabalho em ambientes frios ou úmidos devem ser incluídos.",
  },
  {
    slug: "telefonista",
    nome: "Telefonista",
    nomeMasculino: "telefonista",
    nomeFeminino: "telefonista",
    descricao:
      "Telefonistas trabalham com jornada de 6 horas regulamentar. Na rescisão, horas extras acima da jornada reduzida e adicional noturno para turnos estendidos devem ser calculados.",
  },
  {
    slug: "digitador",
    nome: "Digitador",
    nomeMasculino: "digitador",
    nomeFeminino: "digitadora",
    descricao:
      "Digitadores atuam em escritórios com jornada de 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade de 20% por trabalho repetitivo podem ser considerados no cálculo.",
  },
  {
    slug: "auxiliar-contabil",
    nome: "Auxiliar Contábil",
    nomeMasculino: "auxiliar contábil",
    nomeFeminino: "auxiliar contábil",
    descricao:
      "Auxiliares contábeis trabalham em escritórios de contabilidade com jornada de 8 horas. Na rescisão, horas extras em períodos de fechamento fiscal e PLR são verbas comuns na categoria.",
  },
  {
    slug: "auxiliar-fiscal",
    nome: "Auxiliar Fiscal",
    nomeMasculino: "auxiliar fiscal",
    nomeFeminino: "auxiliar fiscal",
    descricao:
      "Auxiliares fiscais atuam em departamentos fiscais com jornada de 8 horas. Na rescisão, horas extras habituais em períodos de obrigações acessórias e PLR devem ser incluídas no cálculo.",
  },
  {
    slug: "tecnico-de-radiologia",
    nome: "Técnico de Radiologia",
    nomeMasculino: "técnico de radiologia",
    nomeFeminino: "técnica de radiologia",
    descricao:
      "Técnicos de radiologia trabalham em hospitais com jornada de 8 horas. Na rescisão, adicional de insalubridade de 40% (grau máximo) por exposição à radiação e adicional noturno são direitos previstos em lei.",
  },
  {
    slug: "fisioterapeuta",
    nome: "Fisioterapeuta",
    nomeMasculino: "fisioterapeuta",
    nomeFeminino: "fisioterapeuta",
    descricao:
      "Fisioterapeutas atuam em clínicas e hospitais com jornada de 6 a 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade por contato com pacientes devem ser considerados.",
  },
  {
    slug: "biomedico",
    nome: "Biomédico",
    nomeMasculino: "biomédico",
    nomeFeminino: "biomédica",
    descricao:
      "Biomédicos trabalham em laboratórios com jornada de 6 a 8 horas. Na rescisão, adicional de insalubridade de 20% por manuseio de materiais biológicos e horas extras são verbas comuns.",
  },
  {
    slug: "veterinario",
    nome: "Veterinário",
    nomeMasculino: "veterinário",
    nomeFeminino: "veterinária",
    descricao:
      "Veterinários empregados em clínicas têm jornada de 6 a 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade por contato com animais devem ser considerados no cálculo.",
  },
  {
    slug: "auxiliar-de-veterinario",
    nome: "Auxiliar de Veterinário",
    nomeMasculino: "auxiliar de veterinário",
    nomeFeminino: "auxiliar de veterinária",
    descricao:
      "Auxiliares de veterinária trabalham em clínicas e pet shops. Na rescisão, horas extras habituais e adicional de insalubridade são direitos comuns que devem ser calculados.",
  },
  {
    slug: "cuidador-de-idosos",
    nome: "Cuidador de Idosos",
    nomeMasculino: "cuidador de idosos",
    nomeFeminino: "cuidadora de idosos",
    descricao:
      "Cuidadores de idosos trabalham em regime de 12x36 ou plantão. Na rescisão, adicional noturno, horas extras e adicional de insalubridade são verbas comuns na categoria.",
  },
  {
    slug: "massoterapeuta",
    nome: "Massoterapeuta",
    nomeMasculino: "massoterapeuta",
    nomeFeminino: "massoterapeuta",
    descricao:
      "Massoterapeutas empregados em clínicas e spas têm jornada de 6 a 8 horas. Na rescisão, comissões sobre serviços e horas extras habituais devem ser incluídas no cálculo das verbas.",
  },
  {
    slug: "caminhoneiro",
    nome: "Caminhoneiro",
    nomeMasculino: "caminhoneiro",
    nomeFeminino: "caminhoneira",
    descricao:
      "Caminhoneiros têm jornada especial de 8 horas prorrogáveis. Na rescisão, horas extras habituais, adicional noturno e adicional de periculosidade são verbas comuns que devem ser calculadas.",
  },
  {
    slug: "entregador",
    nome: "Entregador",
    nomeMasculino: "entregador",
    nomeFeminino: "entregadora",
    descricao:
      "Entregadores trabalham com jornada de 8 horas realizando entregas. Na rescisão, comissões por entrega e horas extras habituais devem integrar o cálculo das verbas rescisórias.",
  },
  {
    slug: "motoboy",
    nome: "Motoboy",
    nomeMasculino: "motoboy",
    nomeFeminino: "motogirl",
    descricao:
      "Motoboys trabalham com jornada de 8 horas realizando entregas rápidas. Na rescisão, adicional de periculosidade de 30% sobre o salário base e horas extras devem ser incluídos no cálculo.",
  },
  {
    slug: "operador-de-empilhadeira",
    nome: "Operador de Empilhadeira",
    nomeMasculino: "operador de empilhadeira",
    nomeFeminino: "operadora de empilhadeira",
    descricao:
      "Operadores de empilhadeira atuam em galpões logísticos com jornada de 8 horas. Na rescisão, adicional de periculosidade de 30% sobre o salário base e horas extras são direitos comuns.",
  },
  {
    slug: "ajudante-de-carga",
    nome: "Ajudante de Carga",
    nomeMasculino: "ajudante de carga",
    nomeFeminino: "ajudante de carga",
    descricao:
      "Ajudantes de carga trabalham em armazéns com jornada de 8 horas. Na rescisão, horas extras habituais e adicional de insalubridade são verbas comuns na categoria.",
  },
  {
    slug: "conferente-de-carga",
    nome: "Conferente de Carga",
    nomeMasculino: "conferente de carga",
    nomeFeminino: "conferente de carga",
    descricao:
      "Conferentes de carga atuam em centros de distribuição com jornada de 8 horas. Na rescisão, horas extras habituais e adicional noturno para turnos alternados devem ser considerados.",
  },
  {
    slug: "operador-de-producao",
    nome: "Operador de Produção",
    nomeMasculino: "operador de produção",
    nomeFeminino: "operadora de produção",
    descricao:
      "Operadores de produção trabalham em fábricas com jornada de 8 horas em turnos. Na rescisão, horas extras habituais, adicional noturno e adicional de insalubridade são direitos comuns.",
  },
  {
    slug: "soldador",
    nome: "Soldador",
    nomeMasculino: "soldador",
    nomeFeminino: "soldadora",
    descricao:
      "Soldadores atuam na indústria com jornada de 8 horas. Na rescisão, adicional de periculosidade de 30% sobre o salário base e adicional de insalubridade devem ser considerados.",
  },
  {
    slug: "montador-de-moveis",
    nome: "Montador de Móveis",
    nomeMasculino: "montador de móveis",
    nomeFeminino: "montadora de móveis",
    descricao:
      "Montadores de móveis trabalham em lojas e residências com jornada de 8 horas. Na rescisão, horas extras habituais e comissões por montagem devem ser incluídas no cálculo.",
  },
  {
    slug: "serralheiro",
    nome: "Serralheiro",
    nomeMasculino: "serralheiro",
    nomeFeminino: "serralheira",
    descricao:
      "Serralheiros atuam na metalurgia com jornada de 8 horas. Na rescisão, adicional de periculosidade de 30% sobre o salário base e adicional de insalubridade são verbas comuns na categoria.",
  },
  {
    slug: "marceneiro",
    nome: "Marceneiro",
    nomeMasculino: "marceneiro",
    nomeFeminino: "marceneira",
    descricao:
      "Marceneiros trabalham com fabricação de móveis sob medida. Na rescisão, horas extras habituais e adicional de insalubridade de 20% por exposição à poeira de madeira devem ser incluídos.",
  },
  {
    slug: "desenvolvedor",
    nome: "Desenvolvedor",
    nomeMasculino: "desenvolvedor",
    nomeFeminino: "desenvolvedora",
    descricao:
      "Desenvolvedores de software têm salários acima da média e regime de home office frequente. Na rescisão, PLR, banco de horas e verbas de sobreaviso devem ser considerados no cálculo.",
  },
  {
    slug: "analista-de-dados",
    nome: "Analista de Dados",
    nomeMasculino: "analista de dados",
    nomeFeminino: "analista de dados",
    descricao:
      "Analistas de dados atuam com tecnologia e geralmente têm PLR e banco de horas. Na rescisão, bônus de desempenho e PLR são verbas que devem ser incluídas no cálculo das verbas rescisórias.",
  },
  {
    slug: "designer-grafico",
    nome: "Designer Gráfico",
    nomeMasculino: "designer gráfico",
    nomeFeminino: "designer gráfica",
    descricao:
      "Designers gráficos trabalham em agências com jornada de 8 horas. Na rescisão, horas extras em períodos de campanha e PLR são verbas comuns na categoria.",
  },
  {
    slug: "jornalista",
    nome: "Jornalista",
    nomeMasculino: "jornalista",
    nomeFeminino: "jornalista",
    descricao:
      "Jornalistas têm piso salarial da categoria e jornada de 5 horas diárias (7 horas para externa). Na rescisão, horas extras acima da jornada reduzida e adicional noturno devem ser calculados.",
  },
  {
    slug: "publicitario",
    nome: "Publicitário",
    nomeMasculino: "publicitário",
    nomeFeminino: "publicitária",
    descricao:
      "Publicitários atuam em agências com jornada de 8 horas. Na rescisão, horas extras em períodos de campanha e comissionamento sobre contas devem ser considerados no cálculo.",
  },
  {
    slug: "baba",
    nome: "Babá",
    nomeMasculino: "babá",
    nomeFeminino: "babá",
    descricao:
      "Babás trabalham em residências com jornada de 8 horas. Na rescisão, horas extras habituais, adicional noturno e vale-transporte integram o cálculo das verbas rescisórias.",
  },
  {
    slug: "diarista",
    nome: "Diarista",
    nomeMasculino: "diarista",
    nomeFeminino: "diarista",
    descricao:
      "Diaristas trabalham como empregadas domésticas em residências. Na rescisão, horas extras e adicional de insalubridade são direitos que devem ser considerados no cálculo.",
  },
  {
    slug: "caseiro",
    nome: "Caseiro",
    nomeMasculino: "caseiro",
    nomeFeminino: "caseira",
    descricao:
      "Caseiros trabalham em sítios e chácaras com moradia no local. Na rescisão, o valor da moradia pode integrar o salário in natura para cálculo das verbas rescisórias.",
  },
  {
    slug: "piscineiro",
    nome: "Piscineiro",
    nomeMasculino: "piscineiro",
    nomeFeminino: "piscineira",
    descricao:
      "Piscineiros atuam na manutenção de piscinas em condomínios e clubes. Na rescisão, horas extras habituais e adicional de insalubridade por exposição a produtos químicos são direitos comuns.",
  },
  {
    slug: "monitor-de-recreacao",
    nome: "Monitor de Recreação",
    nomeMasculino: "monitor de recreação",
    nomeFeminino: "monitora de recreação",
    descricao:
      "Monitores de recreação trabalham em clubes e hotéis com jornada de 8 horas. Na rescisão, horas extras aos finais de semana e feriados são verbas comuns na categoria.",
  },
  {
    slug: "motorista-de-onibus",
    nome: "Motorista de Ônibus",
    nomeMasculino: "motorista de ônibus",
    nomeFeminino: "motorista de ônibus",
    descricao:
      "Motoristas de ônibus têm jornada especial de 7 horas ao volante. Na rescisão, horas extras habituais, horas de sobreaviso e adicional noturno são verbas comuns na categoria.",
  },
];
