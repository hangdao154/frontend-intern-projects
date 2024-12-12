import { useRef, useState } from 'react'
import FormComponent from './components/FormComponent'
import { set } from 'react-hook-form'
import Header from './components/Header'
import { loginSchema, registerSchema, forgotPasswordSchema, changePasswordSchema, todoSchema } from './UserValidations.js'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { userL } from "./UserList.js"
import TodoList from './components/TodoList.jsx'

function App() {
  /*================= FORM LAYOUT =================*/
  const loginForm = [
    {
      type: "text",
      name: "username",
      label: "Username"
    }, {
      type: "password",
      name: "password",
      label: "Password"
    }
  ]
  const registerForm = [
    {
      type: "text",
      name: "username",
      label: "Username"
    }, {
      type: "password",
      name: "password",
      label: "Password",
    }, {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password"
    }
  ]
  const forgotPasswordForm = [
    {
      type: "text",
      name: "username",
      label: "Username"
    }
  ]
  const changePasswordForm = [
    {
      name: "currentPassword",
      label: "Current Password",
    }, {
      name: "newPassword",
      label: "New password"
    }, {
      name: "confirmPassword",
      label: "Confirm Password"
    }
  ]
  /*==============================================*/

  const [page, setPage] = useState("LOGIN")
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChangeLoggedInUser = (index) => {
    setLoggedInUser(index);
  }

  const handleChangePage = (page, msg) => {
    setMessage(msg);
    setPage(page);
  }

  const handleLogInUser = (data) => {
    console.log("Trying to loggin....Current data:");
    console.log(data);

    for (let i = 0; i < userL.length; i++) {
      if ((userL[i].username === data.username) && (userL[i].password === data.password)) {
        handleChangeLoggedInUser(i);
        console.log((`Logged in as ${userL[i].username}`));

        setMessage(`Logged in as ${userL[i].username}`);
        return;
      }
    }

    setMessage("Wrong username or password.");
  }

  const handleRegisterUser = (data) => {
    console.log("Trying to register...Current data:");
    console.log(data);

    for (let i = 0; i < userL.length; i++) {
      if (data.username === userL[i].username) {   // Username already exists
        setMessage(`User already exists with username: ${userL[i].username}`);
        return;
      }
    }

    // Add new user
    userL.push({ username: data.username, password: data.password });
    console.log(userL);
    setMessage("New account created success.");

  }

  const handleForgotPassword = (data) => {
    for (let i = 0; i < userL.length; i++) {
      if (data.username === userL[i].username) {   // Username found
        setMessage(`Your password is: ${userL[i].password}`);
        return;
      }
    }
    setMessage("Couldn't find that username.");
  }

  const handleChangePassword = (data) => {
    if (data.currentPassword !== userL[loggedInUser].password) {
      setMessage("Current password isn't correct.")
    } else {
      userL[loggedInUser].password = data.newPassword;
      setMessage(`Changed ${userL[loggedInUser].username}'s password to ${data.newPassword}.`)
    }
  }

  const handleChangeForm = (page) => {
    switch (page) {
      case "LOGIN": {
        return (
          <>
            {console.log(userL)}
            <h1>LOGIN</h1>
            {(message) && <p style={{ color: 'rgb(22, 119, 255)' }}>{message}</p>}
            <FormComponent formLayout={loginForm} data={userL} schema={loginSchema} formHandlers={handleLogInUser} />
          </>
        )
      }

      case "REGISTER": {
        return (
          <>
            {console.log(userL)}
            <h1>REGISTER</h1>
            {(message) && <p style={{ color: 'rgb(22, 119, 255)' }}>{message}</p>}
            <FormComponent formLayout={registerForm} data={userL} schema={registerSchema} formHandlers={handleRegisterUser} />
          </>
        )
      }

      case "FORGOT-PASSWORD": {
        return (
          <>
            {console.log(userL)}
            <h1>FORGOT PASSWORD</h1>
            {(message) && <p style={{ color: 'rgb(22, 119, 255)' }}>{message}</p>}
            <FormComponent formLayout={forgotPasswordForm} schema={forgotPasswordSchema} formHandlers={handleForgotPassword} />
          </>
        )
      }

      case "CHANGE-PASSWORD": {
        console.log(loggedInUser);

        if (loggedInUser === null) {
          handleChangePage("LOGIN", "Not logged in, switched to Login page.");
        }

        return (
          <>
            <h1>CHANGE PASSWORD</h1>
            {(message) && <p style={{ color: 'rgb(22, 119, 255)' }}>{message}</p>}
            <FormComponent formLayout={changePasswordForm} schema={changePasswordSchema} formHandlers={handleChangePassword} />
          </>
        )
      }

      default: {
        // if (loggedInUser === null) {
        //   handleChangePage("LOGIN", "Not logged in, switched to Login page.");
        // }

        return (
          <>
            <h1>TODO-LIST</h1>
            <TodoList schema={todoSchema}></TodoList>
          </>
        )
      }
    }
  }


  return (
    <>
      <Header handleChangePage={handleChangePage}></Header>
      <div className="form-section">{handleChangeForm(page)}</div>
    </>
  )
}

export default App
