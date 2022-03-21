import React, {useState, useEffect} from 'react';


const Video = () => {

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
    <div className='w-full h-full mx-auto flex items-center absolute z-auto'>
           <video id='vid' className={classString} style={{minWidth: 1750, right: -offsetX}} loop={true} autoPlay="autoplay" muted>
     {/* <source src="where the video is" type="video/mov"/> */}
     <source src="/loop-v1.mp4" type="video/mp4" />
     {/* <source src="where the video is" type="video/oog" /> */}
     Your browser does not support the video tag.
   </video>
   {/* {document.getElementById('vid').play()} */}
    </div>
  );
};

export default Video;