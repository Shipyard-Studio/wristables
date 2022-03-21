import React from 'react';
import WALogo from '../WAlogo.png'; //neccessary evil idk why
import '../style/Header.css';
//import backgroundVideo from './test.mp4';

function Header ({walletAddress, connect, pageWidth}) {
  return (
    <div className="header z-10">
        <div className='nav-container z-10'>
            {window.innerWidth > 950? 
            <div className='nav-logo-flex z-10 mr-auto ml-2'>
                <a href="https://opensea.io/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>Opensea</a>
                <a href="https://rarible.com/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-yellow-600 rounded-full hover:bg-yellow-600 hover:cursor-pointer z-10'>Rarible</a>
                <a href="https://looksrare.org/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-emerald-600 rounded-full hover:bg-emerald-600 hover:cursor-pointer z-10'>LooksRare</a>
            </div>
            :
            <div></div>
        }
             <img className='wa-logo z-10 mt-5 lg:mt-0 mx-auto' src={WALogo} alt='wrist afficianado logo'/>
            {window.innerWidth > 950? 
            <div className='nav-logo-flex z-10 ml-auto mr-2'>
                <div onClick={connect} style={walletAddress.length > 0 ? {color: 'white'} : {color: 'rgb(24 24 27'}} className='ease-in ease-out duration-300 px-4 py-2 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>
                {walletAddress.length > 0 ? `${walletAddress.slice(0,5)}...${walletAddress.slice(-3)}` :
                '0x000...000'
                }</div>
                <a href="https://wristaficionado.com/" target='_blank' className='ease-in ease-out duration-300 mx-2 px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>Visit Boutique</a>
                <a href="https://www.tiktok.com/@wristaficionado" className='z-10' target="_blank" alt="tiktok" rel="noreferrer"><img className="nav-logos mx-2" src={process.env.PUBLIC_URL + '/TikTok-Logo.png'} /></a>
                <a href="https://instagram.com/wristaficionado/" className='z-10' target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos mx-2" src={process.env.PUBLIC_URL + '/WASiteAssets/InstagramLogo.webp'} /></a>
                <a href="https://twitter.com/wristaficionado/" className='z-10' target="_blank" alt="twitter" rel="noreferrer"><img className="nav-logos mx-2" src={process.env.PUBLIC_URL + '/WASiteAssets/TwitterLogo.webp'} /></a>
            </div>
            :
            <div></div>
            }

        </div>
        {/* <br /><br /><br /><br /><br /><br />
        <div>
            <h2>The official watch maker of the Metaverse.</h2>
            <h3>Minting March 1st 2022 </h3>
        </div>
        <video autoPlay loop muted id='video'>
            <source type='video/mp4'/>
        </video> 
        <br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
  </div>
  );
};

export default Header;