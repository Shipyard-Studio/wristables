import React, { useState } from 'react';
import Header from './Header';
import Video from './Video';
import Featured from './Featured';
import MintConfirmation from './MintConfirmation'
import {getProof, verify} from '../utils/merkle-tree'

import '../style/Hero.css'

const Hero = ({props}) => {

    const [error, setError] = useState(undefined)
    const [txHash, setTxHash] = useState(undefined)
    const [reciept, setReceipt] = useState(undefined)
    const [mintPending, setMintPending] = useState(undefined)
    const [verified, setVerified] = useState(undefined)
    const [supply, setSupply] = useState(undefined)

    async function mint () {
        return await props.contract.connect(props.signer).mint({value: props.ethers.utils.parseEther('0.25')})
    }

    function verifyWallet () {
        let proof = getProof(props.walletAddress)
        let v = verify(proof, props.walletAddress)
        setVerified(v)
    }

    async function redeem () {
        let proof = getProof(props.walletAddress)
        await props.contract.connect(props.signer).redeem(proof, {value: props.ethers.utils.parseEther('0.25')})
    }

    async function handleClick () {
        if (props.walletAddress.length > 0) {
            if (supply !== 500) {
                if (!txHash && !error) {
                    
                    setMintPending(true)
                    try {
                        // let tx = await redeem() 
                        let tx = await mint() //switch to mint when the public mint goes live
                        setTxHash(tx.hash);
                        
                        const _receipt = await tx.wait();
                        setError(false)
                        setReceipt(_receipt)
                    } catch (err) {
                        console.error('code: ', err.code)
                        setError(err)
                    }
                }
            }
        } else {
            await props.connect()
        }
    }

    function mintText () {
       return supply === 500 ? 'Sold Out' : 'Mint';
    }

    async function getCurrentSupply () {
        if (props.walletAddress.length > 0 && props.chainId === 1) {

            let _supply = await props.contract.tokenSupply()
            _supply = _supply.toString()
            for (let i = _supply.length; i < 3; i++) {
                _supply = '0' + _supply
            }
            setSupply(_supply)
        }
    }

    getCurrentSupply()



    return (
        <div className='hero h-full' id='home'>
            {/* <Watch /> */}
            <Header walletAddress={props.walletAddress} connect={props.connect} pageWidth={props.pageWidth}/>
            <Featured />
            <div className='flex flex-col justify-between m-auto h-5/6 w-full pt-10'>
                <div className='lg:ml-10 lg:text-left md:ml-10 md:text-left big-text text-center z-10 noselect'>
                    <span className='huge-text'>Wrist Aficionado</span><br/>{props.pageWidth > 950 ? '' : 'Watch Club'}
                </div>
                <div className='lg:flex md:flex'>
                {props.pageWidth < 950 ? <Video /> : <></>}
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 md:1/2 justify-between mx-auto z-0 pb-0 lg:pb-10 md:pb-10'>
                    <div className='lg:flex-col md:flex-col'>
                    {props.pageWidth > 950 ? <></> :
                        <div className='flex flex-col items-center '>
                            {props.walletAddress.length > 0 && props.chainId === 1 ?
                    <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-0 pb-0 lg:pb-10 pb-10 bg-neutral-900/50'>
                        <div className='m-auto bg-neutral-900/50'>
                            <span className='text-lime-600 bigger-medium-text'>{supply ? `${supply }` : '000'}</span>
                            <span className='bigger-medium-text'> / 500</span>
                        </div>
                    </div>
                :
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-0 pb-0 pb-10'>
                <div className='m-auto'>
                    <span className='text-lime-600 bigger-medium-text'></span>
                    <span className='bigger-medium-text'></span>
                </div>
            </div>
                }
                            <div onClick={handleClick} className='hover-invert whitespace-nowrap ease-in ease-out duration-300 hover:underline-offset-2 m-auto w-10/12 bg-cover text-center border-2 py-2 hover:cursor-pointer' target='_blank' alt='discord link' rel="noreferrer">
                                { 
                                mintPending ? <MintConfirmation error={error} txHash={txHash} reciept={reciept} /> :
                                <div>
                                {props.walletAddress.length > 0 ? mintText() : 'Connect Wallet'}
                                </div>
                                }
                            </div>
                            <a 
                            href='https://discord.gg/cJpYAvJhTG' // disabled
                            // onClick={props.connect} //for live site
                            // className='cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-2/5 md:mt-5 bg-cover text-center  hover:bg-lime-400 text-center border-2 py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                            className='whitespace-nowrap hover:cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mx-2 mt-5 md:mt-0 md:m-none w-3/5 md:w-1/2md:mt-5 bg-cover text-center text-center lg:py-5 md:py-5' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                                {props.walletAddress.length > 0 ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : 'Join us on Discord'}
                                </a>
                            <a className='whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none lg:mb-0 w-3/5 lg:w-1/2 md:mx-2 mt-5 md:mt-0 md:m-none md:mb-0 w-3/5 md:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 md:py-5 hover:cursor-pointer' href="https://wristaficionado.com/" target="_blank" rel="noreferrer" alt='boutique link' >Visit Boutique</a>
                            <div onClick={props.openModal} className='decoration-white whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 md:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='piece unique' >Piece Unique Studio</div>
                        </div>
                    }
                    <div className='big-text w-full lg:ml-10 md:ml-10'>{props.pageWidth > 950 ? 'Watch Club' : ''}</div>
                    <div className='lg:flex lg:ml-10 lg:mt-20 md:flex md:ml-10 md:mt-20 p-5 bg-neutral-900/50'>
                        <div className='lg:mx-2'>
                            <div className='medium-text m-auto text-center lg:text-left'>The Web3 Watch Pioneer</div>
                            <div className='lg:mb-0 mb-10'>As a veteran of the luxury watch industry, we offer an elite selection of NFT watches in the metaverse. When it comes to web3 timepieces, if it’s not Wrist Aficionado, it simply doesn’t belong on your wrist. </div>
                        </div>
                        {props.pageWidth > 950 ? <div className='border mx-6'/> : <></>}
                        <div className='lg:mx-2'>
                            <div className='medium-text m-auto pb-2 text-center lg:text-left'>Excellence</div>
                            <div className=''>Propelled by an unsurpassed commitment to our customers, we provide you with an NFT accessory that combines real-world utility, longevity and IP rights value - the <i>very first</i> luxury watch in the metaverse to do so. </div>
                        </div>
                    </div>
                    {props.pageWidth > 950 ?
                        <div className='lg:mt-10 ml-10 flex flex-col items-center'>
                            {props.walletAddress.length > 0 && props.chainId === 1 ?
                    <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                        <div className='m-auto px-4 py-2 bg-neutral-900/50'>
                            <span className='text-lime-600 bigger-medium-text'>{supply ? `${supply }` : '000'}</span>
                            <span className='bigger-medium-text'> / 500</span>
                        </div>
                    </div>
                :
                <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                <div className='m-auto'>
                    <span className='text-lime-600 bigger-medium-text'></span>
                    <span className='bigger-medium-text'></span>
                </div>
            </div>
                }
                            <div onClick={handleClick} className='hover-invert whitespace-nowrap ease-in ease-out duration-300 hover:underline-offset-2  lg:mx-2 m-auto lg:m-auto  w-10/12 md:mt-5 bg-cover text-center text-center border-2 py-2 lg:p-5 hover:cursor-pointer bg-neutral-900/50' target='_blank' alt='discord link' rel="noreferrer">
                            { 
                            mintPending ? <MintConfirmation error={error} txHash={txHash} reciept={reciept} /> :
                            <div>
                            {props.walletAddress.length > 0 ? mintText() : 'Connect Wallet'}
                            </div>
                            }
                            </div>
                            <div className='lg:flex lg:w-full lg:justify-between lg:my-10'>
                            <a 
                            href='https://discord.gg/cJpYAvJhTG'
                            // onClick={props.connect} //for live site
                            // className='cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-2/5 md:mt-5 bg-cover text-center  hover:bg-lime-400 text-center border-2 py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                            className='whitespace-nowrap hover:cursor-not-allowed ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 bg-neutral-900/50' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                                {props.walletAddress.length > 0 ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : 'Join us on Discord'}
                                </a>
                            <a className='whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 hover:cursor-pointer bg-neutral-900/50' href="https://wristaficionado.com/" target="_blank" rel="noreferrer" alt='boutique link' >Visit Boutique</a>
                            <div onClick={props.openModal} className='decoration-white whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 hover:cursor-pointer bg-neutral-900/50' src='/WASiteAssets/DiscordButton.png' alt='piece unique' >Piece Unique Studio</div>
                            <a className='whitespace-nowrap hover:underline-offset-2 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center text-center lg:py-5 hover:cursor-pointer bg-neutral-900/50' href="/Wrist Aficionado Whitepaper.pdf" target="_blank" rel="noreferrer" alt='whitepaper link' >Whitepaper</a>
                            </div>
                        </div>
                        : <></>
                    }
                    </div>
                </div>
                {props.pageWidth < 950 ? <></> : <Video />}
                </div>
            </div>
        </div>
    )

}

export default Hero