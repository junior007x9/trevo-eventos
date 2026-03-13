"use server";
import { turso } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function salvarLead(formData: FormData) {
  const nome = formData.get("nome") as string;
  const telefone = formData.get("telefone") as string;
  const evento = formData.get("evento") as string;

  if (!nome || !telefone || !evento) return { error: "Preencha todos os campos." };

  try {
    // Salva o cliente na tabela nova que você acabou de criar!
    await turso.execute({
      sql: "INSERT INTO leads (nome, telefone, evento) VALUES (?, ?, ?)",
      args: [nome, telefone, evento],
    });
    
    // Atualiza o painel admin nos bastidores
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao salvar contato." };
  }
}