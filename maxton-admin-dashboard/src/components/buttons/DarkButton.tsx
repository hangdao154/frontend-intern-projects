import { MouseEventHandler } from "react";

interface Props {
    otherStyles?: string,
    content: string,
    iconL?: string,
    iconR?: string,
    onClick?: any,
    type?: "button" | "submit" | "reset",
    selected?: boolean,
    name?: string,
    errored?: boolean,
}

export default function DarkButton(props: Props) {
    const { otherStyles, content, iconL, iconR, onClick, type, selected, errored } = props;

    return (
        <button type={type ? type : "button"}
            className={"btn-group dark-style gap-[10px] text-[16px] " + (otherStyles ? otherStyles : "") + ((selected !== undefined && selected === true) ? " dark-selected" : "") + ((errored !== undefined && errored === true) ? " errored" : "")
            }
            onClick={onClick ? onClick : () => { }}>
            {iconL && <span className="material-symbols-outlined">{iconL}</span>}
            {content}
            {iconR && <span className="material-symbols-outlined">{iconR}</span>}
        </button>
    )
}