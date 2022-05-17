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

    async function postEmail () {
        let input = document.getElementById('email-input')

        let regex = validateEmail(input);
        console.log(regex)

        const data = {
                    email: input.value,
                }


        try {
            let req = await axios.post(
                'https://wawc-server.onrender.com/signup',
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
        <div className='' id={props.header.toLowerCase()}>
            <div className='m-auto h-full flex flex-col pb-10 justify-center w-10/12 md:w-4/12 mt-10'>
                <div className='big-text m-auto noselect'>{props.header}</div>
                {props.image ?
                 props.video ? 
                 <video id='vid' className='w-full m-auto my-5' style={{}} loop={true} autoPlay="autoplay" muted>
                     <source src="/WA_white pink donuts.mp4" type="video/mp4" />
                 </video>
                 :
                <img src={props.image} alt="WAWC Watch Image"/>
                :
                <></>
                }
                <div className='small-text text-justify body-container'>{body}</div>
                {props.emailCapture ?
                <div className='hover-invert mt-8 p-2 w-10/12 m-auto border-2 text-center' onClick={props.openEmailModal}>
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
                    <div className='hover-invert mt-8 p-2 w-10/12 m-auto border-2 text-center'>
                        VIEW ROADMAP
                    </div>
                </Link>
                :
                <></>
                }
            </div>
                {props.header2 ?
                <div className='m-auto h-full flex flex-col pb-10 justify-center w-10/12 md:w-4/12'>
                    <div className='big-text m-auto noselect'>{props.header2}</div>
                    <div className='small-text text-justify body-container'>{body2}</div>
                </div>
                :
                <></>
                }
        </div>
    )

}

export default TextSection