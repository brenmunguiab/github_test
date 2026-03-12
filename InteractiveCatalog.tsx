import React, { useState } from 'react';
import { Sun, Wind, Droplet, Battery, Flame, Plug, Waves, X, CheckCircle2, RefreshCw, Zap, Snowflake, Shirt, Plus, Check, ArrowRight, Calculator, Wifi, ShieldAlert, Lightbulb, Wine, MapPin, ChevronDown } from 'lucide-react';

// Interfaces for product structure
export interface ProductVariant {
  name: string;
  priceCash: number;
  priceRent: number;
  discount?: number;
  originalPrice?: number;
  image: string;
}

export interface ProductDetail {
  sku: string;
  title: string;
  category?: string;
  description: string;
  benefits: string[];
  image: string;
  variants?: ProductVariant[];
  type: 'tech' | 'lifestyle';
}

// Data for the catalog details
// RULES: 
// - Tech (Solar, EV, Batteries) & Purifiers = CASH + RENT
// - Lifestyle (Appliances, Heaters, AC) = CASH ONLY (priceRent: 0)
export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "Calentador Solar": {
    sku: "calentador_solar",
    title: "Calentadores Solares",
    category: "Azotea",
    description: "Aprovecha la energía del sol para calentar agua de forma gratuita. Reduce hasta 80% el consumo de gas en tu hogar.",
    benefits: ["Ahorro de gas hasta 80%", "Agua caliente ecológica", "Tanque acero inoxidable", "Vida útil prolongada"],
    image: "https://images.unsplash.com/photo-1599818820067-b50a04918e9a?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
        { name: "Calentador Gravedad\n150L (3-4 personas)", priceCash: 8500, priceRent: 0, image: "https://images.unsplash.com/photo-1599818820067-b50a04918e9a?auto=format&fit=crop&q=80&w=300" },
        { name: "Calentador Presurizado\n200L (5-6 personas)", priceCash: 12500, priceRent: 0, image: "https://images.unsplash.com/photo-1599818820067-b50a04918e9a?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Paneles Solares": {
    sku: "paneles_solares_full",
    title: "Paneles Solares",
    category: "Azotea",
    description: "Genera tu propia energía limpia. Nuestros sistemas solares reducen drásticamente tu recibo CFE desde el primer día.",
    benefits: ["Reducción de hasta 95% en CFE", "Independencia energética", "Plusvalía para tu propiedad", "Monitoreo 24/7 vía App"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
    type: 'tech',
    variants: [
        { name: "Sistema Básico\n4 Paneles 550W", priceCash: 68000, priceRent: 1200, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
        { name: "Sistema Plus\n8 Paneles 550W", priceCash: 125000, priceRent: 2100, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Aire Acondicionado": {
    sku: "aire_acondicionado_inverter",
    title: "Aires Acondicionados Inverter",
    category: "Recámaras / Estancia",
    description: "Disfruta confort todo el año con aire fresco, limpio y silencioso. Tecnología Inverter para máximo ahorro.",
    benefits: ["Tecnología Inverter", "Filtros purificadores", "Ahorro energético", "Ambiente saludable"],
    image: "https://images.unsplash.com/photo-1614631346049-7c427303d865?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      {
        name: "Inverter Ultra Eficiente\n1 Tonelada (Solo Frío)",
        priceCash: 11999,
        priceRent: 0,
        image: "https://images.unsplash.com/photo-1614631346049-7c427303d865?auto=format&fit=crop&q=80&w=300"
      },
      {
        name: "Inverter Smart WiFi\n1.5 Toneladas (Frío/Calor)",
        priceCash: 16500,
        priceRent: 0,
        image: "https://images.unsplash.com/photo-1599587405230-0db89d343467?auto=format&fit=crop&q=80&w=300"
      }
    ]
  },
  "Purificación de Agua": {
    sku: "purificador_agua",
    title: "Purificadores de Agua",
    category: "Cocina",
    description: "Agua limpia y segura todos los días. Eliminan impurezas, cloro y bacterias directo del grifo.",
    benefits: ["Filtrado de 5 etapas", "Elimina cloro/bacterias", "Mejora el sabor", "Adiós garrafones"],
    image: "https://images.unsplash.com/photo-1521805103429-0d9c464c4807?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      {
        name: "Purificador\nOI BAJO TARJA",
        priceCash: 3999,
        priceRent: 199,
        image: "https://images.unsplash.com/photo-1521805103429-0d9c464c4807?auto=format&fit=crop&q=80&w=300"
      },
      {
        name: "Purificador Smart\nOI + Mineralización",
        priceCash: 6499,
        priceRent: 299,
        image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=300"
      }
    ]
  },
  "Agua Caliente Inteligente": {
    sku: "calentador_electrico_eficiente",
    title: "Calentadores Eléctricos",
    category: "Sótano / Cuarto Técnico",
    description: "Tecnología de depósito eléctrico ideal para interiores. Diseño compacto, seguro y eficiente sin uso de gas.",
    benefits: ["Tanque porcelanizado", "Aislante térmico", "Control preciso", "Sin emisiones de gas"],
    image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      {
        name: "Calentador Eléctrico\nDepósito 40L",
        priceCash: 5299,
        priceRent: 0,
        image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=300"
      },
      {
        name: "Calentador Instantáneo\nEléctrico Digital",
        priceCash: 7500,
        priceRent: 0,
        image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=300"
      }
    ]
  },
  "Cargador EV": {
    sku: "cargador_ev_instalacion",
    title: "Cargadores EV",
    category: "Cochera",
    description: "Recarga tu auto eléctrico de forma rápida y segura desde casa con instalación certificada.",
    benefits: ["Carga Nivel 2 (Rápida)", "Universal", "Control inteligente", "Instalación certificada"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600",
    type: 'tech',
    variants: [
        { name: "Wallbox Pulsar Plus\n7.4kW", priceCash: 18500, priceRent: 650, image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=300" },
        { name: "Cargador Tesla\nGen 3", priceCash: 14500, priceRent: 550, image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Batería de Respaldo": {
    sku: "bateria_respaldo",
    title: "Baterías de Casa",
    category: "Cuarto de Máquinas",
    description: "Almacena energía para usarla de noche o durante apagones. Seguridad total para tu hogar.",
    benefits: ["Respaldo anti-apagones", "Uso nocturno", "Litio seguro", "Autonomía total"],
    image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=600",
    type: 'tech',
    variants: [
        { name: "Batería 5kWh\nRespaldo Esencial", priceCash: 45000, priceRent: 1500, image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=300" },
        { name: "Batería 10kWh\nAutonomía Total", priceCash: 85000, priceRent: 2800, image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Recirculación": {
    sku: "recirculador_agua",
    title: "Recirculación de Agua",
    category: "Baños",
    description: "Ahorra agua y disfruta confort inmediato. Nuestros sistemas recirculan el agua fría para que no se desperdicie.",
    benefits: ["Ahorro de agua", "Agua caliente rápida", "Automático", "Silencioso"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
        { name: "Kit Recirculación\nAutomática Smart", priceCash: 8500, priceRent: 0, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Cocinado": {
    sku: "estufa_electrica",
    title: "Cocinado Eléctrico",
    category: "Cocina",
    description: "Cocina con precisión, seguridad y eficiencia sin usar gas.",
    benefits: ["Sin fugas de gas", "Calor uniforme", "Control digital", "Diseño moderno"],
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      { name: "Estufa de Piso\nEléctrica (Básica)", priceCash: 12999, priceRent: 0, image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=300" },
      { name: "Parrilla Inducción\n5 Quemadores", priceCash: 9500, priceRent: 0, image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Refrigeración": {
    sku: "refrigerador_eficiente",
    title: "Refrigeración Ahorradora",
    category: "Cocina",
    description: "Mantén tus alimentos frescos por más tiempo con tecnología eficiente.",
    benefits: ["Enfriamiento uniforme", "Ahorro de energía", "Diseño moderno", "Mayor capacidad"],
    image: "https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      { name: "Refrigerador GE\nInverter Silver", priceCash: 18999, priceRent: 0, image: "https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&q=80&w=300" },
      { name: "Refrigerador Smart\nCon Pantalla Hub", priceCash: 35000, priceRent: 0, image: "https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&q=80&w=300" }
    ]
  },
  "Lavado": {
    sku: "lavadora_eficiente",
    title: "Lavado Bajo Consumo",
    category: "Sótano / Cuarto de Lavado",
    description: "Lava y seca tu ropa en un solo equipo compacto y eficiente.",
    benefits: ["Tecnología Aqua Saver", "Panel digital", "Ahorro de agua", "Ahorro energía"],
    image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=600",
    type: 'lifestyle',
    variants: [
      { name: "Centro de lavado\nMabe Gas/Eléc", priceCash: 14999, priceRent: 0, image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=300" },
      { name: "Lavasecadora Inverter\nSmart Cycle", priceCash: 18500, priceRent: 0, image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=300" }
    ]
  }
};

const Hotspot: React.FC<{ 
  top: string; 
  left: string; 
  icon: React.ReactNode; 
  label: string;
  side?: 'left' | 'right';
  onClick: () => void;
  colorType: 'tech' | 'lifestyle';
  isUnavailable?: boolean;
}> = ({ top, left, icon, label, side = 'right', onClick, colorType, isUnavailable }) => {
    
  const colorClass = colorType === 'tech' 
    ? 'text-brand-green border-brand-green hover:bg-brand-green hover:shadow-brand-green/70' 
    : 'text-brand-gold border-brand-gold hover:bg-brand-gold hover:shadow-brand-gold/70';
  const bgClass = colorType === 'tech' ? 'bg-brand-green' : 'bg-brand-gold';

  const unavailableClass = "text-gray-600 border-gray-600 bg-black/50 hover:bg-black cursor-not-allowed grayscale";

  return (
    <div className="absolute group z-20" style={{ top, left }}>
      <button 
        onClick={onClick}
        className={`w-8 h-8 md:w-10 md:h-10 bg-black/80 border-[1.5px] rounded-full flex items-center justify-center transition-all duration-300 shadow-none hover:scale-105 ${isUnavailable ? unavailableClass : colorClass} ${!isUnavailable && 'hover:animate-pulse cursor-pointer'}`}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
      </button>
      
      <div className={`hidden md:block absolute ${side === 'right' ? 'left-full ml-3' : 'right-full mr-3'} top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30`}>
         <div className={`${isUnavailable ? 'bg-gray-700 text-gray-400' : bgClass + ' text-black'} px-3 py-1.5 rounded font-bold text-xs shadow-lg border border-white/20`}>
           {label} {isUnavailable && "(No disponible)"}
         </div>
      </div>
    </div>
  );
};

// --- MOBILE CATALOG ITEM ---
const MobileCatalogItem: React.FC<{
    itemKey: string;
    onClick: () => void;
    unavailable: boolean;
}> = ({ itemKey, onClick, unavailable }) => {
    const product = PRODUCT_DETAILS[itemKey];
    if (!product) return null;
    
    const isTech = product.type === 'tech';

    return (
        <div 
            onClick={onClick}
            className={`relative p-4 rounded-xl border bg-[#0f0f0f] flex flex-row items-center gap-4 active:scale-98 transition-transform ${unavailable ? 'opacity-50 border-white/5 grayscale' : `border-white/5 hover:bg-[#141414] hover:border-white/20`}`}
        >
            <div className={`w-12 h-12 rounded-full ${isTech ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-gold/10 text-brand-gold'} flex items-center justify-center shrink-0 border border-white/5`}>
                {isTech ? <Zap size={22} /> : <Droplet size={22} />}
            </div>
            <div className="flex-1 min-w-0">
                <span className={`text-[10px] font-bold uppercase tracking-widest block mb-0.5 ${isTech ? 'text-brand-green' : 'text-brand-gold'}`}>
                    {product.category || (isTech ? 'Energía' : 'Lifestyle')}
                </span>
                <h4 className="text-white font-bold text-base leading-tight truncate">{product.title}</h4>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${unavailable ? 'text-gray-600' : 'text-gray-400'}`}>
                 <ArrowRight size={18} />
            </div>
        </div>
    )
}


// Modal Component
const ProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  productKey: string | null;
  onAddToCart: (item: any) => void;
  onCalculateSavings: (productTitle: string) => void;
}> = ({ isOpen, onClose, productKey, onAddToCart, onCalculateSavings }) => {
  const [addedIndices, setAddedIndices] = useState<Set<number>>(new Set());

  if (!isOpen || !productKey || !PRODUCT_DETAILS[productKey]) return null;

  const product = PRODUCT_DETAILS[productKey];
  const isTech = product.type === 'tech';
  
  const accentColorClass = isTech ? 'text-brand-green' : 'text-brand-gold';
  const accentBgClass = isTech ? 'bg-brand-green' : 'bg-brand-gold';

  const handleAddToCart = (variant: ProductVariant, index: number) => {
    onAddToCart({
      id: product.sku, 
      title: variant.name.replace(/\n/g, " "),
      price: variant.priceCash,
      leasingPrice: variant.priceRent, 
      category: product.category || product.title,
    });
    setAddedIndices(prev => new Set(prev).add(index));
    setTimeout(() => {
        onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#050505] border-t md:border border-white/10 w-full md:max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-slide-up-mobile md:animate-fade-in">
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-48 md:h-auto relative shrink-0">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#050505]" />
            <button onClick={onClose} className="absolute top-4 right-4 md:hidden bg-black/50 p-2 rounded-full text-white"><X size={20} /></button>
        </div>

        {/* Content Side */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${accentColorClass}`}>{product.category}</span>
                        <h2 className="text-3xl font-bold text-white mt-1 leading-tight">{product.title}</h2>
                    </div>
                    <button onClick={onClose} className="hidden md:block text-gray-500 hover:text-white"><X size={24} /></button>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                <div className="mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} className={accentColorClass} /> Beneficios Clave
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                <div className={`w-1.5 h-1.5 rounded-full ${accentBgClass}`} />
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>

                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Selecciona tu Solución</h3>
                <div className="space-y-4">
                    {product.variants?.map((variant, idx) => (
                        <div key={idx} className={`bg-[#141414] border ${addedIndices.has(idx) ? 'border-green-500' : 'border-white/10 hover:border-white/30'} rounded-xl p-4 transition-all group`}>
                            <div className="flex gap-4">
                                <img src={variant.image} alt={variant.name} className="w-20 h-20 object-cover rounded-lg bg-gray-800" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-lg leading-tight mb-1 whitespace-pre-line">{variant.name}</h4>
                                    <div className="flex items-center gap-4 text-sm mb-3">
                                        {variant.priceRent > 0 && (
                                            <span className="text-gray-300 font-medium">
                                                <span className={accentColorClass}>${variant.priceRent}</span>/mes
                                            </span>
                                        )}
                                        <span className="text-gray-500">
                                            ${variant.priceCash.toLocaleString()} contado
                                        </span>
                                    </div>
                                    
                                    {isTech ? (
                                        <button 
                                            onClick={() => {
                                                onClose();
                                                onCalculateSavings(product.title);
                                            }}
                                            className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${accentBgClass} text-black hover:bg-white`}
                                        >
                                            <Calculator size={14} /> Cotizar Solución
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleAddToCart(variant, idx)}
                                            disabled={addedIndices.has(idx)}
                                            className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${addedIndices.has(idx) ? 'bg-green-500 text-black cursor-default' : 'bg-white text-black hover:bg-gray-200'}`}
                                        >
                                            {addedIndices.has(idx) ? <><Check size={14} /> Agregado</> : <><Plus size={14} /> Agregar al Carrito</>}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveCatalog: React.FC<{ 
  onAddToCart: (item: any) => void;
  onGoToPackages: () => void;
  onCalculateSavings: (productTitle: string) => void;
  onVerifyRequest: () => boolean;
  unavailableIds: string[];
  hasCoverage: boolean;
}> = ({ onAddToCart, onGoToPackages, onCalculateSavings, onVerifyRequest, unavailableIds, hasCoverage }) => {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const handleProductClick = (key: string) => {
      const canProceed = onVerifyRequest();
      if (!canProceed) return;
      if (unavailableIds.includes(key)) return;
      setActiveProduct(key);
  };

  return (
    <section id="catalogo" className="py-12 md:py-16 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block px-3 py-0.5 rounded-full border border-brand-green/30 text-brand-green text-[10px] font-bold tracking-widest uppercase mb-3 bg-brand-green/5">
            Diseña tu espacio
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 normal-case">
            Explora nuestras <span className="text-brand-green">tecnologías</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            Descubre soluciones <span className="text-brand-green">Tech</span> y <span className="text-brand-gold">Lifestyle</span> para tu hogar.
          </p>
          
          {hasCoverage && (
            <div className="inline-flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest animate-fade-in">
                <MapPin size={14} /> Disponibilidad Verificada
            </div>
          )}
        </div>

        {/* --- DESKTOP VIEW: INTERACTIVE HOUSE --- */}
        <div className="relative rounded-xl border border-white/10 bg-[#080808] overflow-hidden min-h-[350px] md:min-h-[550px] lg:min-h-[600px] shadow-2xl group mb-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img 
                src="https://lh3.googleusercontent.com/d/1EheaghmhRMKGB2yRFlEHI1rY0PoxnmAF"
                onError={(e) => {
                  e.currentTarget.src = "https://png.pngtree.com/png-vector/20230906/ourmid/pngtree-3d-rendering-of-house-cutaway-png-image_9962386.png" 
                  e.currentTarget.style.opacity = "0.8"; 
                }}
                alt="Casa Inteligente" 
                className="w-full h-full object-contain z-10"
            />
          </div>
          
          <div className="absolute inset-0 w-full h-full z-20">
             {Object.keys(PRODUCT_DETAILS).map((key) => {
                 // Hardcoded positions based on previous config
                 const posMap: Record<string, {top: string, left: string, icon: React.ReactNode, type: 'tech'|'lifestyle', side: 'left'|'right'}> = {
                    "Calentador Solar": { top: "14%", left: "18%", icon: <Waves />, type: "lifestyle", side: "right" },
                    "Paneles Solares": { top: "10%", left: "60%", icon: <Sun />, type: "tech", side: "left" },
                    "Cargador EV": { top: "78%", left: "82%", icon: <Plug />, type: "tech", side: "left" },
                    "Batería de Respaldo": { top: "65%", left: "88%", icon: <Battery />, type: "tech", side: "left" },
                    "Aire Acondicionado": { top: "30%", left: "22%", icon: <Wind />, type: "lifestyle", side: "right" },
                    "Recirculación": { top: "35%", left: "58%", icon: <RefreshCw />, type: "lifestyle", side: "left" },
                    "Purificación de Agua": { top: "58%", left: "32%", icon: <Droplet />, type: "lifestyle", side: "right" },
                    "Refrigeración": { top: "55%", left: "15%", icon: <Snowflake />, type: "lifestyle", side: "right" },
                    "Cocinado": { top: "65%", left: "24%", icon: <Zap />, type: "lifestyle", side: "right" },
                    "Lavado": { top: "75%", left: "65%", icon: <Shirt />, type: "lifestyle", side: "left" },
                    "Agua Caliente Inteligente": { top: "55%", left: "92%", icon: <Flame />, type: "lifestyle", side: "left" },
                 };
                 const pos = posMap[key];
                 if(!pos) return null;

                 return (
                     <Hotspot 
                        key={key}
                        top={pos.top} 
                        left={pos.left} 
                        icon={pos.icon} 
                        label={key} 
                        side={pos.side}
                        onClick={() => handleProductClick(key)} 
                        colorType={pos.type}
                        isUnavailable={hasCoverage && unavailableIds.includes(key)}
                     />
                 )
             })}
          </div>
        </div>

        {/* --- MOBILE VIEW: SINGLE COLUMN VERTICAL LIST --- */}
        <div className="md:hidden flex flex-col gap-3 mb-8">
            {Object.keys(PRODUCT_DETAILS).map((key) => (
                <MobileCatalogItem 
                    key={key}
                    itemKey={key}
                    onClick={() => handleProductClick(key)}
                    unavailable={hasCoverage && unavailableIds.includes(key)}
                />
            ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/5 animate-fade-in">
           <p className="text-gray-400 text-sm mb-4">¿Prefieres una solución integral todo en uno?</p>
           <button 
             onClick={onGoToPackages}
             className="w-full md:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-brand-gold/10 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black rounded-full transition-all duration-300 font-bold uppercase tracking-widest text-xs"
           >
             Encuentra el paquete ideal para ti
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

      </div>

      <ProductModal 
        isOpen={!!activeProduct} 
        onClose={() => setActiveProduct(null)} 
        productKey={activeProduct}
        onAddToCart={onAddToCart}
        onCalculateSavings={onCalculateSavings}
      />

    </section>
  );
};