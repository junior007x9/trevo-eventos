"use client"; // Necessário para usar animações no Next.js
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-trevo-black text-trevo-white font-sans overflow-hidden">
      
      {/* SEÇÃO 1 - BANNER PRINCIPAL COM VÍDEO */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        {/* Vídeo de fundo em loop silencioso (Estilo Elite Eventos) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="https://cdn.coverr.co/videos/coverr-wedding-reception-5241/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-trevo-black/50 to-trevo-black"></div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <h1 className="text-5xl md:text-8xl font-serif text-trevo-gold font-bold tracking-wide drop-shadow-2xl">
            Trevo Eventos
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-trevo-white mt-2">
            Chegue como convidado no seu evento.
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-300 max-w-2xl mt-4 leading-relaxed">
            A sofisticação e a excelência que o seu momento exige, planejadas nos mínimos detalhes.
          </p>
          <button className="mt-8 px-10 py-5 bg-trevo-gold text-trevo-black font-semibold uppercase tracking-widest text-sm hover:bg-[#F3E5AB] transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            Planejar meu evento
          </button>
        </motion.div>
      </section>

      {/* SEÇÃO 2 - QUEM SOMOS (Animada) */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-trevo-gold mb-8">A Experiência Trevo</h2>
          <div className="space-y-6 text-gray-300 font-light text-lg md:text-xl leading-relaxed">
            <p>
              Mais do que organizar festas, nós construímos legados. A <strong className="text-trevo-white font-normal">Trevo Eventos</strong> é sinônimo de alto padrão no Piauí.
            </p>
            <p>
              Nosso método exclusivo de gestão de eventos garante que anfitriões e formandos tenham zero estresse. Desde a primeira reunião até o último brinde da noite, nós orquestramos cada detalhe.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SEÇÃO 3 - ESCOLHA SEU EVENTO */}
      <section className="py-24 px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-trevo-gold mb-16 text-center"
          >
            Nossas Especialidades
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Array de eventos para facilitar a animação */}
            {[
              { title: "Casamento", href: "/eventos/casamento", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", desc: "Celebrações inesquecíveis para o seu grande dia." },
              { title: "Formaturas", href: "/eventos/outros", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800", desc: "O baile perfeito para coroar sua conquista." },
              { title: "15 Anos", href: "/eventos/15-anos", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800", desc: "Magia e sofisticação na sua nova fase." },
              { title: "Corporativo", href: "/eventos/outros", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", desc: "Eventos de alto nível para sua empresa." },
            ].map((evento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={evento.href} className="group cursor-pointer block">
                  <div className="relative h-[400px] overflow-hidden rounded-sm border border-gray-800 group-hover:border-trevo-gold transition-all duration-500">
                    <div className={`absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700`} style={{ backgroundImage: `url('${evento.img}')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-3xl font-serif text-trevo-gold mb-2">{evento.title}</h3>
                      <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {evento.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 - PROVA SOCIAL (NOVO - ESTILO ELITE) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-trevo-gold mb-4">O que dizem nossos convidados</h2>
          <p className="text-gray-400">Histórias reais de quem viveu a experiência Trevo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { nome: "Mariana & João", tipo: "Casamento", texto: "A Trevo superou todas as expectativas. Não nos preocupamos com absolutamente nada no dia do nosso casamento. Foi perfeito!" },
            { nome: "Comissão de Medicina", tipo: "Formatura", texto: "O melhor baile de Teresina! A estrutura, a iluminação e o cuidado da equipe com cada formando foi surreal." },
            { nome: "Ana Luiza", tipo: "15 Anos", texto: "Meu aniversário pareceu um conto de fadas. A decoração estava impecável e o buffet foi elogiado por todos os convidados." }
          ].map((depoimento, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm relative"
            >
              <div className="text-trevo-gold text-4xl font-serif absolute top-4 left-6">"</div>
              <p className="text-gray-300 font-light leading-relaxed mt-6 mb-8 italic relative z-10">
                {depoimento.texto}
              </p>
              <div className="border-t border-gray-800 pt-4">
                <p className="text-trevo-white font-semibold">{depoimento.nome}</p>
                <p className="text-trevo-gold text-sm">{depoimento.tipo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}