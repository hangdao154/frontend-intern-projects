import { create } from "zustand"

interface AuthState {
    registerEmail?: string,
    forgotEmail?: string,
}

interface AuthAction {
    actions: {
        setRegisterEmail: (newRegisterEmail: AuthState["registerEmail"]) => void,
        setForgotEmail: (newForgotEmail: AuthState["forgotEmail"]) => void,
    }
}

export const useAuthStore = create<AuthState & AuthAction>()(
    (set) => ({
        registerEmail: undefined,
        actions: {
            setRegisterEmail: (newRegisterEmail: AuthState["registerEmail"]) => set(() => ({ registerEmail: newRegisterEmail })),
            setForgotEmail: (newForgotEmail: AuthState["forgotEmail"]) => set(() => ({ forgotEmail: newForgotEmail}))
        }
    })
)