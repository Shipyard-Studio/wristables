import React from 'react';
import ReactHtmlParser from "react-html-parser";

const TextSection = ({props}) => {

    let body = ReactHtmlParser(props.body)

    return (
        <div className='m-auto w-4/12'>
                <div className='big-text'>{props.header}</div>
                <div className='small-text'>{body}</div>
        </div>
    )

}

export default TextSection