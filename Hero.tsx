import React from 'react';
import { MousePointer2, HelpCircle, ChevronRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  initialCoverageData: { postalCode: string } | null;
  onUnlockPrices: () => void;
  onRecommendPackage: (packageId: string) => void;
  onVerifyCoverage?: (data: { postalCode: string }) => void;
  onChoosePath: (path: 'packages' | 'catalog') => void;
}

export const Hero: React.FC<HeroProps> = ({ onChoosePath }) => {
  
  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col justify-center items-center bg-brand-black z-40 px-4 pt-24 pb-10 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gray/30 via-brand-black to-brand-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-brand-gold/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in-up flex flex-col items-center">
        
        {/* Main Title - Mobile Optimized */}
        <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white normal-case max-w-3xl mx-auto">
            Reducimos tu <br className="block"/> consumo de energía
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-[#F3E5AB] to-brand-gold drop-shadow-sm text-2xl sm:text-3xl md:text-5xl">
                pagando poco a poco
            </span>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light max-w-xs sm:max-w-xl mx-auto px-2">
            Diseña tu hogar del futuro con instalación experta y financiamiento a tu medida.
            </p>
        </div>

        {/* COMPACT ACTION BUTTONS - Stacked on Mobile */}
        <div className="w-full max-w-md md:max-w-3xl flex flex-col sm:grid sm:grid-cols-2 gap-4 px-2 mt-2">
            
             {/* OPCIÓN 1: Ver Catálogo */}
             <button 
                onClick={() => onChoosePath('catalog')}
                className="group relative overflow-hidden bg-white/5 border border-brand-gold hover:bg-brand-gold/10 p-4 md:p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 text-left active:scale-[0.98] shadow-[0_0_20px_rgba(212,175,55,0.05)]"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center shrink-0 group-hover:bg-brand-gold group-hover:text-black transition-colors text-brand-gold">
                    <MousePointer2 size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-lg text-white transition-colors">Ver catálogo</h3>
                    <p className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-300 truncate">Ya sé lo que necesito</p>
                </div>
                <ChevronRight size={18} className="text-brand-gold group-hover:translate-x-1 transition-all" />
            </button>

            {/* OPCIÓN 2: Soluciones */}
            <button 
                onClick={() => onChoosePath('packages')}
                className="group relative overflow-hidden bg-white/5 border border-brand-gold hover:bg-brand-gold/10 p-4 md:p-6 rounded-2xl transition-all duration-300 flex items-center gap-4 text-left active:scale-[0.98] shadow-[0_0_20px_rgba(212,175,55,0.05)]"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center shrink-0 group-hover:bg-brand-gold group-hover:text-black transition-colors text-brand-gold">
                    <HelpCircle size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-lg text-white group-hover:text-brand-gold transition-colors leading-tight">Nuestras soluciones</h3>
                    <p className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-300 truncate">Según tus necesidades</p>
                </div>
                <ChevronRight size={18} className="text-brand-gold group-hover:translate-x-1 transition-all" />
            </button>

        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30 hidden md:block">
            <ArrowDown size={24} />
        </div>

      </div>
    </section>
  );
};