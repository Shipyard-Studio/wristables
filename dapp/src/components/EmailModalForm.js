import React, {useState} from 'react';
import axios from 'axios';

const EmailModalForm = ({closeModal, pageWidth}) => {

    const [emailSubmissionPending, setESP] = useState(false)

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

    async function postEmail () {
        setESP(true)
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
                setESP(false)
                return true
            }
        catch (err) {
            console.error(err)
            emailText(false)
            setESP(false)
            return false
        }
    }

    return (
        <>
        { pageWidth > 950 ?
            <div className='z-20 m-auto'>
            <img src='/assets/Menu Close Button.png' className='w-10 z-20 float-right text-neutral-400 pt-5 pr-5' onClick={closeModal} />

                <div className='pl-10 flex flex-col justify-center'>
                    <h2 className='z-20 pt-8 text-center medium-text font-bold'>JOIN OUR MAILING LIST</h2>
                    <form  className='m-auto flex justify-center mt-4 w-4/5'>
                            <input id='email-input' className='p-3 w-full text-center text-neutral-300 bg-black border-2 m-auto' placeholder='name@example.com' style={{outline: 'none'}}/>
                        </form>
                        <div onClick={postEmail} className='p-2 px-5 mb-10 mt-5 w-4/5 m-auto text-white medium-text text-xl hover:cursor-pointer border-2 text-center'>
                            {emailSubmissionPending ?
                            <img className='invert w-1/12 h-auto m-auto' src='/spinning.gif' alt='loading spinner' />
                            :
                            'SIGN UP'
                        }
                        </div>
                </div>
            </div>
        :
            <div className='z-20 w-full border-2'>
                {/* <div className='flex text-right'> */}
                    <img src='/assets/Menu Close Button.png' className='w-1/12 z-20 float-right text-neutral-400 pt-5 pr-5 w-full' onClick={closeModal} />
                {/* </div> */}
                <h2 className='z-20 pt-8 text-center medium-text'>JOIN OUR MAILING LIST</h2>
                 <form  className='m-auto flex justify-center mt-4'>
                            <input id='email-input' className='p-3 w-4/5 text-center text-neutral-300 bg-black border-2 m-auto' placeholder='name@example.com' style={{outline: 'none'}}/>
                        </form>
                        <div onClick={postEmail} className='p-2 px-5 mb-10 mt-5 w-4/5 m-auto text-white medium-text text-xl hover:cursor-pointer border-2 text-center'>
                            {emailSubmissionPending ?
                            <img className='invert w-1/12 h-auto m-auto' src='/spinning.gif' alt='loading spinner' />
                            :
                            'SIGN UP'
                        }
                        </div>
            </div>
        }
        </>
    )

}

export default EmailModalForm