import React, {useEffect} from 'react';

const ModalForm = ({chainId, closeModal}) => {

    async function chainReq () {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
        });
    }

    useEffect(() => {
        chainReq()  
            if (chainId === 4) {
                closeModal()
            }
    }, [chainId])
    
    return (
        <div className='z-20 flex align-center'>
            <h2 className='z-20 text-center text-blue-600 medium-text pt-2'>Please Connect to Rinkeby Test Network!</h2>
        </div>
    )

}

export default ModalForm