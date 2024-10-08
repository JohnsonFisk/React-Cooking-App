import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ recipe, isFavorite, onRemove }) => {
    const [isFav, setIsFav] = useState(isFavorite);
    const navigate = useNavigate();

    // Vérification que dishTypes existe et est un tableau avant d'utiliser slice
    const limitedDishTypes = Array.isArray(recipe.dishTypes) ? recipe.dishTypes.slice(0, 3) : [];
    const scoreOutOfTen = (parseInt(recipe.spoonacularScore) / 10).toFixed(1);
    const defaultImage = '/assets/images/food-api.jpg';

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favRecipe')) || [];
        setIsFav(favorites.some(fav => fav.id === recipe.id));
    }, [recipe.id]);

    const handleFavClick = () => {
        const favorites = JSON.parse(localStorage.getItem('favRecipe')) || [];
        if (isFav) {
            if (onRemove) onRemove(recipe);
            const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
            localStorage.setItem('favRecipe', JSON.stringify(updatedFavorites));
        } else {
            if (!favorites.some(fav => fav.id === recipe.id)) {
                favorites.push(recipe);
                localStorage.setItem('favRecipe', JSON.stringify(favorites));
            }
        }
        setIsFav(!isFav);
    };

    const handleSeeRecipe = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    return (
        <div className="recipe-card">
            <img src={recipe.image ? recipe.image : defaultImage} alt={recipe.title} />
            <div className="info">
                <div className="coeur">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            onClick={handleFavClick}
                            className={`${isFav ? 'filled animate' : ''}`}
                        >
                            {isFav ? (
                                <path d="M1 4.27L2.28 3L20 20.72L18.73 22l-3.55-3.56l-1.73 1.59L12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5c0-.95.23-1.83.63-2.6zM7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 2.57-1.58 4.82-4.21 7.47L5.27 3.45C5.95 3.16 6.7 3 7.5 3" />
                            ) : (
                                <path d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3" />
                            )}
                        </svg>
                    </span>
                </div>
                <h2>{recipe.title}</h2>
                <div className="see-recipe-container">
                    <button onClick={handleSeeRecipe}>Voir la recette</button>
                </div>
                <div className="footer-card-container">
                    <p className='score'>
                        Avis : {scoreOutOfTen}/10
                        <span className='star'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff700" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z" /></svg>
                        </span>
                    </p>
                    <span>|</span>
                    <p className='time'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8H11v6l4.75 2.85l.75-1.23l-4-2.37zm4.837-6.19l4.607 3.845l-1.28 1.535l-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4m0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7" /></svg>
                        {recipe.readyInMinutes}'min
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
