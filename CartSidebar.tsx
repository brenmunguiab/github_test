import React, { useMemo } from 'react';
import { X, ShoppingCart, Trash2, ArrowRight, Calendar, CreditCard, Wallet, Package } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemoveItem, onClearCart }) => {
  // Group items
  const sections = useMemo(() => {
    const visits = items.filter(i => i.bookingDate || i.category === 'Servicio');
    const leasing = items.filter(i => !i.bookingDate && i.category !== 'Servicio' && i.leasingPrice > 0);
    const cash = items.filter(i => !i.bookingDate && i.category !== 'Servicio' && (!i.leasingPrice || i.leasingPrice === 0));
    
    return { visits, leasing, cash };
  }, [items]);

  const totals = useMemo(() => {
      const monthly = sections.leasing.reduce((acc, i) => acc + i.leasingPrice, 0);
      const upfront = sections.cash.reduce((acc, i) => acc + i.price, 0);
      return { monthly, upfront };
  }, [sections]);

  if (!isOpen) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      <div className={`fixed top-0 right-0 h-full w-full md:max-w-md bg-[#050505] border-l border-white/10 z-[70] flex flex-col shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart size={20} className="text-brand-gold" /> Tu Proyecto
            </h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"><X size={20} className="text-gray-500 hover:text-white" /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {items.length === 0 && (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                    <Package size={48} className="mb-4 opacity-20" />
                    <p>Tu carrito está vacío.</p>
                    <button onClick={onClose} className="mt-4 text-brand-gold text-sm hover:underline">Explorar catálogo</button>
                </div>
            )}

            {/* Section: Visitas Técnicas */}
            {sections.visits.length > 0 && (
                <div className="space-y-3 animate-fade-in">
                    <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={14} /> Próximas Visitas
                    </h3>
                    {sections.visits.map((item, idx) => (
                        <div key={idx} className="bg-[#141414] border border-brand-gold/30 rounded-xl p-4 relative group">
                            <button onClick={() => onRemoveItem(items.indexOf(item))} className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            <h4 className="font-bold text-white text-sm mb-1 pr-6">{item.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Calendar size={12} /> {item.bookingDate} - {item.bookingTime}
                            </div>
                            <div className="mt-2 text-[10px] bg-brand-gold/10 text-brand-gold inline-block px-2 py-0.5 rounded border border-brand-gold/20">
                                Pendiente de confirmación
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Section: Plan Flexible (Renta/Leasing) */}
            {sections.leasing.length > 0 && (
                <div className="space-y-3 animate-fade-in">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <CreditCard size={14} /> Plan Flexible / Renta
                    </h3>
                    {sections.leasing.map((item, idx) => (
                        <div key={idx} className="bg-[#141414] border border-white/10 rounded-xl p-4 flex justify-between items-center relative group hover:border-white/20 transition-colors">
                             <button onClick={() => onRemoveItem(items.indexOf(item))} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                             <div>
                                 <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                 <p className="text-xs text-gray-500">{item.category}</p>
                             </div>
                             <div className="text-right">
                                 <span className="block font-bold text-white">${item.leasingPrice.toLocaleString()}</span>
                                 <span className="text-[10px] text-gray-500">/mes</span>
                             </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Section: Compra Inmediata */}
            {sections.cash.length > 0 && (
                <div className="space-y-3 animate-fade-in">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Wallet size={14} /> Compra Inmediata
                    </h3>
                    {sections.cash.map((item, idx) => (
                        <div key={idx} className="bg-[#141414] border border-white/10 rounded-xl p-4 flex justify-between items-center relative group hover:border-white/20 transition-colors">
                             <button onClick={() => onRemoveItem(items.indexOf(item))} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
                             <div>
                                 <h4 className="font-bold text-white text-sm">{item.title}</h4>
                                 <p className="text-xs text-gray-500">{item.category}</p>
                             </div>
                             <div className="text-right">
                                 <span className="block font-bold text-white">${item.price.toLocaleString()}</span>
                                 <span className="text-[10px] text-gray-500">pago único</span>
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="bg-[#080808] border-t border-white/10 p-6 space-y-4">
                <div className="space-y-2 text-sm">
                    {totals.monthly > 0 && (
                        <div className="flex justify-between text-gray-300">
                            <span>Mensualidad Total:</span>
                            <span className="font-bold text-white">${totals.monthly.toLocaleString()}/mes</span>
                        </div>
                    )}
                    {totals.upfront > 0 && (
                        <div className="flex justify-between text-gray-300">
                            <span>Pago Único Total:</span>
                            <span className="font-bold text-white">${totals.upfront.toLocaleString()}</span>
                        </div>
                    )}
                </div>
                <button className="w-full bg-white text-black font-extrabold py-4 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    Proceder al Pago <ArrowRight size={14} />
                </button>
            </div>
        )}
      </div>
    </>
  );
};