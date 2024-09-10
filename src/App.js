import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Favories from './pages/Favories';
import Contact from './pages/Contact';
import Recipe from './pages/Recipe';
import RecipeDetails from './pages/RecipeDetails';
import Header from './pages/Header';  // Import du Header

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Header placé en dehors de l'animation */}
      <Header />  
      
      {/* Animation uniquement pour les pages */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/favories" element={<PageWrapper><Favories /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/recipe" element={<PageWrapper><Recipe /></PageWrapper>} />
          <Route path="/recipe/:id" element={<PageWrapper><RecipeDetails /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

// Composant principal pour encapsuler App avec le Router
const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainApp;

// Wrapper pour les pages avec animation
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};