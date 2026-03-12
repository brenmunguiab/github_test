import React, { useState } from 'react';
import { ShoppingCart, User, Lock, Menu, X, ChevronRight, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onLogoClick: () => void;
  onProfileClick: () => void;
  onNavigate: (sectionId: string) => void;
  onPartnersClick: () => void;
  isLoggedIn: boolean;
  isNavLocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  onLoginClick, 
  onLogoClick,
  onProfileClick,
  onNavigate,
  onPartnersClick,
  isLoggedIn,
  isNavLocked = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const linkClass = isNavLocked 
    ? "text-sm font-medium tracking-widest text-gray-700 cursor-not-allowed uppercase flex items-center gap-1"
    : "text-sm font-medium tracking-widest text-gray-300 hover:text-brand-gold transition-colors uppercase cursor-pointer";

  const handleMobileNav = (action: () => void) => {
      action();
      setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/95 backdrop-blur-xl border-b border-white/10 h-16 sm:h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Left: Mobile Menu Trigger */}
            <div className="flex md:hidden">
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Menu size={24} />
                </button>
            </div>

            {/* Center/Left: Logo */}
            <button onClick={onLogoClick} className="flex items-center gap-1 focus:outline-none group">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">conecta</span>
              <span className="text-xl sm:text-2xl font-bold text-brand-gold tracking-tight">bee</span>
            </button>

            {/* Desktop Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('catalogo')} className={linkClass}>
                  {isNavLocked && <Lock size={12} className="inline mr-1" />} Explorar catálogo
              </button>
              <button onClick={() => onNavigate('paquetes')} className={linkClass}>
                  {isNavLocked && <Lock size={12} className="inline mr-1" />} Encontrar mi solución ideal
              </button>
               <button onClick={onPartnersClick} className={`${linkClass} text-brand-gold/80 hover:text-white`}>
                  Profesionales
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button 
                onClick={onCartClick}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-black transition-all relative active:scale-95"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Desktop Auth */}
              <div className="hidden sm:block">
                  {isLoggedIn ? (
                    <button onClick={onProfileClick} className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-black rounded-lg hover:bg-white transition-all font-bold text-xs uppercase tracking-wider">
                      <User size={16} /> Mi Perfil
                    </button>
                  ) : (
                    <button onClick={onLoginClick} className="flex items-center gap-2 px-4 py-2 border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold hover:text-black transition-all font-bold text-xs uppercase tracking-wider">
                      <User size={16} /> Iniciar
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-start">
              
              {/* Backdrop with Blur */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Drawer Panel */}
              <div className="relative w-[85%] max-w-[320px] h-full bg-[#050505] border-r border-white/10 shadow-2xl flex flex-col animate-slide-in-left">
                  
                  {/* Header */}
                  <div className="flex justify-between items-center p-6 border-b border-white/5">
                      <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-white tracking-tight">conecta</span>
                          <span className="text-xl font-bold text-brand-gold tracking-tight">bee</span>
                      </div>
                      <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                           <X size={24} strokeWidth={1.5} />
                       </button>
                  </div>
                  
                  {/* Left Aligned Navigation Links */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-2 p-6 pt-10">
                      <button 
                        onClick={() => handleMobileNav(() => onNavigate('catalogo'))} 
                        className={`text-2xl font-bold transition-colors tracking-tight flex items-center justify-between w-full py-2 ${isNavLocked ? 'text-gray-700 cursor-not-allowed' : 'text-white hover:text-brand-gold'}`}
                      >
                          Explorar catálogo {isNavLocked && <Lock size={16} className="text-gray-600" />}
                      </button>

                      <button 
                        onClick={() => handleMobileNav(() => onNavigate('paquetes'))} 
                        className={`text-2xl font-bold transition-colors tracking-tight flex items-center justify-between w-full py-2 ${isNavLocked ? 'text-gray-700 cursor-not-allowed' : 'text-white hover:text-brand-gold'}`}
                      >
                          Encontrar mi solución ideal {isNavLocked && <Lock size={16} className="text-gray-600" />}
                      </button>
                      
                      <button 
                        onClick={() => handleMobileNav(onPartnersClick)} 
                        className="text-2xl font-bold text-gray-500 hover:text-brand-gold transition-colors tracking-tight w-full text-left py-2"
                      >
                          Profesionales
                  </button>
                  </div>

                  {/* Footer / Auth */}
                  <div className="p-8 border-t border-white/5 flex flex-col items-center gap-6">
                      {isLoggedIn ? (
                        <button onClick={() => handleMobileNav(onProfileClick)} className="w-full text-sm font-bold text-brand-gold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-gold/10 py-3 rounded-lg transition-colors">
                          <User size={18} /> Mi Perfil
                        </button>
                      ) : (
                        <button onClick={() => handleMobileNav(onLoginClick)} className="w-full text-sm font-bold text-white hover:text-brand-gold transition-colors flex items-center justify-center gap-2 border border-white/20 px-4 py-3 rounded-lg hover:border-brand-gold hover:bg-brand-gold/5">
                          Iniciar Sesión <ArrowRight size={16} />
                        </button>
                      )}
                      
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest">v1.0.5</p>
                  </div>
              </div>
          </div>
      )}
    </>
  );
};