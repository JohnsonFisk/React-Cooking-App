import React from 'react';

const Card = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={"Photo" + recipe.title} />
            <div className="info">
                <h2>{recipe.title}</h2>
                <p className='diete'>Diete : {recipe.diets}</p>
                <p className='lunch'>{recipe.dishTypes.join(" - ")}</p>
                <p className='score'>Avis : {parseInt(recipe.spoonacularScore)}/100</p>
            </div>
        </div>
    );
};

export default Card;