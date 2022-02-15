import React from 'react';
import '../style/ProgressBar.css'

const ProgressBar = ({num}) => {

    let list = new Array(6);
    list.fill(0)
    list[num] = 1;

    return (
        <div className='progress-bar'>
            { 
                
                list.map((item, i) => {
                    return item === 1 ?
                        <div className='circle circle-active' key={i}/>
                    :
                        <div className='circle circle-inactive' key={i}/>
                })
            }
        </div>
    )

}

export default ProgressBar