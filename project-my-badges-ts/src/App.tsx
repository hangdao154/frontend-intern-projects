import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Points from './components/Points'
import ProfileDetails from './modules/my-profile/components/ProfileDetails'
import TaskSection from './modules/my-profile/components/TaskSection'

function App() {
  // For track top sliding page
  const [profilePage, setProfilePage] = useState<number>(0);

  // For tracking task page
  const [taskPage, setTaskPage] = useState<number>(0);

  // Tracking the status of currently active buttons
  const [activeTaskBtn, setActiveTaskBtn] = useState<number>(0);

  return (
    <>
      <Header></Header>

      <section className="middle">
        <section className="welcome">
          <h1>Welcome, 0xE74...b6e3!</h1>
          <button>
            <img src="src/assets/link-icon.png" />
            <p>View Referal Link</p>
          </button>
        </section>

        <section className="container top">
          <div className="profile-main">
            <div className="left">
              <img src="src/assets/level-badge.png" />
              <h2>29</h2>
            </div>

            <div className="right">
              <div>
                <h3>0X97c4...F469</h3>
                <img className="sm-icon" src="src/assets/copy-icon.png" />
              </div>
              <Points point={1000000}></Points>
            </div>
          </div>

          <hr />

          <div className="slider">
            <ProfileDetails page={profilePage}></ProfileDetails>

            <div className="slider-buttons">
              <button className={profilePage === 0 ? "active" : ""} onClick={() => setProfilePage(0)}></button>
              <button className={profilePage === 1 ? "active" : ""} onClick={() => setProfilePage(1)}></button>
            </div>
          </div>
        </section>

        <section className="container tasks">
          <ul className="task-buttons">
            <li className={activeTaskBtn === 0 ? "active-button" : ""} onClick={() => {
              setActiveTaskBtn(0);
              setTaskPage(0);
            }}>My Badges<img className="sm-icon inline-icon" src="src/assets/question-icon.png" /></li>

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
