import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationComponent from './modules/authentication/components/AuthenticationComponent.tsx'
import LoginForm from './modules/authentication/components/forms/LoginForm.tsx'
import RegisterForm from './modules/authentication/components/forms/RegisterForm.tsx'
import ForgotPasswordForm from './modules/authentication/components/forms/ForgotPasswordForm.tsx'
import ChangePasswordForm from './modules/authentication/components/forms/ChangePasswordForm.tsx'
import VerifyForm from './modules/authentication/components/forms/VerifyForm.tsx'
import ResetPasswordForm from './modules/authentication/components/forms/ResetPasswordForm.tsx'
import ProductsTab from './modules/ecommerce/components/ProductsTab.tsx'
import AddProductTab from './modules/ecommerce/components/AddProductTab.tsx'
import CustomersTab from './modules/ecommerce/components/CustomersTab.tsx'
import OrdersTab from './modules/ecommerce/components/OrdersTab.tsx'
import CustomerDetails from './modules/ecommerce/components/CustomerDetails.tsx'
import OrderDetails from './modules/ecommerce/components/OrderDetails.tsx'
import Countdown from './modules/authentication/components/Countdown.tsx'
import TestProductsTab from './modules/test/components/TestProductsTab.tsx'

const test = {
  "tags": [
    "COTTON",
    "Shoes",
    "white"
  ],
  "title": "LightX Shoes",
  "description": "A pair of LightX shoes.",
  "image": {
    "0": {}
  },
  "price": 59,
  "salePrice": 75,
  "restock": 100,
  "advanced": {
    "productIDType": "ISBN",
    "productID": 2003
  },
  "category": "topwear",
  "collection": "men",
  "vendor": "zara",
  "variants": {
    "brand": "",
    "sku": "",
    "color": "",
    "size": ""
  }
}

const router = createBrowserRouter([
  {
    path: "/test",
    element:
      <App>
        <TestProductsTab pageInfo={{ key: 'products', keyPath: ['products', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/countdown",
    element:
      <Countdown time={60} />
  },
  {
    path: "/",
    element:
      <App>
        <ProductsTab pageInfo={{ key: 'products', keyPath: ['products', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/products",
    element:
      <App>
        <ProductsTab pageInfo={{ key: 'products', keyPath: ['products', 'ecommerce'] }} />
      </App>

  },
  {
    path: "/add-product",
    element:
      <App>
        <AddProductTab pageInfo={{ key: 'add-product', keyPath: ['add-product', 'ecommerce'] }} />
      </App>

  },
  {
    path: "/update-product/:id",
    element:
      <App>
        <AddProductTab pageInfo={{ key: 'update-product', keyPath: ['update-product', 'ecommerce'] }} />
      </App>

  },
  {
    path: "/customers",
    element:
      <App>
        <CustomersTab pageInfo={{ key: 'customers', keyPath: ['customers', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/customer-details/:id",
    element:
      <App>
        <CustomerDetails pageInfo={{ key: 'customer-details', keyPath: ['customer-details', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/orders",
    element:
      <App>
        <OrdersTab pageInfo={{ key: 'orders', keyPath: ['orders', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/order-details/:id",
    element:
      <App>
        <OrderDetails pageInfo={{ key: 'order-details', keyPath: ['order-details', 'ecommerce'] }} />
      </App>
  },
  {
    path: "/login",
    element:
      <AuthenticationComponent>
        <LoginForm />
      </AuthenticationComponent>
  },
  {
    path: "/register",
    element:
      <AuthenticationComponent>
        <RegisterForm />
      </AuthenticationComponent>
  },
  {
    path: "/verify",
    element:
      <AuthenticationComponent>
        <VerifyForm />
      </AuthenticationComponent>
  },
  {
    path: "/forgot-password",
    element:
      <AuthenticationComponent>
        <ForgotPasswordForm />
      </AuthenticationComponent>
  },
  {
    path: "/reset-password",
    element:
      <AuthenticationComponent>
        <ResetPasswordForm />
      </AuthenticationComponent>
  },
  {
    path: "/change-password",
    element:
      <AuthenticationComponent>
        <ChangePasswordForm />
      </AuthenticationComponent>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
