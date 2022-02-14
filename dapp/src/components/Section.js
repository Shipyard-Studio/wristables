import React from 'react';
import '../style/Section.css';

const Section = ({bg, Component}) => {

    return (
        <div className='section' style={{
            backgroundImage: `url("${bg}")`
        }}>
            {Component ? <Component /> : <></>}
        </div>
    )

}

export default Section