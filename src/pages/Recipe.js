import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Header from "./Header";
const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?number=20&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      )
      .then((res) => console.log(res));
  }, []);

  return (
    <div>
      <Header />
      <div className="recipe-container">
        <div className="recipe"></div>
      </div>
    </div>
  );
};

export default Recipe;
