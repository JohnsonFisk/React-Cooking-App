import React from 'react';

const Card = ({ recipe }) => {
    // Limiter à 3 éléments
    const limitedDiets = recipe.diets.slice(0, 3);
    const limitedDishTypes = recipe.dishTypes.slice(0, 3);

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={"Photo" + recipe.title} />
            <div className="info">
                <h2>{recipe.title}</h2>
                <p className='diete'>{limitedDiets.join(", ")}</p>
                <p className='lunch'>{limitedDishTypes.join(" - ")}</p>
                <p className='score'>Avis : {parseInt(recipe.spoonacularScore)}/100</p>
            </div>
        </div>
    );
};

export default Card;
