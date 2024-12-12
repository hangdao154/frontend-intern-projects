import { MouseEventHandler } from "react";

interface Props {
    content: string,
    iconL?: string,
    iconR?: string,
    otherStyle?: string,
    onClick?: MouseEventHandler,
    active: boolean,
    type?: "button" | "submit" | "reset",
}

export default function FilledButton(props: Props) {
    const { content, iconL, iconR, otherStyle, active, type, onClick } = props;
    return (
        <button
            type={type ? type : "button"}
            className={`flex justify-center gap-[10px] py-[8px] rounded-lg text-[16px] `
                + (active ? (otherStyle ? otherStyle : "") : "disabled")
                + (iconL
                    ? " pl-[8px] pr-[16px]"
                    : (iconR ? " pl-[16px] pr-[8px]" : " px-[16px]")
                )}
            disabled={!active} onClick={onClick ? onClick : () => { }}>
            {iconL && <span className="material-symbols-outlined">{iconL}</span>}
            {content}
            {iconR && <span className="material-symbols-outlined">{iconR}</span>}
        </button>
    )
}