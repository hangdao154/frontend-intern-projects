interface Props {
    pathLabels: Array<string | null>
}

export default function PagePath(props: Props) {
    const { pathLabels } = props;

    return (
        <ul className="flex items-baseline">
            <li className="material-symbols-outlined relative top-[4px] text-white text-[24px] align-text-bottom">home</li>
            {pathLabels.map((label, index) => (
                <li
                    key={index}
                    className={"text-white "
                        + (index === 0 ? "text-[20px] font-bold pl-[10px] pr-[20px]" : "text-[16px] px-[20px]")
                        + (index !== pathLabels.length - 1 ? " border-r-[1px] border-[#FFFFFF40]" : "")}>
                    {label}
                </li>
            ))}
        </ul>
    )
}