import Footer from '../../Components/Footer/Footer.tsx';
import Animated_text from '../../Components/Component_for_text/Typing_text.tsx';
import Interactive_box from '../../Components/Interactive_box/Interactive_box.tsx';
import { Link } from 'react-router';
import Data_boxes from './text_for_box.json'
import './Homepage.css'
import Decorations  from './Decorations.tsx';
import Header from '../../Components/Header/Header.tsx';

export const Homepage = () => {
  return (
    
    <div className='homepage'>
        <div className='header-section'>
            <Header animation={true}/>
        </div>
        <div className='initial-section'>
            
            <div className='bg-decoration'><Decorations />
            
                <div className='welcome'>
                    <Animated_text
                        html_element='h2'
                        className=''
                        text= 'Benvenuto in 5F srl !'
                    />
                </div>
                </div>
                <div className='access-button'>
                    <Link to='/AccessPage' style={{textDecoration:'none'}}>
                        <button className='button-access'>
                            Start Now
                        </button>
                    </Link>
                </div>

                
            <div className='functionality-section'>
                <div className='Title'> <h3> Functionality </h3></div>
                <div className='main-section-func'>
                    {Data_boxes.data.map((data,dataIndex) => (
                        <Interactive_box 
                        key={dataIndex}
                        title={data.title}
                        sub_text={data.sub_text}
                        className = {data.styling}
                        />
                    ))}
            </div>
            <div className='subtext-functionality'> 
                <p>Migliora la tua organizzazione degli impegni per goderti un migliore e più lungo tempo libero</p>
            </div>
        </div>
        <div className='about_us-section'>
            <div className='Title'><h3>About us</h3></div>
            <div className='main-section-about'>
                About us ancora da definire in struttura e componenti e anche da implementare e stilizzare

            </div>
        </div>
        <div className='footer-section'>
            <Footer/>
        </div>
    </div>
    </div>
  )
}

export default Homepage;
