import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Download, 
  CreditCard, 
  Clock, 
  PenTool, 
  LogOut,
  ChevronRight,
  ChevronDown,
  Wrench,
  AlertTriangle
} from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitReason, setVisitReason] = useState('mantenimiento');

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Hola, Juan Pérez</h1>
          <p className="text-gray-400">Administra tus servicios y pagos</p>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Card - Active Service */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white text-brand-dark rounded-xl overflow-hidden shadow-2xl">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-brand-gold font-bold text-xl">Hogar</h3>
                <div className="flex items-center gap-2 text-green-600 font-medium mt-1">
                  <CheckCircle2 size={18} />
                  Sin adeudos
                </div>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded uppercase">
                Servicio Activo
              </span>
            </div>

            {/* Product Image & Key Info */}
            <div className="p-6 md:p-8">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Modelo</h4>
              <p className="text-2xl font-bold mb-6">PMO050X2BB0</p>

              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="w-full md:w-1/2 bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
                  <img 
                    src="https://mabe.com.mx/wp-content/uploads/2019/11/Purificador-de-Agua-Bajo-Tarja-Mabe-PMM050X2BB0-1.png" 
                    alt="Purificador Mabe" 
                    className="w-full h-auto object-contain mix-blend-multiply max-h-64"
                  />
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Tipo de Servicio</div>
                        <div className="text-lg font-bold text-brand-black bg-brand-gold/20 px-3 py-1 rounded inline-block">Renta</div>
                     </div>
                     <div>
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Siguiente Pago</div>
                        <div className="text-2xl font-bold text-brand-black">$231 MXN</div>
                     </div>
                  </div>

                  <div>
                     <div className="text-xs text-gray-500 font-bold uppercase mb-1">Promoción Contratada</div>
                     <div className="text-base font-medium">4 meses al 40% de descuento</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                     <div>
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Fecha Contrato</div>
                        <div className="text-sm font-medium">30 Octubre 2024</div>
                     </div>
                     <div>
                        <div className="text-xs text-gray-500 font-bold uppercase mb-1">Instalación</div>
                        <div className="text-sm font-medium">02 Noviembre 2024</div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Address & Actions */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                 <div className="text-xs text-gray-500 font-bold uppercase mb-2">Dirección de Instalación</div>
                 <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-brand-gold mt-1 shrink-0" />
                    <p className="text-gray-800 text-sm">
                       Calle Test 123, Colonia Nápoles, 03810, Benito Juárez, Ciudad de México.
                    </p>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                   onClick={() => setIsVisitModalOpen(true)}
                   className="flex-1 flex items-center justify-center gap-2 bg-brand-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
                >
                   <Wrench size={18} className="text-brand-gold" />
                   Agendar Visita Técnica
                </button>
                <div className="flex gap-4">
                   <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="Descargar Facturas">
                      <Download size={20} />
                   </button>
                   <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="Historial de Pagos">
                      <Clock size={20} />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
           
           {/* Maintenance Status */}
           <div className="bg-brand-dark border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <PenTool size={20} className="text-brand-gold" /> Mantenimiento
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-400 text-sm">Estado del filtro</span>
                    <span className="text-green-400 font-bold text-sm">Bueno (85%)</span>
                 </div>
                 <div>
                    <span className="text-gray-400 text-sm block mb-1">Siguiente mantenimiento:</span>
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                       <Calendar size={18} className="text-brand-gold" />
                       02 Mayo 2025
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                       Te contactaremos 1 semana antes para agendar.
                    </p>
                 </div>
              </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-brand-dark border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Accesos Rápidos</h3>
              <nav className="space-y-2">
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group text-left">
                    <span className="text-sm text-gray-300 group-hover:text-white">Datos de Facturación</span>
                    <ChevronRight size={16} className="text-gray-500 group-hover:text-brand-gold" />
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group text-left">
                    <span className="text-sm text-gray-300 group-hover:text-white">Administrar Forma de Pago</span>
                    <ChevronRight size={16} className="text-gray-500 group-hover:text-brand-gold" />
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group text-left">
                    <span className="text-sm text-gray-300 group-hover:text-white">Historial de Pagos</span>
                    <ChevronRight size={16} className="text-gray-500 group-hover:text-brand-gold" />
                 </button>
              </nav>
           </div>
        </div>
      </div>

      {/* Modal for Visit */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="bg-brand-dark border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Agendar Visita Técnica</h3>
              <p className="text-gray-400 text-sm mb-6">
                 Un técnico certificado visitará tu domicilio para revisar tu equipo.
              </p>
              
              <div className="space-y-4 mb-6">
                 <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Motivo de la visita</label>
                    <select 
                       value={visitReason} 
                       onChange={(e) => setVisitReason(e.target.value)}
                       className="w-full bg-brand-gray border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                    >
                       <option value="mantenimiento">Mantenimiento Preventivo</option>
                       <option value="falla">Reporte de Falla / Avería</option>
                       <option value="duda">Dudas de Funcionamiento</option>
                       <option value="reubicacion">Reubicación de Equipo</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Fecha preferida</label>
                    <input 
                       type="date" 
                       className="w-full bg-brand-gray border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none icon-white"
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-brand-gold uppercase mb-2">Comentarios adicionales</label>
                    <textarea 
                       rows={3}
                       className="w-full bg-brand-gray border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                       placeholder="Describe brevemente el problema..."
                    ></textarea>
                 </div>
              </div>

              <div className="flex gap-3">
                 <button 
                    onClick={() => setIsVisitModalOpen(false)}
                    className="flex-1 py-3 border border-white/10 rounded-lg hover:bg-white/5 font-medium transition-colors"
                 >
                    Cancelar
                 </button>
                 <button 
                    onClick={() => {
                       alert('¡Solicitud enviada! Te contactaremos para confirmar.');
                       setIsVisitModalOpen(false);
                    }}
                    className="flex-1 py-3 bg-brand-gold text-black rounded-lg hover:bg-brand-goldHover font-bold transition-colors"
                 >
                    Solicitar Visita
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};