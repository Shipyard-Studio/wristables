import React from 'react';
import ReactHtmlParser from "react-html-parser";

const TextSection = ({props}) => {

    let body = ReactHtmlParser(props.body)

    return (
        <div className='m-auto h-full flex flex-col justify-center w-10/12 md:w-4/12'>
                <div className='big-text noselect'>{props.header}</div>
                <div className='small-text'>{body}</div>
        </div>
    )

}

export default TextSection