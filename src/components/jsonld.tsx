export interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/**
 * Renderiza um script JSON-LD estruturado para SEO.
 * Uso: <JsonLd data={generateOrganizationSchema()} />
 */
export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
