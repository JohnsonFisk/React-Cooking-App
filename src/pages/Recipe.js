import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Card from "../components/Card";
const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?number=24&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      )
      .then((res) => setRecipes(res.data.recipes));
  }, []);

  return (
    <div>
      <Header />
      <div className="recipe-container">
        <div className="sort-container">
          <li>Lunch</li>
          <li>Dish</li>
          <li>Dinner</li>
          <li>Desserts</li>
          <li>Snack</li>
          <li>Beverage</li>
          <li>Bangers</li>
        </div>
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Card recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
