interface Props {
    point: number
}

export default function Points(props: Props) {
    const { point } = props;

    return (
        <div className="points">
            <img className="sm-icon" src="src/assets/points-icon.png" />
            <p>{point}</p>
        </div>
    )
}