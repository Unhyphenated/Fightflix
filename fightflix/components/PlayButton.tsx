import React from "react";
import { IoPlay } from "react-icons/io5";
import { useRouter } from "next/router";


interface PlayButtonProps { 
    fightId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ fightId }) => {
    const router = useRouter();

    return (
        <div>

        </div>
    )
};

export default PlayButton;