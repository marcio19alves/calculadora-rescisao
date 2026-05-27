"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import ShareButtons from "@/components/ShareButtons";

type Carne = "picanha" | "alcatra" | "contrafile" | "frango" | "linguica" | "costela" | "cupim";
type Bebida = "cerveja" | "refrigerante" | "agua" | "suco" | "vinho";

const carneInfo: Record<Carne, { nome: string; gramasPorPessoa: number; icone: string }> = {
  picanha: { nome: "Picanha", gramasPorPessoa: 200, icone: "🥩" },
  alcatra: { nome: "Alcatra", gramasPorPessoa: 200, icone: "🥩" },
  contrafile: { nome: "Contra-filé", gramasPorPessoa: 200, icone: "🥩" },
  frango: { nome: "Frango", gramasPorPessoa: 150, icone: "🍗" },
  linguica: { nome: "Linguiça", gramasPorPessoa: 100, icone: "🌭" },
  costela: { nome: "Costela", gramasPorPessoa: 300, icone: "🍖" },
  cupim: { nome: "Cupim", gramasPorPessoa: 200, icone: "🥩" },
};

const bebidaInfo: Record<Bebida, { nome: string; mlPorPessoa: number; icone: string }> = {
  cerveja: { nome: "Cerveja", mlPorPessoa: 600, icone: "🍺" },
  refrigerante: { nome: "Refrigerante", mlPorPessoa: 400, icone: "🥤" },
  agua: { nome: "Água", mlPorPessoa: 300, icone: "💧" },
  suco: { nome: "Suco", mlPorPessoa: 200, icone: "🧃" },
  vinho: { nome: "Vinho", mlPorPessoa: 200, icone: "🍷" },
};

