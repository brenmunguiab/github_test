import React, { useState } from 'react';
import { X, Briefcase, Building2, Send, CheckCircle2 } from 'lucide-react';

interface PartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnersModal: React.FC<PartnersModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'distribuidor' | 'arquitecto' | null>(null);

  if (!isOpen) return null;

  const handleSend = () => {
    // Simulate API
    setTimeout(() => {
        setStep(3);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#0f0f0f] border border-brand-gold/30 rounded-xl w-full max-w-md shadow-2xl animate-fade-in flex flex-col p-8">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
            <X size={24} />
        </button>

        {step === 3 ? (
            <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-400 text-sm mb-6">Un asesor especializado en alianzas comerciales te contactará en breve.</p>
                <button onClick={onClose} className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200">
                    Cerrar
                </button>
            </div>
        ) : step === 1 ? (
             <div className="text-center">
                 <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
                    <Briefcase size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-3">Aliados Comerciales</h2>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    ¿Eres Arquitecto, Desarrollador o Distribuidor? Tenemos planes exclusivos y precios especiales para tus proyectos.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setType('distribuidor'); setStep(2); }} className="p-6 border border-white/10 bg-[#141414] rounded-xl hover:border-brand-gold hover:bg-brand-gold/5 transition-all group">
                        <Building2 size={32} className="mx-auto mb-3 text-gray-500 group-hover:text-brand-gold" />
                        <span className="font-bold text-white block text-sm">Distribuidor</span>
                    </button>
                    <button onClick={() => { setType('arquitecto'); setStep(2); }} className="p-6 border border-white/10 bg-[#141414] rounded-xl hover:border-brand-gold hover:bg-brand-gold/5 transition-all group">
                        <Briefcase size={32} className="mx-auto mb-3 text-gray-500 group-hover:text-brand-gold" />
                        <span className="font-bold text-white block text-sm">Arquitecto / Proyectos</span>
                    </button>
                 </div>
             </div>
        ) : (
            <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-white text-sm font-normal mr-2">Atrás</button>
                    Datos de Contacto
                </h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                    <div>
                        <label className="text-xs font-bold text-brand-gold uppercase block mb-1">Nombre / Empresa</label>
                        <input type="text" className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none" placeholder="Ej. Constructora..." required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-brand-gold uppercase block mb-1">Correo Electrónico</label>
                        <input type="email" className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none" placeholder="contacto@empresa.com" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-brand-gold uppercase block mb-1">Teléfono</label>
                        <input type="tel" className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none" placeholder="+52..." required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-brand-gold uppercase block mb-1">Volumen de Proyecto (Aprox)</label>
                        <select className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none">
                            <option>1 - 5 casas</option>
                            <option>5 - 20 casas</option>
                            <option>Desarrollo Vertical</option>
                            <option>Interés en Distribución</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-brand-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-all mt-4 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                        Enviar Solicitud <Send size={16} />
                    </button>
                </form>
            </div>
        )}

      </div>
    </div>
  );
};