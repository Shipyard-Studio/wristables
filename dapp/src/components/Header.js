import React from 'react';
import Sidebar from './Sidebar';
import WALogo from '../WAlogo.png'; //neccessary evil idk why
import '../style/Header.css';
//import backgroundVideo from './test.mp4';

function Header ({walletAddress, connect}) {
  return (
    <div className="header">
        <div className='nav-container'>
            <div style={{width: 150, height: 50, marginRight: '2%'}}/>
            <img className='wa-logo' src={WALogo} alt='wrist afficianado logo'/>
            <div className='nav-logo-flex'>
                <a href="https://opensea.io" className='' target="_blank" alt="discord" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/Openseaicon.png'} /></a>
                <a href="https://instagram.com/wristaficionado/" target="_blank" alt="instagram" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/InstagramLogo.png'} /></a>
                <a href="https://twitter.com/wristaficionado/" target="_blank" alt="twitter" rel="noreferrer"><img className="nav-logos" src={process.env.PUBLIC_URL + '/WASiteAssets/TwitterLogo.png'} /></a>
            </div>

            {/* <div onClick={connect} className='address'>
            {walletAddress.length > 0 ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` :
            'CONNECT'
        }</div> */}

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