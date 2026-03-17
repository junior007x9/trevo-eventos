import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4 transition-colors duration-300">
      
      <div 
        className="text-6xl md:text-8xl mb-6 opacity-50 grayscale"
        style={{ filter: `drop-shadow(2px 2px 0px rgba(0,0,0,0.1))` }}
      >
        🍀
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black text-[#1A1A1A] dark:text-white tracking-tighter mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
        Página não encontrada
      </h2>
      
      <p className="text-gray-500 dark:text-zinc-400 max-w-md mx-auto mb-10 font-light">
        Parece que você tentou acessar um evento ou link que não existe mais. Vamos voltar a planejar o seu sonho?
      </p>
      
      <Link 
        href="/" 
        className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F1D570] text-[#1A1A1A] font-extrabold rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300 uppercase tracking-widest text-sm"
      >
        Voltar para a Home
      </Link>
      
    </main>
  );
}