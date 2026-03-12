import React, { useState } from 'react';
import { MapPin, Mail, X, AlertCircle, Check } from 'lucide-react';

interface CoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { postalCode: string }) => void;
}

export const CoverageModal: React.FC<CoverageModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [postalCode, setPostalCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError('');
    
    if (postalCode.length < 5) {
      setError('Por favor ingresa un Código Postal válido (5 dígitos).');
      return;
    }
    
    if (!acceptedTerms) {
      setError('Debes aceptar los términos para continuar.');
      return;
    }

    setLoading(true);

    // Simular pequeña espera de validación
    setTimeout(() => {
      setLoading(false);
      onSubmit({ postalCode });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-brand-dark border border-brand-gold/30 rounded-xl p-8 w-full max-w-sm shadow-2xl animate-fade-in">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
            <X size={20} />
        </button>

        <div className="text-center mb-6">
            <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-gold">
                <MapPin size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Verificar Cobertura</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
                Ingresa tus datos para validar si nuestros servicios de instalación están disponibles en tu zona.
            </p>
        </div>

        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1 block">Código Postal</label>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Ej. 06600" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                        maxLength={5}
                    />
                </div>
            </div>
            
            <label className="flex items-start gap-2 cursor-pointer group mt-2">
                <div className="relative flex items-center mt-0.5">
                <input 
                    type="checkbox" 
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-brand-gold/50 checked:bg-brand-gold checked:border-brand-gold transition-all"
                />
                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-black" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-400 select-none">
                    Acepto guardar mi ubicación para verificar factibilidad técnica.
                </span>
            </label>

            {error && (
                <div className="text-red-400 text-xs flex items-center gap-2 bg-red-900/20 p-3 rounded border border-red-900/30">
                    <AlertCircle size={14} /> {error}
                </div>
            )}

            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-brand-gold text-black font-bold py-3.5 rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-widest mt-2 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? 'Validando Zona...' : 'Confirmar Cobertura'}
            </button>
        </div>
      </div>
    </div>
  );
};