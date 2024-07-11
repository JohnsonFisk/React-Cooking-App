import React, { useEffect, useState } from "react";
import axios from 'axios';

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
    <div className="recipe-container">
      <div className="search-container">
        <input
          type="text"
          id="search"
          placeholder="Search for a recipe"
        />
      </div>
      <div className="recipe"></div>
    </div>
  );
};

export default Recipe;
