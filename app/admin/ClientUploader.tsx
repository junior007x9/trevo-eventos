"use client";
import { upload } from "@vercel/blob/client";
import { useState } from "react";

export default function ClientUploader({ 
  tipo, 
  eventos, 
  actionSave 
}: { 
  tipo: 'video' | 'foto', 
  eventos: any[], 
  actionSave: (url: string, id: string) => Promise<void> 
}) {
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    const eventoId = formData.get("evento_id") as string;

    if (!file || !eventoId) {
      setLoading(false);
      return;
    }

    try {
      // 1. Envia o arquivo direto pro balde da Vercel (Pula o limite de peso!)
      const newBlob = await upload(`${tipo}s/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      
      // 2. Chama a função do servidor só para salvar o LINK gerado no Turso
      await actionSave(newBlob.url, eventoId);
      
      alert(`✅ ${tipo === 'video' ? 'Vídeo' : 'Foto'} enviado e salvo com sucesso!`);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert("❌ Erro ao enviar o arquivo. Verifique se o formato está correto.");
      console.error(error);
    }
    
    setLoading(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-4 mt-4">
      <select name="evento_id" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-4 focus:border-trevo-gold outline-none w-full md:w-1/3">
        <option value="">Selecione o Evento...</option>
        {eventos.map((ev: any) => (
          <option key={ev.id} value={ev.id}>{ev.titulo}</option>
        ))}
      </select>
      <input 
        type="file" name="file" required 
        accept={tipo === 'video' ? "video/mp4" : "image/jpeg, image/png, image/webp"} 
        className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-3 flex-grow focus:border-trevo-gold outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-trevo-gold file:text-black hover:file:bg-[#F3E5AB]" 
      />
      <button 
        type="submit" disabled={loading} 
        className="bg-trevo-gold text-trevo-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#F3E5AB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}