import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { BadgeListItem } from "../../interfaces";
import { immer } from "zustand/middleware/immer";

export interface State {
    pinnedBadges: Array<BadgeListItem | null>,
}

export interface ProfileActions {
    actions: {
        setPinnedBadges: (newPinnedBadges: State["pinnedBadges"]) => void,
    }
}


const intialState = {
    count: 0,
    pinnedBadges: undefined,
}

export const useMyProfileStore = create<State & ProfileActions>()(persist(
    (set) => ({
        pinnedBadges: [null, null, null],
        actions: {
            setPinnedBadges: (newPinnedBadges: State["pinnedBadges"]) => set(() => ({ pinnedBadges: [...newPinnedBadges] })),
        }
    }), {
        partialize: (state) => ({
            pinnedBadges: state.pinnedBadges,
        }),
        name: 'profile-store',
    }
))