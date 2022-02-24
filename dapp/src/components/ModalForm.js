import React from 'react';

const ModalForm = ({closeModal}) => {

    return (
        <div className='z-20'>
            <div className='z-20 text-right text-neutral-400 pt-2 pr-5 w-full' onClick={closeModal}>ⓧ</div>
            <img src='/Fingerprint.png' className='z-20 pt-0 mx-auto' alt='fingerprint' />
            <h2 className='z-20 text-center text-blue-600 medium-text pt-10'>Piece Unique Studio</h2>
            <p className='z-20 text-center text-neutral-600 small-caps'>coming soon</p>
        <p className='z-20 text-neutral-600 w-1/2 mx-auto py-10'>
            The first {1 + ',' + '000'} owners of our hypercar watch will also have the opportunity to purchase 1 of 1,000 Piece Uniques that can be customized right here in our studio.
            <br/>
            Your Piece Unique will appear blank in your wallet until you have customized your watch in our studio.
            <br />
            <br />
            (Customization starts at 20ETH)
        </p>
        </div>
    )

}

export default ModalForm