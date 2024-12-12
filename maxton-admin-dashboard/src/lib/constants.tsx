import { MenuItem } from "./interfaces";

export const menuItems: MenuItem[] = [
    {
        key: 'ecommerce',
        label: 'eCommerce',
        icon: <span className="material-symbols-outlined">shopping_bag</span>,
        children: [
            { key: 'add-product', label: 'Add Product' },
            { key: 'products', label: 'Products' },
            { key: 'customers', label: 'Customers' },
            { key: 'orders', label: 'Orders' },
        ],
    },
    {
        key: 'authentication',
        label: 'Authentication',
        icon: <span className="material-symbols-outlined">lock</span>,
        children: [
            { key: 'login', label: 'Login' },
            { key: 'register', label: 'Register' },
            { key: 'forgot-password', label: 'Forgot Password' },
            { key: 'change-password', label: 'Change Password' },
            { key: 'logout', label: 'Logout' }
        ],
    },
]

export const authenticationFormLayouts = {
    loginForm: [
        {
            type: "text",
            name: "email",
            label: "Email"
        },
        {
            type: "password",
            name: "password",
            label: "Password"
        }
    ],

    registerForm: [
        {
            type: "text",
            name: "firstName",
            label: "First Name"
        },
        {
            type: "text",
            name: "lastName",
            label: "Last Name"
        },
        {
            type: "text",
            name: "email",
            label: "Email"
        },
        {
            type: "password",
            name: "password",
            label: "Password",
        },
        {
            type: "password",
            name: "confirmPassword",
            label: "Confirm Password"
        }
    ],

    forgotPasswordForm: [
        {
            type: "text",
            name: "email",
            label: "Email"
        }
    ],

    resetPasswordForm: [
        {
            type: "text",
            name: "otp",
            label: "OTP"
        },
        {
            type: "password",
            name: "newPassword",
            label: "New Password"
        },
        {
            type: "password",
            name: "confirmPassword",
            label: "Confirm password"

        }
    ],

    verifyForm: [
        {
            type: "text",
            name: "codeId",
            label: "Code ID"
        }
    ],

    changePasswordForm: [
        {
            type: "text",
            name: "email",
            label: "Email"
        },
        {
            type: "password",
            name: "password",
            label: "Current Password",
        },
        {
            type: "password",
            name: "newPassword",
            label: "New password"
        },
        {
            type: "password",
            name: "confirmPassword",
            label: "Confirm Password"

        }
    ]
}