import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
                );
                setRecipe(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la recette :", error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <p>Chargement des détails de la recette...</p>;
    }

    return (
        <div className="recipe-details">
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.summary}</p>
            <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <h3>Instructions</h3>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
    );
};

export default RecipeDetails;
