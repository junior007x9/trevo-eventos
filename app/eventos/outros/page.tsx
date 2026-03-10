import Link from "next/link";

export default function OutrosEventosPage() {
  // Configuração do WhatsApp
  // Coloque o número do seu cliente aqui (apenas números, com código do país 55 e DDD)
  const numeroWhatsApp = "5586995444852"; 
  const mensagem = "Olá! Vim pelo site da Trevo Eventos e gostaria de solicitar um orçamento para meu evento.";
  
  // Transforma a mensagem em um formato seguro para links de internet
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  return (
    <main className="min-h-screen bg-trevo-black text-trevo-white font-sans pb-24">
      {/* BANNER DO EVENTO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-trevo-black"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-trevo-gold mb-6">
            Evento Personalizado
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300">
            A exclusividade que o seu momento exige, planejada sob medida para você.
          </p>
        </div>
      </section>

      {/* ÁREA DE CONTATO / ORÇAMENTO */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <div className="bg-[#121212] border border-gray-800 p-12 md:p-16 rounded-sm shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-serif text-trevo-gold mb-6">
            Quer realizar outro tipo de evento?
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg md:text-xl font-light mb-12 leading-relaxed">
            <p>
              Celebrações corporativas, bodas, formaturas ou qualquer momento que mereça ser inesquecível.
            </p>
            <p>
              Nossa equipe está preparada para criar uma celebração única e totalmente personalizada, garantindo que você <strong className="text-trevo-gold font-normal">chegue como convidado no seu evento</strong>.
            </p>
            <p>
              Clique abaixo e fale diretamente com nossa equipe de atendimento para desenharmos juntos o seu projeto.
            </p>
          </div>

          {/* BOTÃO DO WHATSAPP */}
          <a 
            href={linkWhatsApp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-trevo-gold text-trevo-black font-semibold uppercase tracking-widest text-sm md:text-base hover:bg-[#F3E5AB] transition-all duration-300 transform hover:scale-105"
          >
            Solicitar orçamento personalizado
          </a>
          
          <div className="mt-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-trevo-gold transition-colors underline underline-offset-4">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}