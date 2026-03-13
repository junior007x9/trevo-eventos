import { turso } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import ClientUploader from "./ClientUploader";

export default async function AdminPage() {
  // 1. Buscando Eventos
  const eventosReq = await turso.execute("SELECT id, titulo FROM eventos");
  const eventos = eventosReq.rows;

  // 2. Buscando Pacotes
  const pacotesReq = await turso.execute(`
    SELECT pacotes.id, pacotes.nome, eventos.titulo as evento_titulo 
    FROM pacotes JOIN eventos ON pacotes.evento_id = eventos.id
  `);
  const pacotes = pacotesReq.rows;

  // 3. Buscando os Leads (Orçamentos do Formulário)
  const leadsReq = await turso.execute("SELECT * FROM leads ORDER BY data_criacao DESC");
  const leads = leadsReq.rows;

  // ==========================================
  // FUNÇÕES DE SALVAR (SERVER ACTIONS)
  // ==========================================
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
    <main className="min-h-screen bg-[#0a0a0a] text-[#FAFAFA] font-sans p-8 md:p-16 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* CABEÇALHO DO PAINEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-[#D4AF37] tracking-tight">Painel de Controle</h1>
            <p className="text-gray-400 mt-2 text-lg">Gerencie seus arquivos, pacotes e clientes.</p>
          </div>
          <Link href="/" className="px-6 py-3 bg-white text-black hover:bg-[#D4AF37] hover:text-white transition-colors font-bold uppercase tracking-widest text-xs rounded-full shadow-lg">
            Acessar o Site ➔
          </Link>
        </div>

        {/* ======================================= */}
        {/* MÓDULO 1: MINI-CRM (LEADS)              */}
        {/* ======================================= */}
        <section className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-[#D4AF37]/30 p-8 md:p-10 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-2xl font-black text-[#D4AF37] mb-2 flex items-center gap-3">
            📋 Novos Orçamentos
            <span className="bg-[#D4AF37] text-black text-sm px-3 py-1 rounded-full">{leads.length}</span>
          </h2>
          <p className="text-gray-400 mb-8 text-sm">Contatos recebidos pelo site. Clique no botão para chamar no WhatsApp.</p>
          
          {leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="p-4 font-bold">Nome</th>
                    <th className="p-4 font-bold">Evento</th>
                    <th className="p-4 font-bold">Data</th>
                    <th className="p-4 font-bold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const telLimpo = String(lead.telefone).replace(/\D/g, '');
                    const dataFormatada = new Date(lead.data_criacao as string).toLocaleDateString('pt-BR');
                    
                    return (
                      <tr key={lead.id as number} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white text-lg">{lead.nome as string}</td>
                        <td className="p-4 text-[#D4AF37] font-bold tracking-wide uppercase text-sm">{lead.evento as string}</td>
                        <td className="p-4 text-gray-500 text-sm">{dataFormatada}</td>
                        <td className="p-4 text-right">
                          <a 
                            href={`https://wa.me/55${telLimpo}?text=Olá ${lead.nome as string}! Recebemos seu pedido de orçamento para o seu ${lead.evento as string} pela Trevo Eventos.`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-2.5 px-5 rounded-xl text-sm transition-transform hover:scale-105 shadow-lg"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                            Chamar no Zap
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl bg-black/20">
              <p className="text-gray-500 italic">Nenhum pedido de orçamento ainda. Divulgue o site!</p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MÓDULO 2: VÍDEO */}
          <section className="bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🎥 Upload de Vídeo de Fundo</h2>
            <p className="text-gray-500 text-sm mb-6">Altere o vídeo de fundo de uma página de evento.</p>
            <ClientUploader tipo="video" eventos={eventos} actionSave={salvarVideoBanco} />
          </section>

          {/* MÓDULO 3: FOTO */}
          <section className="bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🖼️ Upload de Foto para Galeria</h2>
            <p className="text-gray-500 text-sm mb-6">Adicione novas inspirações para as páginas de eventos.</p>
            <ClientUploader tipo="foto" eventos={eventos} actionSave={salvarFotoBanco} />
          </section>
        </div>

        {/* MÓDULO 4: ITENS DO PACOTE */}
        <section className="bg-[#121212] border border-gray-800 p-8 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">✨ Adicionar Benefício ao Pacote</h2>
          <p className="text-gray-500 text-sm mb-8">Adicione um novo item (ex: Cascata de Chocolate) a um pacote existente.</p>
          <form action={adicionarItem} className="flex flex-col md:flex-row gap-4">
            <select name="pacote_id" required className="bg-black border border-gray-700 text-white rounded-xl p-4 focus:border-[#D4AF37] outline-none w-full md:w-1/3 transition-colors">
              <option value="">Selecione o Pacote...</option>
              {pacotes.map((pacote) => (
                <option key={pacote.id as number} value={pacote.id as number}>{pacote.evento_titulo as string} - {pacote.nome as string}</option>
              ))}
            </select>
            <input type="text" name="item" placeholder="Ex: Fotografia e Filmagem com Drone" required className="bg-black border border-gray-700 text-white rounded-xl p-4 flex-grow focus:border-[#D4AF37] outline-none transition-colors" />
            <button type="submit" className="bg-white text-black font-extrabold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all">Salvar</button>
          </form>
        </section>

      </div>
    </main>
  );
}