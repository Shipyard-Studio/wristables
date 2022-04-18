import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, animateScroll as scroll } from "react-scroll";
import '../style/Sidebar.css';

const Sidebar = () => {
  return (
    <Menu customBurgerIcon={ <img src="/assets/Menu Icon.png" /> }>
      
    <img className='w-3/5 bm-center' src='/WAlogo.png' alt='wawc logo'/>

      <Link
      to="home"
      activeClass="active"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}>
      Home
      </Link>

      <Link
      to="about"
      activeClass="active"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}>
      About
      </Link>

      <Link
      to="utility"
      activeClass="active"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}>
      Utility
      </Link>

      <Link
      to="events"
      activeClass="active"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}>
      Events
      </Link>

      <Link
      to="roadmap"
      activeClass="active"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      >
      Roadmap
      </Link>

    <a href="https://wristaficionado.com/" target='_blank' rel="noreferrer" className='bm-center hover-invert whitespace-nowrap ease-in ease-out duration-300 hover:underline-offset-2 m-auto w-10/12 bg-cover text-center border-2 py-2 lg:py-5 hover:cursor-pointer z-10'>Visit Boutique</a>

      <div className='' style={{display: 'flex !important', flexDirection: 'row'}}>
        <a href="https://twitter.com/wristaficionado/" className='m-auto menu-item z-10 invert' target="_blank" alt="discord" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/discord.png'} /></a>
        <a href="https://twitter.com/wristaficionado/" className='m-auto menu-item z-10 invert' target="_blank" alt="twitter" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/twitter.png'} /></a>
        <a href="https://instagram.com/wristaficionado/" className='m-auto menu-item z-10 invert' target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/instagram.png'} /></a>
        <a href="https://instagram.com/wristaficionado/" className='m-auto menu-item z-10 invert' target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/youtube.jpeg'} /></a>
        <a href="https://www.tiktok.com/@wristaficionado" className='m-auto menu-item z-10' target="_blank" alt="tiktok" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/tiktok.webp'} /></a>
      </div>

    </Menu>
  );
};

export default Sidebar;