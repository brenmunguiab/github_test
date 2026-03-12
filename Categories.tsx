import React from 'react';
import { CreditCard, Calendar, Wallet } from 'lucide-react';

const ValueCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  highlight?: boolean;
}> = ({ icon, title, description, highlight }) => (
  <div className={`relative p-5 rounded-lg border transition-all duration-300 group h-full flex flex-col ${highlight ? 'bg-brand-gold/10 border-brand-gold' : 'bg-brand-gray border-white/5 hover:border-brand-gold/50'}`}>
    {highlight && (
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-gold text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
        Popular
      </div>
    )}
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg ${highlight ? 'bg-brand-gold text-black' : 'bg-white/5 text-brand-gold'}`}>
      {icon}
    </div>
    <h3 className={`text-base font-bold mb-1.5 ${highlight ? 'text-white' : 'text-gray-200'}`}>{title}</h3>
    <p className="text-xs text-gray-400 leading-relaxed mb-3 flex-1">{description}</p>
    
    {/* Visual indicator line */}
    <div className={`h-0.5 w-10 rounded-full ${highlight ? 'bg-brand-gold' : 'bg-white/10 group-hover:bg-brand-gold/50'} transition-colors`} />
  </div>
);

export const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Tu Hogar Inteligente, <span className="text-brand-gold">A Tu Manera</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Rompemos las barreras de entrada a la tecnología. Elige el modelo financiero que mejor se adapte a tu economía y empieza a ahorrar hoy mismo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Option 1: Contado */}
          <ValueCard 
            icon={<Wallet size={20} />}
            title="Compra de Contado"
            description="Obtén el mejor precio del mercado con descuentos exclusivos por pago inmediato. Eres dueño absoluto del equipo desde el primer día con todas las garantías de fábrica."
          />

          {/* Option 2: Financiamiento */}
          <ValueCard 
            icon={<CreditCard size={20} />}
            title="Financiamiento"
            description="Renta el equipo con opción a compra al final del plazo (Leasing). Incluye mantenimiento, monitoreo y seguro durante todo el contrato."
            highlight={true}
          />

          {/* Option 3: Arrendamiento */}
          <ValueCard 
            icon={<Calendar size={20} />}
            title="Arrendamiento"
            description="Sistema de renta, se cancela en cualquier momento y se regresa el equipo cuando se cancela."
          />

        </div>
      </div>
    </section>
  );
};