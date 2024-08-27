import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Card from '../components/Card';

const Favories = () => {
    const [favorites, setFavorites] = useState([]);

    // Fonction pour récupérer les favoris depuis localStorage ou API
    const fetchFavorites = useCallback(() => {
        // Vérifier si les favoris sont déjà dans le cache (localStorage)
        const cachedFavorites = localStorage.getItem('favRecipe');
        if (cachedFavorites) {
            setFavorites(JSON.parse(cachedFavorites));
            return;
        }

        // Si pas dans le cache, on récupère depuis l'API ou autre source
        const storedFavorites = JSON.parse(localStorage.getItem('favRecipe')) || [];
        // Simuler une requête API si nécessaire (ici, c'est un exemple statique)
        // Dans votre cas, vous pourriez faire un appel API pour récupérer les recettes

        // Mettre en cache les résultats dans localStorage
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
            <Header />
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
                    <p>Aucun favori pour le moment.</p>
                )}
            </div>
        </div>
    );
};

export default Favories;
