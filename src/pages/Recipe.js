import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Card from "../components/Card";
const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.dishTypes.includes(selectedCategory))
    : recipes;

    useEffect(() => {
      if (selectedCategory) {
        axios
          .get(
            `https://api.spoonacular.com/recipes/random?number=24&tags=${selectedCategory}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
          )
          .then((res) => setRecipes(res.data.recipes))
          .catch((err) => console.error(err));
      } else {
        axios
        .get(
          `https://api.spoonacular.com/recipes/random?number=24&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        )
        .then((res) => setRecipes(res.data.recipes));
      }
    }, [selectedCategory]);

  return (
    <div>
      <Header />
      <div className="recipe-container">
        <div className="sort-container">
          <li onClick={() => setSelectedCategory("breakfast")} className={selectedCategory === "breakfast" ? "active" : ""}>Breakfast</li>
          <li onClick={() => setSelectedCategory("lunch")} className={selectedCategory === "lunch" ? "active" : ""}>Lunch</li>
          <li onClick={() => setSelectedCategory("dinner")} className={selectedCategory === "dinner" ? "active" : ""}>Dinner</li>
          <li onClick={() => setSelectedCategory("desserts")} className={selectedCategory === "desserts" ? "active" : ""}>Desserts</li>
          <li onClick={() => setSelectedCategory("fingerfood")} className={selectedCategory === "fingerfood" ? "active" : ""}>Fingerfood</li>
          <li onClick={() => setSelectedCategory("snack")} className={selectedCategory === "snack" ? "active" : ""}>Snack</li>
          <li onClick={() => setSelectedCategory("beverage")} className={selectedCategory === "beverage" ? "active" : ""}>Beverage</li>
        </div>
        {filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Card recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
