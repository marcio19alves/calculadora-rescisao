"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calcularRescisao, ResultadoRescisao } from "@/lib/rescisao-engine";
import {
  DadosRescisao,
  AvisoPrevio,
  MotivoRescisao,
} from "@/lib/taxas-2026";
import { formatCurrency } from "@/lib/utils";
import { Calculator, RefreshCw } from "lucide-react";

type MotivoOption = {
  value: MotivoRescisao;
  label: string;
};

const MOTIVOS: MotivoOption[] = [
  { value: "sem-justa-causa", label: "Demissão sem justa causa" },
  { value: "pedido-demissao", label: "Pedido de demissão" },
  { value: "justa-causa", label: "Demissão por justa causa" },
  { value: "comum-acordo", label: "Rescisão por comum acordo" },
  { value: "termino-experiencia", label: "Término de contrato de experiência" },
  { value: "aposentadoria", label: "Rescisão por aposentadoria" },
  { value: "falecimento", label: "Rescisão por falecimento" },
];

const AVISOS: { value: AvisoPrevio; label: string }[] = [
  { value: "indenizado", label: "Indenizado" },
  { value: "trabalhado", label: "Trabalhado" },
  { value: "dispensado", label: "Dispensado" },
];

export default function EmbedRescisaoPage() {
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataDemissao, setDataDemissao] = useState("");
  const [motivo, setMotivo] = useState<MotivoRescisao>("sem-justa-causa");
  const [salario, setSalario] = useState("");
  const [avisoPrevio, setAvisoPrevio] = useState<AvisoPrevio>("indenizado");
  const [diasAP, setDiasAP] = useState("30");
  const [resultado, setResultado] = useState<ResultadoRescisao | null>(null);
  const [erro, setErro] = useState("");

  function handleCalcular() {
    setErro("");

    if (!dataAdmissao || !dataDemissao || !salario) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const salarioNum = parseFloat(
      salario.replace(/\./g, "").replace(",", ".")
    );
    if (isNaN(salarioNum) || salarioNum <= 0) {
      setErro("Informe um salário válido.");
      return;
    }

    const dados: DadosRescisao = {
      dataAdmissao: new Date(dataAdmissao + "T12:00:00"),
      dataDemissao: new Date(dataDemissao + "T12:00:00"),
      motivo,
      salario: salarioNum,
      avisoPrevio,
      diasAvisoPrevio: parseInt(diasAP) || 30,
      feriasVencidas: false,
      incluirFGTS: false,
    };

    const res = calcularRescisao(dados);
    setResultado(res);
  }

  function handleLimpar() {
    setDataAdmissao("");
    setDataDemissao("");
    setMotivo("sem-justa-causa");
    setSalario("");
    setAvisoPrevio("indenizado");
    setDiasAP("30");
    setResultado(null);
    setErro("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      <div className="w-full max-w-[500px] space-y-4">
        {/* Cabeçalho minimalista */}
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto shadow-sm mb-2">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-gray-900">
            Calculadora de Rescisão
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Calcule suas verbas rescisórias gratuitamente
          </p>
        </div>

        {/* Formulário */}
        <Card className="shadow-md border-gray-200">
          <CardContent className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="dataAdmissao" className="text-xs font-medium">
                  Data de Admissão *
                </Label>
                <Input
                  id="dataAdmissao"
                  type="date"
                  value={dataAdmissao}
                  onChange={(e) => setDataAdmissao(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dataDemissao" className="text-xs font-medium">
                  Data de Demissão *
                </Label>
                <Input
                  id="dataDemissao"
                  type="date"
                  value={dataDemissao}
                  onChange={(e) => setDataDemissao(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="motivo" className="text-xs font-medium">
                  Motivo da Rescisão
                </Label>
                <Select
                  value={motivo}
                  onValueChange={(v) => setMotivo(v as MotivoRescisao)}
                >
                  <SelectTrigger id="motivo" className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOTIVOS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="salario" className="text-xs font-medium">
                  Último Salário (R$) *
                </Label>
                <Input
                  id="salario"
                  type="text"
                  inputMode="decimal"
                  placeholder="3.600,00"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="aviso" className="text-xs font-medium">
                  Aviso Prévio
                </Label>
                <Select
                  value={avisoPrevio}
                  onValueChange={(v) => setAvisoPrevio(v as AvisoPrevio)}
                >
                  <SelectTrigger id="aviso" className="h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVISOS.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="diasAP" className="text-xs font-medium">
                  Dias de Aviso Prévio
                </Label>
                <Input
                  id="diasAP"
                  type="number"
                  value={diasAP}
                  onChange={(e) => setDiasAP(e.target.value)}
                  min={0}
                  max={90}
                  className="h-10 text-sm"
                />
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-xs">
                {erro}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleCalcular}
                className="flex-1 h-10 text-sm gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                Calcular
              </Button>
              <Button
                onClick={handleLimpar}
                variant="outline"
                className="h-10 text-sm gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultado */}
        {resultado && (
          <Card className="shadow-md border-gray-200">
            <CardContent className="pt-4">
              <h2 className="text-sm font-semibold mb-3 text-gray-900">
                Resultado do Cálculo
              </h2>
              <div className="space-y-2">
                {resultado.verbas
                  .filter((v) => v.tipo !== "informativo")
                  .map((verba, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm text-gray-700">
                        {verba.nome}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          verba.tipo === "desconto"
                            ? "text-red-600"
                            : "text-green-700"
                        }`}
                      >
                        {verba.tipo === "desconto" ? "- " : ""}
                        {formatCurrency(verba.valor)}
                      </span>
                    </div>
                  ))}

                <div className="border-t-2 border-gray-300 pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total Bruto</span>
                    <span className="font-bold text-green-700">
                      {formatCurrency(resultado.totalBruto)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total Descontos</span>
                    <span className="font-bold text-red-600">
                      - {formatCurrency(resultado.totalDescontos)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base border-t border-gray-200 pt-1.5">
                    <span className="font-bold">Total Líquido</span>
                    <span className="font-bold text-blue-700">
                      {formatCurrency(resultado.totalLiquido)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Link discreto de atribuição */}
              <div className="mt-3 pt-2 border-t border-gray-100 text-center">
                <a
                  href="https://calculadoratrabalhista.net.br/calculadora-rescisao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Calculadora de Rescisão — calculadoratrabalhista.net.br
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
