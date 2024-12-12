import { useAuthStore } from "./useAuthStore";

export const getRegisterEmail = () => useAuthStore((state) => state.registerEmail)
export const getForgotEmail = () => useAuthStore((state) => state.forgotEmail)

export const getActions = () => useAuthStore((state) => state.actions);