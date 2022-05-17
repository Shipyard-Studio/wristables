import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import { Link, animateScroll as scroll } from "react-scroll";

const TextSection = ({props}) => {

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    

    let emailText = (status) => {
        let input = document.getElementById('email-input')
        
        status ?
            input.value = 'Thanks!'
        :
            input.value =  'There was an issue...'
    }

    let body = ReactHtmlParser(props.body)
    let body2 = ReactHtmlParser(props.body2)
    let aboutMarginTop = props.header === 'About' ? ' mt-40' : ''

    async function postEmail () {
        let input = document.getElementById('email-input')

        let regex = validateEmail(input);
        console.log(regex)

        const data = {
                    email: input.value,
                }


        try {
            let req = await axios.post(
                'https://wawc-server.herokuapp.com/signup',
                {
                    email: input.value
                })
                console.log(req.status)
                emailText(true)
                return true
            }
        catch (err) {
            console.error(err)
            emailText(false)
            return false
        }
    }

    return (
        <div className={'md:mx-20' + aboutMarginTop} id={props.header.toLowerCase()}>
            <div className='m-auto w-full h-full flex pb-10 justify-between text-justify'>
                {props.image && props.header === 'About' ?
                props.video ? 
                <video id='vid' className='w-5/12 m-auto' style={{}} loop={true} autoPlay="autoplay" muted playsInline>
                    <source src="/WA_white pink donuts.mp4" type="video/mp4" />
                </video>
                :
                <img src={props.image} alt="WAWC Watch Image" className='w-5/12'/>
                :
                <></>
                }
                <div className='flex flex-col w-5/12 justify-center text-justify px-10'>
                    <div className='big-text text-left noselect pb-10' style={props.header === 'Events' ? {fontSize: 50} : {}}>{props.header}</div>
                    <div className='small-text body-container'>{body}</div>
                    {props.emailCapture ?
                    <div className='hover-invert mt-8 p-2 w-full border-2 text-center' onClick={props.openEmailModal}>
                        JOIN OUR MAILING LIST
                        {/* <form>
                            <input id='email-input' className='p-3 text-neutral-300 bg-neutral-800' placeholder='join our mailing list' style={{outline: 'none'}}/>
                            </form>
                        <div onClick={postEmail} className='p-2 px-5 bg-amber-400 text-black text-xl hover:cursor-pointer'>→</div> */}
                    </div>
                    :
                    <></>
                    }
                    {props.roadmap ?
                    <Link 
                    to="roadmap"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}>
                        <div className='hover-invert mt-8 p-2 w-full m-auto border-2 text-center'>
                            VIEW ROADMAP
                        </div>
                    </Link>
                    :
                    <></>
                    }
                </div>
                {props.image && props.header === 'Utility' ?
                <img src={props.image} alt="WAWC Watch Image" className='w-5/12'/>
                :
                <></>
                }
                {props.header2 ?
                <div className='m-auto h-full flex flex-col lg:pb-0 pb-10 justify-center w-5/12'>
                    <div className='big-text noselect pb-10' style={{fontSize: 50}}>{props.header2}</div>
                    <div className='small-text body-container'>{body2}</div>
                </div>
                :
                <></>
            }
            </div>
        </div>
    )

}

export default TextSection