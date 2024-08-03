import React, { useState, useEffect } from 'react';

const Carousel = ({ category, apiKey }) => {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        if (!category || !apiKey) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=7&tags=${category}&apiKey=${apiKey}`);
                const data = await response.json();
                if (data && data.recipes) {
                    const formattedData = data.recipes.map(recipe => ({
                        id: recipe.id,
                        image: recipe.image,
                        title: recipe.title,
                        subtitle: `Ready in ${recipe.readyInMinutes} minutes`,
                    }));
                    setCarouselItems(formattedData);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du carrousel :', error);
            }
        };

        fetchData();
    }, [category, apiKey]); // Dépend de la catégorie et de l'apiKey

    // Fonction pour créer un élément du carrousel
    const createCarouselItem = (item) => (
        <div key={item.id} className="carousel--item">
            <img className="carousel--item__img" src={item.image} alt={item.title} />
            <div className="carousel--item__details">
                <p className="carousel--item__details--title">{item.title}</p>
                <p className="carousel--item__details--subtitle">{item.subtitle}</p>
            </div>
        </div>
    );

    // Vérifiez que la catégorie est définie avant de l'utiliser
    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    return (
        <div className="container">
            <h1>{capitalizedCategory}</h1>
            <div className="carousel__container">
                {Array.isArray(carouselItems) && carouselItems.map((item) => createCarouselItem(item))}
            </div>
            <button className='discovered'>Discover our {capitalizedCategory}</button>
        </div>
    );
};

export default Carousel;
