import axios from "axios";
import { useState } from "react";

export function useReVerify() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/re-verify";

    const [fetchedData, setFetchedData] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>();

    const postReVerify = async (email: string) => {
        const postData = { email };
        try {
            console.log(email);
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


    return { isLoading, fetchedData, postReVerify }
}