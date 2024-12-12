import useCountStore from "./useHomeStore";

export const getCount = () => useCountStore((state:
    {
        count: number,
        actions: {
            increaseCount: () => void,
            decreaseCount: () => void
        }
    }) => state.count);

export const getActions = () => useCountStore((state: {
    count: number,
    actions: {
        increaseCount: () => void,
        decreaseCount: () => void
    }
}) => state.actions);
