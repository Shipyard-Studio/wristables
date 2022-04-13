import React, {useState, useEffect} from 'react';


const Video = () => {

    const classString = 'mx-auto z-auto'

    // const [offsetX, setOffsetX] = useState(0)

    // function calcOffset () {
    //     setOffsetX((1750 - window.innerWidth) / 2)
    // }

    // useEffect(() => {
    //     calcOffset()
    //     window.addEventListener('resize', calcOffset)
    // }, [])

  function getSource () {
    return window.innerWidth > 950 ? 
    "/assets/Background Video 04 - Desktop 1080p 8MBps.mp4" 
    :
    "/assets/Background Video 04 - Mobile 1080p 8MBps.mp4"
  }

  return (
    <div className='w-full mx-auto flex items-center z-auto'>
           <video id='vid' className={classString} style={{}} loop={true} autoPlay="autoplay" muted>
     {/* <source src="where the video is" type="video/mov"/> */}
     <source src={getSource()} type="video/mp4" />
     {/* <source src="where the video is" type="video/oog" /> */}
     Your browser does not support the video tag.
   </video>
   {/* {document.getElementById('vid').play()} */}
    </div>
  );
};

export default Video;