import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Card from "../components/Card";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();


  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location]);

  useEffect(() => {
    fetchRecipes(selectedCategory, page); 
  }, [selectedCategory, page]);

  const fetchRecipes = (category, page) => {
    const categoryParam = category ? `&tags=${category}` : "";
    const url = `https://api.spoonacular.com/recipes/random?number=24&page=${page}${categoryParam}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;
    
    axios.get(url)
      .then((res) => setRecipes((prevRecipes) => [...prevRecipes, ...res.data.recipes]))
      .catch((err) => console.error(err));
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.dishTypes.includes(selectedCategory))
    : recipes;

  return (
    <div>
      <Header />
      <div className="recipe-container">
        <div className="sort-container">
          <li onClick={() => setSelectedCategory(selectedCategory === "breakfast" ? "" : "breakfast")}className={selectedCategory === "breakfast" ? "active" : ""}>Breakfast</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "lunch" ? "" : "lunch")} className={selectedCategory === "lunch" ? "active" : ""}>Lunch</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "dinner" ? "" : "dinner")} className={selectedCategory === "dinner" ? "active" : ""}>Dinner</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "dessert" ? "" : "dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "fingerfood"?"":"fingerfood")}className={selectedCategory === "fingerfood" ? "active" : ""}>Fingerfood</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "snack" ? "" : "snack")} className={selectedCategory === "snack" ? "active" : ""}>Snack</li>
          <li onClick={() => setSelectedCategory(selectedCategory === "beverage" ? "" : "beverage")} className={selectedCategory === "beverage" ? "active" : ""}>Beverage</li>
        </div>
        {filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Card recipe={recipe} />
          </div>
        ))}
        <div className="more-container">
          <button id="more" onClick={() => {
            setPage(prevPage => prevPage + 1);
          }}>See more</button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
