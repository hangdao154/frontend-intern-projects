import { BadgeListItem } from "../../../interfaces";
import { getActions, getPinnedBadges } from "../../../store/my-profile/selector";
import { State } from "../../../store/my-profile/useMyProfileStore";

interface Props {
    page: number
}

export default function ProfileDetails(props: Props) {
    // Return the slider page based on the state of the slider's page
    const { page } = props;
    const pinnedBadges: State['pinnedBadges'] = getPinnedBadges();
    const { setPinnedBadges } = getActions()

    console.log(pinnedBadges);

    // Show Progress Page
    if (page === 0) {
        const handleUnpinBadge = (pinnedBadges: State['pinnedBadges'], badgeToUnpin: BadgeListItem) => {
            if (badgeToUnpin) {
                const newPinnedBadges: State['pinnedBadges'] = [...pinnedBadges];
                newPinnedBadges[newPinnedBadges.indexOf(badgeToUnpin)] = null;
                return newPinnedBadges;
            }
            return pinnedBadges;
        }

        const handleDisplayCollection = (item: BadgeListItem | null) => {
            if (item) {
                return (
                    <>
                        <img className="badge-action" src="src/assets/delete-icon.png" onClick={() => { setPinnedBadges(handleUnpinBadge(pinnedBadges, item)) }} />
                        <img src={item.badgeImg} />
                    </>
                )
            } else {
                return (<img src='src/assets/badge/add-badge.png' />)
            }
        }

        return (
            <div className="profile-progress">
                <div className='box level'>
                    <div className="curr-level outline-box">Level 29</div>
                    <div className="progress-description">
                        Let's earn <img className='sm-icon' src='src/assets/points-icon.png' /> 3,000 more to level up!
                    </div>
                    <div className="next-level outline-box">Level 30</div>

                    <div className="progress-bar"><span>40%</span></div>
                </div>

                <div className="box badge-collection">
                    {pinnedBadges.map((item, index) => (
                        <div key={index} className="collection-item">
                            {handleDisplayCollection(item)}
                        </div>
                    ))}
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
                <img className="md-icon" src="src/assets/social-icons/x-logo-icon.png" />
                <div>
                    <p>@vuthithanh1994</p>
                    <img className="sm-icon" src="src/assets/extend-icon.png" />
                </div>
            </div>
            <div className="item">
                <h4>Referer</h4>
                <div>
                    <p>0xE74...b6e3</p>
                    <img className="sm-icon" src="src/assets/copy-icon.png" />
                    <img className="sm-icon" src="src/assets/extend-icon.png" />
                </div>
            </div>
            <div className="item">
                <img className="md-icon" src="src/assets/social-icons/discord-logo-icon.png" />
                <p>Not connected</p>
            </div>
        </div>
    )
}