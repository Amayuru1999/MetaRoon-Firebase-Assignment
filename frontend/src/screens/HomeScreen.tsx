import React from 'react';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
    return (
        <div className="home-screen">
            <button className="home-button">Authentication</button>
            <button className="home-button">FireStore</button>
            <button className="home-button">Storage</button>
        </div>
    );
}

export default HomeScreen;
