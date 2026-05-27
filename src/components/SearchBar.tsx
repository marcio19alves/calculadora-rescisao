"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Lista de todas as calculadoras para busca
const allCalculadoras = [
  { nome: "Rescisão CLT", url: "/calculadora-rescisao", categoria: "Trabalhista", tags: "rescisão, acerto, demissão, CLT, contrato" },
  { nome: "FGTS", url: "/calculadora-fgts", categoria: "Trabalhista", tags: "fgts, multa, 40%, saque, aniversário" },
  { nome: "Férias", url: "/calculadora-ferias", categoria: "Trabalhista", tags: "férias, 1/3, constitucional, abono" },
  { nome: "Horas Extras", url: "/calculadora-horas-extras", categoria: "Trabalhista", tags: "hora extra, 50%, 100%, DSR, noturno" },
  { nome: "Adicional Noturno", url: "/calculadora-adicional-noturno", categoria: "Trabalhista", tags: "noturno, 20%, hora reduzida, 52:30" },
  { nome: "Salário Líquido", url: "/calculadora-salario-liquido", categoria: "Trabalhista", tags: "salário, líquido, INSS, IRRF, desconto" },
  { nome: "Seguro Desemprego", url: "/calculadora-seguro-desemprego", categoria: "Trabalhista", tags: "seguro, desemprego, parcelas, 2025" },
  { nome: "13º Salário", url: "/calculadora-13o-salario", categoria: "Trabalhista", tags: "13º, décimo terceiro, proporcional, integral" },
  { nome: "INSS", url: "/calculadora-inss", categoria: "Trabalhista", tags: "INSS, contribuição, previdência, alíquota" },
  { nome: "IRRF", url: "/calculadora-irrf", categoria: "Trabalhista", tags: "IRRF, imposto, renda, retido, fonte" },
  { nome: "Salário Mínimo", url: "/calculadora-salario-minimo", categoria: "Trabalhista", tags: "salário mínimo, 2025, valor, dia, hora" },
  { nome: "Empregado Doméstico", url: "/calculadora-empregado-domestico", categoria: "Trabalhista", tags: "doméstico, empregada, encargos, INSS, FGTS" },
  { nome: "Escala de Trabalho", url: "/calculadora-escala-trabalho", categoria: "Trabalhista", tags: "escala, 6x1, 12x36, 5x2, 4x3, DSR" },
  { nome: "Juros Compostos", url: "/calculadora-juros", categoria: "Financeiro", tags: "juros, compostos, investimento, projeção" },
  { nome: "Juros Simples", url: "/calculadora-juros-simples", categoria: "Financeiro", tags: "juros, simples, capital, taxa, tempo" },
  { nome: "Porcentagem", url: "/calculadora-porcentagem", categoria: "Financeiro", tags: "porcentagem, percentual, cálculo, desconto" },
  { nome: "Reajuste Aluguel", url: "/calculadora-reajuste-aluguel", categoria: "Financeiro", tags: "aluguel, reajuste, IGP-M, IPCA, índice" },
  { nome: "Financiamento Veículos", url: "/calculadora-financiamento-veiculos", categoria: "Financeiro", tags: "financiamento, veículo, carro, parcela" },
  { nome: "Empréstimo Pessoal", url: "/calculadora-emprestimo-pessoal", categoria: "Financeiro", tags: "empréstimo, pessoal, parcela, juros" },
  { nome: "IMC", url: "/calculadora-imc", categoria: "Saúde", tags: "IMC, peso, altura, índice, massa corporal" },
  { nome: "Gestacional", url: "/calculadora-gestacional", categoria: "Saúde", tags: "gestacional, gravidez, parto, semanas, meses" },
  { nome: "Dias Entre Datas", url: "/calculadora-dias-entre-datas", categoria: "Calendário", tags: "dias, datas, diferença, calendário" },
  { nome: "Churrasco", url: "/calculadora-churrasco", categoria: "Alimentação", tags: "churrasco, carne, festa, confraternização" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof allCalculadoras>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(val: string) {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const q = val.toLowerCase();
    const found = allCalculadoras.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        c.tags.toLowerCase().includes(q) ||
        c.categoria.toLowerCase().includes(q)
    );
    setResults(found.slice(0, 8));
    setIsOpen(found.length > 0);
  }

  function handleSelect(url: string) {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    router.push(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0].url);
    } else if (query.length >= 2) {
      router.push(`/busca?q=${encodeURIComponent(query)}`);
      setQuery("");
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Buscar calculadora..."
          className="w-40 lg:w-56 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        />
        <button
          type="submit"
          className="ml-1 p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
          title="Buscar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {results.map((r) => (
            <button
              key={r.url}
              onClick={() => handleSelect(r.url)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <span className="font-medium text-gray-800">{r.nome}</span>
              <span className="text-xs text-gray-400 ml-2">{r.categoria}</span>
            </button>
          ))}
          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-400">
            {results.length} resultado(s) · Enter para o primeiro
          </div>
        </div>
      )}
    </div>
  );
}
