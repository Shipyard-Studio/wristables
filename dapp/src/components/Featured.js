import React from 'react';

const Featured = () => {
    return (
        <div className='w-full'>
            <video loop={true} autoPlay="autoplay" muted defaultMuted playsinline  oncontextmenu="return false;"  preload="auto">
                <source src='/WATCH_FACTORY_SOUNDSCAPE.mp4' type="video/mp4" />
            </video>
        </div>
      );
};

export default Featured;