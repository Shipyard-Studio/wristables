import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../style/Sidebar.css';

const Sidebar = () => {
  return (
    <Menu>
      <a href="https://wristaficionado.com/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>Opensea</a>
                <a href="https://wristaficionado.com/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-yellow-600 rounded-full hover:bg-yellow-600 hover:cursor-pointer z-10'>Rarible</a>
                <a href="https://wristaficionado.com/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-emerald-600 rounded-full hover:bg-emerald-600 hover:cursor-pointer z-10'>LooksRare</a>
      <div className='menu-item text-center px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>Visit Boutique</div>
      <div className='' style={{display: 'flex !important', flexDirection: 'row'}}>
        <a href="https://www.tiktok.com/@wristaficionado" className='m-auto menu-item z-10' target="_blank" alt="tiktok" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/TikTok-Logo.png'} /></a>
        <a href="https://instagram.com/wristaficionado/" className='m-auto menu-item z-10' target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/InstagramLogo.webp'} /></a>
        <a href="https://twitter.com/wristaficionado/" className='m-auto menu-item z-10' target="_blank" alt="twitter" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/TwitterLogo.webp'} /></a>
      </div>

    </Menu>
  );
};

export default Sidebar;