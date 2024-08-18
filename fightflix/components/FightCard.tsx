import React from "react";
import { IoPlay } from "react-icons/io5";
import FavoriteButton from "./FavoriteButton";

interface FightCardProps {
    data: Record<string, any>
}

const FightCard: React.FC<FightCardProps> = ({
    data
}) => {
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                
                "
            src={data.thumbnailUrl} alt="Thumbnail"/>
            <div 
                className="
                opacity-0
                absolute
                top-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[6vw]
                group-hover:translate-x-[2vw]
                group-hover:opacity-100
                ">
                    <img className="
                        cursor-pointer
                        object-cover
                        transition
                        duration
                        shadow-xl
                        rounded-t-md
                        w-full
                    "
                    src={data.thumbnailUrl} alt="Thumbnail"/>
                    <div className="
                        z-10
                        bg-zinc-900
                        p-2
                        lg:p-4
                        absolute
                        w-full
                        transition
                        shadow-md
                        rounded-b-md">
                        <div className="flex flex-row items-center gap-3">
                            <div className="
                            cursor-pointer
                            w-6
                            h-3
                            lg:w-10
                            lg:h-10
                            bg-white
                            rounded-full
                            flex
                            justify-center
                            items-center
                            transition
                            hover:bg-neutral-300"
                            onClick={() => {}}>
                                <IoPlay size={30}/>
                            </div>
                            <FavoriteButton fightId={data?.fightId}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default FightCard;