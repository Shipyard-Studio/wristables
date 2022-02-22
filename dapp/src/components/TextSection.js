import React from 'react';
import ReactHtmlParser from "react-html-parser";

const TextSection = ({props}) => {

    let body = ReactHtmlParser(props.body)

    function ValidateEmail(e) {
        let input = document.getElementById('email-input')
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    return (
        <div className='m-auto h-full flex flex-col justify-center w-10/12 md:w-4/12'>
                <div className='big-text noselect'>{props.header}</div>
                <div className='small-text'>{body}</div>
                {props.emailCapture ?
                <div className='w-1/12 flex align-center justify-between pt-2'>
                    <form>
                        <input id='email-input' className='p-3 text-neutral-300 bg-neutral-800' placeholder="join our mailing list" style={{outline: 'none'}}/>
                    </form>
                    <div onClick={ValidateEmail} className='p-2 px-5 bg-amber-400 text-black text-xl hover:cursor-pointer'>→</div>
                </div>
                :
                <></>
                }
        </div>
    )

}

export default TextSection