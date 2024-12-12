import { useState } from "react";
import { ForgotPasswordSchema } from "../../../lib/schema";
import axios from "axios";

export function useForgotPassword() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/forget-password";

    const [fetchedData, setFetchedData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const postForgot = async (data: ForgotPasswordSchema) => {
        try {
            setIsLoading(true);
            const response = await axios.post(API_URL, data);
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


    return { isLoading, fetchedData, postForgot }
}