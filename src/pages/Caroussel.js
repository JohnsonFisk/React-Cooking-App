import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const trackRef = useRef(null);
    const slideRefs = useRef([]);

    useEffect(() => {
        axios
            .get(
                `https://api.spoonacular.com/recipes/random?number=24&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            )
            .then((res) => setRecipes(res.data.recipes))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const updateDimensions = () => {
        if (trackRef.current) {
            const trackWidth = trackRef.current.offsetWidth;
            const slidesToShow = window.innerWidth >= 768 ? 2.75 : 1;
            setSlideWidth(trackWidth / slidesToShow);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowLeft") {
            setCurrentIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
        } else if (event.key === "ArrowRight") {
            setCurrentIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1));
        }
    };

    const handleFocus = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (track) {
            const handleTransitionEnd = () => {
                if (slideRefs.current[currentIndex]) {
                    slideRefs.current[currentIndex].focus({ preventScroll: true });
                }
            };
            track.addEventListener("transitionend", handleTransitionEnd);
            return () => track.removeEventListener("transitionend", handleTransitionEnd);
        }
    }, [currentIndex]);

    return (
        <div className="carousel" aria-roledescription="carousel">
            <div className="carousel__nav">
                <button
                    onClick={() => setCurrentIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1))}
                    aria-label="Previous slide"
                    aria-controls="carousel__track"
                    disabled={currentIndex === 0}
                >
                    <span className="icon-arrow-left"></span>
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1))}
                    aria-label="Next slide"
                    aria-controls="carousel__track"
                    disabled={currentIndex === recipes.length - 1}
                >
                    <span className="icon-arrow-right"></span>
                </button>
            </div>
            <div className="carousel__track-container" role="region" aria-live="polite">
                <ul
                    className="carousel__track"
                    id="carousel__track"
                    ref={trackRef}
                    style={{
                        display: "flex",
                        transition: "transform 400ms ease",
                        transform: `translateX(-${currentIndex * (slideWidth + 24)}px)`
                    }}
                >
                    {recipes.map((recipe, index) => (
                        <li
                            className={`carousel__slide ${index === currentIndex ? "active" : ""}`}
                            key={recipe.id}
                            tabIndex="0"
                            aria-hidden={index !== currentIndex}
                            aria-label={`Slide ${index + 1} of ${recipes.length}`}
                            role="group"
                            ref={(el) => (slideRefs.current[index] = el)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => handleFocus(index)}
                            style={{ flex: `0 0 ${slideWidth}px` }}
                        >
                            <img
                                className="carousel__slide-image"
                                src={recipe.image}
                                alt={recipe.title}
                            />
                            <p className="carousel__slide-caption">{recipe.title}</p>
                            <div className="carousel__slide-content">
                                <h2>{recipe.title}</h2>
                                <p>{recipe.summary}</p>
                                <button>View Recipe</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Carousel;
