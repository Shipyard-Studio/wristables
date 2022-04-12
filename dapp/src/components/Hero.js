import React from 'react';
import Header from './Header';
import Watch from './Watch'
import Video from './Video'


import '../style/Hero.css'

const Hero = ({props}) => {

    return (
        <div className='hero h-full bg-black'>
            {/* <Watch /> */}
            <Header walletAddress={props.walletAddress} connect={props.connect} pageWidth={props.pageWidth}/>
            <div className='flex flex-col justify-between m-auto h-5/6 w-full pt-10'>
                <div className='big-text text-center z-10 noselect'>
                    Wrist Aficionado<br/>Watch Club.
                </div>
            <Video />
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                    <a href='https://discord.com/invite/cJpYAvJhTG' className='whitespace-nowrap ease-in ease-out duration-300 hover:underline-offset-2  mx-auto lg:mx-2  lg:mt-0 m-auto lg:m-none  w-10/12 lg:w-1/2 md:mt-5 bg-cover text-center text-center border-2 py-2 lg:py-5 hover:cursor-pointer' target='_blank' alt='discord link'>JOIN US ON DISCORD</a>
                    <div 
                    onClick={null} // disabled
                    // onClick={props.connect} //for live site
                    // className='cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-2/5 md:mt-5 bg-cover text-center  hover:bg-lime-400 text-center border-2 py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                    className='whitespace-nowrap hover:cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                        {props.walletAddress.length > 0 ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : 'Minting April 2022'}
                        </div>
                    <a onClick={props.openModal} className='whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 hover:cursor-pointer' href="https://wristaficionado.com/" target="_blank" rel="noreferrer" alt='boutique link' >Visit Boutique</a>
                    <div onClick={props.openModal} className='whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='piece unique' >Piece Unique Studio</div>
                    <div className='m-auto pb-2'>Luxury</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum nulla. Sed porttitor ipsum odio, in condimentum nunc vehicula in. Etiam eget accumsan turpis. Pellentesque habitant morbi tristique senectus et netus.</div>
                    <div className='m-auto pb-2'>Excellence</div>
                    <div className='pb-10'>>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu ipsum nulla. Sed porttitor ipsum odio, in condimentum nunc vehicula in. Etiam eget accumsan turpis. Pellentesque habitant morbi tristique senectus et netus.</div>
                </div>
            </div>
        </div>
    )

}

export default Hero