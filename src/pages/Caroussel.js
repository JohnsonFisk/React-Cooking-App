import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const Carousel = ({ category, apiKey }) => {
    const [carouselItems, setCarouselItems] = useState([]);
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!category || !apiKey) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&tags=${category}&apiKey=${apiKey}`);
                const data = await response.json();
                console.log(data);
                if (data && data.recipes) {
                    setCarouselItems(data.recipes);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du carrousel :', error);
            }
        };

        fetchData();
    }, [category, apiKey]);

    const scrollLeft = useCallback(() => {
        carouselRef.current.scrollBy({ left: -800, behavior: 'smooth' }); 
    }, []);

    const scrollRight = useCallback(() => {
        carouselRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }, []);

    const handleDiscoverClick = useCallback(() => {
        navigate('/recipe', { state: { selectedCategory: category } });
    }, [navigate, category]);

    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

    return (
        <div className="container">
            <h1 className="category-title">{capitalizedCategory}</h1>
            <div className="carousel">
                <div className="carousel__arrow carousel__arrow--left" onClick={scrollLeft}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875t-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75t.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388t.375.875t-.375.875z"/></svg></div>
                <div className="carousel__container" ref={carouselRef}>
                    {Array.isArray(carouselItems) && carouselItems.map((recipe) => (
                        <Card key={recipe.id} recipe={recipe} isFavorite={false} />
                    ))}
                </div>
                <div className="carousel__arrow carousel__arrow--right" onClick={scrollRight}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#ffffff" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg></div>
            </div>
            <div className="discovered-container">
                <button className="discovered" onClick={handleDiscoverClick}>
                    Discover our {capitalizedCategory}
                </button>
            </div>
        </div>
    );
};

export default Carousel;
