import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.searchQuery || ""; 

  const fetchRecipes = useCallback((category, page, query) => {
    let url;

    if (query && query.trim() !== "") {
      url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=24&page=${page}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;
    } else {
      const categoryParam = category ? `&tags=${category}` : "";
      url = `https://api.spoonacular.com/recipes/random?number=24${categoryParam}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;
    }

    axios
      .get(url)
      .then((res) => {
        if (query && query.trim() !== "") {
          setRecipes(res.data.results || []);
        } else {
          setRecipes((prevRecipes) => [...prevRecipes, ...res.data.recipes]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setRecipes([]);
      setSelectedCategory(""); 
    } else if (searchQuery && searchQuery.trim() !== "") {
      fetchRecipes("", page, searchQuery);
    } else {
      fetchRecipes(selectedCategory, page);
    }
  }, [selectedCategory, page, searchQuery, fetchRecipes]);
  

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.dishTypes.includes(selectedCategory))
    : recipes;

  return (
    <div>
      <div className="recipe-container">
        {!searchQuery && (
          <div className="sort-container">
            <li onClick={() => setSelectedCategory(selectedCategory === "breakfast" ? "" : "breakfast")} className={selectedCategory === "breakfast" ? "active" : ""}>Breakfast</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "lunch" ? "" : "lunch")} className={selectedCategory === "lunch" ? "active" : ""}>Lunch</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "dinner" ? "" : "dinner")} className={selectedCategory === "dinner" ? "active" : ""}>Dinner</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "dessert" ? "" : "dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "fingerfood" ? "" : "fingerfood")} className={selectedCategory === "fingerfood" ? "active" : ""}>Fingerfood</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "snack" ? "" : "snack")} className={selectedCategory === "snack" ? "active" : ""}>Snack</li>
            <li onClick={() => setSelectedCategory(selectedCategory === "beverage" ? "" : "beverage")} className={selectedCategory === "beverage" ? "active" : ""}>Beverage</li>
          </div>
        )}
        <h1>{searchQuery ? `Résultats de recherche pour : ${searchQuery}` : ""}</h1> {/* Titre conditionnel */}
        {filteredRecipes.map((recipe, index) => (
          <div className="recipe-card" key={`${recipe.id}-${index}`}>
            <Card recipe={recipe} />
          </div>
        ))}
        <div className="more-container">
          <button id="more" onClick={() => setPage((prevPage) => prevPage + 1)}>
            Voir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
