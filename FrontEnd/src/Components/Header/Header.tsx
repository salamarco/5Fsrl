import React from 'react';
import './Header.css'
import Signin from '../../assets/log-in.png';
import { Link } from 'react-router';

interface props_header {
    animation?: boolean
}

const Header: React.FC<props_header> = ({animation}) => {
    return (
        (animation ? (
            <header>
            <div className='container'>
                <nav className='navbar'>
                    <ul className='nav-list'>
                        <Link to='/' style={{textDecoration:'none'}}><li className='Home'>Home</li></Link>
                        <Link to='/About' style={{textDecoration:'none'}}><li className='About'>About</li></Link>
                        <Link to='/Help' style={{textDecoration:'none'}}><li className='Help'>Help</li></Link>
                        <Link to='/AccessPage'  style={{textDecoration:'none'}}><li className='Start'>Get Started <img className='sign-in' src={Signin}></img></li></Link>
                    </ul>
                </nav>
            </div>
        </header>

        ): (
            <header>
            <div className='container'>
                <nav className='navbar'>
                    <ul className='nav-list-2'>
                        <Link to='/' style={{textDecoration:'none'}}><li className='Home'>Home</li></Link>
                        <Link to='/About' style={{textDecoration:'none'}}><li className='About'>About</li></Link>
                        <Link to='/Help' style={{textDecoration:'none'}}><li className='Help'>Help</li></Link>
                        <Link to='/AccessPage'  style={{textDecoration:'none'}}><li className='Start'>Get Started <img className='sign-in' src={Signin}></img></li></Link>
                    </ul>
                </nav>
            </div>
        </header>
        )   
    )
    )
};

export default Header;