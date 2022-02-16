import React from 'react';
import Header from './Header';
import '../style/Hero.css'

const Hero = () => {

    return (
        <div className='hero'>
            <Header />
            <div>
                <div className='small-text'>Welcome to the Wrist Aficianado watch club.</div>
                <div className='big-text'>
                    Watch maker of<br/>
                    the <span className='yellow-text'>Metaverse</span><br/>
                    <span className='green-text'>March 5th.</span>
                </div>
                <div className='flex w-2/5 justify-start'>
                    <div>Discord</div>
                    <div>Mint</div>
                </div>
            </div>
        </div>
    )

}

export default Hero