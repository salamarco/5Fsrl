import React from 'react';
import './Header.css';
import Signin from '../../assets/log-in.png';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../../Contexts/User_context/User_context';
import { IoArrowRedoOutline,IoPersonCircleSharp } from "react-icons/io5";


interface props_header {
    animation?: boolean;
    isDone?: boolean;
}

const Header: React.FC<props_header> = ({ animation, isDone }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const{state} = useAuth()

    // Funzione per controllare se una sezione dell'header è attiva
    const isActive = (path: string) => currentPath === path ? 'nav-link active' : 'nav-link';

    //Funzione per vedere se l'animazione dell'header deve essere effettuata -> nav-list nel css ha l'animazione, nav-list-2 no
    const navClass = animation ? (isDone ? 'nav-list-2' : 'nav-list') : 'nav-list-2';

    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <ul className={navClass}>
                        <li className={isActive('/')}>
                            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                        </li>
                        <li className={isActive('/About')}>
                            <Link to="/About" style={{ textDecoration: 'none' }}>About</Link>
                        </li>
                        <li className={isActive('/Help')}>
                            <Link to="/Help" style={{ textDecoration: 'none' }}>Help</Link>
                        </li>
                        {(state.isLoggedIn ?(
                            <div id='section-post-LogIn'>
                                <div id='button-for-application'>
                                    <Link to="/Dashboard">
                                        <button>
                                            <IoArrowRedoOutline />
                                        </button>
                                    </Link>
                                </div>
                                <div id='section-for-account'>
                                    <div id='data-account'>
                                        <p>{(state.userData ? state.userData.personal_data.username : "ERROR DATA")}</p>
                                        <div>
                                            <p>{(state.userData ? state.userData.school_data.indirizzo : "ERROR DATA")}</p>
                                            <p>{(state.userData ? state.userData.school_data.classe : "ERROR DATA")}</p>
                                        </div>
                                    </div>
                                    
                                    <div id='button-for-manage-account'>
                                        <Link to="/ManageAccount">
                                            <button>
                                                <IoPersonCircleSharp />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <li className={isActive('/AccessPage')}>
                                <Link to="/AccessPage" style={{ textDecoration: 'none' }}>
                                    Get Started <img className="sign-in" src={Signin} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;