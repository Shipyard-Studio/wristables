import React from 'react';
import Header from './Header';
import Watch from './Watch'


import '../style/Hero.css'

const Hero = () => {

    return (
        <div className='hero h-full bg-zinc-900'>
            <Watch />
            <Header />
            <div className='flex flex-col justify-between m-auto h-5/6 w-10/12 pt-10'>
                {/* <div className='small-text text-slate-300'>Welcome to the Wrist Aficianado watch club.</div> */}
                <div className='big-text text-center z-10'>
                    Wrist Aficionado<br/>Watch Club.
                </div>
                    {/* <Watch /> */}
                <div className='flex w-10/12 md:w-10/12 justify-between mx-auto z-10 pb-10'>
                    <a href='https://discord.gg/pcfaMQSFfW' className='w-1/5 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-5 hover:cursor-pointer' target='_blank' alt='discord link'>Discord</a>
                        <div className='w-1/5 md:mt-5 bg-cover text-center bg-lime-500 text-center rounded-full py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Connect Wallet</div>
                    <div className='w-1/5 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Piece Unique Studio</div>

                    {/* <div>Mint</div> */}
                </div>
            </div>
        </div>
    )

}

export default Hero