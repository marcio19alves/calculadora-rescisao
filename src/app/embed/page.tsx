"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code, Copy, ExternalLink } from "lucide-react";

const IFRAME_CODE = `<iframe 
  src="https://calculadoratrabalhista.net.br/embed/rescisao" 
  width="100%" 
  height="750" 
  style="border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 560px; display: block; margin: 0 auto;" 
  title="Calculadora de Rescisão CLT Grátis"
></iframe>`;

export default function EmbedPage() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(IFRAME_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Não foi possível copiar. Copie manualmente o código abaixo.");
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4 pt-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-200">
          <Code className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Widget Embedável —{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            Calculadora de Rescisão
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Adicione nossa calculadora de rescisão CLT gratuitamente ao seu site
          de RH, contabilidade ou advocacia trabalhista. A ferramenta completa
          que seus visitantes precisam — sem custo, sem cadastro.
        </p>
      </section>

      {/* Vantagens */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          {
            icone: "🆓",
            titulo: "100% Gratuito",
            desc: "Sem custos, sem cadastro, sem limites de uso. Você só copia o código e insere no seu site.",
          },
          {
            icone: "🔗",
            titulo: "Backlink Automático",
            desc: "O widget inclui um link de atribuição para o Calculadora Trabalhista, gerando backlinks naturais.",
          },
          {
            icone: "⚡",
            titulo: "Resultado Imediato",
            desc: "Cálculos processados no navegador do usuário. Resultado instantâneo, sem refresh ou envio de dados.",
          },
        ].map(({ icone, titulo, desc }) => (
          <div
            key={titulo}
            className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 hover:shadow-md transition-shadow"
          >
            <div className="text-3xl">{icone}</div>
            <h3 className="font-semibold text-gray-900">{titulo}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Pré-visualização do Widget (client-side only) */}
      {mounted && (
        <section className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 text-center">
            🔍 Pré-visualização do Widget
          </h2>
          <div className="max-w-[520px] mx-auto">
            <iframe
              src="/embed/rescisao"
              width="100%"
              height="750"
              style={{
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              title="Pré-visualização da Calculadora de Rescisão"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            Pré-visualização ao vivo do widget.
          </p>
        </section>
      )}

      {/* Código iframe */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">📋 Código para Incorporar</h2>
          <p className="text-gray-600 text-sm">
            Copie o código abaixo e cole no HTML do seu site onde deseja que a
            calculadora apareça.
          </p>
        </div>

        <div className="relative bg-gray-900 rounded-xl p-4 sm:p-5 overflow-x-auto">
          <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap break-all font-mono leading-relaxed">
            {IFRAME_CODE}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 space-y-2">
          <p className="font-semibold">⚠️ Personalização:</p>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li>• Ajuste a <strong>altura (height)</strong> se necessário (padrão: 750px)</li>
            <li>• A <strong>largura (width)</strong> é responsiva com <code>width: 100%</code></li>
            <li>• O <strong>max-width: 560px</strong> é ideal para barras laterais e áreas de conteúdo</li>
            <li>• Remova o <code>max-width</code> se quiser ocupar toda a largura do container</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center">
          ❓ Perguntas Frequentes
        </h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {[
            { p: "O widget é realmente gratuito?", r: "Sim, 100% gratuito. Sem cobrança, limite de uso ou cadastro." },
            { p: "Preciso manter o link de atribuição?", r: "Sim. O widget inclui um link para o Calculadora Trabalhista no rodapé — não remova." },
            { p: "Funciona em qualquer site?", r: "Sim, em qualquer site que suporte iframes: WordPress, Wix, Shopify, HTML puro." },
            { p: "Os dados do usuário são salvos?", r: "Não. Tudo é processado no navegador. Nenhum dado é enviado aos nossos servidores." },
            { p: "Posso modificar a aparência?", r: "A calculadora mantém a identidade visual do Calculadora Trabalhista." },
          ].map(({ p, r }) => (
            <div key={p} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-1.5">{p}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-10 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          🚀 Comece agora — é grátis!
        </h2>
        <p className="text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
          Copie o código iframe e adicione ao seu site em menos de 1 minuto.
        </p>
        <Link
          href="/calculadora-rescisao"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
        >
          <ExternalLink className="w-5 h-5" />
          Ver calculadora completa
        </Link>
      </section>
    </div>
  );
}
