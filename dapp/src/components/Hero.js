import React from 'react';
import Header from './Header';
import Watch from './Watch'


import '../style/Hero.css'

const Hero = () => {

    return (
        <div className='hero h-full bg-zinc-900'>
            <Header />
            <div className='flex flex-col justify-center m-auto h-full w-10/12 mt-[-100px]'>
                {/* <div className='small-text text-slate-300'>Welcome to the Wrist Aficianado watch club.</div> */}
                <div className='big-text text-center'>
                    Wrist Aficianado<br/>Watch Club.
                </div>
                    <Watch />
                <div className='flex w-10/12 md:w-10/12 justify-between mx-auto'>
                    <a href='https://discord.gg/pcfaMQSFfW' className='w-1/3' target='_blank' alt='discord link'>
                        <div className='w-1/3 md:mt-5 bg-cover text-center' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Discord</div>
                    </a>
                        <div className='w-1/3 md:mt-5 bg-cover text-center' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Connect Wallet</div>
                    <div className='w-1/3 md:mt-5 bg-cover text-center' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Piece Unique Studio</div>

                    {/* <div>Mint</div> */}
                </div>
            </div>
        </div>
    )

}

export default Hero