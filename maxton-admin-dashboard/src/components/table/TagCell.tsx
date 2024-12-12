export default function TagCell(props: { data: string | string[], otherStyle?: string }) {
    const { data, otherStyle } = props;

    return (
        <ul className={"flex flex-wrap gap-[8px] min-w-[200px] " + otherStyle}>
            {typeof(data)==="string" && <li className="bg-[#181F4A] px-[10px] py-[2px] rounded-md text-[14px] uppercase">{data}</li>}
            {Array.isArray(data) && (
                data.map((item, index) => (
                    <li key={index} className="bg-[#181F4A] px-[10px] py-[2px] rounded-md text-[14px] uppercase">{item}</li>
                ))
            )}
        </ul>
    )
}