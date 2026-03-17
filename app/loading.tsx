export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col items-center justify-center transition-colors duration-300">
      
      {/* O Trevo Dourado Pulsando */}
      <div 
        className="text-6xl md:text-8xl animate-pulse transition-transform duration-500"
        style={{
          filter: `
            drop-shadow(1px 1px 0px #F1D570) 
            drop-shadow(2px 2px 0px #D4AF37) 
            drop-shadow(0px 0px 20px rgba(212,175,55,0.6))
          `,
        }}
      >
        🍀
      </div>
      
      {/* Texto de status chique */}
      <h2 className="mt-8 text-[#1A1A1A] dark:text-white font-black tracking-[0.2em] uppercase text-sm md:text-base animate-pulse">
        Preparando a Excelência...
      </h2>
      
      <p className="mt-2 text-gray-400 dark:text-zinc-500 font-light text-xs tracking-widest uppercase">
        Trevo Eventos
      </p>

    </div>
  );
}