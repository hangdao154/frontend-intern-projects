import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Points from './components/Points'
import ProfileDetails from './modules/my-profile/components/ProfileDetails'
import TaskSection from './modules/my-profile/components/TaskSection'

const tabs = [
  {
    key: 0,
    label: "My Badges"
  },
  {
    key: 1,
    label: "Friend List"
  },
  {
    key: 2,
    label: "Point History"
  }
]

function App() {


  // Set all badges
  // useEffect(() => {
  //     actions.setBadges();
  // }, [])
  // const allBadges = getAllBadges();
  // console.log("All badges store:");
  // console.log(allBadges);


  // For track top sliding page
  const [profilePage, setProfilePage] = useState<number>(0);

  // For tracking task page
  const [taskPage, setTaskPage] = useState<number>(0);

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
            {tabs.map(tab => (
              <li key={tab.key} className={taskPage === tab.key ? "active-button" : ""} onClick={() => {
                setTaskPage(tab.key);
              }}>
                {tab.label}
                {tab.key === 0 && (<img className="sm-icon inline-icon" src="src/assets/question-icon.png" />)}
              </li>
            ))}
          </ul>

          <TaskSection page={taskPage}></TaskSection>
        </section>
      </section>

      <Footer></Footer>
    </>
  )
}

export default App
