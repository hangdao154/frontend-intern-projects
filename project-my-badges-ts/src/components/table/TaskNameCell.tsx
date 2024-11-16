export default function TaskNameCell(props: { data: string }) {
    const { data } = props;

    return (
        <div className="task-name">
            <img className="sm-icon" src="src/assets/social-icons/x-logo-icon.png" />
            <p>{data}</p>
        </div>
    )
}