import React, {useEffect} from 'react';

const ModalForm = ({chainId, closeModal}) => {

    async function chainReq () {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
        });
    }

    useEffect(() => {
        chainReq()  
            if (chainId === 1) {
                closeModal()
            }
    }, [chainId])
    
    return (
        <div className='z-20 flex align-center'>
            <h2 className='z-20 text-center text-blue-600 medium-text pt-2'>Please Connect to Ethereum Mainnet!</h2>
        </div>
    )

}

export default ModalForm