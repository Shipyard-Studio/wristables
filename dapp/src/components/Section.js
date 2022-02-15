import React from 'react';
import { Parallax, Background } from 'react-parallax';
import '../style/Section.css';

const Section = ({bg, Component}) => {


    return (
        <Parallax strength={300}
            className='section' 
            blur={{ min: -5, max: 5 }}
            bgImage={bg}
            bgImageAlt="background image"
            bgImageSize="cover"
            strength={200}
        >
                {Component ? <Component /> : <></>}
        </Parallax>
    )

}

export default Section