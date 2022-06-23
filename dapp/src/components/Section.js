import React from 'react';
// import { Parallax, Background } from 'react-parallax';
import Hero from './Hero'
import '../style/Section.css';

const Section = ({bg, size, Component, componentProps}) => {

    let classes = `
    ${
        size === 1 ? 
        'section'
        :
        'tall-section'
    }
    ${
        Component === Hero ? 
        ''
        :
        'flex items-center'
    }` 

    return (
        <>
        {Component ? <Component props={componentProps}/> : <></>}
        </>
    )

}

export default Section