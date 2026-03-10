import Link from "next/link";

export default function Footer() {
  // Configurações de links (depois você pode colocar os reais do cliente)
  const numeroWhatsApp = "5586999999999";
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=Olá! Vim pelo site da Trevo Eventos e gostaria de mais informações.`;
  const linkInstagram = "https://www.instagram.com/trevo.eventos/"; // Substitua pelo @ real

  return (
    <footer className="bg-[#0a0a0a] border-t border-trevo-gold/20 text-gray-300 py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* COLUNA 1: Marca e Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-serif text-trevo-gold mb-4">Trevo Eventos</h2>
          <p className="font-light italic text-lg text-gray-400">
            "Chegue como convidado no seu evento."
          </p>
        </div>

        {/* COLUNA 2: Contatos */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-serif text-trevo-white mb-6 uppercase tracking-widest">Contato</h3>
          <ul className="space-y-4 font-light text-sm md:text-base">
            <li className="flex items-center gap-3">
              <span className="text-trevo-gold text-lg">📍</span> 
              Endereço elegante em Teresina - PI
            </li>
            <li className="flex items-center gap-3">
              <span className="text-trevo-gold text-lg">📞</span> 
              (86) 3232-0000
            </li>
            <li className="flex items-center gap-3">
              <span className="text-trevo-gold text-lg">📲</span> 
              (86) 99999-9999
            </li>
            <li className="flex items-center gap-3">
              <span className="text-trevo-gold text-lg">📷</span> 
              @trevoeventos
            </li>
          </ul>
        </div>

        {/* COLUNA 3: Botões de Ação */}
        <div className="flex flex-col items-center md:items-start justify-center gap-4">
          <a 
            href={linkWhatsApp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full text-center px-8 py-4 bg-trevo-gold text-trevo-black font-semibold uppercase tracking-widest text-xs hover:bg-[#F3E5AB] transition-all duration-300"
          >
            Falar no WhatsApp
          </a>
          <a 
            href={linkInstagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full text-center px-8 py-4 border border-trevo-gold text-trevo-gold font-semibold uppercase tracking-widest text-xs hover:bg-trevo-gold hover:text-trevo-black transition-all duration-300"
          >
            Ver Instagram
          </a>
        </div>

      </div>

      {/* Direitos Autorais (Opcional, mas dá um toque profissional) */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600 font-light">
        <p>© {new Date().getFullYear()} Trevo Eventos. Todos os direitos reservados.</p>
        <p className="mt-1">Desenvolvido com excelência.</p>
      </div>
    </footer>
  );
}
