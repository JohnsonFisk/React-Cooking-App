import React from 'react';

const Card = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={"Photo" + recipe.title} />
            <div className="info">
                <p>Temps de cuisson : {recipe.cookingTime} minutes</p>
                {/* Ajoutez d'autres informations ici */}
            </div>
        </div>
    );
};

export default Card;