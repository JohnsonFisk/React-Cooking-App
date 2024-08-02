import React from 'react';
import Recipe from './pages/Recipe';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Favories from './pages/Favories';
import Contact from './pages/Contact';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/favories" element={<Favories/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
};


export default App;