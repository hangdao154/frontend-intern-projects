function BadgeStatus(props) {
    const { status } = props;

    let iconURL = "", buttonContent = "";

    switch (status) {
        case "owned":
            iconURL = "public/badge-status/owned-icon.png";
            buttonContent = "Owned";
            break;
        case "claimable":
        case "yet-claimable":
        default:
            iconURL = "public/badge-status/claim-icon.png";
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

export default BadgeStatus