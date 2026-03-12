import { turso } from "@/lib/db";
import Link from "next/link";

export default async function CasamentoPage() {
  // Buscando o evento no banco
  const eventoReq = await turso.execute("SELECT * FROM eventos WHERE slug = 'casamento'");
  const evento = eventoReq.rows[0];

  if (!evento) {
    return (
      <main className="min-h-screen bg-trevo-black flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-serif text-trevo-gold mb-4">Opa! Faltam dados no banco.</h1>
        <p className="text-gray-300">Não encontramos o evento "Casamento" cadastrado.</p>
        <Link href="/" className="mt-8 text-trevo-gold underline">Voltar para a Home</Link>
      </main>
    );
  }

  // Buscando pacotes e itens
  const pacotesReq = await turso.execute("SELECT * FROM pacotes WHERE evento_id = " + evento.id);
  const pacotes = pacotesReq.rows;

  const itensReq = await turso.execute("SELECT * FROM itens_pacote");
  const todosItens = itensReq.rows;

  // Array de fotos para a galeria de casamento
  const fotosGaleria = [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", // Decoração mesas
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", // Alianças/Detalhes
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800", // Bolo/Doces
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800", // Espaço iluminado
  ];

  return (
    <main className="min-h-screen bg-trevo-black text-trevo-white font-sans pb-24">
      {/* 1. BANNER DO EVENTO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-trevo-black"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif text-trevo-gold mb-4">
            {evento.titulo as string}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto">
            {evento.descricao as string}
          </p>
        </div>
      </section>

      {/* 2. GALERIA DE FOTOS (NOVA SEÇÃO) */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-trevo-gold mb-4">Galeria de Inspirações</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Momentos únicos eternizados com a assinatura de excelência da Trevo Eventos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fotosGaleria.map((foto, index) => (
            <div key={index} className="relative h-64 md:h-80 overflow-hidden rounded-sm group cursor-pointer border border-gray-800 hover:border-trevo-gold transition-colors duration-300">
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                style={{ backgroundImage: `url('${foto}')` }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PACOTES (Vindo do Turso) */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-trevo-gold mb-4">Nossos Pacotes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Escolha o pacote ideal para o seu evento. Todos os nossos eventos são planejados para que você possa chegar como convidado no seu próprio evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pacotes.map((pacote) => {
            const itensDoPacote = todosItens.filter((item) => item.pacote_id === pacote.id);

            return (
              <div key={pacote.id as number} className="bg-[#121212] border border-gray-800 hover:border-trevo-gold transition-colors duration-300 p-8 flex flex-col rounded-sm relative overflow-hidden group">
                {/* Detalhe de luxo: brilho sutil ao passar o mouse */}
                <div className="absolute inset-0 bg-gradient-to-br from-trevo-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <h3 className="text-3xl font-serif text-trevo-gold mb-4 relative z-10">{pacote.nome as string}</h3>
                <p className="text-gray-400 mb-8 min-h-[48px] relative z-10">{pacote.descricao as string}</p>
                
                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  {itensDoPacote.map((item) => (
                    <li key={item.id as number} className="flex items-start text-gray-300">
                      <span className="text-trevo-gold mr-3">✔</span>
                      {item.item as string}
                    </li>
                  ))}
                </ul>

                {pacote.texto_final && (
                  <p className="text-sm text-trevo-gold italic mb-8 border-t border-gray-800 pt-4 relative z-10">
                    {pacote.texto_final as string}
                  </p>
                )}

                <a 
                  href={`https://wa.me/5586999999999?text=Olá! Estava vendo a página de Casamentos e me interessei pelo ${pacote.nome as string}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 border border-trevo-gold text-trevo-gold hover:bg-trevo-gold hover:text-trevo-black transition-all font-semibold uppercase tracking-widest text-sm text-center relative z-10 block"
                >
                  {pacote.nome === 'Pacote Ouro' ? 'Quero o pacote Ouro' : 'Solicitar orçamento'}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}