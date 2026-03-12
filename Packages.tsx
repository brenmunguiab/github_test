import React, { useState } from 'react';
import { ChevronRight, Zap, Droplets, Wind, Plus, Check, Info, X, Package, ArrowRight } from 'lucide-react';
import { PRODUCT_DETAILS } from './InteractiveCatalog';

interface SolutionCategory {
  title: string;
  productKeys: string[];
}

interface SolutionData {
  id: string;
  question: string; // The "hook" question
  title: string;
  description: string;
  categories: SolutionCategory[];
  ctaText?: string;
  ctaRelatedProducts?: string[];
  icon?: React.ReactNode;
}

const SOLUTIONS: SolutionData[] = [
  {
    id: "solucion_esencial",
    question: "¿Buscas ahorro inmediato?",
    title: "Solución Esencial",
    description: "La inversión más inteligente para reducir tus gastos fijos desde el primer día.",
    icon: <Zap size={24} />,
    categories: [
      { title: "Ahorro en energía", productKeys: ["Paneles Solares"] },
      { title: "Ahorro en clima", productKeys: ["Aire Acondicionado", "Calentador Solar"] },
      { title: "Ahorro en agua", productKeys: ["Purificación de Agua"] }
    ]
  },
  {
    id: "solucion_confort",
    question: "¿Quieres confort total?",
    title: "Solución Confort",
    description: "Eleva tu calidad de vida con tecnología que trabaja para ti.",
    icon: <Wind size={24} />,
    categories: [
      { title: "Confort en energía", productKeys: ["Paneles Solares", "Refrigeración", "Lavado"] },
      { title: "Confort en clima", productKeys: ["Aire Acondicionado", "Calentador Solar"] },
      { title: "Confort en agua", productKeys: ["Recirculación", "Purificación de Agua"] }
    ]
  },
  {
    id: "solucion_integral",
    question: "¿Buscas independencia?",
    title: "Solución Integral",
    description: "Genera, almacena y gestiona tu propia energía. Olvídate de la red.",
    icon: <Package size={24} />,
    categories: [
      { title: "Ahorro en energía", productKeys: ["Paneles Solares", "Batería de Respaldo", "Refrigeración", "Lavado"] },
      { title: "Ahorro en clima", productKeys: ["Aire Acondicionado", "Calentador Solar"] },
      { title: "Ahorro en agua", productKeys: ["Purificación de Agua"] }
    ],
    ctaText: "¿Quieres obtener más ahorro?",
    ctaRelatedProducts: ["Recirculación"]
  },
  {
    id: "eco_ahorro",
    question: "¿Te preocupa el agua?",
    title: "Eco Ahorro",
    description: "Máxima eficiencia hídrica y térmica para un hogar sustentable.",
    icon: <Droplets size={24} />,
    categories: [
      { title: "Ahorro en energía", productKeys: ["Refrigeración", "Lavado", "Cocinado"] },
      { title: "Ahorro en clima", productKeys: ["Calentador Solar"] },
      { title: "Ahorro en agua", productKeys: ["Recirculación", "Purificación de Agua"] }
    ],
    ctaText: "¿Quieres tener más ahorro?",
    ctaRelatedProducts: ["Paneles Solares", "Batería de Respaldo"]
  },
  {
    id: "hogar_ev",
    question: "¿Tienes auto eléctrico?",
    title: "Hogar EV",
    description: "Tu propia electrolinera solar en casa. Carga rápida y gratuita.",
    icon: <Zap size={24} />,
    categories: [
      { title: "Ahorro en energía", productKeys: ["Cargador EV", "Paneles Solares", "Batería de Respaldo", "Refrigeración", "Lavado"] },
      { title: "Ahorro en clima", productKeys: ["Aire Acondicionado", "Calentador Solar"] }
    ],
    ctaText: "¿Quieres tener más ahorro?",
    ctaRelatedProducts: ["Refrigeración", "Lavado", "Cocinado"]
  },
  {
    id: "integral_plus",
    question: "¿Lo quieres todo?",
    title: "Integral Plus",
    description: "La máxima expresión de tecnología, autonomía y confort.",
    icon: <Package size={24} />,
    categories: [
      { title: "Autonomía en energía", productKeys: ["Cargador EV", "Paneles Solares", "Batería de Respaldo", "Refrigeración", "Lavado", "Cocinado"] },
      { title: "Autonomía en clima", productKeys: ["Aire Acondicionado", "Calentador Solar"] },
      { title: "Autonomía en agua", productKeys: ["Recirculación", "Purificación de Agua"] }
    ]
  }
];

