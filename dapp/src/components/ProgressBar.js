import React from 'react';

const ProgressBar = ({num}) => {

    return (
        <div className='progress-bar'>
            { 
                new Array(6).map((item, i) => (
                    i === num ?
                    <div className='circle circle-active'/>
                    :
                    <div className='circle circle-inactive'/>
                ))
            }
        </div>
    )

}

export default ProgressBar