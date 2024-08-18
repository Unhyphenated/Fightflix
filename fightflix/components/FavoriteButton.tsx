import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface FavoriteButtonProps {
    fightId: string,
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ fightId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(fightId);
    }, [currentUser, fightId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { fightId }})
        } else {
            response = await axios.post('/api/favorite', { fightId })
        }
        const updatedFavoriteIds = response?.data?.favoriteIds;
        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        })
    }, [fightId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlinePlus : IoIosCheckmarkCircleOutline;


    return (
        <div onClick={toggleFavorites} 
        className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:border-neutral-300">
                <Icon className="text-white" size={25}/>
        </div>
    )
}

export default FavoriteButton;