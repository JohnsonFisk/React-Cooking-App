import React from "react";
import Carousel from "./Caroussel";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  return (
    <div className="container">
      <div className="homepage">
        <header className="hero-section">
          <h1>Welcome to Cooking App, your culinary companion!</h1>
          <p>Turn every meal into a gourmet feast.</p>
          <NavLink to="/recipe">
            <button>Explore our recipes</button>
          </NavLink>{" "}
        </header>
        <section className="categories">
          <h2>Explore by category</h2>
          <div className="category-list">
            <Carousel category="breakfast" apiKey={apiKey} />
            <Carousel category="lunch" apiKey={apiKey} />
            <Carousel category="dessert" apiKey={apiKey} />
            <Carousel category="beverage" apiKey={apiKey} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
