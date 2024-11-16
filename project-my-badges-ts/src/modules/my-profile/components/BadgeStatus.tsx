interface Props {
    status: string
}

export default function BadgeStatus(props: Props) {
    const { status } = props;

    let iconURL = "", buttonContent = "";

    switch (status) {
        case "claimed":
            iconURL = "src/assets/badge-status/owned-icon.png";
            buttonContent = "Owned";
            break;
        case "not-claim":
        case "unavailable":
        default:
            iconURL = "src/assets/badge-status/claim-icon.png";
            buttonContent = "Claim";
            break;
    }

    return (
        <button className={"status-btn " + status}>
            <img className="sm-icon" src={iconURL} />
            {buttonContent}
        </button>
    )
}