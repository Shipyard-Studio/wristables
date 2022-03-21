import React from 'react';
import Header from './Header';
import Watch from './Watch'
import Video from './Video'


import '../style/Hero.css'

const Hero = ({props}) => {

    return (
        <div className='hero h-full bg-black'>
            {/* <Watch /> */}
            <Video />
            <Header walletAddress={props.walletAddress} connect={props.connect} pageWidth={props.pageWidth}/>
            <div className='flex flex-col justify-between m-auto h-5/6 w-10/12 pt-10'>
                <div className='big-text text-center z-10 noselect'>
                    Wrist Aficionado<br/>Watch Club.
                </div>
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                    <a href='https://discord.com/invite/cJpYAvJhTG' className='whitespace-nowrap ease-in ease-out duration-300 hover:bg-blue-600  mx-auto lg:mx-2 mt-5 lg:mt-0 m-auto lg:m-none  w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' target='_blank' alt='discord link'>Discord</a>
                    <div 
                    onClick={null} // disabled
                    // onClick={props.connect} //for live site
                    // className='cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-2/5 md:mt-5 bg-cover text-center bg-lime-600 hover:bg-lime-400 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                    className='whitespace-nowrap hover:cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-lime-600 hover:bg-neutral-400 text-center rounded-full py-2 lg:py-5' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                        {props.walletAddress.length > 0 ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : 'Minting March 2022'}
                        </div>
                    <div onClick={props.openModal} className='whitespace-nowrap hover:bg-blue-600 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Piece Unique Studio</div>
                </div>
            </div>
        </div>
    )

}

export default Hero