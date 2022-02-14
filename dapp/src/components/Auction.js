import React from 'react';
import '../style/Auction.css';

const Auction = () => {
    return (
     <div className="auction">
        <div class="bottom">
            <div>buy now</div>
        </div>
        <div class="gallery">
            <img src="/tempWatch.png" alt="gallery watch"/>
        </div>
        <div class="info">
            Information about the token goes here
        </div>
    </div>
      );
};

export default Auction;