import React, { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
const Recaptcha = require('react-recaptcha');


const TextSection = ({props}) => {
    
    let recaptchaInstance;
     
    // manually trigger reCAPTCHA execution
    const executeCaptcha = function () {
      recaptchaInstance.execute();
    };
     
    // executed once the captcha has been verified
    // can be used to post forms, redirect, etc.
    const verifyCallback = async function (response) {
        console.log(response)
      await postEmail();
    };

    let emailText = (status) => {
        let input = document.getElementById('email-input')
        
        status ?
            input.value = 'Thanks!'
        :
            input.value =  'There was an issue...'
    }

    let body = ReactHtmlParser(props.body)

    async function postEmail () {
        
        let input = document.getElementById('email-input')

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
        <div className='m-auto h-full flex flex-col justify-center w-10/12 md:w-4/12'>
                <div className='big-text noselect'>{props.header}</div>
                <div className='small-text'>{body}</div>
                {props.emailCapture ?
                <div className='w-1/12 flex align-center justify-between pt-2'>
                    <form>
                        <input id='email-input' className='p-3 text-neutral-300 bg-neutral-800' placeholder='join our mailing list' style={{outline: 'none'}}/>
                    </form>
                    <div onClick={executeCaptcha} className='p-2 px-5 bg-amber-400 text-black text-xl hover:cursor-pointer'>→</div>
                        <Recaptcha
                        ref={e => recaptchaInstance = e}
                        sitekey="6LeiBOweAAAAAAkoAeWvHON9T83oQ5jq4793tVcY"
                        size="invisible"
                        verifyCallback={verifyCallback}
                        />
                </div>
                :
                <></>
                }
        </div>
    )
}

export default TextSection