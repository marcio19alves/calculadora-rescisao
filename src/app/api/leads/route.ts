import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = "D:\\HERMES AGENTE\\leads-coletados.json";

interface Lead {
  email: string;
  nome: string;
  timestamp: string;
  ip?: string;
  userAgent?: string;
  origem?: string;
}

async function readLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  const dir = path.dirname(LEADS_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    const lead: Lead = {
      email: email.trim().toLowerCase(),
      nome: (nome || "").trim(),
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
      origem: request.headers.get("referer") || undefined,
    };

    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);

    return NextResponse.json({ success: true, message: "Lead capturado com sucesso" });
  } catch (error) {
    console.error("Erro ao capturar lead:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await readLeads();
    return NextResponse.json({ total: leads.length, leads });
  } catch {
    return NextResponse.json({ total: 0, leads: [] });
  }
}
