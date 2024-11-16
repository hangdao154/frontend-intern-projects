export default function StatusCell(props: { status: string }) {
    const { status } = props;
    const divClass = status.toLowerCase() + "-status";

    return (
        <div className={divClass}>{status}</div>
    )
}