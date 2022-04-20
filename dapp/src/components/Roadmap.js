import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import '../style/Roadmap.css';

const Roadmap = ({props}) => {

    let body = ReactHtmlParser(props.body)

    return (
        <div className='md:mx-20 lg:mt-20' id={props.header.toLowerCase()}>
            <img src='/roadmap-combined.png' className='absolute mt-20'/>
            <div className='m-auto w-full h-full flex pb-10 justify-between'>
                <div className='flex flex-col w-full justify-center m-auto'>
                    <div className='big-text text-left noselect pb-10 m-auto'>{props.header}</div>
                    <div className='small-text text-left'>{body}</div>
                </div>  
            </div>
        </div>
    )

}

export default Roadmap