import React, {useEffect, useState} from 'react';

const Featured = () => {

    const classString = 'mx-auto absolute z-auto absolute'

    const [offsetX, setOffsetX] = useState(0)

    function calcOffset () {
        setOffsetX((1750 - window.innerWidth) / 2)
    }

    useEffect(() => {
        calcOffset()
        window.addEventListener('resize', calcOffset)
    }, [])

    return (
        <div className='w-full h-full mx-auto flex items-center absolute -z-50'>
           <video id='vid' className={classString} style={{minWidth: 1750, right: -offsetX}}  loop={true} autoPlay="autoplay" muted defaultMuted playsinline  oncontextmenu="return false;"  preload="auto">
                <source src='/WATCH_FACTORY_SOUNDSCAPE.mp4' type="video/mp4" />
            </video>
        </div>
      );
};

export default Featured;