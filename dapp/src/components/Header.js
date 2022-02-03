import React from 'react';
import '../style/Header.css';
//import backgroundVideo from './test.mp4';

function Header ({walletAddress, connect}) {
  return (
    <div className="header">
        <div>
            <p><b>Wristable</b></p>
            <p><b>BY</b> WRIST AFICIONADO</p>
        </div> 
        <div onClick={connect} className='address'>
        {walletAddress.length > 0 ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` :
        'CONNECT'
        }</div>
        <br /><br /><br /><br /><br /><br />
        <div>
            <h1>The official watch maker of the Metaverse.</h1>
            <h2>Minting March 1st 2022 </h2>
        </div>
        <video autoPlay loop muted id='video'>
            <source type='video/mp4'/>
        </video> 
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
  );
};

export default Header;