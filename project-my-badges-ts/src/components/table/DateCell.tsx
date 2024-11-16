export default function DateCell(props: { date: string, time: string }) {
    const { date, time } = props;

    return (
        <div className="date-cell">
            <p>{date}</p>
            <p>{time}</p>
        </div>
    )
}