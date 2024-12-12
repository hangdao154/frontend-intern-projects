import { useState } from 'react'
import TaskSection from './components/TaskSection';
import Header from './components/Header'
import Footer from './components/Footer'
import ProfileDetails from './components/ProfileDetails';
import Points from './components/Points';

function App() {
    // For track top sliding page
    const [profilePage, setProfilePage] = useState(0);

    // For tracking task page
    const [taskPage, setTaskPage] = useState(0);

    // Tracking the status of currently active buttons
    const [activeTaskBtn, setActiveTaskBtn] = useState(0);

    return (
        <>
            <Header></Header>

            <section className="middle">
                <section className="welcome">
                    <h1>Welcome, 0xE74...b6e3!</h1>
                    <button>
                        <img src="public/link-icon.png" />
                        <p>View Referal Link</p>
                    </button>
                </section>

                <section className="container top">
                    <div className="profile-main">
                        <div className="left">
                            <img src="public/level-badge.png" />
                            <h2>29</h2>
                        </div>

                        <div className="right">
                            <div>
                                <h3>0X97c4...F469</h3>
                                <img className="sm-icon" src="public/copy-icon.png" />
                            </div>
                            <Points point="1,000,000"></Points>
                        </div>
                    </div>

                    <hr />

                    <div className="slider">
                        <ProfileDetails page={profilePage}></ProfileDetails>

                        <div className="slider-buttons">
                            <button className="active" onClick={(e) => {
                                setProfilePage(0);
                                if (!e.target.classList.contains("active")) {
                                    e.target.classList.add("active");
                                }
                                const secondButton = document.querySelector(".slider-buttons").lastChild;
                                if (secondButton.classList.contains("active")) {
                                    secondButton.classList.remove("active");
                                }
                            }}></button>

                            <button onClick={(e) => {
                                setProfilePage(1);
                                if (!e.target.classList.contains("active")) {
                                    e.target.classList.add("active");
                                }
                                const firstButton = document.querySelector(".slider-buttons").firstChild;
                                if (firstButton.classList.contains("active")) {
                                    firstButton.classList.remove("active");
                                }
                            }}></button>
                        </div>
                    </div>
                </section>

                <section className="container tasks">
                    <ul className="task-buttons">
                        <li className={activeTaskBtn === 0 ? "active-button inline-icon" : ""} onClick={() => {
                            setActiveTaskBtn(0);
                            setTaskPage(0);
                        }}>My Badges<img className="sm-icon inline-icon" src="public/question-icon.png" /></li>

                        <li className={activeTaskBtn === 1 ? "active-button" : ""} onClick={() => {
                            setActiveTaskBtn(1);
                            setTaskPage(1);
                        }}>Friend List</li>

                        <li className={activeTaskBtn === 2 ? "active-button" : ""} onClick={() => {
                            setActiveTaskBtn(2);
                            setTaskPage(2);
                        }}>Point History</li>
                    </ul>

                    <TaskSection page={taskPage}></TaskSection>
                </section>
            </section>

            <Footer></Footer>
        </>
    )
}

export default App
