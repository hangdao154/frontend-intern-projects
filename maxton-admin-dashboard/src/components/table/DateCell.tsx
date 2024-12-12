export default function DateCell(props: { data: string }) {
    const { data } = props;

    return (
        <div className="text-cell">
            <p className="text-[14px]">{data}</p>
        </div>
    )
}