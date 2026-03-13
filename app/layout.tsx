import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configurando a fonte padrão (pode manter a que o Next.js já usa)
const inter = Inter({ subsets: ["latin"] });

// ==========================================
// 1. OTIMIZAÇÃO PARA O GOOGLE E WHATSAPP (SEO)
// ==========================================
// Isso é o que aparece quando você manda o link do site para alguém ou busca no Google!
export const metadata: Metadata = {
  title: "Trevo Eventos | Buffet e Assessoria de Festas",
  description: "Sua festa perfeita do início ao fim. Casamentos, Formaturas, 15 Anos e Corporativos com a excelência e o alto padrão que você merece.",
  keywords: ["buffet", "assessoria", "casamentos", "formaturas", "15 anos", "eventos", "teresina", "piauí", "trevo eventos"],
  openGraph: {
    title: "Trevo Eventos | Buffet e Assessoria",
    description: "Chegue como convidado na sua própria festa. Deixe a excelência conosco.",
    url: "https://trevo-eventos.vercel.app",
    siteName: "Trevo Eventos",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200", // Imagem que aparece no link do Zap
        width: 1200,
        height: 630,
        alt: "Trevo Eventos Buffet e Assessoria",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-[#0a0a0a] transition-colors duration-300 antialiased flex flex-col min-h-screen`}>
        
        {/* O CONTEÚDO DAS PÁGINAS (HOME, ADMIN E EVENTOS VEM AQUI DENTRO) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* ========================================== */}
        {/* 2. RODAPÉ GLOBAL (Aparece em todo o site)  */}
        {/* ========================================== */}
        <footer className="bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-zinc-900 pt-16 pb-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Coluna 1: Logo e Descrição */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-3xl font-black text-[#1A1A1A] dark:text-white tracking-tighter leading-none transition-colors">TREV</span>
                <span className="text-2xl -rotate-12 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] pt-1" style={{ filter: `drop-shadow(0.5px 0.5px 0px #F1D570) drop-shadow(1px 1px 0px #D4AF37)` }}>🍀</span>
              </div>
              <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 transition-colors">
                Transformando sonhos em realidade com sofisticação, cardápios exclusivos e uma assessoria impecável para o seu grande dia.
              </p>
            </div>

            {/* Coluna 2: Links Rápidos */}
            <div>
              <h4 className="text-[#1A1A1A] dark:text-white font-black uppercase tracking-widest text-sm mb-6 transition-colors">Eventos</h4>
              <ul className="space-y-3">
                <li><a href="/eventos/casamento" className="text-gray-500 dark:text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">Casamentos</a></li>
                <li><a href="/eventos/formatura" className="text-gray-500 dark:text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">Formaturas</a></li>
                <li><a href="/eventos/15-anos" className="text-gray-500 dark:text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">15 Anos</a></li>
                <li><a href="/eventos/corporativo" className="text-gray-500 dark:text-zinc-400 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">Corporativo</a></li>
              </ul>
            </div>

            {/* Coluna 3: Contato */}
            <div>
              <h4 className="text-[#1A1A1A] dark:text-white font-black uppercase tracking-widest text-sm mb-6 transition-colors">Contato</h4>
              <ul className="space-y-3">
                <li className="text-gray-500 dark:text-zinc-400 text-sm font-medium flex items-center gap-2 transition-colors">
                  <span className="text-[#D4AF37]">📍</span> Atendemos todo o estado
                </li>
                <li className="text-gray-500 dark:text-zinc-400 text-sm font-medium flex items-center gap-2 transition-colors">
                  <span className="text-[#D4AF37]">✉️</span> contato@trevoeventos.com
                </li>
                <li className="text-gray-500 dark:text-zinc-400 text-sm font-medium flex items-center gap-2 transition-colors">
                  <span className="text-[#D4AF37]">📱</span> (86) 99999-9999
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 dark:border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
            <p className="text-gray-400 dark:text-zinc-600 text-xs font-medium transition-colors">
              © {new Date().getFullYear()} Trevo Eventos. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 dark:text-zinc-600 text-xs font-medium transition-colors">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </footer>

        {/* ========================================== */}
        {/* 3. BOTÃO FLUTUANTE DO WHATSAPP             */}
        {/* ========================================== */}
        {/* Z-50 garante que ele sempre fique por cima de tudo no canto da tela */}
        <a
          href="https://wa.me/5586999999999?text=Olá! Estava no site da Trevo Eventos e gostaria de tirar uma dúvida."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_10px_40px_rgba(37,211,102,0.6)] transition-all duration-300 animate-bounce group"
          aria-label="Chamar no WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
        </a>

      </body>
    </html>
  );
}