import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { AuroraBackground } from './components/AuroraBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { Suspense, lazy } from 'react';

// Lazy load heavy components
const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const Works = lazy(() => import('./components/Works'));
import WhatsAppButton from './components/WhatsAppButton';

const pageTransition = { duration: 0.4 };

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('Home');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleNavigate = useCallback((view: string) => {
    setCurrentView(view);
  }, []);

  const handleContactToggle = useCallback(() => {
    setIsContactOpen(prev => !prev);
  }, []);

  const containerClass = useMemo(() => cn(
    "flex-1 w-full relative overflow-x-hidden scrollbar-hide",
    currentView === 'Home' ? "overflow-y-auto lg:overflow-hidden" : "overflow-y-auto"
  ), [currentView]);

  return (
    <AuroraBackground className="flex flex-col overflow-hidden h-screen w-screen">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isContactOpen={isContactOpen}
        onContactToggle={handleContactToggle}
      />

      <div className={containerClass}>
        <Suspense fallback={
          <div className="flex items-center justify-center h-full w-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatePresence mode="wait">
            {currentView === 'Home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={pageTransition}
                className="h-full w-full min-h-[600px] md:min-h-0 gpu-accelerated"
              >
                <Hero
                  onNavigate={handleNavigate}
                  onContactClick={handleContactToggle}
                />
              </motion.div>
            )}

            {currentView === 'Skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={pageTransition}
                className="h-full w-full gpu-accelerated"
              >
                <Skills />
              </motion.div>
            )}

            {currentView === 'About' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={pageTransition}
                className="h-full w-full gpu-accelerated"
              >
                <About />
              </motion.div>
            )}

            {currentView === 'Projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={pageTransition}
                className="h-full w-full gpu-accelerated"
              >
                <Works />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </div>
      <WhatsAppButton />
    </AuroraBackground>
  );
};

export default App;