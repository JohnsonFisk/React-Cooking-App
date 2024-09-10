import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Card from '../components/Card';

const Favories = () => {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = useCallback(() => {
        const cachedFavorites = localStorage.getItem('favRecipe');
        if (cachedFavorites) {
            setFavorites(JSON.parse(cachedFavorites));
            return;
        }

        const storedFavorites = JSON.parse(localStorage.getItem('favRecipe')) || [];

        localStorage.setItem('favRecipe', JSON.stringify(storedFavorites));
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    const removeFav = useCallback((recipeToRemove) => {
        const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeToRemove.id);
        localStorage.setItem('favRecipe', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    }, [favorites]);

    return (
        <div>
            <h1 className='fav-title'>Find your favorite recipes here :</h1>
            <div className="favorites-container">
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <Card
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={true}
                            onRemove={removeFav}
                        />
                    ))
                ) : (
                    <p className='noFav'><span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                    <path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" d="M2.5 13.5h9m1.93-10.1a2.49 2.49 0 0 0-4.09-1.26a2.49 2.49 0 0 0-4.68 0A2.49 2.49 0 0 0 .57 3.4A2.51 2.51 0 0 0 2.5 6.45V10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.45a2.51 2.51 0 0 0 1.93-3.05ZM2.5 8.5h9" />
                  </svg></span> No favorites yet. <span> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
                    <path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" d="M2.5 13.5h9m1.93-10.1a2.49 2.49 0 0 0-4.09-1.26a2.49 2.49 0 0 0-4.68 0A2.49 2.49 0 0 0 .57 3.4A2.51 2.51 0 0 0 2.5 6.45V10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.45a2.51 2.51 0 0 0 1.93-3.05ZM2.5 8.5h9" />
                  </svg></span></p>
                )}
            </div>
        </div>
    );
};

export default Favories;
