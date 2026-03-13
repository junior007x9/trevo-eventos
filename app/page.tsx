"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { salvarLead } from "./actions";

export default function Home() {
  return (
    // O site agora respeita o sistema: bg-white (Claro) ou bg-[#0a0a0a] (Escuro)
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-zinc-50 font-sans overflow-hidden selection:bg-[#E8C354] selection:text-white transition-colors duration-300">
      
      {/* ============================================= */}
      {/* CABEÇALHO (Adaptável Claro/Escuro)            */}
      {/* ============================================= */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 shadow-sm transition-colors duration-300">
        <div className="flex flex-col items-start pt-1">
          <div className="flex items-center gap-1.5">
            <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] dark:text-white tracking-tighter leading-none transition-colors">
              TREV
            </h1>
            <div 
              className="text-2xl md:text-3xl -rotate-12 transition-transform duration-500 hover:rotate-0 cursor-pointer pt-1"
              style={{
                filter: `drop-shadow(0.5px 0.5px 0px #F1D570) drop-shadow(1px 1px 0px #D4AF37) drop-shadow(2px 2px 1px rgba(0,0,0,0.2))`,
              }}
            >
              🍀
            </div>
          </div>
          <span className="text-[#1A1A1A]/80 dark:text-zinc-300 font-light tracking-[0.3em] uppercase text-[8px] md:text-[10px] leading-none mt-1 transition-colors">
            Buffet e Assessoria de Festas
          </span>
        </div>

        <a 
          href="#orcamento"
          className="px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F1D570] text-[#1A1A1A] font-extrabold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2.5 text-sm md:text-base group"
        >
          PEDIR ORÇAMENTO
        </a>
      </header>

      {/* ============================================= */}
      {/* 1. BANNER COM VÍDEO                           */}
      {/* ============================================= */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center text-center px-4 pt-24 md:pt-32 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
        <video 
          autoPlay loop muted playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
        >
          <source src="https://cdn.coverr.co/videos/coverr-wedding-ceremony-2144/1080p.mp4" type="video/mp4" />
        </video>
        {/* Camada escura levemente mais forte no dark mode para não ofuscar */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 dark:from-black/40 via-black/30 dark:via-black/50 to-black/60 dark:to-black/80 z-0 transition-colors duration-300"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl leading-[0.95]">
            Sua festa perfeita<br/> do início ao fim.
          </h1>
          
          <h2 className="text-xl md:text-2xl font-light text-gray-100 max-w-2xl mt-4 px-4 drop-shadow-md leading-relaxed">
            Na Trevo Eventos, você chega como convidado na sua própria celebração. Deixe a excelência e a assessoria conosco.
          </h2>
          
          <Link href="#sonhos" className="mt-16 text-white font-bold tracking-widest uppercase text-sm hover:text-[#D4AF37] transition-colors animate-bounce flex flex-col items-center gap-2">
             Conheça nossos eventos
             <span className="text-2xl">⇓</span>
          </Link>
        </motion.div>
      </section>

      {/* ============================================= */}
      {/* 2. MENU DE EVENTOS (Adaptável Claro/Escuro)   */}
      {/* ============================================= */}
      <section id="sonhos" className="py-24 px-4 bg-[#FAFAFA] dark:bg-zinc-900 relative z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto pt-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] dark:text-white mb-5 tracking-tight transition-colors">Qual é o seu sonho?</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-xl font-light max-w-2xl mx-auto transition-colors">Tudo que você precisa para tornar seu dia inesquecível está aqui. Selecione o tipo de evento.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-2">
            {[
              { title: "Casamento", href: "/eventos/casamento", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", desc: "Sua história de amor merece perfeição." },
              { title: "Formaturas", href: "/eventos/formatura", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800", desc: "A celebração máxima da sua conquista." },
              { title: "15 Anos", href: "/eventos/15-anos", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800", desc: "Uma noite mágica e inesquecível." },
              { title: "Corporativo", href: "/eventos/corporativo", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", desc: "Impressione seus clientes e equipe." },
            ].map((evento, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }}>
                <Link href={evento.href} className="group block bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-[0_15px_45px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-zinc-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-[0_15px_45px_rgba(212,175,55,0.18)] transition-all duration-300 transform hover:-translate-y-3">
                  <div className="relative h-72 overflow-hidden">
                    <div className={`absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700`} style={{ backgroundImage: `url('${evento.img}')` }}></div>
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-10 text-center flex flex-col h-[220px] justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-[#1A1A1A] dark:text-white mb-4 tracking-tight transition-colors">{evento.title}</h3>
                      <p className="text-gray-500 dark:text-zinc-400 text-base leading-relaxed font-light transition-colors">{evento.desc}</p>
                    </div>
                    <span className="inline-block mt-6 text-[#D4AF37] font-extrabold tracking-widest uppercase text-sm group-hover:text-[#1A1A1A] dark:group-hover:text-white transition-colors border-t border-gray-100 dark:border-zinc-800 pt-5 w-full">
                      Ver Pacotes ➔
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 3. FORMULÁRIO DE CAPTAÇÃO (Harmonizado)       */}
      {/* ============================================= */}
      <section id="orcamento" className="py-24 px-4 bg-white dark:bg-[#0a0a0a] relative z-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] dark:text-white mb-4 tracking-tight transition-colors">Vamos planejar o seu evento?</h2>
          <p className="text-gray-500 dark:text-zinc-400 text-lg font-light mb-12 transition-colors">Deixe seus dados abaixo e nossa equipe entrará em contato rapidamente para montar um orçamento exclusivo.</p>
          
          <form 
            action={async (formData) => {
              const res = await salvarLead(formData);
              if (res?.success) {
                alert("🍀 Recebemos seu contato! Nossa equipe vai te chamar no WhatsApp em breve.");
              } else {
                alert("❌ Erro ao enviar. Tente novamente.");
              }
            }} 
            className="bg-[#FAFAFA] dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col gap-6 text-left shadow-xl transition-colors duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">Seu Nome</label>
                <input type="text" name="nome" required placeholder="Ex: Maria Clara" className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">WhatsApp</label>
                <input type="tel" name="telefone" required placeholder="(86) 99999-9999" className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 text-[#1A1A1A] dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">Qual é o evento?</label>
              <select name="evento" required className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#D4AF37] dark:focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer">
                <option value="" className="text-gray-400 dark:text-zinc-500">Selecione uma opção...</option>
                <option value="Casamento" className="bg-white dark:bg-zinc-900 text-[#1A1A1A] dark:text-white">Casamento</option>
                <option value="Formatura" className="bg-white dark:bg-zinc-900 text-[#1A1A1A] dark:text-white">Formatura</option>
                <option value="15 Anos" className="bg-white dark:bg-zinc-900 text-[#1A1A1A] dark:text-white">15 Anos</option>
                <option value="Corporativo" className="bg-white dark:bg-zinc-900 text-[#1A1A1A] dark:text-white">Evento Corporativo</option>
              </select>
            </div>
            <button type="submit" className="mt-4 w-full py-5 bg-gradient-to-r from-[#D4AF37] to-[#F1D570] text-[#1A1A1A] font-extrabold rounded-xl shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform duration-300 text-lg tracking-wide uppercase">
              Quero meu orçamento
            </button>
          </form>
        </div>
      </section>

      {/* ============================================= */}
      {/* 4. PROVA SOCIAL (Adaptável Claro/Escuro)      */}
      {/* ============================================= */}
      <section className="py-24 px-4 bg-[#FAFAFA] dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-zinc-800 relative z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] dark:text-white mb-5 tracking-tight transition-colors">Quem confia, recomenda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2">
            {[
              { nome: "Mariana & João", tipo: "Casamento", texto: "Não nos preocupamos com absolutamente nada no dia do nosso casamento. Foi perfeito, o buffet estava impecável e o atendimento foi surreal!" },
              { nome: "Turma de Medicina", tipo: "Formatura", texto: "A estrutura, a iluminação e o cuidado da assessoria com cada formando foi incrível. Melhor baile de Teresina, com certeza." },
              { nome: "Família da Ana", tipo: "15 Anos", texto: "Meu aniversário pareceu um conto de fadas. Toda a equipe da Trevo Foi super atenciosa do início ao fim. Melhor buffet do Piauí." }
            ].map((depoimento, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm p-10 rounded-3xl relative flex flex-col justify-between transition-colors duration-300">
                <div>
                  <div className="text-[#E8C354] text-7xl font-serif leading-none mb-6 -ml-2">"</div>
                  <p className="text-gray-600 dark:text-zinc-300 text-xl leading-relaxed mb-10 font-light italic transition-colors">{depoimento.texto}</p>
                </div>
                <div className="flex items-center gap-5 pt-8 border-t border-gray-100 dark:border-zinc-800 transition-colors">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#F3DA8C] to-[#F1D570] rounded-full flex items-center justify-center text-[#1A1A1A] font-bold text-2xl shadow-inner border border-[#D4AF37]/50">
                    {depoimento.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] dark:text-white font-bold text-lg transition-colors">{depoimento.nome}</p>
                    <p className="text-[#D4AF37] text-sm font-extrabold tracking-wide uppercase">{depoimento.tipo}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}