export default function LevelCell(props: { level: number }) {
    const { level } = props;

    let imgURL = "";

    if (level >= 80) {
        imgURL = "src/assets/badge/badge-min80.png";
    } else if (level >= 40) {
        imgURL = "src/assets/badge/badge-min40.png";
    } else {
        imgURL = "src/assets/badge/badge-min10.png";
    }

    return (
        <div className="level-cell">
            <div className="icon">
                <img src={imgURL} />
                <p>{level}</p>
            </div>
            <div className="label">
                <p>Level {level}</p>
            </div>
        </div>
    )
}