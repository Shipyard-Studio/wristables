import React from 'react';
import { Parallax, Background } from 'react-parallax';
import Hero from './Hero'
import '../style/Section.css';

const Section = ({bg, Component, componentProps}) => {

    let classes = `section ${
        Component === Hero ? 
        ''
        :
        'flex items-center'
    }` 

    return (
        <Parallax strength={300}
            className={classes}
            blur={{ min: -5, max: 5 }}
            bgImage={bg ? bg : null}
            bgImageAlt="background image"
            bgImageSize="100%"
            strength={200}
        >
                {Component ? <Component props={componentProps}/> : <></>}
        </Parallax>
    )

}

export default Section