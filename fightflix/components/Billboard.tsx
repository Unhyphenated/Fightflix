import useBillboard from "@/hooks/useBillboard";
import React from "react";

const Billboard = () => {
    const { data } = useBillboard();
    
    return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
            className="absolute top-0 left-0 w-full h-full object-cover brightness-[60%]"
            src={`https://www.youtube.com/embed/${data?.videoId}?autoplay=1&mute=1&loop=1&playlist=${data?.videoId}&vq=hd1080&controls=0&disablekb=1&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
        ></iframe>
            
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">

            </div>
        </div>
    )
}

export default Billboard;