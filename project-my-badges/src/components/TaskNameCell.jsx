export default function TaskNameCell(props) {
    const { data } = props;

    return (
        <div className="task-name">
            <img className="sm-icon" src="public/social-icons/x-logo-icon.png" />
            <p>{data}</p>
        </div>
    )
}