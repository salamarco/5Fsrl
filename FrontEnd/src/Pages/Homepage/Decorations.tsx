import { useEffect, useRef } from 'react';
import logo from '../../assets/logo5F.png'
import './Homepage.css'

const colors = ['#0a1f44', '#236ab9', '#b3d9ff'];
const icons = ['🗓️', '🗓️', '📋', '⏰'];

export default function Decorations() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createIcon = (container: HTMLDivElement | null) => {
      if (!container) return;

      const icon = document.createElement('div');
      icon.className = 'icon';
      icon.innerText = icons[Math.floor(Math.random() * icons.length)];
      icon.style.left = Math.random() * 200 + 'px';
      icon.style.color = colors[Math.floor(Math.random() * colors.length)];
      icon.style.animationDuration = `${5 + Math.random() * 3}s`;

      container.appendChild(icon);

      setTimeout(() => {
        container.removeChild(icon);
      }, 7000);
    };

    const interval = setInterval(() => {
      createIcon(leftRef.current);
      createIcon(rightRef.current);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div ref={leftRef} className=" decor left-decor" />
      <div className='logo5F'>
        <img src={logo} alt="logo" className='logo' />
      </div> 
      <div ref={rightRef} className="decor right-decor"/> 
    </>
  );
}