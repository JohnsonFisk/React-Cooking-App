import React from 'react';
import Recipe from './pages/Recipe';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favories from './pages/Favories';
import Contact from './pages/Contact';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favories" element={<Favories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
