import React from 'react';
import Recipe from './pages/Recipe';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Favories from './pages/Favories';
import Contact from './pages/Contact';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Recipe/>}/>
      <Route path="/favories" element={<Favories/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
};


export default App;