import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";

const Roadmap = ({props}) => {

    let body = ReactHtmlParser(props.body)

    return (
        <div className='md:mx-20' id={props.header.toLowerCase()}>
            <div className='m-auto w-full h-full flex pb-10 justify-between'>
                <div className='flex flex-col w-5/12 justify-center'>
                    <div className='big-text text-left noselect pb-10'>{props.header}</div>
                    <div className='small-text'>{body}</div>
                </div>  
            </div>
        </div>
    )

}

export default Roadmap