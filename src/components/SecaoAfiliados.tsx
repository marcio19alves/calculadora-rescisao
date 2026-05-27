"use client";

import { ExternalLink } from "lucide-react";

interface ProdutoAfiliado {
  nome: string;
  descricao: string;
  preco: string;
  url: string;   // placeholder: substituir pelo link de afiliado real
  badge?: string;
}

const PRODUTOS_PADRAO: ProdutoAfiliado[] = [
  {
    nome: "📋 Planilha de Verbas Rescisórias",
    descricao: "Planilha completa para cálculo de rescisão trabalhista. Pronta para usar no Excel ou Google Planilhas.",
    preco: "R$ 19,90",
    url: "https://hotm.art/SEU_LINK_AQUI",
    badge: "Hotmart",
  },
  {
    nome: "📖 CLT Comentada (Livro)",
    descricao: "Consolidação das Leis do Trabalho com artigos comentados por juristas. Essencial para quem quer entender os próprios direitos.",
    preco: "R$ 89,90",
    url: "https://amzn.to/SEU_LINK_AQUI",
    badge: "Amazon",
  },
  {
    nome: "📊 Planilha de Controle Financeiro",
    descricao: "Organize suas finanças pessoais após a rescisão. Controle de gastos, metas e investimentos.",
    preco: "R$ 129,90",
    url: "https://hotm.art/SEU_LINK_AQUI",
    badge: "Hotmart",
  },
  {
    nome: "🎓 Curso de Direito Trabalhista",
    descricao: "Aprenda na prática como funcionam os cálculos trabalhistas, seus direitos e como recorrer se necessário.",
    preco: "R$ 197,00",
    url: "https://hotm.art/SEU_LINK_AQUI",
    badge: "Hotmart",
  },
];

interface SecaoAfiliadosProps {
  produtos?: ProdutoAfiliado[];
  titulo?: string;
  contexto?: string;
}

export default function SecaoAfiliados({
  produtos = PRODUTOS_PADRAO,
  titulo = "📌 Recomendações para você",
  contexto = "Ferramentas e produtos que podem ajudar no seu planejamento:",
}: SecaoAfiliadosProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-gray-900">{titulo}</h3>
        <p className="text-sm text-gray-600">{contexto}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {produtos.map((produto) => (
          <a
            key={produto.nome}
            href={produto.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group bg-white border border-amber-100 rounded-xl p-4 hover:border-amber-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-amber-700 transition-colors leading-tight">
                    {produto.nome}
                  </h4>
                  {produto.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 uppercase shrink-0">
                      {produto.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {produto.descricao}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-emerald-600">
                  {produto.preco}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
              </div>
            </div>
          </a>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 text-center">
        Ao comprar através destes links, você ajuda a manter o site gratuito. Preço não altera para você.
      </p>
    </div>
  );
}
