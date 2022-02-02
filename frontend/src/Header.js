import React from 'react';
//import backgroundVideo from './test.mp4';

const Header = () => {
  return (
    <div className="Header">
        <div>
            <p><b>Wristable</b></p>
            <p><b>BY</b> WRIST AFICIONADO</p>
        </div> 
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