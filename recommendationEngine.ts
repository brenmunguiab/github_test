// Data Definitions
export interface UserProfile {
    costo_kwh_mxn: number;
    consumo_mensual_kwh: number;
    tarifa_agua_mxn_m3: number;
    personas_en_casa: number;
    ubicacion: string;
    tiene_apagones: boolean;
    frecuencia_apagones_mes: number;
    tiene_ev: boolean;
    equipos_existentes: {
      ac_viejo: boolean;
      refrigerador_viejo: boolean;
    };
  }
  
  export interface RecommendationMetrics {
    ahorro_kwh_mes?: number;
    ahorro_mxn_mes?: number;
    payback_meses?: number;
    horas_respaldo?: number;
    ahorro_agua_litros_mes?: number;
    proteccion_picos?: boolean;
  }
  
  export interface RecommendationResult {
    recommendedSku: string;
    productTitle: string;
    reasonType: "savings" | "continuity" | "comfort" | "eco";
    reasonText: string;
    metrics: RecommendationMetrics;
    popup: {
      title: string;
      bullets: string[];
      imageUrl: string;
      primaryCta: string;
      secondaryCta: string;
    };
    priceRent?: number; // Estimated for display
    priceCash?: number; // Estimated for display
  }
  
  // DEFAULTS
  const DEFAULT_USER: UserProfile = {
    costo_kwh_mxn: 4.8, // High consumption tariff avg
    consumo_mensual_kwh: 350,
    tarifa_agua_mxn_m3: 25,
    personas_en_casa: 3,
    ubicacion: "MX",
    tiene_apagones: false,
    frecuencia_apagones_mes: 0,
    tiene_ev: false,
    equipos_existentes: {
      ac_viejo: true,
      refrigerador_viejo: true,
    },
  };
  
  // PRODUCT DB (For Engine Logic Only - mirrored from UI)
  const ENGINE_PRODUCTS: Record<string, { title: string; priceRent: number; priceCash: number; image: string }> = {
    "bateria_respaldo": {
      title: "Batería de Respaldo",
      priceRent: 1500,
      priceCash: 45000,
      image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?auto=format&fit=crop&q=80&w=300"
    },
    "tablero_transferencia_proteccion": {
      title: "Tablero Inteligente",
      priceRent: 450,
      priceCash: 12500,
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=300" // Placeholder
    },
    "aire_acondicionado_inverter": {
      title: "Aire Acondicionado Inverter",
      priceRent: 480,
      priceCash: 11999,
      image: "https://images.unsplash.com/photo-1614631346049-7c427303d865?auto=format&fit=crop&q=80&w=300"
    },
    "paneles_solares_full": {
      title: "Sistema Solar Completo",
      priceRent: 2100,
      priceCash: 125000,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
    },
    "paneles_solares_2_4": {
      title: "Sistema Solar Básico",
      priceRent: 1200,
      priceCash: 68000,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
    },
    "recirculador_agua": {
        title: "Kit Recirculación Smart",
        priceRent: 350,
        priceCash: 8500,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300"
    },
    "sensor_fugas": {
        title: "Sensor de Fugas",
        priceRent: 100,
        priceCash: 2500,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=300" // Placeholder
    },
    "medidor_consumo_app": {
        title: "Medidor Inteligente",
        priceRent: 150,
        priceCash: 3500,
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=300"
    }
  };
  
  // --- CORE ENGINE FUNCTION ---
  export const getRecommendation = (
    currentCartSkus: string[],
    lastAddedSku: string,
    userProfile: Partial<UserProfile> = {}
  ): RecommendationResult | null => {
    
    // Merge defaults
    const user = { ...DEFAULT_USER, ...userProfile };
    
    // Helper to check if recommendation is already in cart
    const isAlreadyInCart = (sku: string) => currentCartSkus.includes(sku);
  
    // --- RULES ENGINE ---
  
    // RULE 1: Solar + Blackouts -> Battery
    if (lastAddedSku.includes("paneles") && user.tiene_apagones) {
      const recSku = "bateria_respaldo";
      if (!isAlreadyInCart(recSku)) {
        return {
          recommendedSku: recSku,
          productTitle: ENGINE_PRODUCTS[recSku].title,
          priceRent: ENGINE_PRODUCTS[recSku].priceRent,
          priceCash: ENGINE_PRODUCTS[recSku].priceCash,
          reasonType: "continuity",
          reasonText: "Tienes paneles, pero si se va la luz, se apagan por seguridad.",
          metrics: { horas_respaldo: 6, proteccion_picos: true },
          popup: {
            title: "Usa tu energía solar 24/7",
            bullets: [
              "Respaldo automático de hasta 6 horas durante apagones",
              "Protección contra variaciones de voltaje para tus equipos"
            ],
            imageUrl: ENGINE_PRODUCTS[recSku].image,
            primaryCta: "Agregar Batería",
            secondaryCta: "Calcular Autonomía"
          }
        };
      }
    }
  
    // RULE 2: Solar + Old AC -> Inverter AC
    if (lastAddedSku.includes("paneles") && user.equipos_existentes.ac_viejo) {
      const recSku = "aire_acondicionado_inverter";
      if (!isAlreadyInCart(recSku)) {
        // Calc savings: Old AC (1200W) vs Inverter (600W avg) * 8h * 30d
        const savingsKwh = 144; 
        const savingsMxn = savingsKwh * user.costo_kwh_mxn;
        
        return {
            recommendedSku: recSku,
            productTitle: ENGINE_PRODUCTS[recSku].title,
            priceRent: ENGINE_PRODUCTS[recSku].priceRent,
            priceCash: ENGINE_PRODUCTS[recSku].priceCash,
            reasonType: "savings",
            reasonText: "Tu aire viejo consume el doble. Maximiza tus paneles con tecnología Inverter.",
            metrics: { ahorro_kwh_mes: savingsKwh, ahorro_mxn_mes: savingsMxn },
            popup: {
              title: "No desperdicies tu energía solar",
              bullets: [
                `Ahorra ~$${Math.round(savingsMxn)} MXN adicionales al mes`,
                "Tecnología ultra-silenciosa y control Wifi"
              ],
              imageUrl: ENGINE_PRODUCTS[recSku].image,
              primaryCta: "Agregar Aire Inverter",
              secondaryCta: "Ver Ficha Técnica"
            }
        };
      }
    }
  
    // RULE 3: Battery -> Transfer Board / Intelligent Meter
    if (lastAddedSku === "bateria_respaldo") {
        const recSku = "tablero_transferencia_proteccion";
        if (!isAlreadyInCart(recSku)) {
            return {
                recommendedSku: recSku,
                productTitle: ENGINE_PRODUCTS[recSku].title,
                priceRent: ENGINE_PRODUCTS[recSku].priceRent,
                priceCash: ENGINE_PRODUCTS[recSku].priceCash,
                reasonType: "continuity",
                reasonText: "Automatiza el cambio a baterías y protege toda tu instalación.",
                metrics: { proteccion_picos: true },
                popup: {
                    title: "Automatización y Seguridad Total",
                    bullets: [
                        "Cambio a baterías en milisegundos (imperceptible)",
                        "Protección industrial contra picos de voltaje"
                    ],
                    imageUrl: ENGINE_PRODUCTS[recSku].image,
                    primaryCta: "Agregar Tablero",
                    secondaryCta: "Más info"
                }
            }
        }
    }
  
    // RULE 4: Inverter AC -> Solar (Maximize ROI)
    if (lastAddedSku === "aire_acondicionado_inverter") {
        // Decide system size based on consumption
        const recSku = user.consumo_mensual_kwh > 500 ? "paneles_solares_full" : "paneles_solares_2_4";
        
        if (!isAlreadyInCart(recSku)) {
             // Solar calc: System Size * PSH (5) * 30 * Eff (0.8)
             const systemSizeKw = recSku.includes("full") ? 4.5 : 2.2; // approx
             const productionKwh = systemSizeKw * 5 * 30 * 0.8;
             const savingsMxn = productionKwh * user.costo_kwh_mxn;
             const payback = (ENGINE_PRODUCTS[recSku].priceCash / savingsMxn);
  
             return {
                recommendedSku: recSku,
                productTitle: ENGINE_PRODUCTS[recSku].title,
                priceRent: ENGINE_PRODUCTS[recSku].priceRent,
                priceCash: ENGINE_PRODUCTS[recSku].priceCash,
                reasonType: "savings",
                reasonText: "El aire acondicionado es tu mayor gasto eléctrico. Elimina ese costo generando tu propia energía.",
                metrics: { ahorro_kwh_mes: Math.round(productionKwh), ahorro_mxn_mes: Math.round(savingsMxn), payback_meses: Math.round(payback) },
                popup: {
                    title: "Energía Solar para tu Clima",
                    bullets: [
                        `Genera tu propia energía por $${Math.round(savingsMxn).toLocaleString()} MXN/mes`,
                        `Retorno de inversión en ${Math.round(payback)} meses (estimado)`
                    ],
                    imageUrl: ENGINE_PRODUCTS[recSku].image,
                    primaryCta: "Agregar Paneles Solares",
                    secondaryCta: "Calcular Techo"
                }
             }
        }
    }
  
    // RULE 6: Solar Heater -> Recirculator
    if (lastAddedSku === "calentador_solar") {
        const recSku = "recirculador_agua";
        if (!isAlreadyInCart(recSku)) {
            return {
                recommendedSku: recSku,
                productTitle: ENGINE_PRODUCTS[recSku].title,
                priceRent: ENGINE_PRODUCTS[recSku].priceRent,
                priceCash: ENGINE_PRODUCTS[recSku].priceCash,
                reasonType: "comfort",
                reasonText: "Ya ahorras gas, ahora ahorra agua. Ten agua caliente al instante.",
                metrics: { ahorro_agua_litros_mes: 1200 },
                popup: {
                    title: "Confort Inmediato",
                    bullets: [
                        "Agua caliente en 3 segundos (sin desperdiciar el chorro frío)",
                        "Ahorra ~1,200 litros de agua al mes"
                    ],
                    imageUrl: ENGINE_PRODUCTS[recSku].image,
                    primaryCta: "Agregar Recirculador",
                    secondaryCta: "Ver video"
                }
            }
        }
    }

    // RULE 10: EV Charger -> Solar
    if (lastAddedSku === "cargador_ev_instalacion") {
        const recSku = "paneles_solares_full";
        if (!isAlreadyInCart(recSku)) {
             // EV Calc: 300kWh/mo for EV approx
             const savingsMxn = 300 * user.costo_kwh_mxn;
             return {
                 recommendedSku: recSku,
                 productTitle: ENGINE_PRODUCTS[recSku].title,
                 priceRent: ENGINE_PRODUCTS[recSku].priceRent,
                 priceCash: ENGINE_PRODUCTS[recSku].priceCash,
                 reasonType: "savings",
                 reasonText: "Cargar un auto eléctrico consume mucha energía. Evita la tarifa DAC alimentándolo con el sol.",
                 metrics: { ahorro_mxn_mes: savingsMxn },
                 popup: {
                     title: "Tu Propia 'Gasolinera' Solar",
                     bullets: [
                         "Evita saltar a tarifa de Alto Consumo",
                         `Ahorro potencial de $${Math.round(savingsMxn).toLocaleString()} MXN mensuales`
                     ],
                     imageUrl: ENGINE_PRODUCTS[recSku].image,
                     primaryCta: "Agregar Paneles Solares",
                     secondaryCta: "Simular Carga"
                 }
             }
        }
    }
  
    return null; // No recommendation found
  };