import { getActions, getCount } from "../store/home/selector";

export default function Child() {

    return (
        <>
            <h1 onClick={getActions().increaseCount}>{getCount()}</h1>
            <br/>
            <h1 onClick={getActions().decreaseCount}>{getCount()}</h1>
        </>
    )
}