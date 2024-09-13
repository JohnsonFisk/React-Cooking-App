import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  function inputResult(e) {
    const inputValue = e.target.value;
    setInputSearch(inputValue);  
  }


  function searchResult() {
    if (!inputSearch.trim()) {
      navigate('/recipe', { state: { searchQuery: "" } });
    } else {
      navigate('/recipe', { state: { searchQuery: inputSearch.trim() } });
    }
  }

  return (
    <div className="header-container">
      <div className="leftPart">
        <NavLink to="/" className="logo-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
          <path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" d="M2.5 13.5h9m1.93-10.1a2.49 2.49 0 0 0-4.09-1.26a2.49 2.49 0 0 0-4.68 0A2.49 2.49 0 0 0 .57 3.4A2.51 2.51 0 0 0 2.5 6.45V10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.45a2.51 2.51 0 0 0 1.93-3.05ZM2.5 8.5h9" />
          </svg>
          <h1>Cooking App</h1>
        </NavLink>
      </div>

      <nav className="rightPart">
        <div className="nav-container">
          <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>Accueil</li>
          </NavLink>
          <NavLink to="/recipe" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>Explorer</li>
          </NavLink>
          <NavLink to="/favories" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>Favoris</li>
          </NavLink>
          <NavLink to="/contact" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>Contact</li>
          </NavLink>
          <div className="search-container">
            <input
              type="text"
              id="search"
              className="search"
              placeholder="Rechercher une recette"
              onChange={inputResult}
            />
            <button type="submit" className="search-button" onClick={searchResult}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"/></svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
