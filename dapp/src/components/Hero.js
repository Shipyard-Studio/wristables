import React, { useState } from 'react';
import Header from './Header';
import Watch from './Watch'
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
        return await window.contract.connect(window.signer).mint({value: window.ethers.utils.parseEther('0.01')})
    }

    function verifyWallet () {
        let proof = getProof(props.walletAddress)
        let v = verify(proof, props.walletAddress)
        setVerified(v)
    }

    async function redeem () {
        let proof = getProof(props.walletAddress)
        await window.contract.connect(window.signer).redeem(proof, {value: window.ethers.utils.parseEther('0.01')})
    }

    async function handleClick () {
        if (props.walletAddress.length > 0) {

                if (!txHash && !error) {

                    setMintPending(true)
                    try {
                        // let tx = await redeem() 
                        let tx = await mint() //switch to mint when the public mint goes live
                        setTxHash(tx.hash);
                        
                        const _receipt = await tx.wait();
                        setReceipt(_receipt)
                    } catch (err) {
                        console.error(err)
                        setError(err)
                    }
                }
            } else {
            props.connect()
        }
    }

    function mintText () {
            return 'Claim'
    }

    async function getCurrentSupply () {
        if (props.walletAddress.length > 0 && props.chainId === 4) {

            let _supply = await window.contract.getCurrentSupply()
            _supply = _supply.toString()
            for (let i = _supply.length; i < 4; i++) {
                _supply = '0' + _supply
            }
            setSupply(_supply)
        }
    }

    getCurrentSupply()

    return (
        <div className='hero h-full bg-zinc-900'>
            <Watch />
            <Header walletAddress={props.walletAddress} connect={props.connect} />
            <div className='flex flex-col justify-between m-auto h-5/6 w-10/12 pt-10'>
                <div className='big-text text-center z-10 noselect'>
                    Wrist Aficionado<br/>Watch Club.
                </div>
                <div className='z-10'>
                {props.walletAddress.length > 0 && props.chainId === 4 ?
                    <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                        <div className='m-auto'>
                            <span className='text-lime-600 bigger-medium-text'>{supply ? `${supply }` : '0000'}</span>
                            <span className='bigger-medium-text'> / 1000</span>
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
                    <div className='flex flex-col lg:flex-row w-10/12 md:w-3/5 lg:1/2 justify-between mx-auto z-10 pb-0 lg:pb-10'>
                        <a href='https://discord.gg/pcfaMQSFfW' className='whitespace-nowrap ease-in ease-out duration-300 hover:bg-blue-600  mx-auto lg:mx-2 mt-5 lg:mt-0 m-auto lg:m-none  w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' target='_blank' alt='discord link'>Discord</a>
                        <div 
                        onClick={handleClick}
                        className='whitespace-nowrap hover:cursor-pointer ease-in ease-out duration-300 m-auto mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-lime-600 hover:bg-lime-500 text-center rounded-full py-2 lg:py-5' src='/WASiteAssets/DiscordButton.png' alt='discord button' >
                            { 
                            mintPending ? <MintConfirmation error={error} txHash={txHash} reciept={reciept} /> :
                            <div>
                            {props.walletAddress.length > 0 ? mintText() : 'Connect Wallet'}
                            </div>
                            }
                        </div>
                        <div onClick={props.openModal} className='whitespace-nowrap hover:bg-blue-600 ease-in ease-out duration-300 m-auto  mx-auto lg:mx-2 mt-5 lg:mt-0 lg:m-none mb-10 lg:mb-0 w-3/5 lg:w-1/2 md:mt-5 bg-cover text-center bg-zinc-600 text-center rounded-full py-2 lg:py-5 hover:cursor-pointer' src='/WASiteAssets/DiscordButton.png' alt='discord button' >Piece Unique Studio</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Hero