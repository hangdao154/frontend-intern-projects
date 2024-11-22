import { useMyProfileStore } from "./useMyProfileStore";


export const getPinnedBadges = () => useMyProfileStore((state) => state.pinnedBadges);
export const getActions = () => useMyProfileStore((state) => state.actions);