"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calcularRescisao, ResultadoRescisao } from "@/lib/rescisao-engine";
import { DadosRescisao, AvisoPrevio, MotivoRescisao } from "@/lib/taxas-2026";
import { formatCurrency } from "@/lib/utils";
import { Calculator, Copy, RefreshCw, Info } from "lucide-react";
import EmailGate from "@/components/email-gate";
import { useEmailGate } from "@/hooks/useEmailGate";

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

export default function RescisaoEngine() {
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [dataDemissao, setDataDemissao] = useState("");
  const [motivo, setMotivo] = useState<MotivoRescisao>("sem-justa-causa");
  const [salario, setSalario] = useState("");
  const [avisoPrevio, setAvisoPrevio] = useState<AvisoPrevio>("indenizado");
  const [diasAP, setDiasAP] = useState("30");
  const [feriasVencidas, setFeriasVencidas] = useState("nao");
  const [incluirFGTS, setIncluirFGTS] = useState(false);
  const [saldoFGTS, setSaldoFGTS] = useState("");
  const [resultado, setResultado] = useState<ResultadoRescisao | null>(null);
  const [erro, setErro] = useState("");
  const [showGate, setShowGate] = useState(false);
  const { email } = useEmailGate();
  const pendingCalc = useRef<(() => void) | null>(null);

  function handleCalcular() {
    setErro("");

    if (!dataAdmissao || !dataDemissao || !salario) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const salarioNum = parseFloat(salario.replace(/\./g, "").replace(",", "."));
    if (isNaN(salarioNum) || salarioNum <= 0) {
      setErro("Informe um salário válido.");
      return;
    }

    // If user already has email saved, calculate directly
    if (email) {
      runCalculation(salarioNum);
      return;
    }

    // Store the calculation for later, show gate first
    pendingCalc.current = () => runCalculation(salarioNum);
    setShowGate(true);
  }

  function runCalculation(salarioNum: number) {
    const dados: DadosRescisao = {
      dataAdmissao: new Date(dataAdmissao + "T12:00:00"),
      dataDemissao: new Date(dataDemissao + "T12:00:00"),
      motivo,
      salario: salarioNum,
      avisoPrevio,
      diasAvisoPrevio: parseInt(diasAP) || 30,
      feriasVencidas: feriasVencidas === "sim",
      incluirFGTS,
      saldoFGTS: incluirFGTS ? (parseFloat(saldoFGTS.replace(/\./g, "").replace(",", ".")) || 0) : undefined,
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
    setFeriasVencidas("nao");
    setIncluirFGTS(false);
    setSaldoFGTS("");
    setResultado(null);
    setErro("");
    setShowGate(false);
    pendingCalc.current = null;
  }

  function handleCopy() {
    if (!resultado) return;
    const texto = gerarTextoResultado(resultado);
    navigator.clipboard.writeText(texto);
  }

  function handleGateClose() {
    setShowGate(false);
    // Execute pending calculation even if gate was dismissed
    if (pendingCalc.current) {
      pendingCalc.current();
      pendingCalc.current = null;
    }
  }

  function handleGateEmailSaved() {
    pendingCalc.current = null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Calculadora de Rescisão CLT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
              <Input
                id="dataAdmissao"
                type="date"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
                className="min-h-[48px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataDemissao">Data de Demissão *</Label>
              <Input
                id="dataDemissao"
                type="date"
                value={dataDemissao}
                onChange={(e) => setDataDemissao(e.target.value)}
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo da Rescisão</Label>
              <Select value={motivo} onValueChange={(v) => setMotivo(v as MotivoRescisao)}>
                <SelectTrigger id="motivo" className="min-h-[48px]">
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
            <div className="space-y-2">
              <Label htmlFor="salario">Último Salário (R$) *</Label>
              <Input
                id="salario"
                type="text"
                inputMode="decimal"
                placeholder="3.600,00"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aviso">Aviso Prévio</Label>
              <Select value={avisoPrevio} onValueChange={(v) => setAvisoPrevio(v as AvisoPrevio)}>
                <SelectTrigger id="aviso" className="min-h-[48px]">
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
            <div className="space-y-2">
              <Label htmlFor="diasAP">Dias de Aviso Prévio</Label>
              <Input
                id="diasAP"
                type="number"
                value={diasAP}
                onChange={(e) => setDiasAP(e.target.value)}
                min={0}
                max={90}
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ferias">Tem Férias Vencidas?</Label>
              <Select value={feriasVencidas} onValueChange={(v) => setFeriasVencidas(v || "nao")}>
                <SelectTrigger id="ferias" className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="sim">Sim</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer min-h-[48px]">
                <input
                  type="checkbox"
                  checked={incluirFGTS}
                  onChange={(e) => setIncluirFGTS(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">Incluir cálculo do FGTS</span>
              </label>
            </div>
          </div>

          {incluirFGTS && (
            <div className="space-y-2">
              <Label htmlFor="saldoFGTS">Saldo do FGTS (R$)</Label>
              <Input
                id="saldoFGTS"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={saldoFGTS}
                onChange={(e) => setSaldoFGTS(e.target.value)}
                className="min-h-[48px]"
              />
            </div>
          )}

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalcular} className="flex-1 min-h-[48px] text-base gap-2">
              <Calculator className="w-5 h-5" />
              Calcular
            </Button>
            <Button onClick={handleLimpar} variant="outline" className="min-h-[48px] gap-2">
              <RefreshCw className="w-5 h-5" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {resultado && (
        <ResultadoCard resultado={resultado} onCopy={handleCopy} />
      )}

      <EmailGate
        open={showGate}
        onClose={handleGateClose}
        onEmailSaved={handleGateEmailSaved}
      />
    </div>
  );
}

function ResultadoCard({
  resultado,
  onCopy,
}: {
  resultado: ResultadoRescisao;
  onCopy: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl">
            Resultado do Cálculo
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onCopy} className="gap-2">
            <Copy className="w-4 h-4" />
            Copiar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {resultado.verbas
          .filter((v) => v.tipo !== "informativo")
          .map((verba, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <span className="text-sm sm:text-base">{verba.nome}</span>
                {verba.detalhes && (
                  <p className="text-xs text-gray-500">{verba.detalhes}</p>
                )}
              </div>
              <span
                className={`font-semibold text-sm sm:text-base ${
                  verba.tipo === "desconto" ? "text-red-600" : "text-green-700"
                }`}
              >
                {verba.tipo === "desconto" ? "- " : ""}
                {formatCurrency(verba.valor)}
              </span>
            </div>
          ))}

        <div className="border-t-2 border-gray-300 pt-4 space-y-2">
          <div className="flex justify-between text-base">
            <span className="font-medium">Total Bruto</span>
            <span className="font-bold text-green-700">
              {formatCurrency(resultado.totalBruto)}
            </span>
          </div>
          <div className="flex justify-between text-base">
            <span className="font-medium">Total Descontos</span>
            <span className="font-bold text-red-600">
              - {formatCurrency(resultado.totalDescontos)}
            </span>
          </div>
          <div className="flex justify-between text-lg border-t border-gray-200 pt-2">
            <span className="font-bold">Total Líquido</span>
            <span className="font-bold text-primary text-xl">
              {formatCurrency(resultado.totalLiquido)}
            </span>
          </div>
        </div>

        {resultado.fgts && (
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-sm text-blue-800">FGTS</h4>
            <div className="flex justify-between text-sm">
              <span>Saldo FGTS</span>
              <span>{formatCurrency(resultado.fgts.saldoFGTS)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Multa 40%</span>
              <span>{formatCurrency(resultado.fgts.multa40)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-blue-200 pt-2">
              <span>Total FGTS</span>
              <span>{formatCurrency(resultado.fgts.totalFGTS)}</span>
            </div>
          </div>
        )}

        {resultado.verbas
          .filter((v) => v.tipo === "informativo")
          .map((verba, i) => (
            <div key={i} className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 text-sm text-amber-800">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <strong>{verba.nome}:</strong> {verba.detalhes}
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

function gerarTextoResultado(resultado: ResultadoRescisao): string {
  let texto = "RESULTADO DA RESCISÃO\n";
  texto += "=====================\n\n";

  resultado.verbas.forEach((v) => {
    texto += `${v.nome}: R$ ${v.valor.toFixed(2)}\n`;
  });

  texto += `\nTotal Bruto: R$ ${resultado.totalBruto.toFixed(2)}`;
  texto += `\nTotal Descontos: R$ ${resultado.totalDescontos.toFixed(2)}`;
  texto += `\nTotal Líquido: R$ ${resultado.totalLiquido.toFixed(2)}`;

  if (resultado.fgts) {
    texto += `\n\nFGTS:`;
    texto += `\nSaldo FGTS: R$ ${resultado.fgts.saldoFGTS.toFixed(2)}`;
    texto += `\nMulta 40%: R$ ${resultado.fgts.multa40.toFixed(2)}`;
    texto += `\nTotal FGTS: R$ ${resultado.fgts.totalFGTS.toFixed(2)}`;
  }

  texto += "\n\nFonte: calcule.net | Cálculo trabalhista online grátis";
  return texto;
}
