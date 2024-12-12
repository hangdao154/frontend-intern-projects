import { useState } from "react";
import { RegisterSchema } from "../../../lib/schema";
import axios from "axios";

export function useRegister() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/signup";

    const [fetchedData, setFetchedData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const postRegister = async (data: RegisterSchema) => {
        const { firstName, lastName, password, email } = data;
        const postData = { firstName, lastName, email, password }

        try {
            console.log(postData);
            setIsLoading(true);
            const response = await axios.post(API_URL, postData);
            console.log('Response from Axios:', response);
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

    return { isLoading, fetchedData, postRegister }
}