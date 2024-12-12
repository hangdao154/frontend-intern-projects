export default function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li>Task Center</li>
                    <li>
                        <select>
                            <option>Stake&Earn</option>
                        </select>
                    </li>
                    <li>
                        <select>
                            <option>NFT</option>
                        </select>
                    </li>
                    <li>Leaderboard</li>
                </ul>
            </nav>

            <div className="profile-nav">
                <div className="choose-language">
                    <select className="selector">
                        <option>Japanese</option>
                    </select>
                </div>
                <img className="md-icon" src="public/bell-icon.png" />
                <div className="outline-box">
                    <img className="sm-icon" src="public/user-ava.png" />
                    <p>0xE74...b6e3</p>
                </div>
            </div>
        </>
    )
}