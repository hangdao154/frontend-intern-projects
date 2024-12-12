import { create } from "zustand"

interface NotficationState {
    code?: number,
    message?: string,
}

interface NotificationAction {
    actions: {
        setNotification: (newNotification: NotficationState) => void,
    }
}

export const useNotificationStore = create<NotficationState & NotificationAction>()(
    (set) => ({
        code: undefined,
        message: undefined,
        actions: {
            setNotification: (newNotification: NotficationState) => {
                console.log("Setting notification....");
                set(() => ({...newNotification}))
            },
        }
    })
)