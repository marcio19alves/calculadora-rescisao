"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveEmailToStorage } from "@/hooks/useEmailGate";
import { captureLead } from "@/lib/lead-capture";

interface EmailGateProps {
  open: boolean;
  onClose: () => void;
  onEmailSaved?: () => void;
}

export default function EmailGate({ open, onClose, onEmailSaved }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [saving, setSaving] = useState(false);

  // Reset form whenever the gate opens
  useEffect(() => {
    if (open) {
      setEmail("");
      setNome("");
      setSaving(false);
    }
  }, [open]);

  async function handleSubmit() {
    if (!email.trim()) return;
    setSaving(true);

    try {
      saveEmailToStorage(email.trim());
      await captureLead(email.trim(), nome.trim());
      onEmailSaved?.();
      onClose();
    } catch {
      // Even if the API fails, we already saved to localStorage
      onClose();
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <svg
              className="w-7 h-7 text-blue-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Receba o resultado por e-mail
          </h2>
          <p className="text-sm text-gray-500">
            Informe seu e-mail para <strong>salvar o cálculo</strong> e receber
            dicas sobre seus direitos trabalhistas.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="gate-nome"
              className="text-sm font-medium text-gray-700"
            >
              Seu nome (opcional)
            </label>
            <Input
              id="gate-nome"
              type="text"
              placeholder="Maria Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="min-h-[48px]"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="gate-email"
              className="text-sm font-medium text-gray-700"
            >
              Seu melhor e-mail *
            </label>
            <Input
              id="gate-email"
              type="email"
              placeholder="maria@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-[48px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            disabled={!email.trim() || saving}
            className="w-full min-h-[48px] text-base"
          >
            {saving ? "Salvando..." : "Ver meu resultado"}
          </Button>

          <button
            onClick={onClose}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
          >
            Não, quero ver o resultado agora
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">
          Seus dados estão seguros. Não enviaremos spam.
        </p>
      </div>
    </div>
  );
}
