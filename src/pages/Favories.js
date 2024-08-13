import React, { useState, useEffect } from 'react';
import Header from './Header';
import Card from '../components/Card';

const Favories = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favRecipe')) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFav = (recipeToRemove) => {
        const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeToRemove.id);
        localStorage.setItem('favRecipe', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    }

    return (
        <div>
            <Header />
            <h1 className='fav-title'>Find your favorite recipes here :</h1>
            <div className="favorites-container">
                {favorites.length > 0 ? (
                    favorites.map((recipe, index) => (
                        <Card
                            key={index}
                            recipe={recipe}
                            isFavorite={true}
                            onRemove={removeFav}
                        />
                    ))
                ) : (
                    <p>Aucun favori pour le moment.</p>
                )}
            </div>
        </div>
    );
};

export default Favories;
