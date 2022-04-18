import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, animateScroll as scroll } from "react-scroll";
import '../style/Sidebar.css';

const Sidebar = () => {
  return (
    <Menu customBurgerIcon={ <img src="/assets/Menu Icon.png" /> }>
      <a href="https://wristaficionado.com/" target='_blank' rel="noreferrer" className='menu-item text-center px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>Visit Boutique</a>
      
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
      duration={500}>
      Roadmap
      </Link>

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