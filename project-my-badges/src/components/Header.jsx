import React from 'react'
import NavBar from './NavBar'

export default function Header() {
    // Showing / Hiding the hamburger navbar
    const handleShowNav = () => {
        const navBar = document.querySelector("header .right");
        navBar.classList.contains("visible") ? navBar.classList.remove("visible")
            : navBar.classList.add("visible");
    }

    return (
        <header>
            <div className="left">
                <img className="web-logo" src="public/svg/web-logo.svg" />
            </div>

            <div className="right">
                <NavBar></NavBar>
            </div>

            <img className="md-icon hamburger-button" src="public/hamburger-menu.png" onClick={handleShowNav} />
        </header>
    )
}