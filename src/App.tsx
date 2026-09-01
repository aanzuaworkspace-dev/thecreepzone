/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CategoryId } from './types';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu'>('home');
  const [selectedInitialCategory, setSelectedInitialCategory] = useState<CategoryId | null>(null);

  const handleEnterMenu = (initialCategory: CategoryId | null = null) => {
    setSelectedInitialCategory(initialCategory);
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="w-full min-h-screen bg-[#121016] font-body">
      {currentView === 'home' ? (
        <HomeScreen onEnterMenu={handleEnterMenu} />
      ) : (
        <MenuScreen
          initialCategory={selectedInitialCategory}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
