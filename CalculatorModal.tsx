import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Zap, CheckCircle2, Upload, Home, Building2, ChevronLeft, CreditCard, DollarSign, Loader2, MapPin, FileText, Sun, Wifi, Tv, Snowflake, Fan, Battery, Plug, Ruler, LayoutGrid, Car, AlertTriangle, Bot, Gauge, Cable, Plus, Minus, Calendar, Wallet, Clock, Check, ShieldCheck, User } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  onAddToCart: (item: any) => void;
}

const EV_BRANDS = ["Tesla", "BYD", "BMW", "Audi", "Nissan", "Volvo", "Porsche", "JAC", "Mercedes-Benz", "MG", "Kia", "Hyundai", "Ford", "Chevrolet", "Toyota", "Otro"];

// Helper Icons
const DropletsIcon = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-5-9-7-15-2 6-7 13-7 15a7 7 0 0 0 7 7z"/></svg>;
const WindIcon = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>;

const APPLIANCES = [
    { id: 'wifi', label: "Modem/Wifi", icon: <Wifi size={16} /> },
    { id: 'lights', label: "Iluminación", icon: <Zap size={16} /> },
    { id: 'fridge', label: "Refrigerador", icon: <Snowflake size={16} /> },
    { id: 'tv', label: "TV / Computadora", icon: <Tv size={16} /> },
    { id: 'fan', label: "Ventiladores", icon: <Fan size={16} /> },
    { id: 'medical', label: "Equipo Médico", icon: <ShieldCheck size={16} /> },
    { id: 'pump', label: "Bomba Agua", icon: <DropletsIcon size={16} /> },
    { id: 'ac', label: "Aire Acondicionado", icon: <WindIcon size={16} /> }
];

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose, productTitle, onAddToCart }) => {
  const [step, setStep] = useState(1);
  const [flowType, setFlowType] = useState<'solar' | 'battery' | 'ev'>('solar');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false); // For simulations
  
  // Form Data
  const [formData, setFormData] = useState({
      // Battery
      energyDemand: 'media',
      backupHours: '4',
      selectedAppliances: [] as string[],
      
      // EV
      evBrand: '',
      evModel: '',
      connectionType: '220',
      distance: 5,
      talkToAdvisor: false,
      
      // Common
      receiptFile: null as File | null,
      modality: '' as 'contado' | 'leasing' | 'renta' | '',
      
      // Booking
      bookingDate: '',
      bookingTime: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLoading(false);
      setProcessing(false);
      setFormData({
          energyDemand: 'media',
          backupHours: '4',
          selectedAppliances: [],
          evBrand: '',
          evModel: '',
          connectionType: '220',
          distance: 5,
          talkToAdvisor: false,
          receiptFile: null,
          modality: '',
          bookingDate: '',
          bookingTime: ''
      });

      const titleLower = productTitle ? productTitle.toLowerCase() : '';
      if (titleLower.includes('batería') || titleLower.includes('respaldo')) {
        setFlowType('battery');
      } else if (titleLower.includes('cargador') || titleLower.includes('ev')) {
        setFlowType('ev');
      } else {
        setFlowType('solar');
      }
    }
  }, [isOpen, productTitle]);

  if (!isOpen) return null;

  // --- ACTIONS ---

  const handleApplianceToggle = (id: string) => {
      setFormData(prev => ({
          ...prev,
          selectedAppliances: prev.selectedAppliances.includes(id) 
            ? prev.selectedAppliances.filter(a => a !== id)
            : [...prev.selectedAppliances, id]
      }));
  };

  const handleReceiptUpload = () => {
      setProcessing(true);
      setTimeout(() => {
          setProcessing(false);
          setFormData(prev => ({ ...prev, receiptFile: new File([""], "recibo_cfe.jpg") }));
      }, 2000);
  };

  const handleModalitySelect = (modality: 'contado' | 'leasing' | 'renta') => {
      setFormData(prev => ({ ...prev, modality }));
      
      if (modality === 'contado') {
          setStep(4); // Skip credit check, go to booking
      } else {
          setStep(3); // Go to credit check
      }
  };

  const handleCreditCheck = () => {
      setProcessing(true);
      setTimeout(() => {
          setProcessing(false);
          setStep(4); // Go to booking
      }, 2500);
  };

  const handleConfirmBooking = () => {
      onAddToCart({
          id: `booking_${Date.now()}`,
          title: `Visita Técnica - ${productTitle}`,
          price: 0,
          leasingPrice: 0,
          category: 'Servicio',
          details: { ...formData, flowType }
      });
      setStep(5); // Success
  };

  // --- RENDERERS ---

  const renderBatteryStep1 = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="text-center">
              <h2 className="text-xl font-bold text-white">Configura tu Respaldo</h2>
              <p className="text-gray-400 text-sm">Define tus necesidades de energía.</p>
          </div>

          <div className="space-y-4">
              <div>
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Demanda de Energía</label>
                  <select 
                    value={formData.energyDemand}
                    onChange={(e) => setFormData({...formData, energyDemand: e.target.value})}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                  >
                      <option value="baja">Baja (&lt; 500kWh)</option>
                      <option value="media">Media (500-1000kWh)</option>
                      <option value="alta">Alta (&gt; 1000kWh)</option>
                  </select>
              </div>

              <div>
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Horas de Respaldo</label>
                  <select 
                    value={formData.backupHours}
                    onChange={(e) => setFormData({...formData, backupHours: e.target.value})}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none"
                  >
                      <option value="2">2 Horas</option>
                      <option value="4">4 Horas</option>
                      <option value="8">8 Horas</option>
                      <option value="12">12+ Horas</option>
                  </select>
              </div>

              <div>
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Equipos a Respaldar</label>
                  <div className="grid grid-cols-2 gap-2">
                      {APPLIANCES.map((app) => (
                          <button 
                            key={app.id}
                            onClick={() => handleApplianceToggle(app.id)}
                            className={`p-3 rounded-lg border flex items-center gap-2 text-xs transition-all ${formData.selectedAppliances.includes(app.id) ? 'bg-brand-gold/20 border-brand-gold text-white' : 'bg-[#141414] border-white/10 text-gray-400 hover:border-white/30'}`}
                          >
                              {app.icon} {app.label}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full bg-brand-gold text-black font-extrabold py-4 rounded-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
              Siguiente <ArrowRight size={14} />
          </button>
      </div>
  );

  const renderEVStep1 = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="text-center">
              <h2 className="text-xl font-bold text-white">Configura tu Cargador</h2>
              <p className="text-gray-400 text-sm">Detalles de tu vehículo e instalación.</p>
          </div>

          <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Marca</label>
                      <select 
                        value={formData.evBrand}
                        onChange={(e) => setFormData({...formData, evBrand: e.target.value})}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-gold outline-none"
                      >
                          <option value="">Seleccionar</option>
                          {EV_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                  </div>
                  <div>
                      <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Modelo</label>
                      <input 
                        type="text"
                        value={formData.evModel}
                        onChange={(e) => setFormData({...formData, evModel: e.target.value})}
                        placeholder="Ej. Model 3"
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-gold outline-none"
                      />
                  </div>
              </div>

              <div>
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Conexión Eléctrica</label>
                  <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="connection" value="110" checked={formData.connectionType === '110'} onChange={() => setFormData({...formData, connectionType: '110'})} className="accent-brand-gold" />
                          <span className="text-sm text-gray-300">Monofásico (110V)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="connection" value="220" checked={formData.connectionType === '220'} onChange={() => setFormData({...formData, connectionType: '220'})} className="accent-brand-gold" />
                          <span className="text-sm text-gray-300">Bifásico (220V)</span>
                      </label>
                  </div>
              </div>

              <div>
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Distancia al Tablero ({formData.distance}m)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={formData.distance} 
                    onChange={(e) => setFormData({...formData, distance: Number(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
              </div>

              <div className="border-t border-white/10 pt-4">
                  <button 
                    onClick={handleReceiptUpload}
                    disabled={processing || !!formData.receiptFile}
                    className={`w-full border border-dashed ${formData.receiptFile ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-white/20 bg-white/5 text-gray-400 hover:border-brand-gold'} p-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm`}
                  >
                      {processing ? <Loader2 className="animate-spin" size={16} /> : (formData.receiptFile ? <><CheckCircle2 size={16} /> Recibo Adjuntado</> : <><Upload size={16} /> Adjuntar Recibo CFE (Opcional)</>)}
                  </button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.talkToAdvisor} onChange={(e) => setFormData({...formData, talkToAdvisor: e.target.checked})} className="accent-brand-gold w-4 h-4 rounded" />
                  <span className="text-sm text-gray-300">Quiero hablar con un asesor experto</span>
              </label>
          </div>

          <button onClick={() => setStep(2)} disabled={!formData.evBrand} className="w-full bg-brand-gold text-black font-extrabold py-4 rounded-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed">
              Siguiente <ArrowRight size={14} />
          </button>
      </div>
  );

  const renderSolarStep1 = () => (
      // Simplified Solar Flow
      <div className="space-y-6 animate-fade-in">
          <div className="text-center">
              <h2 className="text-xl font-bold text-white">Energía Solar</h2>
              <p className="text-gray-400 text-sm">Calcula tu ahorro potencial.</p>
          </div>
          
          <div className="bg-[#141414] p-6 rounded-xl border border-white/5 text-center">
              <p className="text-gray-400 text-sm mb-4">Para una cotización precisa, necesitamos analizar tu consumo actual.</p>
              <button 
                onClick={handleReceiptUpload}
                disabled={processing || !!formData.receiptFile}
                className={`w-full border border-dashed ${formData.receiptFile ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-white/20 bg-white/5 text-gray-400 hover:border-brand-gold'} p-8 rounded-lg transition-all flex flex-col items-center justify-center gap-3`}
              >
                  {processing ? <Loader2 className="animate-spin" size={24} /> : (formData.receiptFile ? <><CheckCircle2 size={32} /> <span className="font-bold">Recibo Cargado Correctamente</span></> : <><Upload size={32} className="text-brand-gold" /> <span className="text-sm font-bold">Subir Foto de Recibo CFE</span></>)}
              </button>
          </div>

          <button onClick={() => setStep(2)} disabled={!formData.receiptFile} className="w-full bg-brand-gold text-black font-extrabold py-4 rounded-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-50">
              Siguiente <ArrowRight size={14} />
          </button>
      </div>
  );

  const renderModalitySelection = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="text-center">
              <h2 className="text-xl font-bold text-white">Elige tu Modalidad</h2>
              <p className="text-gray-400 text-sm">Opciones flexibles a tu medida.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
              <button onClick={() => handleModalitySelect('contado')} className="group p-4 rounded-xl border border-white/10 bg-[#141414] hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold"><Wallet size={20} /></div>
                      <div>
                          <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">Contado</h3>
                          <p className="text-xs text-gray-400">Pago único con descuento especial.</p>
                      </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-500 group-hover:text-brand-gold" />
              </button>

              <button onClick={() => handleModalitySelect('leasing')} className="group p-4 rounded-xl border border-white/10 bg-[#141414] hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold"><CreditCard size={20} /></div>
                      <div>
                          <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">Leasing (Financiamiento)</h3>
                          <p className="text-xs text-gray-400">Pagos mensuales deducibles.</p>
                      </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-500 group-hover:text-brand-gold" />
              </button>

              <button onClick={() => handleModalitySelect('renta')} className="group p-4 rounded-xl border border-white/10 bg-[#141414] hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold"><Clock size={20} /></div>
                      <div>
                          <h3 className="font-bold text-white group-hover:text-brand-gold transition-colors">Renta (Suscripción)</h3>
                          <p className="text-xs text-gray-400">Sin inversión inicial, todo incluido.</p>
                      </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-500 group-hover:text-brand-gold" />
              </button>
          </div>
      </div>
  );

  const renderCreditCheck = () => (
      <div className="space-y-8 animate-fade-in text-center py-8">
          {processing ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 size={48} className="text-brand-gold animate-spin" />
                  <h2 className="text-xl font-bold text-white">Validando Buró de Crédito...</h2>
                  <p className="text-gray-400 text-sm">Esto tomará solo unos segundos.</p>
              </div>
          ) : (
              <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 animate-bounce-slow">
                      <ShieldCheck size={40} />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-white mb-2">¡Pre-Aprobado!</h2>
                      <p className="text-gray-400 text-sm max-w-xs mx-auto">Tu perfil crediticio es excelente. Podemos proceder con tu solicitud.</p>
                  </div>
                  <button onClick={() => setStep(4)} className="bg-brand-gold text-black font-extrabold px-8 py-3 rounded-lg hover:bg-white transition-all shadow-lg text-xs uppercase tracking-widest">
                      Continuar
                  </button>
              </div>
          )}
          
          {!processing && (
              <div className="mt-8 pt-6 border-t border-white/5">
                 <button onClick={handleCreditCheck} className="hidden">Trigger</button> 
                 {/* Auto trigger handled by useEffect if needed, but here we use button in prev step to trigger logic or auto-start? 
                     Better: Auto-start on mount of this step? 
                 */}
              </div>
          )}
      </div>
  );
  
  // Auto-start credit check simulation when entering step 3
  useEffect(() => {
      if (step === 3 && !processing) {
          handleCreditCheck();
      }
  }, [step]);


  const renderBooking = () => (
      <div className="space-y-6 animate-fade-in">
          <div className="text-center">
              <h2 className="text-xl font-bold text-white">Agenda tu Visita Técnica</h2>
              <p className="text-gray-400 text-sm">Un experto validará tu instalación para confirmar el precio final.</p>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
              <label className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 block">Fecha Preferida</label>
              <div className="grid grid-cols-3 gap-2 mb-6">
                  {['Lun 12', 'Mar 13', 'Mie 14'].map((day) => (
                      <button 
                        key={day}
                        onClick={() => setFormData({...formData, bookingDate: day})}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${formData.bookingDate === day ? 'bg-brand-gold text-black border-brand-gold' : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'}`}
                      >
                          {day}
                      </button>
                  ))}
              </div>

              <label className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 block">Horario</label>
              <div className="grid grid-cols-1 gap-3">
                  {['09:00 AM - 12:00 PM', '12:00 PM - 03:00 PM', '03:00 PM - 06:00 PM'].map((time) => (
                      <button 
                        key={time}
                        onClick={() => setFormData({...formData, bookingTime: time})}
                        className={`p-3 rounded-lg border text-xs font-medium transition-all ${formData.bookingTime === time ? 'bg-brand-gold text-black border-brand-gold' : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'}`}
                      >
                          {time}
                      </button>
                  ))}
              </div>
          </div>

          <button 
            onClick={handleConfirmBooking}
            disabled={!formData.bookingDate || !formData.bookingTime}
            className="w-full bg-brand-gold text-black font-extrabold py-4 rounded-lg hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 text-xs uppercase tracking-widest"
          >
              Confirmar Cita <Check size={16} />
          </button>
      </div>
  );

  const renderSuccess = () => (
      <div className="text-center flex flex-col items-center justify-center h-full py-10 animate-fade-in">
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-bounce-slow">
              <Calendar size={40} className="text-black" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Visita Agendada!</h2>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm">
              Tu asesor experto llegará el <strong>{formData.bookingDate}</strong> entre <strong>{formData.bookingTime}</strong>.
          </p>
          <button onClick={onClose} className="text-brand-gold hover:text-white underline text-xs uppercase tracking-widest">
              Volver al inicio
          </button>
      </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#050505] border-t md:border border-brand-gold/20 w-full md:max-w-xl h-[90vh] md:h-auto md:max-h-[90vh] md:rounded-2xl rounded-t-2xl shadow-[0_0_80px_rgba(212,175,55,0.1)] overflow-hidden flex flex-col animate-slide-up-mobile md:animate-fade-in">
        
        {/* Header */}
        <div className="p-5 flex justify-between items-center border-b border-white/5 shrink-0">
            {step > 1 && step < 5 ? (
               <button onClick={() => setStep(prev => prev - 1)} className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"><ChevronLeft size={20} /> Atrás</button>
            ) : <div />}
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><X size={20} /></button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar pb-20 md:pb-8 flex-1">
           {step === 1 && flowType === 'battery' && renderBatteryStep1()}
           {step === 1 && flowType === 'ev' && renderEVStep1()}
           {step === 1 && flowType === 'solar' && renderSolarStep1()}
           
           {step === 2 && renderModalitySelection()}
           {step === 3 && renderCreditCheck()}
           {step === 4 && renderBooking()}
           {step === 5 && renderSuccess()}
        </div>
      </div>
    </div>
  );
};