export const Packages: React.FC<{ 
  onAddToCart: (item: any) => void;
  arePricesRevealed: boolean;
  highlightedPackageId: string | null;
  onUnlockRequest: () => void;
  onCalculateSavings: (productTitle: string) => void;
  onVerifyRequest: () => void; 
  unavailableIds: string[]; 
  hasCoverage: boolean; 
}> = ({ onAddToCart, onCalculateSavings, onVerifyRequest, unavailableIds, hasCoverage }) => {
    
    const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);

    const handleAddProduct = (productKey: string) => {
        if (!hasCoverage) {
            onVerifyRequest();
            return;
        }
        const product = PRODUCT_DETAILS[productKey];
        if (!product) return;

        const isTech = product.type === 'tech';
        const isPurifier = product.title.toLowerCase().includes('purifi');
        
        if (isTech) {
            onCalculateSavings(product.title);
        } else {
            if (product.variants && product.variants.length > 0) {
                const variant = product.variants[0];
                onAddToCart({
                    id: product.sku,
                    title: `${product.title} - ${variant.name.split('\n')[0]}`,
                    price: variant.priceCash,
                    leasingPrice: variant.priceRent,
                    category: product.category || product.title,
                    isRentOnly: isPurifier 
                });
            }
        }
    };

    const selectedSolution = SOLUTIONS.find(s => s.id === selectedSolutionId);

    return (
        <section id="paquetes" className="py-12 md:py-20 bg-brand-black relative min-h-screen">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Encuentra tu Solución Ideal</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Responde a tu necesidad principal y descubre el paquete perfecto para ti.
                    </p>
                </div>

                {/* Grid of Question Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SOLUTIONS.map((solution) => (
                        <button 
                            key={solution.id} 
                            onClick={() => setSelectedSolutionId(solution.id)}
                            className="bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-brand-gold hover:bg-[#1a1a1a] transition-all group text-left flex flex-col h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {solution.icon}
                            </div>
                            
                            <div className="mb-6">
                                <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-2 block">
                                    {solution.question}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">
                                    {solution.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {solution.description}
                                </p>
                            </div>

                            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                                Ver Paquete <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Detail Modal */}
                {selectedSolution && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
                        <div className="bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 relative flex flex-col shadow-2xl animate-slide-up-mobile">
                            
                            {/* Header */}
                            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-[#141414] sticky top-0 z-10">
                                <div>
                                    <span className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-1 block">{selectedSolution.question}</span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedSolution.title}</h2>
                                    <p className="text-gray-400 text-sm md:text-base">{selectedSolution.description}</p>
                                </div>
                                <button onClick={() => setSelectedSolutionId(null)} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {selectedSolution.categories.map((cat, idx) => (
                                        <div key={idx} className="bg-[#141414] rounded-xl p-5 border border-white/5">
                                            <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4 border-b border-white/5 pb-2">{cat.title}</h4>
                                            <div className="space-y-3">
                                                {cat.productKeys.map(key => {
                                                    const product = PRODUCT_DETAILS[key];
                                                    if (!product) return null;
                                                    const isUnavailable = unavailableIds.includes(key);

                                                    return (
                                                        <div key={key} className={`flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 ${isUnavailable ? 'opacity-50 grayscale' : ''}`}>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${product.type === 'tech' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-gold/10 text-brand-gold'}`}>
                                                                    {product.type === 'tech' ? <Zap size={14} /> : <Droplets size={14} />}
                                                                </div>
                                                                <span className="text-sm font-medium text-white">{product.title}</span>
                                                            </div>
                                                            {!isUnavailable && (
                                                                <button 
                                                                    onClick={() => handleAddProduct(key)}
                                                                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-gold hover:text-black flex items-center justify-center transition-colors text-gray-400"
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedSolution.ctaText && selectedSolution.ctaRelatedProducts && (
                                    <div className="mt-8 bg-brand-gold/5 border border-brand-gold/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                                                <Info size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg">{selectedSolution.ctaText}</h4>
                                                <p className="text-sm text-gray-400">Complementa tu solución con estos productos.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedSolution.ctaRelatedProducts.map(key => {
                                                const product = PRODUCT_DETAILS[key];
                                                if (!product) return null;
                                                return (
                                                    <button 
                                                        key={key}
                                                        onClick={() => handleAddProduct(key)}
                                                        className="px-4 py-2 rounded-lg bg-brand-gold text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                                                    >
                                                        <Plus size={14} /> {product.title}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
             </div>
        </section>
    );
};