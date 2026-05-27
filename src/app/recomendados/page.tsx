import type { Metadata } from "next";
import SecaoAfiliados from "@/components/SecaoAfiliados";

export const metadata: Metadata = {
  title: "Ferramentas Recomendadas | Calculadora Trabalhista",
  description:
    "Planilhas, cursos e livros recomendados para cálculos trabalhistas, controle financeiro e direitos do trabalhador.",
  robots: { index: true, follow: true },
};

export default function RecomendadosPage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 pt-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-200">
          <span className="text-3xl">🛒</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-700">
            Ferramentas Recomendadas
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Selecionamos produtos e ferramentas que podem ajudar no seu
          planejamento financeiro e trabalhista.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">📋 Planilhas e Cálculos</h2>
          <p className="text-sm text-gray-500 mt-1">
            Planilhas prontas para calcular rescisão, controle financeiro e mais
          </p>
        </div>
        <SecaoAfiliados
          titulo=""
          contexto=""
          produtos={[
            {
              nome: "📋 Planilha de Verbas Rescisórias",
              descricao: "Planilha completa para cálculo de rescisão. Pronta para Excel ou Google Planilhas.",
              preco: "R$ 19,90",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
            {
              nome: "📊 Planilha de Controle Financeiro Empresarial",
              descricao: "Controle de gastos, fluxo de caixa, DRE e metas financeiras.",
              preco: "R$ 129,90",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
            {
              nome: "💰 Planilha Renda Variável + Calculadora IR",
              descricao: "Calcule imposto de renda sobre investimentos. Controle de ações, FIIs, cripto.",
              preco: "R$ 147,00",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
            {
              nome: "📖 CLT Comentada (Livro Atualizado)",
              descricao: "CLT com artigos comentados por juristas especializados em direito do trabalho.",
              preco: "R$ 89,90",
              url: "https://amzn.to/SEU_LINK_AQUI",
              badge: "Amazon",
            },
          ]}
        />
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">🎓 Cursos e Educação</h2>
          <p className="text-sm text-gray-500 mt-1">
            Aprenda mais sobre seus direitos trabalhistas e planejamento financeiro
          </p>
        </div>
        <SecaoAfiliados
          titulo=""
          contexto=""
          produtos={[
            {
              nome: "🎓 Curso de Direito Trabalhista",
              descricao: "Aprenda na prática como funcionam os cálculos trabalhistas e seus direitos.",
              preco: "R$ 197,00",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
            {
              nome: "⚖️ Curso Prático em Direito Sucessório",
              descricao: "Direito das sucessões na prática. Ideal para advogados e estudantes.",
              preco: "R$ 147,00",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
            {
              nome: "🛡️ Auxiliar de Segurança do Trabalho",
              descricao: "Curso completo para atuar como auxiliar de segurança do trabalho.",
              preco: "R$ 197,00",
              url: "https://hotm.art/SEU_LINK_AQUI",
              badge: "Hotmart",
            },
          ]}
        />
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">🏦 Serviços Financeiros</h2>
          <p className="text-sm text-gray-500 mt-1">
            Contas digitais, contabilidade e serviços para seu dia a dia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://www.contabilizei.com.br/parceiros/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Contabilizei
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Contabilidade online para MEI e pequenas empresas. Abra sua empresa sem burocracia.
                </p>
                <span className="text-xs text-blue-600 font-medium mt-2 inline-block">
                  Abrir empresa → 
                </span>
              </div>
            </div>
          </a>
          <a
            href="https://www.serasa.com.br/afiliados"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">🔍</span>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Serasa
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Consulte seu CPF, score de crédito e negocie dívidas.
                </p>
                <span className="text-xs text-blue-600 font-medium mt-2 inline-block">
                  Consultar CPF → 
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <div className="text-center text-xs text-gray-400 pt-4">
        <p>
          Ao comprar através dos links indicados, o Calculadora Trabalhista pode
          receber uma comissão. O preço não é alterado para você.
        </p>
      </div>
    </div>
  );
}
