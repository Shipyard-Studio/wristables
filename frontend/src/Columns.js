import React from 'react';

const Columns = () => {
    return (
        <div className="Columns">
          <div class="row">
            <div class="column"><b>MINT</b> <p>Secure your watch<br/>on March 1st 2022</p></div>
            <div class="column"><b>LIMITED</b> <p>Only 8,888 time<br/>pieces will be minted.</p></div>
            <div class="column"><b>TRADEABLE</b> <p>Trade your Wristable among<br/>other watch collectors.</p> </div>
          </div>
          <br /><br /><br /><br /><br /><br /><br />
          <div class="row">
            <div class="column"> <b>CUSTOM</b> <p>Make your piece a<br/>1 of 1 by upgrading to<br/>a custom watch face.</p> </div>
            <div class="column"><b>AVAILABILITY</b> <p>Available exclusively on<br/>OpenSea.</p> </div>
            <div class="column"><b>ROADMAP</b> <p>Click here to view<br/>our roadmap and team.</p> </div>
          </div>
          <br /><br /><br /><br /><br /><br /><br />
        </div>
      );
};

export default Columns;