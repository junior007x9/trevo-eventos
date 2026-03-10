import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-trevo-black text-trevo-white font-sans">
      
      {/* SEÇÃO 1 - BANNER PRINCIPAL */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        {/* Usando uma imagem de fundo elegante (placeholder) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-trevo-black"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl md:text-7xl font-serif text-trevo-gold font-bold tracking-wide">
            Trevo Eventos
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-trevo-white mt-2">
            Chegue como convidado no seu evento.
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mt-4 leading-relaxed">
            Na Trevo Eventos, cuidamos de todos os detalhes para que você possa viver o momento mais importante da sua vida com tranquilidade e alegria.
          </p>
          <button className="mt-8 px-8 py-4 bg-trevo-gold text-trevo-black font-semibold uppercase tracking-widest text-sm hover:bg-[#F3E5AB] transition-all duration-300 transform hover:scale-105">
            Planejar meu evento
          </button>
        </div>
      </section>

      {/* SEÇÃO 2 - QUEM SOMOS */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-trevo-gold mb-8">Quem Somos</h2>
        <div className="space-y-6 text-gray-300 font-light text-lg md:text-xl leading-relaxed">
          <p>
            A <strong className="text-trevo-white font-normal">Trevo Eventos</strong> é referência na realização de eventos sofisticados em Teresina.
          </p>
          <p>
            Com experiência, criatividade e atenção aos mínimos detalhes, nossa equipe planeja e executa cada evento com excelência. Nosso objetivo é simples: cuidar de tudo para que você apenas aproveite cada momento.
          </p>
          <p className="text-trevo-gold italic text-2xl mt-8 font-serif">
            "Aqui você chega como convidado no seu próprio evento."
          </p>
        </div>
      </section>

      {/* SEÇÃO 3 - ESCOLHA SEU EVENTO */}
      <section className="py-24 px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-trevo-gold mb-16 text-center">
            Qual será o seu evento?
          </h2>

          {/* Grid com os 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Casamento */}
            <Link href="/eventos/casamento" className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden rounded-sm border border-transparent group-hover:border-trevo-gold transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-trevo-gold mb-2">💍 Casamento</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    Um dos momentos mais importantes da sua vida merece uma celebração inesquecível.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2: 15 Anos */}
            <Link href="/eventos/15-anos" className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden rounded-sm border border-transparent group-hover:border-trevo-gold transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-trevo-gold mb-2">👑 15 Anos</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    A magia e a sofisticação para marcar o início de uma nova fase.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3: Infantil */}
            <Link href="/eventos/infantil" className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden rounded-sm border border-transparent group-hover:border-trevo-gold transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530103862676-de8892b090fc?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-trevo-gold mb-2">🎈 Infantil</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    Alegria e diversão garantidas com organização impecável.
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 4: Outros */}
            <Link href="/eventos/outros" className="group cursor-pointer">
              <div className="relative h-96 overflow-hidden rounded-sm border border-transparent group-hover:border-trevo-gold transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-trevo-gold mb-2">✨ Outros</h3>
                  <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                    Celebrações corporativas, bodas e eventos personalizados.
                  </p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}