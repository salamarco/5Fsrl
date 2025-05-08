import { BsGithub } from "react-icons/bs";
import {FaLink } from "react-icons/fa";
import './Footer.css'
import logo5F_bianco from '../../assets/logo5F_bianco.png'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='logo-section'>
      <img src={logo5F_bianco} alt="logo5F_bianco" className='logo5F_bianco' />
      </div>
      <div className='link-section'>
        <ul>
          <div>
            <FaLink/>
            <li><a href="https://www.isarchimede.edu.it/" target="_blank">ITIS Archimede site</a></li>
          </div>
          <div>
            <BsGithub/>
            <li><a href="https://github.com/salamarco/5Fsrl" target="_blank"> Project repository</a></li>
          </div>
        </ul>
      </div>
    </div>
    
  )
}

export default Footer;
