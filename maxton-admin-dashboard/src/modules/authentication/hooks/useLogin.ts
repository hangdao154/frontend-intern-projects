import { useState } from "react";
import axios from "axios";
import { LoginSchema } from "../../../lib/schema";

export function useLogin() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/signin";

    const [fetchedData, setFetchedData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const postLogin = async (data: LoginSchema) => {
        console.log("Request body:", data);
        setIsLoading(true);

        try {
            const response = await axios.post(API_URL, data);
            console.log("Response from Axios: ", response);
            setFetchedData(response.data);
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

    return { isLoading, fetchedData, postLogin }
}