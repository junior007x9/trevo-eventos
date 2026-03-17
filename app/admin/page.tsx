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

  // 3. Buscando os Leads (Orçamentos)
  const leadsReq = await turso.execute("SELECT * FROM leads ORDER BY data_criacao DESC");
  const leads = leadsReq.rows;

  // 4. Buscando a Galeria de Fotos
  const galeriaReq = await turso.execute(`
    SELECT galeria_eventos.id, galeria_eventos.url_imagem, eventos.titulo as evento_titulo 
    FROM galeria_eventos 
    JOIN eventos ON galeria_eventos.evento_id = eventos.id
    ORDER BY galeria_eventos.id DESC
  `);
  const fotos = galeriaReq.rows;

  // 5. Buscando os Itens dos Pacotes
  const itensReq = await turso.execute(`
    SELECT itens_pacote.id, itens_pacote.item, pacotes.nome as pacote_nome, eventos.titulo as evento_titulo 
    FROM itens_pacote 
    JOIN pacotes ON itens_pacote.pacote_id = pacotes.id 
    JOIN eventos ON pacotes.evento_id = eventos.id
    ORDER BY eventos.titulo, pacotes.nome
  `);
  const itens = itensReq.rows;

  // ==========================================
  // FUNÇÕES DE BANCO DE DADOS (SERVER ACTIONS)
  // ==========================================
  
  async function deletarLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await turso.execute({ sql: "DELETE FROM leads WHERE id = ?", args: [id] });
    revalidatePath("/admin");
  }

  // NOVA: Deletar Foto da Galeria
  async function deletarFoto(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await turso.execute({ sql: "DELETE FROM galeria_eventos WHERE id = ?", args: [id] });
    revalidatePath("/admin"); revalidatePath("/eventos/[slug]", "page");
  }

  // NOVA: Deletar Item do Pacote
  async function deletarItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    await turso.execute({ sql: "DELETE FROM itens_pacote WHERE id = ?", args: [id] });
    revalidatePath("/admin"); revalidatePath("/eventos/[slug]", "page");
  }

  async function salvarVideoBanco(url: string, eventoId: string) {
    "use server";
    await turso.execute({ sql: "UPDATE eventos SET video_url = ? WHERE id = ?", args: [url, eventoId] });
    revalidatePath("/admin"); revalidatePath("/eventos/[slug]", "page");
  }

  async function salvarFotoBanco(url: string, eventoId: string) {
    "use server";
    await turso.execute({ sql: "INSERT INTO galeria_eventos (evento_id, url_imagem) VALUES (?, ?)", args: [eventoId, url] });
    revalidatePath("/admin"); revalidatePath("/eventos/[slug]", "page");
  }

  async function adicionarItem(formData: FormData) {
    "use server";
    const pacoteId = formData.get("pacote_id") as string;
    const novoItem = formData.get("item") as string;
    if (!pacoteId || !novoItem) return;
    
    await turso.execute({ sql: "INSERT INTO itens_pacote (pacote_id, item) VALUES (?, ?)", args: [pacoteId, novoItem] });
    revalidatePath("/admin"); revalidatePath("/eventos/[slug]", "page");
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
          <p className="text-gray-400 mb-8 text-sm">Contatos recebidos pelo site. Fechou o contrato? Apague o lead para limpar a lista.</p>
          
          {leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="p-4 font-bold">Nome</th>
                    <th className="p-4 font-bold">Evento</th>
                    <th className="p-4 font-bold">Data</th>
                    <th className="p-4 font-bold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const telLimpo = String(lead.telefone).replace(/\D/g, '');
                    const dataFormatada = new Date(lead.data_criacao as string).toLocaleDateString('pt-BR');
                    
                    return (
                      <tr key={lead.id as number} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors group">
                        <td className="p-4 font-bold text-white text-lg">{lead.nome as string}</td>
                        <td className="p-4 text-[#D4AF37] font-bold tracking-wide uppercase text-sm">{lead.evento as string}</td>
                        <td className="p-4 text-gray-500 text-sm">{dataFormatada}</td>
                        <td className="p-4 flex items-center justify-end gap-3">
                          <a 
                            href={`https://wa.me/55${telLimpo}?text=Olá ${lead.nome as string}! Recebemos seu pedido de orçamento para o seu ${lead.evento as string} pela Trevo Eventos.`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold py-2 px-4 rounded-xl text-sm transition-transform hover:scale-105 shadow-lg"
                          >
                            Zap
                          </a>
                          <form action={deletarLead}>
                            <input type="hidden" name="id" value={lead.id as number} />
                            <button type="submit" title="Excluir Orçamento" className="inline-flex items-center justify-center bg-red-950/50 hover:bg-red-600 text-red-500 hover:text-white border border-red-900/50 hover:border-red-600 p-2.5 rounded-xl transition-all shadow-lg">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-800 rounded-2xl bg-black/20">
              <p className="text-gray-500 italic">Nenhum pedido de orçamento pendente. Limpo e organizado!</p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* MÓDULO 2: GERENCIAR VÍDEOS */}
          <section className="bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🎥 Alterar Vídeo de Fundo</h2>
              <p className="text-gray-500 text-sm mb-6">Envie um novo vídeo para o fundo de uma página de evento.</p>
              <ClientUploader tipo="video" eventos={eventos} actionSave={salvarVideoBanco} />
            </div>
          </section>

          {/* MÓDULO 3: GERENCIAR GALERIA DE FOTOS */}
          <section className="bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">🖼️ Galeria de Fotos</h2>
            <p className="text-gray-500 text-sm mb-6">Envie novas fotos ou apague as antigas.</p>
            
            <ClientUploader tipo="foto" eventos={eventos} actionSave={salvarFotoBanco} />

            {fotos.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {fotos.map((foto) => (
                  <div key={foto.id as number} className="relative group rounded-lg overflow-hidden border border-gray-800 h-24">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${foto.url_imagem as string}')` }}></div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                      <span className="text-xs text-[#D4AF37] font-bold text-center mb-2 truncate w-full">{foto.evento_titulo as string}</span>
                      <form action={deletarFoto}>
                        <input type="hidden" name="id" value={foto.id as number} />
                        <button type="submit" className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-red-500 transition-colors font-bold">
                          Excluir
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* MÓDULO 4: GERENCIAR PACOTES E ITENS */}
        <section className="bg-[#121212] border border-gray-800 p-8 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">✨ Gerenciar Itens dos Pacotes</h2>
          <p className="text-gray-500 text-sm mb-8">Adicione um novo item (ex: Cascata de Chocolate) ou apague itens antigos.</p>
          
          <form action={adicionarItem} className="flex flex-col md:flex-row gap-4 mb-10 border-b border-gray-800 pb-10">
            <select name="pacote_id" required className="bg-black border border-gray-700 text-white rounded-xl p-4 focus:border-[#D4AF37] outline-none w-full md:w-1/3 transition-colors">
              <option value="">Selecione o Pacote...</option>
              {pacotes.map((pacote) => (
                <option key={pacote.id as number} value={pacote.id as number}>{pacote.evento_titulo as string} - {pacote.nome as string}</option>
              ))}
            </select>
            <input type="text" name="item" placeholder="Ex: Fotografia e Filmagem com Drone" required className="bg-black border border-gray-700 text-white rounded-xl p-4 flex-grow focus:border-[#D4AF37] outline-none transition-colors" />
            <button type="submit" className="bg-white text-black font-extrabold uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all">Salvar Item</button>
          </form>

          {itens.length > 0 && (
            <div className="overflow-x-auto max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider sticky top-0 bg-[#121212]">
                    <th className="p-3 font-bold">Evento / Pacote</th>
                    <th className="p-3 font-bold">Item Benefício</th>
                    <th className="p-3 font-bold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => (
                    <tr key={item.id as number} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="p-3 text-[#D4AF37] text-sm font-medium">
                        {item.evento_titulo as string} <span className="text-gray-600 mx-1">/</span> {item.pacote_nome as string}
                      </td>
                      <td className="p-3 text-white text-sm">{item.item as string}</td>
                      <td className="p-3 text-right">
                        <form action={deletarItem}>
                          <input type="hidden" name="id" value={item.id as number} />
                          <button type="submit" title="Excluir Item" className="text-gray-500 hover:text-red-500 transition-colors p-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}