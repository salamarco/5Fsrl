import { BsGithub } from "react-icons/bs";
import {FaLink } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='logo-section'>
        Sezione dedicata al logo dell'applicazione
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
