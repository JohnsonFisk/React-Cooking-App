import React from 'react';
import Carousel from './Caroussel';
import Header from './Header';

const Home = () => {
    return (
        <div className="container">
            <Header/> 
            <Carousel />
        </div>
    );
};

export default Home;
