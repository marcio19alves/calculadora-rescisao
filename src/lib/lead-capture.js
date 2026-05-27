/**
 * Captura um lead (email + nome opcional) enviando para a API interna.
 * Retorna { success: boolean, error?: string }.
 */
export async function captureLead(email, nome) {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, nome: nome || "" }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, error: data.error || "Erro ao capturar lead" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "Erro de rede" };
  }
}
