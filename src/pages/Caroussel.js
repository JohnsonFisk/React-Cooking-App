import React, { useState, useEffect } from 'react';

const Carousel = ({ category, apiKey }) => {
    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        if (!category || !apiKey) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=7&tags=${category}&apiKey=${apiKey}`);
                const data = await response.json();
                console.log(data); // Affichez les données pour voir ce qui est disponible
                if (data && data.recipes) {
                    const formattedData = data.recipes.map(recipe => ({
                        id: recipe.id,
                        image: recipe.image,
                        title: recipe.title,
                        subtitle: `${recipe.readyInMinutes}`,
                    }));
                    setCarouselItems(formattedData);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du carrousel :', error);
            }
        };

        fetchData();
    }, [category, apiKey]); // Dépend de la catégorie et de l'apiKey

    const createCarouselItem = (item) => (
        <div key={item.id} className="carousel--item">
            <img className="carousel--item__img" src={item.image} alt={item.title} />
            <div className="carousel--item__details">
                <p className="carousel--item__details--title">{item.title}</p>
                <p className="carousel--item__details--subtitle"><span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8H11v6l4.75 2.85l.75-1.23l-4-2.37zm4.837-6.19l4.607 3.845l-1.28 1.535l-4.61-3.843zm-10.674 0l1.282 1.536L3.337 7.19l-1.28-1.536zM12 4a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 4m0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7"/></svg></span> {item.subtitle}</p>
            </div>
        </div>
    );

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
