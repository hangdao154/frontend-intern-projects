import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.tsx'
import TestCheckbox from './components/TestCheckbox.tsx'

const headers = ["A", "B", "C", "D", "E", "F", "G"];

const router = createBrowserRouter([{
  path: "/test-checkbox",
  element: <TestCheckbox headers={headers}/>
}, {
  path: "/",
  element: <App/>
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
