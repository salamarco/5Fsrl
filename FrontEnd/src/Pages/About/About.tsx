import React from 'react';
import Header from '../../Components/Header/Header';
import '.././../style.css';
import './About.css';

const About: React.FC = () => {
    return (
        <div className='about-page'>

    <div className='header-section'>
            <Header animation={false}/>
        </div>
            <h1>About Us</h1>
            <p>Welcome to the About page!</p>
        </div>
    );
};

export default About;