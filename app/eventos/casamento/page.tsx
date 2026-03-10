import { turso } from "@/lib/db";
import Link from "next/link";

export default async function CasamentoPage() {
  // 1. Buscando o evento
  const eventoReq = await turso.execute("SELECT * FROM eventos WHERE slug = 'casamento'");
  const evento = eventoReq.rows[0];

  // TRAVA DE SEGURANÇA: Se não achar o evento no banco, mostra essa tela.
  if (!evento) {
    return (
      <main className="min-h-screen bg-trevo-black flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-serif text-trevo-gold mb-4">Opa! Faltam dados no banco.</h1>
        <p className="text-gray-300">Não encontramos o evento "Casamento" cadastrado no banco de dados do Turso.</p>
        <Link href="/" className="mt-8 text-trevo-gold underline">Voltar para a Home</Link>
      </main>
    );
  }

  // 2. Se achou, busca os pacotes e itens
  const pacotesReq = await turso.execute("SELECT * FROM pacotes WHERE evento_id = " + evento.id);
  const pacotes = pacotesReq.rows;

  const itensReq = await turso.execute("SELECT * FROM itens_pacote");
  const todosItens = itensReq.rows;

  return (
    <main className="min-h-screen bg-trevo-black text-trevo-white font-sans pb-24">
      {/* BANNER DO EVENTO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
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

      {/* PACOTES */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
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
              <div key={pacote.id as number} className="bg-[#121212] border border-gray-800 hover:border-trevo-gold transition-colors duration-300 p-8 flex flex-col rounded-sm">
                <h3 className="text-3xl font-serif text-trevo-gold mb-4">{pacote.nome as string}</h3>
                <p className="text-gray-400 mb-8 min-h-[48px]">{pacote.descricao as string}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {itensDoPacote.map((item) => (
                    <li key={item.id as number} className="flex items-start text-gray-300">
                      <span className="text-trevo-gold mr-3">✔</span>
                      {item.item as string}
                    </li>
                  ))}
                </ul>

                {pacote.texto_final && (
                  <p className="text-sm text-trevo-gold italic mb-8 border-t border-gray-800 pt-4">
                    {pacote.texto_final as string}
                  </p>
                )}

                <button className="w-full py-4 border border-trevo-gold text-trevo-gold hover:bg-trevo-gold hover:text-trevo-black transition-all font-semibold uppercase tracking-widest text-sm">
                  {pacote.nome === 'Pacote Ouro' ? 'Quero o pacote Ouro' : 'Solicitar orçamento'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}