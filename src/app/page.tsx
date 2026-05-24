import Link from "next/link";
import { TrendingUp, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FERRAMENTAS = [
  {
    titulo: "Calculadora de Rescisão CLT",
    descricao:
      "Calcule o valor exato da sua rescisão trabalhista: saldo de salário, férias, 13º, FGTS e multa de 40%.",
    href: "/calculadora-rescisao",
    icon: FileText,
    cor: "bg-blue-50 text-blue-700",
  },
  {
    titulo: "Calculadora de Juros Compostos",
    descricao:
      "Simule investimentos com juros compostos. Veja a projeção do seu dinheiro mês a mês com gráficos.",
    href: "/calculadora-juros",
    icon: TrendingUp,
    cor: "bg-green-50 text-green-700",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center space-y-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Calculadoras Trabalhistas
          <span className="block text-primary">Online e Grátis</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          Resultado imediato. Sem cadastro. Sem frescura.
          <br />
          Calcule sua rescisão CLT, juros compostos e muito mais.
        </p>
      </section>

      {/* Grid de ferramentas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {FERRAMENTAS.map((f) => (
          <Link key={f.href} href={f.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.cor} mb-2`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {f.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.descricao}
                </p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3">
                  Usar ferramenta <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Info */}
      <section className="bg-gray-50 rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold">Por que usar nossas calculadoras?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">⚡ Resultado imediato</h3>
            <p>
              Cálculos processados no seu navegador. Sem esperar servidor, sem
              refresh de página.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">🔒 Sem cadastro</h3>
            <p>
              Sua privacidade primeiro. Não pedimos e-mail, WhatsApp ou
              qualquer dado pessoal.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">📱 100% mobile</h3>
            <p>
              Interface feita para o celular. Botões grandes, design limpo,
              calcula com uma mão só.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-sm text-gray-500">
        <p>
          Os valores calculados são aproximados e não substituem o cálculo
          oficial de um contador ou advogado trabalhista. Consulte um
          profissional habilitado para cálculos oficiais.
        </p>
      </section>
    </div>
  );
}
