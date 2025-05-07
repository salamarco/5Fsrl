import { BsGithub } from "react-icons/bs";
import {FaLink } from "react-icons/fa";
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='logo-section'>
        <img src="assets/logo5F.png"/> 
      </div>
      <div className='link-section'>
        <ul>
          <div>
            <FaLink />
            <li><a href="https://www.isarchimede.edu.it/">ITIS Archimede site</a></li>
          </div>
          <div>
            <BsGithub/>
            <li><a href="https://github.com/salamarco/5Fsrl"> Project repository</a></li>
          </div>
        </ul>
      </div>
    </div>
    
  )
}

export default Footer;
