import React from 'react';

const ModalForm = ({closeModal}) => {

    return (
        <div className='z-20 w-full'>
            {/* <div className='flex text-right'> */}
                <img src='/assets/Menu Close Button.png' className='w-1/12 z-20 float-right text-neutral-400 pt-5 pr-5 w-full' onClick={closeModal} />
            {/* </div> */}
            <h2 className='z-20 pt-8 text-center medium-text'>Piece Unique Studio</h2>
            <video src='/assets/Background Video 04 - Mobile 1080p 8MBps.mp4' className='z-20 mx-auto' alt='fingerprint' />
        <p className='z-20 small-text w-full px-4 pb-2 mx-auto '>
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