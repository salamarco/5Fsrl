import React from 'react';
import Header from '../../Components/Header/Header.tsx';
import './Help.css';
import {Footer} from '../../Components/Footer/Footer'

const Help: React.FC = () => {
    return (
        <div className="help-page">

            <div className='header-section'>
                <Header animation={false}/>
            </div>
                    <h2>Domande frequenti -- inventiamo -- </h2>

                    <h2>Contatti -- form -- </h2>
                    <Footer />
        </div>
    );
};

export default Help;