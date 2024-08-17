import React from "react";

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
        </div>
    )
}

export default FightCard;