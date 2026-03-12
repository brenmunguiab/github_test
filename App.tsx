import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Packages } from './components/Packages';
import { InteractiveCatalog } from './components/InteractiveCatalog';
import { Categories } from './components/Categories';
import { TrustFooter } from './components/TrustFooter';
import { CartSidebar } from './components/CartSidebar';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { CoverageModal } from './components/CoverageModal';
import { CalculatorModal } from './components/CalculatorModal';
import { SmartRecommendationPopup } from './components/SmartRecommendationPopup';
import { PartnersModal } from './components/PartnersModal';
import { getRecommendation, RecommendationResult, UserProfile as EngineUserProfile } from './utils/recommendationEngine';
import { X, Sparkles, Plus, ArrowRight } from 'lucide-react';

// --- MOCK AVAILABILITY LOGIC ---
// En el futuro esto vendrá de un Excel/Base de datos
const checkAvailability = (postalCode: string): string[] => {
    // SIMULACIÓN:
    
    // CASO 1: Zona sin infraestructura eléctrica avanzada (Bloquea Solar y EV)
    if (postalCode === '12345') {
        return ['Paneles Solares', 'Batería de Respaldo', 'Cargador EV']; 
    }

    // CASO 2: Zona sin logística de línea blanca (Bloquea Lavado y Lavavajillas)
    if (postalCode === '67890') {
        return ['Lavado', 'Lavavajillas', 'Refrigeración', 'Cocinado'];
    }

    // Por defecto, todo disponible (array vacío de no disponibles)
    return [];
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // -- Navigation Logic --
  const [activeSection, setActiveSection] = useState<'none' | 'packages' | 'catalog' | 'all'>('none');
  const [isNavLocked, setIsNavLocked] = useState(true); // Locked by default
  const [heroKey, setHeroKey] = useState(0); 

  // -- Logic for Coverage & Interception --
  const [coverageData, setCoverageData] = useState<{postalCode: string} | null>(null);
  const [isCoverageModalOpen, setIsCoverageModalOpen] = useState(false);
  const [unavailableProducts, setUnavailableProducts] = useState<string[]>([]);
  
  // State to retry an action after coverage verification
  const [pendingAction, setPendingAction] = useState<{ type: 'package' | 'product', id: string } | null>(null);

  // -- Logic for Calculator --
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorProductTitle, setCalculatorProductTitle] = useState('');

  // PRECIOS VISIBLES POR DEFECTO
  const [arePricesRevealed, setArePricesRevealed] = useState(true);
  const [recommendedPackageId, setRecommendedPackageId] = useState<string | null>(null);

  // -- Recommendation Logic --
  const [smartRecommendation, setSmartRecommendation] = useState<RecommendationResult | null>(null);
  const [engineUserProfile, setEngineUserProfile] = useState<Partial<EngineUserProfile>>({
      tiene_apagones: false 
  });

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // HANDLE COVERAGE SUBMIT
  const handleSetCoverageData = (data: {postalCode: string}) => {
    setCoverageData(data);
    
    // Calcular Disponibilidad
    const blockedItems = checkAvailability(data.postalCode);
    setUnavailableProducts(blockedItems);

    setIsCoverageModalOpen(false);
    
    // Resume pending action if any
    if (pendingAction) {
        if (pendingAction.type === 'package') {
            handlePackageSelection(pendingAction.id, true); // Force execute
        } else if (pendingAction.type === 'product') {
            // InteractiveCatalog handles its own state, but we could trigger something here if needed
            // For now, the user just sees the graying out effect updated immediately
        }
        setPendingAction(null);
    }
  };

  const addToCart = (item: any) => {
      processAddToCart(item);
  };

  const handleRemoveFromCart = (index: number) => {
      setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const processAddToCart = (item: any) => {
      setCartItems(prev => [...prev, item]);
      const addedSku = item.id || item.sku || ""; 
      if (!addedSku) {
          setIsCartOpen(true);
          return;
      }
      const currentCartSkus = cartItems.map(i => i.id || i.sku || "");
      const rec = getRecommendation(currentCartSkus, addedSku, engineUserProfile);
      if (rec) {
          setSmartRecommendation(rec);
      } else {
          setIsCartOpen(true); 
      }
  };
  
  const clearCart = () => {
      setCartItems([]);
  };

  const handleOpenCalculator = (productTitle: string) => {
      setCalculatorProductTitle(productTitle);
      setIsCalculatorOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    setCurrentView('profile');
    setArePricesRevealed(true);
    if (!coverageData) setCoverageData({ postalCode: '00000' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setActiveSection('none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProfile = () => setCurrentView('profile');

  const handleNavigation = (sectionId: string) => {
    if (isNavLocked) return;
    if (currentView !== 'home') setCurrentView('home');
    if (sectionId === 'paquetes') setActiveSection('packages');
    if (sectionId === 'catalogo') setActiveSection('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlockPrices = () => {
    setArePricesRevealed(true);
  };

  // UPDATED: Navigation from Hero (Direct, no check)
  const handlePathChoice = (path: 'packages' | 'catalog') => {
      setActiveSection(path);
      setIsNavLocked(false); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // NEW: Intercept Package Selection
  const handlePackageSelection = (packageId: string, bypassCheck: boolean = false) => {
      if (!coverageData && !bypassCheck) {
          setPendingAction({ type: 'package', id: packageId });
          setIsCoverageModalOpen(true);
          return;
      }
      // If we are here, we have coverage data. 
      // The Package component uses 'highlightedPackageId' prop to open details if managed externally, 
      // but 'Packages' component manages its own modal state usually.
      // We pass the "retry" intent differently or just let the user click again (now enabled).
      // Actually, passing 'recommendedPackageId' works as a trigger in Packages.
      setRecommendedPackageId(packageId);
  };

  const handleProductSelectionAttempt = () => {
      if (!coverageData) {
          setIsCoverageModalOpen(true);
          return false; // Stop propagation
      }
      return true; // Continue
  };

  const handleRecommendPackage = (packageId: string) => {
      // This is called from Hero "Recommendation" logic if we used it
      handlePackageSelection(packageId);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-gold/30 selection:text-white">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={toggleCart} 
        onLoginClick={() => setIsAuthOpen(true)}
        onLogoClick={navigateToHome}
        onProfileClick={navigateToProfile}
        onNavigate={handleNavigation}
        onPartnersClick={() => setIsPartnersModalOpen(true)}
        isLoggedIn={isLoggedIn}
        isNavLocked={isNavLocked} 
      />
      
      <main>
        {currentView === 'home' ? (
          <>
            {activeSection === 'none' && (
                <Hero 
                  key={heroKey}
                  initialCoverageData={coverageData}
                  onUnlockPrices={handleUnlockPrices} 
                  onRecommendPackage={handleRecommendPackage}
                  onChoosePath={handlePathChoice} 
                />
            )}
            
            {activeSection !== 'none' && (
                <div className="animate-fade-in pt-16">
                    {(activeSection === 'catalog' || activeSection === 'all') && (
                        <InteractiveCatalog 
                            onAddToCart={addToCart} 
                            onCalculateSavings={handleOpenCalculator}
                            onGoToPackages={() => {
                                setActiveSection('packages');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            onVerifyRequest={handleProductSelectionAttempt}
                            unavailableIds={unavailableProducts}
                            hasCoverage={!!coverageData}
                        />
                    )}
                    
                    {(activeSection === 'packages' || activeSection === 'all') && (
                        <Packages 
                            onAddToCart={addToCart} 
                            arePricesRevealed={arePricesRevealed}
                            highlightedPackageId={recommendedPackageId}
                            onUnlockRequest={() => setIsCoverageModalOpen(true)}
                            onCalculateSavings={handleOpenCalculator}
                            onVerifyRequest={() => setIsCoverageModalOpen(true)}
                            unavailableIds={unavailableProducts}
                            hasCoverage={!!coverageData}
                        />
                    )}
                    
                    {!isNavLocked && <Categories />}
                </div>
            )}
          </>
        ) : (
          <UserProfile onLogout={handleLogout} />
        )}
      </main>
      
      <TrustFooter />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={clearCart}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLogin}
      />

      <PartnersModal 
        isOpen={isPartnersModalOpen}
        onClose={() => setIsPartnersModalOpen(false)}
      />

      <CoverageModal 
        isOpen={isCoverageModalOpen}
        onClose={() => {
            setIsCoverageModalOpen(false);
            setPendingAction(null);
        }}
        onSubmit={handleSetCoverageData}
      />

      <CalculatorModal 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        productTitle={calculatorProductTitle}
        onAddToCart={addToCart}
      />

      <SmartRecommendationPopup 
         isOpen={!!smartRecommendation}
         onClose={() => {
             setSmartRecommendation(null);
             setIsCartOpen(true);
         }}
         recommendation={smartRecommendation}
         onAccept={() => {
             if (smartRecommendation) {
                 addToCart({
                     id: smartRecommendation.recommendedSku,
                     title: smartRecommendation.productTitle,
                     price: smartRecommendation.priceCash,
                     leasingPrice: smartRecommendation.priceRent,
                     category: "Recomendación",
                     isRentOnly: smartRecommendation.recommendedSku.includes('panel') || smartRecommendation.recommendedSku.includes('bateria')
                 });
             }
             setSmartRecommendation(null);
         }}
      />
      
    </div>
  );
};

export default App;