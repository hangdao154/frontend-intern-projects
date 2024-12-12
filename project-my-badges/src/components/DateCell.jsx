export default function DateCell(props) {
    const { date, time } = props;

    return (
        <div className="date-cell">
            <p>{date}</p>
            <p>{time}</p>
        </div>
    )
}