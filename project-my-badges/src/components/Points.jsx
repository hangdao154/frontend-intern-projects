export default function Points(props) {
    const { point } = props;

    return (
        <div className="points">
            <img className="sm-icon" src="public/points-icon.png" />
            <p>{point}</p>
        </div>
    )
}