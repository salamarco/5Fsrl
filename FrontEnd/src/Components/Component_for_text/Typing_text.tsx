import { JSX } from 'react';
import {motion} from 'motion/react'
import './Typining_text.css';

/*
l'interfaccia prende:
- il tag html che deve contenere la scritta (<h2>,<p>,<h3>...)
- className e' usato in caso di uso di Tailwind.js per la gestione della stilizzazione dei componenti
- Text e' il testo che deve essere visualizzato
*/

interface Typing_text_props {
  html_element: keyof JSX.IntrinsicElements;
  className: string;
  text: string;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const Typing_text: React.FC<Typing_text_props> = ({html_element: Wrapper = 'html',className,text}) => {
  return (
    
    <div className='main-section'>
      <motion.span  variants={{
        visible: { transition: { staggerChildren: 0.15 } },
        hidden: {},
        }}
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        <Wrapper className={className}>
          {text.split('').map((char,charIndex)=> (
            <motion.span key={`${char}-${charIndex}`} variants={defaultAnimations} >
              {char}
            </motion.span>
          ))}
        </Wrapper>
      </motion.span>
    </div>
  )
}

export default Typing_text;