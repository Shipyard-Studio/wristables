import React from 'react';
import Header from './Header';
import '../style/Hero.css'

const Hero = () => {

    return (
        <div className='hero'>
            <Header />
            <div className='ml-32 mt-32'>
                <div className='small-text text-slate-300'>Welcome to the Wrist Aficianado watch club.</div>
                <div className='big-text'>
                    Watch maker of<br/>
                    the <span className='yellow-text'>Metaverse</span><br/>
                    <span className='green-text'>March 5th.</span>
                </div>
                <div className='flex w-1/5 justify-between'>
                    <a href='https://discord.gg/pcfaMQSFfW' target='_blank' alt='discord link'>
                        <img className='mt-5 w-6/12 h-2/12 bg-cover' src='/WASiteAssets/DiscordButton.png' alt='discord button' />
                    </a>
                    {/* <div>Mint</div> */}
                </div>
            </div>
        </div>
    )

}

export default Hero