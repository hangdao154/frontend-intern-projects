import { create } from "zustand";

interface State {
    count: number,
    actions: {
        increaseCount: () => void,
        decreaseCount: () => void
    }
}

const useCountStore = create<State>((set) => ({
    count: 0,
    actions: {
        increaseCount: () => set((state: State) => ({count: state.count + 1})),
        decreaseCount: () => set((state: State) => ({ count: state.count - 1}))
    }
}))

export default useCountStore 