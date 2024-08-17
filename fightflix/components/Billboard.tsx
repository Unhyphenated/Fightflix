import useBillboard from "@/hooks/useBillboard";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";

const Billboard = () => {
    const { data } = useBillboard();
    
    return (
    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
            className="absolute top-0 left-0 w-full h-full object-cover brightness-[60%]"
            src={`https://www.youtube.com/embed/${data?.videoId}?autoplay=1&mute=1&loop=1&playlist=${data?.videoId}&vq=hd720 or &vq=hd1080&controls=0&disablekb=1&modestbranding=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ pointerEvents: 'none' }}
        ></iframe>
            
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <button
                        className="
                            bg-white
                            text-white
                            bg-opacity-30
                            rounded-md
                            py-1 md:py-2
                            px-2 md:px-4
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition">
                            <CiCircleInfo className="mr-2"/>
                            Info
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Billboard;