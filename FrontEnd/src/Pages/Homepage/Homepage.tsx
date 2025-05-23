import Footer from '../../Components/Footer/Footer.tsx';
import Animated_text from '../../Components/Component_for_text/Typing_text.tsx';
import Box_interactive from '../../Components/Boxes/Box_interactive/Box_interactive.tsx';
import { Link } from 'react-router';
import Data_boxes from './text_for_box.json'
import './Homepage.css'
import Decorations  from './Decorations.tsx';
import Header from '../../Components/Header/Header.tsx';

interface props_homepage {
    isDone?: boolean
  }
  
const Homepage: React.FC<props_homepage> = ({isDone}) => {

  return (
    <div>
        {isDone ? (
            <div className='homepage'>
                <div className='header-section'>
                    <Header animation={false}/>
                </div>
                <div className='initial-section'>
                    <div className='bg-decoration'>
                        <Decorations />

                        <div className='welcome'>
                            <Animated_text
                                html_element='h2'
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

                        <div className='Title'> <h3> Features </h3></div>
                        <div className='main-section-func'>
                            {Data_boxes.data.map((data,dataIndex) => (
                                <Box_interactive 
                                key={dataIndex}
                                title={data.title}
                                sub_text={data.sub_text}
                                className = {data.styling}
                                />
                            ))}
                       </div>
                    </div>
                </div>
                <div className='footer-section'>
                    <Footer/>
                </div>
            </div>
        ):(
            <div className='homepage'>
                <div className='header-section'>
                    <Header animation={true}/>
                </div>
                <div className='initial-section'>
                    
                    <div className='bg-decoration'>
                        <Decorations />
                
                        <div className='welcome'>
                            <Animated_text
                                html_element='h2'
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
                </div>
                <div className='functionality-section-1'>
                    <div className='Title'> <h3> Features </h3></div>
                    <div className='main-section-func'>
                        {Data_boxes.data.map((data,dataIndex) => (
                            <Box_interactive 
                            key={dataIndex}
                            title={data.title}
                            sub_text={data.sub_text}
                            className = {data.styling}
                            />
                        ))}
                    </div>
                </div>
                <div className='footer-section'>
                    <Footer/>
                </div>
            </div>
        )}
    </div>
  )
}

export default Homepage;
