import { turso } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ClientUploader from "./ClientUploader"; // Importando o nosso Motor!

export default async function AdminPage() {
  const eventosReq = await turso.execute("SELECT id, titulo FROM eventos");
  const eventos = eventosReq.rows;

  const pacotesReq = await turso.execute(`
    SELECT pacotes.id, pacotes.nome, eventos.titulo as evento_titulo 
    FROM pacotes JOIN eventos ON pacotes.evento_id = eventos.id
  `);
  const pacotes = pacotesReq.rows;

  // FUNÇÕES QUE SALVAM NO BANCO (Agora elas só recebem o link pronto!)
  
  async function salvarVideoBanco(url: string, eventoId: string) {
    "use server";
    await turso.execute({ sql: "UPDATE eventos SET video_url = ? WHERE id = ?", args: [url, eventoId] });
    revalidatePath("/admin"); revalidatePath("/eventos/casamento");
  }

  async function salvarFotoBanco(url: string, eventoId: string) {
    "use server";
    await turso.execute({ sql: "INSERT INTO galeria_eventos (evento_id, url_imagem) VALUES (?, ?)", args: [eventoId, url] });
    revalidatePath("/admin"); revalidatePath("/eventos/casamento");
  }

  async function adicionarItem(formData: FormData) {
    "use server";
    const pacoteId = formData.get("pacote_id") as string;
    const novoItem = formData.get("item") as string;
    if (!pacoteId || !novoItem) return;
    
    await turso.execute({ sql: "INSERT INTO itens_pacote (pacote_id, item) VALUES (?, ?)", args: [pacoteId, novoItem] });
    revalidatePath("/admin"); revalidatePath("/eventos/casamento");
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-trevo-white font-sans p-8 md:p-16">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-trevo-gold">Painel de Controle</h1>
            <p className="text-gray-400 mt-2">Envie arquivos diretamente pelo Túnel (Sem Limites).</p>
          </div>
          <Link href="/eventos/casamento" className="px-6 py-2 border border-trevo-gold text-trevo-gold hover:bg-trevo-gold hover:text-trevo-black transition-colors font-semibold uppercase tracking-widest text-xs">
            Ver Página
          </Link>
        </div>

        {/* MÓDULO 1: VÍDEO */}
        <section className="bg-[#121212] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-xl font-serif text-trevo-gold mb-2 flex items-center gap-2">🎥 Upload de Vídeo de Fundo</h2>
          <ClientUploader tipo="video" eventos={eventos} actionSave={salvarVideoBanco} />
        </section>

        {/* MÓDULO 2: FOTO */}
        <section className="bg-[#121212] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-xl font-serif text-trevo-gold mb-2 flex items-center gap-2">🖼️ Upload de Foto para Galeria</h2>
          <ClientUploader tipo="foto" eventos={eventos} actionSave={salvarFotoBanco} />
        </section>

        {/* MÓDULO 3: ITENS */}
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