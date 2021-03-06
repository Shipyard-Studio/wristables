import React from 'react';

const ModalForm = ({closeModal, pageWidth}) => {
    console.log(pageWidth)
    return (
        <>
        { pageWidth > 950 ?
            <div className='z-20 m-auto'>
            <img src='/assets/Menu Close Button.png' className='w-10 z-20 float-right text-neutral-400 pt-5 pr-5' onClick={closeModal} />
            <div className='flex w-full'>
                <div className='w-1/2 pl-10 flex flex-col justify-center'>
                    <h2 className='z-20 pt-8 text-center medium-text font-bold'>Piece Unique Studio</h2>
                    <p className='z-20 small-text w-full px-4 pb-2 mx-auto font-semibold text-justify'>
                    The first {'500'} owners of our hypercar watch will also have the opportunity to purchase 1 of 500 Piece Uniques that can be customized right here in our studio.
                    <br/>
                    Your Piece Unique will appear blank in your wallet until you have customized your watch in our studio.
                    <br />
                    <br />
                    (Customization starts at 20ETH)
                    </p>
                </div>
                    <video src='/assets/Background Video 04 - Mobile 1080p 8MBps.mp4' className='z-20 mx-auto w-1/2' alt='fingerprint' />
                </div>
            </div>
        :
        <div className='z-20 w-full'>
            {/* <div className='flex text-right'> */}
            <img src='/assets/Menu Close Button.png' className='w-1/12 z-20 float-right text-neutral-400 pt-5 pr-5 w-full' onClick={closeModal} />
            {/* </div> */}
            <h2 className='z-20 pt-8 text-center medium-text'>Piece Unique Studio</h2>
            <video src='/assets/Background Video 04 - Mobile 1080p 8MBps.mp4' className='z-20 mx-auto' alt='fingerprint' />
            <p className='z-20 small-text w-full px-4 pb-2 mx-auto '>
            The first {5 + ',' + '00'} owners of our hypercar watch will also have the opportunity to purchase 1 of 100 Piece Uniques that can be customized right here in our studio.
            <br/>
            Your Piece Unique will appear blank in your wallet until you have customized your watch in our studio.
            <br />
            <br />
            (Customization starts at 5ETH)
            </p>
            </div>
        }
    </>
    )

}

export default ModalForm