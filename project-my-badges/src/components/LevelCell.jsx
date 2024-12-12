export default function LevelCell(props) {
    const { level } = props;

    let imgURL = "";

    if (level >= 80) {
        imgURL = "public/badge/badge-min80.png";
    } else if (level >= 40) {
        imgURL = "public/badge/badge-min40.png";
    } else {
        imgURL = "public/badge/badge-min10.png";
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