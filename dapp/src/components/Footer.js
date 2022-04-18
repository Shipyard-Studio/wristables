import React from 'react';

const Footer = () => {
    return (
        <div className="h-auto w-150 p-10 flex flex-col items-center justify-center bg-darkgray">
            <div className='text-center pb-2'>© 2022 Wrist Aficionado Watch Club. All rights reserved.</div>
            <a className='text-center pb-2' href='./TERMS.pdf' target='blank'>Terms and Conditions</a>
            <a href='https://www.imaginationroom.io/' target='_blank' className='text-slate-300'>Made in the Imagination Room</a>
        </div>
      );
};

export default Footer;