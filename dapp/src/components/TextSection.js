import React from 'react';

const TextSection = ({props}) => {

    return (
        <div className='m-auto w-4/12'>
                <div className='big-text'>{props.header}</div>
                <div className='small-text'>{props.body}</div>
        </div>
    )

}

export default TextSection