import React from 'react';


function MintConfirmation ({error, txHash, reciept}) { 

    function errorText () {
        if (error) {
            if (error.message == 'execution reverted: claimed') {
                return 'Already Claimed'
            } else if (error.code == 4001) {
                return 'Transaction Canceled'
            } else if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
                return 'Already Claimed / Invalid Proof'
            } else {
                return 'Something went wrong...'
            }
        }
    }

// console.log(txs)

  return (
    <div className="flex m-auto justify-center items-center z-30">
        {
        error ?
        <>
            <img className='h-6 z-30 mx-2' src='/error.png' alt='error' />
            <div className='z-30 mx-2 whitespace-normal' >{errorText()}</div> 
        </>
        :
        reciept ? 
        <>
            <img className='h-6 z-30 mx-2' src='/success.png' alt='check mark' />
            <a className='z-30 hover:text-blue-600 hover:cursor-pointer hover:decoration-solid mx-2 whitespace-normal' href={`https://etherscan.io/tx/${txHash}`} target='_blank' rel="noreferrer" >Success!</a> 
        </>
        :
        txHash ? 
        <>
            <img className='h-6 z-30 mx-2' src='/spinny.gif' alt='spinner' />
            <a className='z-30 hover:text-blue-600 hover:cursor-pointer hover:decoration-solid mx-2 whitespace-normal' href={`https://etherscan.io/tx/${txHash}`} target='_blank' rel="noreferrer" >View on Etherscan</a>
        </>
        :
        <img className='h-6 z-30 mx-2' src='/spinny.gif' alt='spinner' />
        }
    </div>
  );
}

export default MintConfirmation ;