type BreadcrumbItem = {
  name: string;
  item: string;
};

type FAQQuestion = {
  question: string;
  answer: string;
};

/**
 * Gera JSON-LD de Organization (marca/empresa)
 */
export function generateOrganizationSchema(
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CalcularRescisao',
    url: 'https://calcularrescisao.com.br',
    description:
      'Calculadoras trabalhistas online grátis. Calcule rescisão, férias, FGTS e mais.',
    ...overrides,
  };
}

/**
 * Gera JSON-LD de BreadcrumbList a partir de uma lista de { name, item }
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

/**
 * Gera JSON-LD de SoftwareApplication (para as calculadoras)
 */
export function generateSoftwareSchema(
  name: string,
  description: string,
  url: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    ...overrides,
  };
}

/**
 * Gera JSON-LD de FAQPage a partir de uma lista de { question, answer }
 */
export function generateFAQSchema(
  questions: FAQQuestion[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
