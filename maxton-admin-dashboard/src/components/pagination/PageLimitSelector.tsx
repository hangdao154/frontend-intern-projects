interface Props {
    handleChangeLimit: (name:string, num: number) => void
}

export default function PageLimitSelector(props: Props) {
    const { handleChangeLimit } = props;

    return (
        <div className="outline-box">
            <select className="dark-style rounded-lg text-[16px]" onChange={(e) => {
                handleChangeLimit("limit", parseInt(e.target.value.split("").slice(0, 2).join("")));
            }}>
                <option>10/page</option>
                <option>20/page</option>
                <option>30/page</option>
                <option>40/page</option>
                <option>50/page</option>
            </select>
        </div>
    )
}