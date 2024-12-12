import { useState } from "react";
import { ChangePasswordSchema } from "../../../lib/schema";
import axios from "axios";

export function useChangePassword() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/change-password";

    const [fetchedData, setFetchedData] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>();

    const postChangePassword = async (data: ChangePasswordSchema) => {
        const { email, password, newPassword } = data;
        const postData = { email, password, newPassword };
        const token = localStorage.getItem('accessToken');
        console.log("Post data:", postData);
        console.log("Token:", token);
        
        
        if (token) {
            try {
                const { email, password, newPassword } = data;
                const postData = { email, password, newPassword };
                setIsLoading(true);
                const response = await axios.post(API_URL, postData, {
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                });
                console.log('Response from Axios: ', response);
                setFetchedData(response.data);
                setIsLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error);
                    setFetchedData(error.response?.data);
                } else {
                    throw new Error('different error than axios');
                }
            }
        }
    }

    return { isLoading, fetchedData, postChangePassword }
}