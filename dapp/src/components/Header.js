import React from 'react';
import WALogo from '../WAlogo.png'; //neccessary evil idk why
import '../style/Header.css';
//import backgroundVideo from './test.mp4';

function Header ({walletAddress, connect, pageWidth}) {
  return (
    <div className="header z-40">
        <div className='nav-container z-40'>
            {pageWidth > 950? 
            <a href="https://wristaficionado.com/" target='_blank' rel="noreferrer" className='ease-in ease-out duration-300 ml-8 px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-40'>Visit Boutique</a>
            :
            <div></div>
            }
             <img className='wa-logo z-40 mt-5 lg:mt-0' src={WALogo} alt='wrist afficianado logo'/>
            {pageWidth > 950? 
            <div className='nav-logo-flex z-40'>
                {/* <div onClick={connect} className='ease-in ease-out duration-300 ml-8 px-4 py-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:cursor-pointer z-10'>
                {walletAddress.length > 0 ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` :
                'CONNECT'
                }</div> */}
                <a href="https://www.tiktok.com/@wristaficionado" className='z-40' target="_blank" alt="tiktok" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/TikTok-Logo.png'} /></a>
                <a href="https://instagram.com/wristaficionado/" className='z-40' target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/InstagramLogo.png'} /></a>
                <a href="https://twitter.com/wristaficionado/" className='z-40' target="_blank" alt="twitter" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/TwitterLogo.png'} /></a>
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