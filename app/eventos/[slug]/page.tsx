import { turso } from "@/lib/db";
import Link from "next/link";

export default async function EventoDinamicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugDaUrl = resolvedParams.slug;

  const eventoReq = await turso.execute({
    sql: "SELECT * FROM eventos WHERE slug = ?",
    args: [slugDaUrl],
  });
  const evento = eventoReq.rows[0];

  if (!evento) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
        <h1 className="text-4xl font-black text-[#1A1A1A] dark:text-white mb-4 transition-colors">Página não encontrada</h1>
        <p className="text-gray-500 dark:text-zinc-400 transition-colors">Ainda não realizamos o evento "{slugDaUrl}".</p>
        <Link href="/" className="mt-8 px-8 py-3 bg-[#D4AF37] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
          Voltar para o Início
        </Link>
      </main>
    );
  }

  const eventoId = evento.id;

  const galeriaReq = await turso.execute({
    sql: "SELECT url_imagem FROM galeria_eventos WHERE evento_id = ?",
    args: [eventoId as number],
  });
  const fotosGaleria = galeriaReq.rows;

  const pacotesReq = await turso.execute({
    sql: "SELECT * FROM pacotes WHERE evento_id = ?",
    args: [eventoId as number],
  });
  const pacotes = pacotesReq.rows;

  const itensReq = await turso.execute("SELECT * FROM itens_pacote");
  const todosItens = itensReq.rows;

  // Placeholder caso o cliente não tenha subido um vídeo pelo painel ainda
  const videoFundo = evento.video_url || "https://cdn.coverr.co/videos/coverr-wedding-ceremony-2144/1080p.mp4";

  return (
    // Fundo principal adaptável
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-zinc-50 font-sans overflow-hidden selection:bg-[#E8C354] selection:text-white transition-colors duration-300">
      
      {/* ============================================= */}
      {/* CABEÇALHO ADAPTÁVEL                           */}
      {/* ============================================= */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
        {/* Link para voltar pra Home clicando na Logo */}
        <Link href="/" className="flex flex-col items-start pt-1 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-1.5">
            <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tighter leading-none transition-colors">TREV</h1>
            <div 
              className="text-2xl md:text-3xl -rotate-12 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] pt-1"
              style={{ filter: `drop-shadow(0.5px 0.5px 0px #F1D570) drop-shadow(1px 1px 0px #D4AF37)` }}
            >
              🍀
            </div>
          </div>
          <span className="text-[#1A1A1A]/80 dark:text-zinc-300 font-light tracking-[0.3em] uppercase text-[8px] md:text-[10px] leading-none mt-1 transition-colors">
            Buffet e Assessoria de Festas
          </span>
        </Link>

        <a 
          href="https://wa.me/5586999999999" target="_blank" rel="noopener noreferrer"
          className="px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F1D570] text-[#1A1A1A] font-extrabold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2.5 text-sm md:text-base group"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
          FALAR CONOSCO
        </a>
      </header>

      {/* ============================================= */}
      {/* 1. BANNER DO EVENTO                           */}
      {/* ============================================= */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4 pt-24 mt-10">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90 z-0">
          <source src={videoFundo as string} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center mt-10">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            {evento.titulo as string}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl mt-4 drop-shadow-md">
            {evento.descricao as string}
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* 2. GALERIA DE FOTOS (Adaptável)               */}
      {/* ============================================= */}
      <section className="py-24 px-6 bg-[#FAFAFA] dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-4 tracking-tight transition-colors">Inspirações</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-lg transition-colors">Momentos únicos eternizados com a assinatura Trevo Eventos.</p>
          </div>

          {fotosGaleria.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fotosGaleria.map((foto, index) => (
                <div key={index} className="relative h-72 overflow-hidden rounded-2xl group cursor-pointer shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                    style={{ backgroundImage: `url('${foto.url_imagem as string}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-all duration-500"></div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-zinc-400 italic bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm max-w-2xl mx-auto transition-colors">
              Nenhuma foto adicionada à galeria deste evento ainda.
            </p>
          )}
        </div>
      </section>

      {/* ============================================= */}
      {/* 3. PACOTES (Adaptável Claro/Escuro)           */}
      {/* ============================================= */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-4 tracking-tight transition-colors">Nossos Pacotes</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-lg transition-colors">A excelência que o seu evento merece, do tamanho do seu sonho.</p>
          </div>

          {pacotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {pacotes.map((pacote) => {
                const itensDoPacote = todosItens.filter((item) => item.pacote_id === pacote.id);
                return (
                  <div key={pacote.id as number} className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-[0_15px_50px_rgba(212,175,55,0.15)] transition-all duration-300 p-10 flex flex-col rounded-3xl relative hover:-translate-y-2">
                    
                    <h3 className="text-3xl font-black text-[#1A1A1A] dark:text-white mb-4 tracking-tight transition-colors">{pacote.nome as string}</h3>
                    <p className="text-gray-500 dark:text-zinc-400 mb-8 min-h-[48px] font-light leading-relaxed transition-colors">{pacote.descricao as string}</p>
                    
                    <ul className="space-y-4 mb-10 flex-grow">
                      {itensDoPacote.map((item) => (
                        <li key={item.id as number} className="flex items-start text-gray-700 dark:text-zinc-300 font-medium transition-colors">
                          <svg className="w-5 h-5 text-[#D4AF37] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          {item.item as string}
                        </li>
                      ))}
                    </ul>

                    {pacote.texto_final && (
                      <p className="text-sm text-[#D4AF37] font-bold tracking-wide italic mb-8 text-center border-t border-gray-100 dark:border-zinc-800 pt-6 transition-colors">
                        {pacote.texto_final as string}
                      </p>
                    )}

                    <a 
                      href={`https://wa.me/5586999999999?text=Olá! Me interessei pelo pacote ${pacote.nome as string} de ${evento.titulo as string}.`} 
                      target="_blank" rel="noopener noreferrer" 
                      className="w-full py-4 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white dark:hover:text-[#1A1A1A] transition-all font-extrabold uppercase tracking-widest text-sm text-center rounded-xl"
                    >
                      Solicitar Orçamento
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-zinc-400 italic bg-[#FAFAFA] dark:bg-zinc-900 p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 max-w-2xl mx-auto transition-colors">
              Nenhum pacote cadastrado para este evento ainda.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}