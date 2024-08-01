import React from 'react';

const Card = ({ recipe }) => {
    // Limiter à 3 éléments
    const limitedDishTypes = recipe.dishTypes.slice(0, 3);
    const scoreOutOfTen = (parseInt(recipe.spoonacularScore) / 10).toFixed(1);


    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={"Photo" + recipe.title} />
            <div className="info"> 
    <div className="coeur">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/></svg></span>
    </div>
    <h2>{recipe.title}</h2>
    <p className='lunch'>{limitedDishTypes.join(" - ")}</p>
    <p className='score'>
        Avis : {scoreOutOfTen}/10
        <span className='star'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#fbff00" d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"/>
            </svg>
        </span>
    </p>
</div>

        </div>
    );
};

export default Card;
