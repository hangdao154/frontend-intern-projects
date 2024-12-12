import { MouseEventHandler, ReactElement } from "react";

interface Props {
    content: string,
    iconL?: string,
    iconR?: string,
    otherStyle?: string,
    type?: "button" | "submit" | "reset",
    color: string,
    onClick?: MouseEventHandler,
}

export default function OutlinedButton(props: Props) {
    const { content, iconL, iconR, otherStyle, type, onClick, color } = props;
    let colorStyle = "";
    switch (color) {
        case "red":
            colorStyle = (` text-[#FC185A] border-[#FC185A] hover:bg-[#FC185A] hover:text-white`);
            break;
        case "green":
            colorStyle = (` text-[#02C27A] border-[#02C27A] hover:bg-[#02C27A] hover:text-white`);
            break;
        default:
            colorStyle = (` text-[#0D6EFD] border-[#0D6EFD] hover:bg-[#0D6EFD] hover:text-white`)
    }
    return (
        <button type={type ? type : "button"}
            className={"px-[16px] py-[8px] border text-[16px] " + (otherStyle ? otherStyle : "") + colorStyle}
            onClick={onClick}
        >
            {iconL && <span className={"material-symbols-outlined text-[24px] align-middle mr-[6px]"}>{iconL}</span>}
            {content}
            {iconR && <span className={"material-symbols-outlined text-[24px] align-middle ml-[6px] " + colorStyle}>{iconR}</span>}
        </button>
    )
}