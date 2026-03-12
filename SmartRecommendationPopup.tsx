import React from 'react';
import { X, Sparkles, Plus, Zap, ShieldCheck, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';
import { RecommendationResult } from '../utils/recommendationEngine';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    recommendation: RecommendationResult | null;
    onAccept: () => void;
}

export const SmartRecommendationPopup: React.FC<Props> = ({ isOpen, onClose, recommendation, onAccept }) => {
    if (!isOpen || !recommendation) return null;

    // UNIFIED ORANGE THEME (Brand Gold)
    const buttonBg = 'bg-brand-gold';

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} />
            
            <div className={`relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl animate-fade-in-up overflow-hidden flex flex-col md:flex-row group`}>
                
                {/* Visual Flair: Glow */}
                <div className={`absolute -top-20 -left-20 w-40 h-40 bg-brand-gold rounded-full blur-[100px] opacity-10 pointer-events-none`} />

                {/* Image Section */}
                <div className="w-full md:w-5/12 relative h-48 md:h-auto overflow-hidden bg-black border-b md:border-b-0 md:border-r border-white/5">
                    <img 
                        src={recommendation.popup.imageUrl} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                        alt={recommendation.productTitle} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 relative flex flex-col">
                     <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"><X size={20} /></button>
                     
                     <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                           <Sparkles size={14} className="text-brand-gold" />
                           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Recomendación Personalizada</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                            {recommendation.popup.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {recommendation.reasonText}
                        </p>
                        
                        <div className="flex items-baseline gap-2 bg-white/5 p-3 rounded-lg border border-white/5 inline-flex mb-4">
                             <span className="text-gray-400 text-xs uppercase font-bold">Inversión:</span>
                             <span className="text-brand-gold font-bold text-lg">+${recommendation.priceRent?.toLocaleString()}</span>
                             <span className="text-gray-500 text-xs">/mes (est)</span>
                        </div>

                        {/* Metrics Bullets */}
                        <div className={`space-y-2`}>
                            {recommendation.popup.bullets.map((bullet, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                    <div className="mt-1 w-1 h-1 rounded-full bg-brand-gold shrink-0"></div>
                                    <span>{bullet}</span>
                                </div>
                            ))}
                        </div>
                     </div>

                     <div className="mt-auto pt-4 flex flex-col gap-3">
                        <button 
                            onClick={onAccept} 
                            className={`w-full py-4 ${buttonBg} text-black rounded-lg hover:brightness-110 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:scale-[1.01]`}
                        >
                            {recommendation.popup.primaryCta} <ArrowRight size={16} />
                        </button>
                        <button onClick={onClose} className="w-full py-2 text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                            Omitir Recomendación
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};