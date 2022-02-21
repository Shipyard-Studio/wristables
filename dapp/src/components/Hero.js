import React from 'react';
import Header from './Header';
import Watch from './Watch'


import '../style/Hero.css'

const Hero = () => {

    return (
        <div className='hero h-full'>
            <Header />
            <div className='flex flex-col justify-center m-auto h-full w-10/12 mt-[-100px]'>
                <div className='small-text text-slate-300'>Welcome to the Wrist Aficianado watch club.</div>
                <div className='big-text'>
                    Watch maker of
                    {console.log(window.innerWidth)}
                    {window.innerWidth < 800 ? <> </> : <br/>}
                    the <span className='yellow-text'>Metaverse</span>
                    <br/>
                    <span className='green-text'>March 5th.</span>
                </div>
                <div className='flex w-4/12 md:w-2/12 justify-between'>
                    <a href='https://discord.gg/pcfaMQSFfW' target='_blank' alt='discord link'>
                        <img className='md:mt-5 bg-cover' src='/WASiteAssets/DiscordButton.png' alt='discord button' />
                    </a>

                    <Watch />
                    
                    {/* <div>Mint</div> */}
                </div>
            </div>
        </div>
    )

}

export default Hero