import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryId, MenuItem } from '../types';
import { CATEGORIES, MENU_ITEMS, EXTRAS_LIST, FRAPPE_SIZES, CAFETERIA_INFO } from '../data/menuData';
import { 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  ChevronRight,
  PlusCircle,
  CupSoda,
  Cookie
} from 'lucide-react';

interface MenuScreenProps {
  initialCategory: CategoryId | null;
  onBackToHome: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  initialCategory,
  onBackToHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(initialCategory);

  const handleSelectCategory = (catId: CategoryId) => {
    setSelectedCategory(catId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter items based purely on selected category
  const categoryItems = useMemo(() => {
    if (!selectedCategory) return [];

    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && selectedCategory !== 'extras') {
        return item.category === selectedCategory;
      }
      return true;
    });
  }, [selectedCategory]);

  const currentCategoryMeta = selectedCategory 
    ? (CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0])
    : null;

  const getBadgeStyle = (badgeColor?: MenuItem['badgeColor']) => {
    switch (badgeColor) {
      case 'primary':
        return 'bg-[#bb0013] text-white border-[#1e1b13]';
      case 'secondary':
        return 'bg-[#ffd700] text-[#1e1b13] border-[#1e1b13]';
      case 'purple':
        return 'bg-[#451ebb] text-white border-[#1e1b13]';
      case 'green':
        return 'bg-[#059669] text-white border-[#1e1b13]';
      case 'tertiary':
      default:
        return 'bg-[#5d3fd3] text-white border-[#1e1b13]';
    }
  };

  // Categorize Extras for display
  const untablesExtras = useMemo(() => {
    return EXTRAS_LIST.filter(e => e.category === 'bases');
  }, []);

  const frutasExtras = useMemo(() => {
    return EXTRAS_LIST.filter(e => e.category === 'frutas');
  }, []);

  const toppingsExtras = useMemo(() => {
    return EXTRAS_LIST.filter(e => e.category === 'toppings');
  }, []);

  // List of main categories to display on the directory screen (excluding 'all')
  const directoryCategories = useMemo(() => {
    return CATEGORIES.filter((c) => c.id !== 'all');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8ef] text-[#1e1b13] font-body selection:bg-[#bb0013] selection:text-white">
      {/* Sticky Header with MENÚ and logo to the right */}
      <header className="sticky top-0 z-40 bg-[#1e1b13] text-white border-b-4 border-[#451ebb] px-4 sm:px-8 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-3">
          <h1 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-widest text-white leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            MENÚ
          </h1>
          <img 
            src="./logo.png" 
            alt="The Creep Zone" 
            className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8">
        <AnimatePresence mode="wait">
        {/* ======================================================== */}
        {/* CASE 1: CATEGORIES LIST (Primary View)                  */}
        {/* ======================================================== */}
        {selectedCategory === null ? (
          <motion.section
            key="categories-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Simple Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {directoryCategories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id as CategoryId)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white border-3 border-[#1e1b13] rounded-2xl p-5 sm:p-6 shadow-[5px_5px_0px_#1e1b13] hover:shadow-[7px_7px_0px_#451ebb] active:shadow-[2px_2px_0px_#1e1b13] transition-shadow duration-200 cursor-pointer flex items-center justify-between gap-4 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px]"
                >
                  <div className="space-y-1 flex-1">
                    <h3 className="font-headline font-black text-xl sm:text-2xl text-[#1e1b13] group-hover:text-[#451ebb] transition-colors uppercase tracking-tight">
                      {cat.label}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#484554] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#fff8ef] border-2 border-[#1e1b13] flex items-center justify-center shrink-0 group-hover:bg-[#451ebb] group-hover:text-white transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          /* ======================================================== */
          /* CASE 2: SELECTED CATEGORY DETAIL VIEW                   */
          /* ======================================================== */
          <motion.section
            key={`category-${selectedCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="space-y-8"
          >
            {/* Category Header Banner with Back to Categories button */}
            <div className="border-b-3 border-[#1e1b13] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <button
                  onClick={handleBackToCategories}
                  className="inline-flex items-center gap-1.5 font-space font-bold text-xs text-[#bb0013] hover:text-[#451ebb] hover:underline active:text-[#451ebb] active:underline mb-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Volver a las categorías</span>
                </button>

                <h2 className="font-headline font-black text-3xl sm:text-4xl text-[#451ebb] uppercase tracking-tight">
                  {currentCategoryMeta?.label}
                </h2>
                <p className="font-space text-xs sm:text-sm text-[#484554] mt-1 max-w-2xl">
                  {currentCategoryMeta?.description}
                </p>
              </div>
            </div>

            {/* Special Sizes Banner ONLY for Frappés */}
            {selectedCategory === 'frappes' && (
              <div className="bg-[#fffdfa] border-3 border-[#451ebb] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#1e1b13]">
                <div className="flex items-center gap-2 mb-3">
                  <CupSoda className="w-5 h-5 text-[#451ebb]" />
                  <h3 className="font-headline font-black text-base sm:text-lg uppercase text-[#1e1b13]">
                    Tamaños Disponibles para Frappés
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FRAPPE_SIZES.map((size) => (
                    <div 
                      key={size.name} 
                      className="bg-white border-2 border-[#1e1b13] rounded-xl p-3 flex items-center justify-between shadow-[2px_2px_0px_#1e1b13]"
                    >
                      <div>
                        <span className="font-headline font-black text-sm text-[#1e1b13] block">
                          {size.name}
                        </span>
                        <span className="text-[11px] font-space text-[#797586]">
                          {size.additionalPrice === 0 ? 'Tamaño chico incluido' : 'Precio adicional'}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm bg-[#1e1b13] text-[#ffd700] px-2 py-0.5 rounded border border-[#1e1b13]">
                        {size.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Menu Items Grid */}
            {selectedCategory !== 'extras' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categoryItems.map((item, index) => {
                  const isCustomBuild = item.id.includes('arma-tu');
                  const isFrappe = item.category === 'frappes';

                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`${
                        isCustomBuild 
                          ? 'md:col-span-2 bg-[#fffdfa] border-4 border-[#451ebb] shadow-[7px_7px_0px_#1e1b13]' 
                          : 'bg-white border-3 border-[#1e1b13] shadow-[5px_5px_0px_#1e1b13]'
                      } rounded-2xl p-5 sm:p-6 hover:shadow-[7px_7px_0px_#451ebb] active:shadow-[2px_2px_0px_#1e1b13] active:translate-x-[3px] active:translate-y-[3px] transition-shadow duration-200 flex flex-col justify-between group hover:-translate-y-0.5`}
                    >
                      <div>
                        {/* Top Row: Title, Badges & Price */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="space-y-1">
                            {item.badge && (
                              <span
                                className={`text-[10px] font-space font-black px-2.5 py-0.5 rounded border inline-block ${getBadgeStyle(
                                  item.badgeColor
                                )}`}
                              >
                                {item.badge}
                              </span>
                            )}

                            <h3 className="font-headline font-black text-xl sm:text-2xl text-[#1e1b13] group-hover:text-[#451ebb] transition-colors leading-tight flex items-center gap-2">
                              {item.name}
                              {isCustomBuild && <Sparkles className="w-5 h-5 text-[#ffd700] shrink-0" />}
                            </h3>
                          </div>

                          {/* Price Pill */}
                          {item.price > 0 && (
                            <div className="bg-[#1e1b13] text-[#ffd700] border-2 border-[#1e1b13] font-mono font-black text-xl sm:text-2xl px-3.5 py-1 rounded-xl shadow-[3px_3px_0px_#bb0013] shrink-0 text-right">
                              ${item.price}
                            </div>
                          )}
                        </div>

                        {/* Ingredients & Description */}
                        <div className="mt-2 space-y-2">
                          <div className={`border-2 rounded-xl p-3.5 ${isCustomBuild ? 'bg-[#fbf3e4] border-[#451ebb]/30' : 'bg-[#fff8ef] border-[#1e1b13]/15'}`}>
                            <span className="font-space font-bold text-xs text-[#451ebb] uppercase tracking-wide block mb-1">
                              {isCustomBuild ? 'Cómo funciona:' : 'Ingredientes:'}
                            </span>
                            <p className="font-body text-sm font-medium text-[#1e1b13] leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Frappé size tags */}
                          {isFrappe && (
                            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs font-space">
                              <span className="font-bold text-[#451ebb]">Tamaños:</span>
                              <span className="bg-[#f2e7f8] text-[#451ebb] px-2 py-0.5 rounded-md border border-[#451ebb]/20 font-medium">
                                Chico (12 oz): <strong>${item.price}</strong>
                              </span>
                              <span className="bg-[#f2e7f8] text-[#451ebb] px-2 py-0.5 rounded-md border border-[#451ebb]/20 font-medium">
                                Mediano (16 oz): <strong>+${25}</strong>
                              </span>
                              <span className="bg-[#f2e7f8] text-[#451ebb] px-2 py-0.5 rounded-md border border-[#451ebb]/20 font-medium">
                                Grande (20 oz): <strong>+${50}</strong>
                              </span>
                            </div>
                          )}

                          {/* If "Arma tu Crepa" / "Arma tu Waffle", show clear breakdown of included ingredients and extras */}
                          {isCustomBuild && (
                            <div className="mt-4 pt-4 border-t-2 border-[#1e1b13]/10 space-y-4">
                              {/* 1. Bases */}
                              <div>
                                <span className="font-space font-bold text-xs text-[#1e1b13] block mb-1.5 flex items-center gap-1">
                                  <PlusCircle className="w-3.5 h-3.5 text-[#451ebb]" />
                                  1. Bases, Untables y Mermeladas (Elige 1):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {untablesExtras.map(e => (
                                    <span key={e.name} className="text-xs font-space bg-white border border-[#1e1b13]/25 px-2.5 py-1 rounded-lg font-bold text-[#451ebb]">
                                      {e.name}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* 2. Frutas */}
                              <div>
                                <span className="font-space font-bold text-xs text-[#1e1b13] block mb-1.5 flex items-center gap-1">
                                  <PlusCircle className="w-3.5 h-3.5 text-[#059669]" />
                                  2. Frutas Frescas (Elige 1):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {frutasExtras.map(e => (
                                    <span key={e.name} className="text-xs font-space bg-[#ecfdf5] border border-[#059669]/30 px-2.5 py-1 rounded-lg font-bold text-[#059669]">
                                      {e.name}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* 3. Toppings */}
                              <div>
                                <span className="font-space font-bold text-xs text-[#1e1b13] block mb-1.5 flex items-center gap-1">
                                  <Cookie className="w-3.5 h-3.5 text-[#bb0013]" />
                                  3. Toppings & Crujientes (Elige 1):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {toppingsExtras.map(e => (
                                    <span key={e.name} className="text-xs font-space bg-[#fef2f2] border border-[#bb0013]/30 px-2.5 py-1 rounded-lg font-bold text-[#bb0013]">
                                      {e.name}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Extras pricing reminder */}
                              <div className="text-xs font-space text-[#484554] bg-white border border-[#1e1b13]/20 px-3 py-2 rounded-lg">
                                ¿Quieres más de una base, fruta o topping? Agrega los que gustes por solo <strong className="text-[#bb0013]">+$10</strong> cada uno.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {/* Extras & Toppings Dedicated View */}
            {selectedCategory === 'extras' && (
              <div className="bg-[#fbf3e4] border-4 border-[#1e1b13] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#451ebb] space-y-8">
                <div>
                  <h3 className="font-headline font-black text-2xl sm:text-3xl text-[#1e1b13] uppercase">
                    Extras & Toppings
                  </h3>
                  <p className="font-space text-xs sm:text-sm text-[#484554] mt-1">
                    Personaliza cualquiera de tus crepas, wafles o bebidas agregando tus ingredientes favoritos ($10 c/u).
                  </p>
                </div>

                {/* Section 1: Untables y Dulces */}
                <div>
                  <h4 className="font-headline font-bold text-lg text-[#451ebb] uppercase border-b-2 border-[#1e1b13]/20 pb-1 mb-4 flex items-center gap-2">
                    <span>1. Untables, Mermeladas & Dulces</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {untablesExtras.map((extra) => (
                      <div
                        key={extra.name}
                        className="bg-white border-2 border-[#1e1b13] rounded-xl p-3.5 shadow-[3px_3px_0px_#1e1b13] flex items-center justify-between gap-3"
                      >
                        <div>
                          <h5 className="font-headline font-bold text-sm text-[#1e1b13]">
                            {extra.name}
                          </h5>
                          {extra.description && (
                            <p className="font-body text-xs text-[#797586]">
                              {extra.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono font-bold text-sm bg-[#1e1b13] text-[#ffd700] px-2 py-0.5 rounded border border-[#1e1b13] shrink-0">
                          +${extra.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Frutas */}
                <div>
                  <h4 className="font-headline font-bold text-lg text-[#059669] uppercase border-b-2 border-[#1e1b13]/20 pb-1 mb-4 flex items-center gap-2">
                    <span>2. Frutas Frescas</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {frutasExtras.map((extra) => (
                      <div
                        key={extra.name}
                        className="bg-white border-2 border-[#1e1b13] rounded-xl p-3.5 shadow-[3px_3px_0px_#1e1b13] flex items-center justify-between gap-3"
                      >
                        <div>
                          <h5 className="font-headline font-bold text-sm text-[#1e1b13]">
                            {extra.name}
                          </h5>
                          {extra.description && (
                            <p className="font-body text-xs text-[#797586]">
                              {extra.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono font-bold text-sm bg-[#1e1b13] text-[#ffd700] px-2 py-0.5 rounded border border-[#1e1b13] shrink-0">
                          +${extra.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Toppings & Crujientes */}
                <div>
                  <h4 className="font-headline font-bold text-lg text-[#bb0013] uppercase border-b-2 border-[#1e1b13]/20 pb-1 mb-4 flex items-center gap-2">
                    <span>3. Toppings & Crujientes</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {toppingsExtras.map((extra) => (
                      <div
                        key={extra.name}
                        className="bg-white border-2 border-[#1e1b13] rounded-xl p-3.5 shadow-[3px_3px_0px_#1e1b13] flex items-center justify-between gap-3"
                      >
                        <div>
                          <h5 className="font-headline font-bold text-sm text-[#1e1b13]">
                            {extra.name}
                          </h5>
                          {extra.description && (
                            <p className="font-body text-xs text-[#797586]">
                              {extra.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono font-bold text-sm bg-[#1e1b13] text-[#ffd700] px-2 py-0.5 rounded border border-[#1e1b13] shrink-0">
                          +${extra.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Return to Categories Button at Bottom */}
            <div className="mt-12 flex items-center justify-center">
              <button
                onClick={handleBackToCategories}
                className="btn-brutal bg-[#ffd700] hover:bg-[#ffe135] text-[#1e1b13] font-space font-black text-sm sm:text-base px-8 py-3.5 rounded-full border-3 border-[#1e1b13] shadow-[5px_5px_0px_#1e1b13] flex items-center gap-2 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
                <span>Volver a Categorías</span>
              </button>
            </div>
          </motion.section>
        )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="bg-[#1e1b13] text-[#fff8ef] border-t-4 border-[#451ebb] py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          {/* Centered Logo (Removed text 'The Creep Zone') */}
          <div className="flex justify-center">
            <img 
              src="./logo.png" 
              alt="The Creep Zone" 
              className="h-10 sm:h-14 w-auto object-contain mx-auto filter drop-shadow-[0_4px_10px_rgba(69,30,187,0.4)]" 
            />
          </div>

          {/* Schedule in Brand Palette & Harmonic Back to Top Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-space">
            {/* Clock Schedule Badge in Brand Gold */}
            <div className="flex items-center gap-2 bg-[#2d2920] border-2 border-[#ffd700]/40 px-4 py-2 rounded-full text-xs font-space font-bold text-[#ffd700] shadow-[2px_2px_0px_#1e1b13]">
              <Clock className="w-4 h-4 text-[#ffd700]" />
              <span>{CAFETERIA_INFO.schedule}</span>
            </div>

            {/* Harmonized Volver Arriba Button */}
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-brutal bg-[#451ebb] hover:bg-[#5b2bd6] active:translate-x-0.5 active:translate-y-0.5 text-white font-space font-black text-xs sm:text-sm px-6 py-2 rounded-full border-2 border-[#ffd700]/40 shadow-[2px_2px_0px_#ffd700] transition-all cursor-pointer"
            >
              Volver arriba
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-[#fff8ef]/10 text-center text-[11px] font-space text-[#fff8ef]/50">
          <p>© {new Date().getFullYear()} The Creep Zone. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
