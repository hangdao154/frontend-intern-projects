import { useNotificationStore } from "./useNotificationStore";

export const getCode = () => useNotificationStore((state) => state.code)
export const getMessage = () => useNotificationStore((state) => state.message)

export const getNotiActions = () => useNotificationStore((state) => state.actions);