import React from 'react';
import Carousel from './Caroussel';
import Header from './Header';

const Home = () => {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

    return (
        <div className="container">
            <Header/> 
            <Carousel category="entree" apiKey={apiKey} />
            <Carousel category="main course" apiKey={apiKey} />
            <Carousel category="dessert" apiKey={apiKey} />
            <Carousel category="drink" apiKey={apiKey} />
        </div>
    );
};

export default Home;
