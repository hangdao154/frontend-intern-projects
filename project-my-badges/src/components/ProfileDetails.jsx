export default function ProfileDetails(props) {
    // Return the slider page based on the state of the slider's page
    const { page } = props;

    // Show Progress Page
    if (page === 0) {
        return (
            <div className="profile-progress">
                <div className='box level'>
                    <div className="curr-level outline-box">Level 29</div>
                    <div className="progress-description">
                        Let's earn <img className='sm-icon' src='points-icon.png' /> 3,000 more to level up!
                    </div>
                    <div className="next-level outline-box">Level 30</div>

                    <div className="progress-bar"><span>40%</span></div>
                </div>

                <div className="box badge-collection">
                    <div className="collection-item">
                        <img className="badge-action" src="public/delete-icon.png" />
                        <img src='public/badge/badge3.png' />
                    </div>
                    <div className="collection-item">
                        <img className="badge-action" src="public/delete-icon.png" />
                        <img src='public/badge/badge4.png' />
                    </div>
                    <div className="collection-item">
                        <img src='public/badge/add-badge.png' />
                    </div>
                </div>
            </div>
        )
    }

    // Show Details Page
    return (
        <div className="box profile-details">
            <div className="item">
                <h4>Joined date</h4>
                <p>2024/07.30 10:00:00</p>
            </div>
            <div className="item">
                <img className="md-icon" src="public/social-icons/x-logo-icon.png" />
                <div>
                    <p>@vuthithanh1994</p>
                    <img className="sm-icon" src="public/extend-icon.png" />
                </div>
            </div>
            <div className="item">
                <h4>Referer</h4>
                <div>
                    <p>0xE74...b6e3</p>
                    <img className="sm-icon" src="public/copy-icon.png" />
                    <img className="sm-icon" src="public/extend-icon.png" />
                </div>
            </div>
            <div className="item">
                <img className="md-icon" src="public/social-icons/discord-logo-icon.png" />
                <p>Not connected</p>
            </div>
        </div>
    )
}