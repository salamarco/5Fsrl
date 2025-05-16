import Header from '../../Components/Header/Header';
import '.././../style.css';
import './About.css';
import {Footer} from '../../Components/Footer/Footer'

const about = () => {
    return (
        <div className='about-page'>
            <div className='header-section'>
                <Header animation={false}/>
            </div>
            <h1>About Us</h1>
            <p>Welcome to the About page!</p>

            <div className='footer-section'>
                <Footer />

            </div>
            
        </div>
    );
};

export default about;