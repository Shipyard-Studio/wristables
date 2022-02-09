import React from 'react';
import '../style/Header.css';
//import backgroundVideo from './test.mp4';

function Header ({walletAddress, connect}) {
  return (
    <div className="header">
        <div>
            <h1>Wristable</h1>
            {/* <p><b>BY</b> WRIST AFICIONADO</p> */}
        </div> 
        <div className='nav-logo-flex'>
            <a href="https://discord.com" target="_blank" alt="discord"><img className="nav-logos" src="/discord.png" /></a>
            <a href="https://instagram.com/wristaficionado/" target="_blank" alt="instagram"><img className="nav-logos" src="/instagram.png" /></a>
            <a href="https://twitter.com/wristaficionado/" target="_blank" alt="twitter"><img className="nav-logos" src="/twitter.png" /></a>
        </div>
        {/* <div onClick={connect} className='address'>
        {walletAddress.length > 0 ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` :
        'CONNECT'
        }</div> */}
        <br /><br /><br /><br /><br /><br />
        <div>
            <h2>The official watch maker of the Metaverse.</h2>
            <h3>Minting March 1st 2022 </h3>
        </div>
        <video autoPlay loop muted id='video'>
            <source type='video/mp4'/>
        </video> 
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
  );
};

export default Header;