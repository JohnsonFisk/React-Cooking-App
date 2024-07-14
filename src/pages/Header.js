import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <h1>Cooking App</h1>
      <nav>
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
          <input
            type="text"
            id="search"
            className="search"
            placeholder="Search for a recipe"
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
