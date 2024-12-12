import { create } from "zustand"
import { persist } from 'zustand/middleware'
import { BadgeListItem } from "../../interfaces";

export interface State {
    pinnedBadges: Array<BadgeListItem | null>,
}

export interface ProfileActions {
    actions: {
        setPinnedBadges: (newPinnedBadges: State["pinnedBadges"]) => void,
    }
}


const intialState = {
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