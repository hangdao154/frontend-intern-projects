import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter valid email" }),
    password: z.string().min(1, { message: "Password is required" })
})

const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter valid email" }),
    password: z
        .string()
        .min(8, { message: "Password must have at least 8 characters" })
        .max(16, "Password must have no more than 16 characters."),
    confirmPassword: z.string().min(1, { message: "Please confirm password" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const verifySchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter valid email" }),
    codeId: z.string().min(1, { message: "UID is required to proceed" })
})

const forgotPasswordSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter valid email" }),
})

const resetPasswordSchema = z.object({
    otp: z.string({ message: "OTP is required" }),
    newPassword: z
        .string()
        .min(8, { message: "Password must have at least 8 characters" })
        .max(16, "Password must have no more than 16 characters"),
    confirmPassword: z.string().min(1, { message: "Please confirm password" })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const changePasswordSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter valid email" }),
    password: z.string().min(1, { message: "Current password is required" }),
    newPassword: z
        .string()
        .min(8, { message: "Password must have at least 8 characters" })
        .max(16, "Password must have no more than 16 characters"),
    confirmPassword: z.string().min(1, { message: "Please confirm password" })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


const MAX_IMG_SIZE = 5242880;
const ACCEPTED_IMG_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const addProductSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }).max(256, "Description can have a maximum of 256 characters"),
    image: z
        .any()
        // .refine((fileList) => fileList[0], "Image is required.")
        .refine(
            (fileList) => !fileList || fileList.length === 0 || fileList[0]?.size <= MAX_IMG_SIZE,
            "Max image size is 5MB"
        )
        .refine(
            (fileList) => !fileList || fileList.length === 0 || ACCEPTED_IMG_TYPES.includes(fileList[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"),
    price: z.number({ message: "Please enter valid number" }).min(0, "Price cannot be negative number"),
    salePrice: z.number({ message: "Please enter valid number" }).min(0, "Price cannot be negative number"),
    restock: z.number().min(0, { message: "Stock number cannot be negative number" }).optional(),
    shipping: z.string().optional(),
    globalDelivery: z.string().optional(),
    attributes: z.array(z.string()).optional(),
    advanced: z.object({
        productIDType: z.string(),
        productID: z.number().optional()
    }).refine(data => typeof (data.productID) === 'number', "ProductID must be vald number."),
    category: z.string().min(1, { message: "Category is required" }),
    collection: z.string(),
    tags: z.string().min(1, { message: "Tags are required" }),
    vendor: z.string().min(1, { message: "Vendor is required" }),
    size: z.string().min(1, { message: "Size is required" }),
    variants: z.object({
        brand: z.string(),
        sku: z.string(),
        color: z.string(),
    })
})

export { loginSchema, verifySchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema, addProductSchema }
export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type VerifySchema = z.infer<typeof verifySchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>
export type AddProductSchema = z.infer<typeof addProductSchema>
