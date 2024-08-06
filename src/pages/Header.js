import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="leftPart"><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14"><path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" d="M2.5 13.5h9m1.93-10.1a2.49 2.49 0 0 0-4.09-1.26a2.49 2.49 0 0 0-4.68 0A2.49 2.49 0 0 0 .57 3.4A2.51 2.51 0 0 0 2.5 6.45V10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.45a2.51 2.51 0 0 0 1.93-3.05ZM2.5 8.5h9" /></svg> &nbsp;</span>Cooking App</h1>
      <nav className="rightPart">
        <div className="nav-container">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Acceuil</li>
          </NavLink>
          <NavLink
            to="/favories"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Mes recettes</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Contact us</li>
          </NavLink>
          <span>|</span>
          <div className="search-container">
            <input
              type="text"
              id="search"
              className="search"
              placeholder="Search for a recipe"
            />
            <button type="submit" className="search-button"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48M38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74" /></svg></button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
