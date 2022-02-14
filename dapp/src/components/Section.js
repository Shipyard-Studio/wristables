import React from 'react';
import '../style/Section.css';

const Section = ({Component}) => {

    return (
        <div className='section'>
            {Component ? <Component /> : <></>}
        </div>
    )

}

export default Section