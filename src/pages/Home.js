import React from "react";
import Carousel from "./Caroussel";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Recipe from "./Recipe";

const Home = () => {
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  return (
    <div className="container">
      <Header />
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
            <Carousel category="entree" apiKey={apiKey} />
            <Carousel category="main course" apiKey={apiKey} />
            <Carousel category="dessert" apiKey={apiKey} />
            <Carousel category="drink" apiKey={apiKey} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
