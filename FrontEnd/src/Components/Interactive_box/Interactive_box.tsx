import React from 'react';
import { useState } from 'react';
import {motion,AnimatePresence} from 'motion/react'

interface Interactive_box_props{
  title: string;
  sub_text: string;
  className: string;
}

export const Interactive_box: React.FC<Interactive_box_props> = ({title,sub_text,className}) => {
  const[hovered,setIsHovered] = useState(false)

  const contentVariants = {
    initial: { opacity: 0, y: 10 }, // Stato iniziale (leggermente spostato e trasparente)
    animate: { opacity: 1, y: 0 },   // Stato visibile (opaco e in posizione)
    exit: { opacity: 0, y: -10 },   // Stato d'uscita (leggermente spostato e trasparente)
  };

  return (
    <motion.div
    className={className} 
    onHoverStart={()=> setIsHovered(true)}
    onHoverEnd={()=> setIsHovered(false)}
    style={{ position: 'relative' }}
    >
      <AnimatePresence mode= 'wait'>
        {!hovered ? (
            <motion.h2
            key="title" // Chiave univoca per AnimatePresence
            className="title"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y:'-50%' }} // Centratura
            >
              {title}
            </motion.h2>
        ):(
          <motion.p
            key="description" // Chiave univoca per AnimatePresence
            className="description"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y:'-50%' }} // Centratura
          >
            {sub_text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Interactive_box;