import React from 'react';
import './Header.css'
import Signin from '../../assets/log-in.png';

const Header: React.FC = () => {
    return (
        <header>
            <div className='container'>
                <nav className='navbar'>
                    <ul className='nav-list'>
                        <li className='Home'>Home</li>
                        <li className='About'>About</li>
                        <li className='Help'>Help</li>
                        <li className='Start'>Get Started <img className='sign-in' src={Signin}></img></li> 
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;