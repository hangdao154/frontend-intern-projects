import { useState } from "react";
import { VerifySchema } from "../../../lib/schema";
import axios from "axios";

export function useVerify() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/auth/verify";

    const [fetchedData, setFetchedData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

    const postVerify = async (data: VerifySchema) => {
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

    return { isLoading, fetchedData, postVerify }
}