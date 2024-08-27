import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    // Fonction pour récupérer les détails de la recette, avec mise en cache
    const fetchRecipeDetails = useCallback(async () => {
        // Vérifier si les détails de la recette sont déjà dans le cache
        const cachedRecipe = localStorage.getItem(`recipe-${id}`);
        if (cachedRecipe) {
            setRecipe(JSON.parse(cachedRecipe));
            return;
        }

        // Si pas dans le cache, faire une requête API pour les obtenir
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            );
            setRecipe(response.data);

            // Stocker les détails de la recette dans le cache
            localStorage.setItem(`recipe-${id}`, JSON.stringify(response.data));
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la recette :", error);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    if (!recipe) {
        return <p>Chargement des détails de la recette...</p>;
    }

    return (
        <div>
            <Header />
            <div className="recipe-details">
                <div className="recipe-header">
                    <div className="recipe-image">
                        <img src={recipe.image} alt={recipe.title} />
                    </div>
                    <div className="recipe-info">
                        <h1>{recipe.title}</h1>
                        <ul>
                            {recipe.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

                    {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
                        <div className="analyzed-instructions">
                            {recipe.analyzedInstructions[0].steps.map((step) => (
                                <div key={step.number} className="instruction-step">
                                    <h4>Step {step.number}</h4>
                                    <p>{step.step}</p>
                                    {step.ingredients && step.ingredients.length > 0 && (
                                        <div className="ingredients-list">
                                            <strong>Ingredients:</strong>
                                            <ul>
                                                {step.ingredients.map((ingredient) => (
                                                    <li key={ingredient.id}>{ingredient.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
