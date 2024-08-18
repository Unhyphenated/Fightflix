import React, { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useFight from '@/hooks/useFight';

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);

    const { fightId } = useInfoModal();
    const { data = {} } = useFight(fightId);
    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div
            className="
            z-50
            transition
            duration-300
            bg-black
            bg-opacity-80
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0"
        >

            <div
                className="
                relative
                w-auto
                mx-auto
                max-w-3xl
                rounded-md
                overflow-hidden">
                    <div className={`
                        ${isVisible ? 'scale-100' : 'scale-0'}
                        transform
                        duration-300
                        relative
                        flex-auto
                        bg-zinc-900
                        drop-shadow-md`}>
                            <div className="relative h-96">
                                <video className="
                                    w-full brightness-[60%] object-cover h-full" src={`${data?.thumbnailUrl}`}>
                                </video>
                                 <div
                                    className="
                                    cursor-pointer
                                    absolute
                                    top-3
                                    right-3
                                    h-10
                                    w-10
                                    rounded-full
                                    bg-black
                                    bg-opacity-70
                                    flex
                                    items-center
                                    justify-center"
                                    onClick={handleClose}>
                                    <IoCloseOutline className="text-white" size={20}/>
                                 </div>

                                 <div className="
                                    absolute
                                    bottom-[10%]
                                    left-10
                                 ">
                                        <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                            {data?.title}
                                        </p>
                                        <div className="flex flex-row gap-4 items-center">
                                            <PlayButton fightId={data?.id}/>
                                            <FavoriteButton fightId={data?.id}/>
                                        </div>
                                 </div>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default InfoModal