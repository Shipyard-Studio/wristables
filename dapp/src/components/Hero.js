import React from 'react';
import Header from './Header';
import Watch from './Watch'


import '../style/Hero.css'

const Hero = ({props}) => {

    async function handleClick () {
        if (props.walletAddress.length > 0) {
            await window.contract.connect(window.signer).mint({value: window.ethers.utils.parseEther('0.01')})
        } else {
            props.connect()
        }
    }

    return (
        <div className='hero h-full bg-zinc-900'>
            <Watch />
            <Header walletAddress={props.walletAddress} connect={props.connect} />
            <div className='flex flex-col justify-between m-auto h-5/6 w-10/12 pt-10'>
                <div className='big-text text-center z-10 noselect'>
                    Wrist Aficionado<br/>Watch Club.
                </div>
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                    <a href='https://discord.gg/pcfaMQSFfW' className='whitespace-nowrap ease-in ease-out duration-300 hover:bg-blue-600  mx-auto lg:mx-2 mt-5 lg:mt-0 m-auto lg:m-none  w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' target='_blank' alt='discord link'>Discord</a>
                    <div 
                    onClick={handleClick}
                    className='whitespace-nowrap hover:cursor-pointer ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-lime-600 hover:bg-lime-500 text-center rounded-full py-2 lg:py-5' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                        {props.walletAddress.length > 0 ? `Mint` : 'Connect Wallet'}
                        </div>
                    <div onClick={props.openModal} className='whitespace-nowrap hover:bg-blue-600 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Piece Unique Studio</div>
                </div>
            </div>
        </div>
    )

}

export default Hero