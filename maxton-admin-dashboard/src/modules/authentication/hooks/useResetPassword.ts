import { useState } from "react";
import { ResetPasswordSchema } from "../../../lib/schema";
import axios from "axios";

export function useResetPassword() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/reset-password";

    const [fetchedData, setFetchedData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const postResetPassword = async (data: ResetPasswordSchema) => {
        try {
            const { otp, newPassword } = data;
            const postData = { otp: otp, password: newPassword };
            console.log(postData);
            setIsLoading(true);
            const response = await axios.post(API_URL, postData);
            console.log('Response from Axios: ', response);
            setFetchedData(response.data)
            setIsLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                setFetchedData(error.response?.data)
            } else {
                throw new Error('different error than axios');
            }
        }
    }

    return { isLoading, fetchedData, postResetPassword }
}