interface Props {
    otherStyles?: string,
    content: string,
    iconL?: string,
    iconR?: string,
}

export default function BlueButton(props: Props) {
    const { otherStyles, content, iconL, iconR } = props;

    return (
        <button className={"btn-group bg-[#0D6EFD] gap-[10px] px-[16px] py-[8px] rounded-lg text-[16px] " + (otherStyles ? otherStyles : "")}>
            {iconL && <span className="material-symbols-outlined">{iconL}</span>}
            {content}
            {iconR && <span className="material-symbols-outlined">{iconR}</span>}
        </button>
    )
}