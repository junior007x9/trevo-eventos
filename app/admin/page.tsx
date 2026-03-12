import { turso } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { put } from "@vercel/blob"; // A Mágica do Vercel Blob!

export default async function AdminPage() {
  // 1. Buscando dados para os selects
  const eventosReq = await turso.execute("SELECT id, titulo FROM eventos");
  const eventos = eventosReq.rows;

  const pacotesReq = await turso.execute(`
    SELECT pacotes.id, pacotes.nome, eventos.titulo as evento_titulo 
    FROM pacotes JOIN eventos ON pacotes.evento_id = eventos.id
  `);
  const pacotes = pacotesReq.rows;

  // 2. FUNÇÕES DE BANCO DE DADOS E UPLOAD

  // Módulo 1: Fazer upload do Vídeo e salvar o link gerado
  async function atualizarVideo(formData: FormData) {
    "use server";
    const eventoId = formData.get("evento_id") as string;
    const file = formData.get("video_file") as File;

    // Se não tiver arquivo ou o arquivo for vazio, cancela
    if (!eventoId || !file || file.size === 0) return;

    // 1. Manda pro "balde" da Vercel
    const blob = await put(`videos/${file.name}`, file, { access: 'public' });

    // 2. Salva o link do balde no Turso
    await turso.execute({
      sql: "UPDATE eventos SET video_url = ? WHERE id = ?",
      args: [blob.url, eventoId],
    });
    
    revalidatePath("/admin");
    revalidatePath("/eventos/casamento");
  }

  // Módulo 2: Fazer upload da Foto e salvar o link gerado
  async function adicionarFoto(formData: FormData) {
    "use server";
    const eventoId = formData.get("evento_id") as string;
    const file = formData.get("foto_file") as File;

    if (!eventoId || !file || file.size === 0) return;

    // 1. Manda pro "balde" da Vercel
    const blob = await put(`fotos/${file.name}`, file, { access: 'public' });

    // 2. Salva o link do balde no Turso
    await turso.execute({
      sql: "INSERT INTO galeria_eventos (evento_id, url_imagem) VALUES (?, ?)",
      args: [eventoId, blob.url],
    });
    
    revalidatePath("/admin");
    revalidatePath("/eventos/casamento");
  }

  // Módulo 3: Adicionar Benefício (Mantido igual)
  async function adicionarItem(formData: FormData) {
    "use server";
    const pacoteId = formData.get("pacote_id") as string;
    const novoItem = formData.get("item") as string;
    if (!pacoteId || !novoItem) return;
    
    await turso.execute({
      sql: "INSERT INTO itens_pacote (pacote_id, item) VALUES (?, ?)",
      args: [pacoteId, novoItem],
    });
    revalidatePath("/admin");
    revalidatePath("/eventos/casamento");
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-trevo-white font-sans p-8 md:p-16">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-trevo-gold">Painel de Controle</h1>
            <p className="text-gray-400 mt-2">Envie arquivos diretamente para a nuvem.</p>
          </div>
          <Link href="/eventos/casamento" className="px-6 py-2 border border-trevo-gold text-trevo-gold hover:bg-trevo-gold hover:text-trevo-black transition-colors font-semibold uppercase tracking-widest text-xs">
            Ver Página de Casamento
          </Link>
        </div>

        {/* MÓDULO 1: UPLOAD DE VÍDEO */}
        <section className="bg-[#121212] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-xl font-serif text-trevo-gold mb-6 flex items-center gap-2">🎥 Upload de Vídeo de Fundo</h2>
          <form action={atualizarVideo} className="flex flex-col md:flex-row gap-4">
            <select name="evento_id" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-4 focus:border-trevo-gold outline-none w-full md:w-1/3">
              <option value="">Selecione o Evento...</option>
              {eventos.map((ev) => (
                <option key={ev.id as number} value={ev.id as number}>{ev.titulo as string}</option>
              ))}
            </select>
            {/* Campo de Arquivo para Vídeo */}
            <input type="file" name="video_file" accept="video/mp4,video/x-m4v,video/*" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-3 flex-grow focus:border-trevo-gold outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-trevo-gold file:text-black hover:file:bg-[#F3E5AB]" />
            <button type="submit" className="bg-trevo-gold text-trevo-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#F3E5AB] transition-colors">Enviar Vídeo</button>
          </form>
          <p className="text-xs text-gray-500 mt-3">*Dica: Use vídeos curtos (até 4MB) para o site carregar rápido.</p>
        </section>

        {/* MÓDULO 2: UPLOAD DE FOTOS */}
        <section className="bg-[#121212] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-xl font-serif text-trevo-gold mb-6 flex items-center gap-2">🖼️ Upload de Foto para Galeria</h2>
          <form action={adicionarFoto} className="flex flex-col md:flex-row gap-4">
            <select name="evento_id" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-4 focus:border-trevo-gold outline-none w-full md:w-1/3">
              <option value="">Selecione o Evento...</option>
              {eventos.map((ev) => (
                <option key={ev.id as number} value={ev.id as number}>{ev.titulo as string}</option>
              ))}
            </select>
            {/* Campo de Arquivo para Foto */}
            <input type="file" name="foto_file" accept="image/png, image/jpeg, image/webp" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-3 flex-grow focus:border-trevo-gold outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-trevo-gold file:text-black hover:file:bg-[#F3E5AB]" />
            <button type="submit" className="bg-trevo-gold text-trevo-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#F3E5AB] transition-colors">Enviar Foto</button>
          </form>
        </section>

        {/* MÓDULO 3: ITENS DOS PACOTES */}
        <section className="bg-[#121212] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-xl font-serif text-trevo-gold mb-6 flex items-center gap-2">✨ Adicionar Benefício ao Pacote</h2>
          <form action={adicionarItem} className="flex flex-col md:flex-row gap-4">
            <select name="pacote_id" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-4 focus:border-trevo-gold outline-none w-full md:w-1/3">
              <option value="">Selecione o Pacote...</option>
              {pacotes.map((pacote) => (
                <option key={pacote.id as number} value={pacote.id as number}>{pacote.evento_titulo as string} - {pacote.nome as string}</option>
              ))}
            </select>
            <input type="text" name="item" placeholder="Ex: Cascata de Chocolate" required className="bg-[#0a0a0a] border border-gray-700 text-trevo-white p-4 flex-grow focus:border-trevo-gold outline-none" />
            <button type="submit" className="bg-trevo-gold text-trevo-black font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#F3E5AB] transition-colors">Salvar</button>
          </form>
        </section>

      </div>
    </main>
  );
}