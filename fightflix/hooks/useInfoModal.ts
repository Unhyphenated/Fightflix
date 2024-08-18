import { create } from 'zustand';

export interface ModalStoreInterface {
    fightId?: string;
    isOpen: boolean;
    openModal: (fightId: string) => void;
    closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
    fightId: undefined,
    isOpen: false,
    openModal: (fightId: string) => set({ isOpen: true, fightId }),
    closeModal: () => set({ isOpen: false, fightId: undefined })
}));

export default useInfoModal;