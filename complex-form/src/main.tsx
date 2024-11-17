import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.tsx'
import TestForm from './components/TestForm.tsx'

const router = createBrowserRouter([{
  path: "/test",
  element: <TestForm />
}, {
  path: "/",
  element: <App />
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
