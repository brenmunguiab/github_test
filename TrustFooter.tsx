import React from 'react';
import { Award, ShieldCheck, PenTool, Headphones, Phone, Mail, MapPin } from 'lucide-react';

export const TrustFooter: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 border-b border-white/10 pb-12">
          <div className="text-center">
             <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
               <Award size={24} />
             </div>
             <h4 className="font-bold text-white mb-1 text-sm">Respaldo Mabe</h4>
             <p className="text-xs text-gray-500">Tecnología de calidad mundial</p>
          </div>
          <div className="text-center">
             <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
               <PenTool size={24} />
             </div>
             <h4 className="font-bold text-white mb-1 text-sm">Instalación profesional</h4>
             <p className="text-xs text-gray-500">Técnicos certificados</p>
          </div>
          <div className="text-center">
             <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
               <ShieldCheck size={24} />
             </div>
             <h4 className="font-bold text-white mb-1 text-sm">Garantía extendida</h4>
             <p className="text-xs text-gray-500">Hasta 25 años en paneles</p>
          </div>
          <div className="text-center">
             <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
               <Headphones size={24} />
             </div>
             <h4 className="font-bold text-white mb-1 text-sm">Soporte 24/7</h4>
             <p className="text-xs text-gray-500">Siempre estamos contigo</p>
          </div>
        </div>

        {/* Contact & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
                 <span className="text-black font-bold text-xs">CB</span>
              </div>
              <span className="text-lg font-bold tracking-wide">conectabee</span>
            </div>
            <p className="text-gray-500 text-xs max-w-sm">
              Soluciones integrales para el hogar del futuro.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-widest text-xs">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Phone size={14} /> 800 123 4567
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Mail size={14} /> hola@conectabee.mx
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <MapPin size={14} /> CDMX, México
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center text-[10px] text-gray-600">
           © 2024 Conectabee · Wireframe Draft v1.0
        </div>
      </div>
    </footer>
  );
};