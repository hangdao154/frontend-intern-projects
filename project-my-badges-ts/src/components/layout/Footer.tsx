export default function Footer() {
    return (
        <footer>
            <div className='left'>
                <ul>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>About Us</li>
                    <li>FAQ</li>
                </ul>
                <p className="subtext">Copyright © 2024 FiNANCiE, Inc</p>
            </div>

            <div className="right">
                <img className='lg-icon' src='src/assets/social-icons/x-logo-black.png' />
                <img className='lg-icon' src='src/assets/social-icons/tele-logo-black.png' />
                <img className='lg-icon' src='src/assets/social-icons/discord-logo-black.png' />
            </div>
        </footer>
    )
}