export default function CalculadoraChurrasco() {
  const [pessoas, setPessoas] = useState(10);
  const [carnesSelecionadas, setCarnesSelecionadas] = useState<Carne[]>(["picanha", "alcatra", "linguica", "frango"]);
  const [bebidasSelecionadas, setBebidasSelecionadas] = useState<Bebida[]>(["cerveja", "refrigerante", "agua"]);
  const [incluirAcompanhamentos, setIncluirAcompanhamentos] = useState(true);

  const toggleCarne = (carne: Carne) => {
    setCarnesSelecionadas((prev) =>
      prev.includes(carne) ? prev.filter((c) => c !== carne) : [...prev, carne]
    );
  };

  const toggleBebida = (bebida: Bebida) => {
    setBebidasSelecionadas((prev) =>
      prev.includes(bebida) ? prev.filter((b) => b !== bebida) : [...prev, bebida]
    );
  };

  const totalCarneKg = carnesSelecionadas.reduce(
    (acc, c) => acc + (carneInfo[c].gramasPorPessoa * pessoas) / 1000,
    0
  );

  const totalCarneDetalhado = carnesSelecionadas.map((c) => ({
    nome: carneInfo[c].nome,
    icone: carneInfo[c].icone,
    kg: (carneInfo[c].gramasPorPessoa * pessoas) / 1000,
  }));

  const totalBebidas = bebidasSelecionadas.map((b) => ({
    nome: bebidaInfo[b].nome,
    icone: bebidaInfo[b].icone,
    litros: (bebidaInfo[b].mlPorPessoa * pessoas) / 1000,
  }));

  const acompanhamentos = incluirAcompanhamentos
    ? [
        { nome: "Arroz", kg: pessoas * 0.08 },
        { nome: "Farofa", kg: pessoas * 0.05 },
        { nome: "Vinagrete", kg: pessoas * 0.06 },
        { nome: "Pão de alho", unidades: pessoas * 1.5 },
        { nome: "Carvão", kg: Math.ceil(pessoas * 0.5) },
        { nome: "Gelo", kg: Math.ceil(pessoas * 0.3) },
      ]
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadora de Churrasco",
    url: "https://calculadoratrabalhista.net.br/calculadora-churrasco",
    description: "Calcule a quantidade ideal de carnes, bebidas e acompanhamentos para seu churrasco.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quantos kg de carne por pessoa para churrasco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A média é de 400g a 500g de carne por pessoa, considerando todos os cortes. Para eventos mais longos ou com muitos homens, considere 500g. Para eventos mais curtos ou com muitas crianças, 350g é suficiente.",
        },
      },
      {
        "@type": "Question",
        name: "Quantas cervejas por pessoa em um churrasco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A média é de 3 a 4 latas de cerveja por adulto (cerca de 600ml a 800ml). Considere também refrigerante e água para quem não bebe álcool.",
        },
      },
      {
        "@type": "Question",
        name: "Qual a quantidade de acompanhamentos para churrasco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arroz: 80g por pessoa. Farofa: 50g por pessoa. Vinagrete: 60g por pessoa. Pão de alho: 1 a 2 unidades por pessoa. Essas quantidades são suficientes para acompanhar as carnes.",
        },
      },
      {
        "@type": "Question",
        name: "Quantos kg de carvão para churrasco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A média é de 500g de carvão por pessoa. Para 10 pessoas, leve 5kg. Para 20 pessoas, 10kg. Sempre compre um pouco a mais para garantir.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Calculadora de Churrasco" }]} />

        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-200">
            <span className="text-3xl">🥩</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Calculadora de Churrasco
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calcule a quantidade ideal de <strong>carnes, bebidas e acompanhamentos</strong> para o seu churrasco.
            Resultado imediato, sem cadastro, 100% gratuito.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">🥩 Carnes</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">🍺 Bebidas</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">🥗 Acompanhamentos</span>
          </div>
        </div>

        {/* Calculadora */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Pessoas */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de pessoas
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPessoas(Math.max(1, pessoas - 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-lg transition-colors"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={500}
                value={pessoas}
                onChange={(e) => setPessoas(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center text-xl font-bold border border-gray-300 rounded-xl py-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
              />
              <button
                onClick={() => setPessoas(Math.min(500, pessoas + 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-lg transition-colors"
              >
                +
              </button>
              <span className="text-gray-500 text-sm ml-2">pessoas</span>
            </div>
          </div>

          {/* Carnes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cortes de carne
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(carneInfo) as Carne[]).map((carne) => (
                <button
                  key={carne}
                  onClick={() => toggleCarne(carne)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    carnesSelecionadas.includes(carne)
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {carneInfo[carne].icone} {carneInfo[carne].nome}
                </button>
              ))}
            </div>
          </div>

          {/* Bebidas */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bebidas</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(bebidaInfo) as Bebida[]).map((bebida) => (
                <button
                  key={bebida}
                  onClick={() => toggleBebida(bebida)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    bebidasSelecionadas.includes(bebida)
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {bebidaInfo[bebida].icone} {bebidaInfo[bebida].nome}
                </button>
              ))}
            </div>
          </div>

          {/* Acompanhamentos */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={incluirAcompanhamentos}
                onChange={() => setIncluirAcompanhamentos(!incluirAcompanhamentos)}
                className="w-5 h-5 rounded accent-red-600"
              />
              <span className="text-sm font-semibold text-gray-700">
                Incluir acompanhamentos (arroz, farofa, vinagrete, pão de alho, carvão, gelo)
              </span>
            </label>
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-6">🔢 Resultado para {pessoas} pessoas</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Carnes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-lg">🥩 Carnes</h3>
              <div className="space-y-2">
                {totalCarneDetalhado.map((c) => (
                  <div key={c.nome} className="flex justify-between items-center">
                    <span>{c.icone} {c.nome}</span>
                    <span className="font-bold">{c.kg.toFixed(1)} kg</span>
                  </div>
                ))}
                <div className="border-t border-white/20 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{totalCarneKg.toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* Bebidas */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-lg">🍺 Bebidas</h3>
              <div className="space-y-2">
                {totalBebidas.map((b) => (
                  <div key={b.nome} className="flex justify-between items-center">
                    <span>{b.icone} {b.nome}</span>
                    <span className="font-bold">{b.litros.toFixed(1)} L</span>
                  </div>
                ))}
                <div className="border-t border-white/20 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {totalBebidas.reduce((acc, b) => acc + b.litros, 0).toFixed(1)} L
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Acompanhamentos */}
          {incluirAcompanhamentos && acompanhamentos.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mt-4">
              <h3 className="font-semibold mb-3 text-lg">🥗 Acompanhamentos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {acompanhamentos.map((a) => (
                  <div key={a.nome} className="flex justify-between">
                    <span>{a.nome}</span>
                    <span className="font-bold">
                      {"kg" in a ? `${a.kg!.toFixed(1)} kg` : `${a.unidades!.toFixed(0)} uni`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Artigo SEO */}
        <article className="prose prose-gray max-w-none space-y-6">
          <h2 className="text-2xl font-bold">Como calcular a quantidade ideal de churrasco?</h2>
          
          <p>
            Organizar um churrasco perfeito envolve mais do que acender a churrasqueira. A principal
            dúvida de quem vai receber os amigos e a família é: <strong>quanto comprar de carne,
            bebida e acompanhamento?</strong>
          </p>

          <p>
            Comprar de menos causa preocupação, filas na churrasqueira e convidados insatisfeitos.
            Comprar de mais gera desperdício de comida e dinheiro. A nossa calculadora de churrasco
            resolve esse problema com base em médias testadas por churrasqueiros profissionais.
          </p>

          <h3 className="text-xl font-bold">Quantidade de carne por pessoa</h3>
          <p>
            A regra geral é <strong>400g a 500g de carne por pessoa</strong>. Esse número já
            considera que alguns convidados comem mais (homens adultos) e outros menos (crianças,
            idosos). Para eventos de meio período (almoço apenas), 400g é suficiente. Para
            eventos que viram o dia, 500g.
          </p>

          <h3 className="text-xl font-bold">Cortes de carne recomendados</h3>
          <p>
            Um bom churrasco tem variedade de cortes e preços. A picanha é a estrela, mas cortes
            como alcatra, contra-filé e cupim oferecem ótimo custo-benefício. Frango e linguiça
            agradam quem prefere carnes mais leves, e a costela é perfeita para churrascos longos
            (precisa de 4 a 6 horas de fogo).
          </p>

          <h3 className="text-xl font-bold">Bebidas para o churrasco</h3>
          <p>
            A cerveja é a bebida principal do churrasco brasileiro. Calcule <strong>3 a 4 latas
            por adulto</strong>. Refrigerante e água são essenciais para crianças e para quem
            não bebe álcool. Sucos naturais também são uma ótima opção. Não esqueça do gelo —
            cerca de 300g por pessoa.
          </p>

          <h3 className="text-xl font-bold">Acompanhamentos</h3>
          <p>
            Arroz soltinho, farofa crocante, vinagrete fresquinho e pão de alho são
            acompanhamentos clássicos que não podem faltar. Eles ajudam a &ldquo;esticar&rdquo; o churrasco
            e dão mais opções para os convidados. Calcule 80g de arroz, 50g de farofa e 60g de
            vinagrete por pessoa.
          </p>

          <h3 className="text-xl font-bold">Tabela de referência rápida</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border">Item</th>
                  <th className="p-2 text-left border">Por pessoa</th>
                  <th className="p-2 text-left border">10 pessoas</th>
                  <th className="p-2 text-left border">20 pessoas</th>
                  <th className="p-2 text-left border">50 pessoas</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border">🥩 Carne total</td><td className="p-2 border">400-500g</td><td className="p-2 border">4-5 kg</td><td className="p-2 border">8-10 kg</td><td className="p-2 border">20-25 kg</td></tr>
                <tr><td className="p-2 border">🍺 Cerveja</td><td className="p-2 border">600ml</td><td className="p-2 border">6 L</td><td className="p-2 border">12 L</td><td className="p-2 border">30 L</td></tr>
                <tr><td className="p-2 border">🥤 Refrigerante</td><td className="p-2 border">400ml</td><td className="p-2 border">4 L</td><td className="p-2 border">8 L</td><td className="p-2 border">20 L</td></tr>
                <tr><td className="p-2 border">🍞 Pão de alho</td><td className="p-2 border">1-2 uni</td><td className="p-2 border">10-20 uni</td><td className="p-2 border">20-40 uni</td><td className="p-2 border">50-100 uni</td></tr>
                <tr><td className="p-2 border">🔥 Carvão</td><td className="p-2 border">500g</td><td className="p-2 border">5 kg</td><td className="p-2 border">10 kg</td><td className="p-2 border">25 kg</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold">Dicas para o churrasco perfeito</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Tempero:</strong> Sal grosso é o clássico. Tempere a carne 15-30 minutos antes de ir para a churrasqueira.</li>
            <li><strong>Ponto da carne:</strong> Picanha ao ponto (rosada por dentro) é o preferido da maioria. Costela precisa estar bem passada e soltando do osso.</li>
            <li><strong>Fogo:</strong> Use carvão de qualidade. A brasa deve estar uniforme (sem chamas) antes de colocar a carne.</li>
            <li><strong>Ordem:</strong> Comece com as carnes mais grossas (costela, cupim) e finalize com as mais finas (picanha, frango).</li>
            <li><strong>Quantidade extra:</strong> Sempre compre 10-15% a mais do que o calculado para imprevistos.</li>
          </ul>
        </article>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <ShareButtons title="Calculadora de Churrasco - Calculadora Trabalhista" />
      </div>
    </>
  );
}
