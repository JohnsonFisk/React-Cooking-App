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
              Rechercher
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
