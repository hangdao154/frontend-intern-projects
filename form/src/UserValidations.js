import * as yup from "yup"

const loginSchema = yup.object({
    username: yup.string().required("Please enter username."),
    password: yup.string().required("Please enter password."),
});

const registerSchema = yup.object({
    username: yup.string().required("Please enter username."),
    password: yup
        .string()
        .min(8, "Password must have at least 8 characters.")
        .max(16, "Password must have no more than 16 characters.")
        .required("Please enter password."),
    confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Passwords do not match"),
});

const forgotPasswordSchema = yup.object({
    username: yup.string().required(),
});

const changePasswordSchema = yup.object({
    currentPassword: yup.string().required(),
    newPassword: yup
        .string()
        .required()
        .min(8, "Password must have at least 8 characters.")
        .max(16, "Password must have no more than 16 characters."),
    confirmPassword: yup.string().required().oneOf([yup.ref("newPassword")], "Passwords do not match"),
})

const todoSchema = yup.object({
    tasks: yup.array(
        yup.object({
            taskDescription: yup.string().required("Task description cannot be empty.")
        })
    ).max(10, "Cannot add more than 10 tasks.")
})

export { loginSchema, registerSchema, forgotPasswordSchema, changePasswordSchema, todoSchema }