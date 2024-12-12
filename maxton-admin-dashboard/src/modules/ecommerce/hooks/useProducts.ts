import { useState } from "react";
import { GetProductQueries } from "../../../lib/interfaces";
import axios from "axios";
import axiosInstance from "../../../services/apiService";

export default function useProducts() {
    const API_URL = "products";

    const [fetchedData, setFetchedData] = useState<any>()
    const [fetchedMsg, setFetchedMsg] = useState<{ code: number, msg: string }>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const token = localStorage.getItem('accessToken');

    const getProducts = async (params?: GetProductQueries) => {
        setIsLoading(true)
        console.log('Getting products...', params);
        const searchParams: URLSearchParams = new URLSearchParams();
        if (params) {
            const keys = Object.keys(params);
            keys.forEach(key => {
                if (params[key as keyof GetProductQueries] !== undefined) {
                    searchParams.append(key, String(params[key as keyof GetProductQueries]))
                }
            });
        }

        const url = `${API_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

        try {
            const response = await axiosInstance.get(url);
            setFetchedData(response.data.data);
            setFetchedMsg({
                code: response.data.statusCode,
                msg: response.data.message,
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFetchedMsg({
                    code: error.request.status,
                    msg: error.message
                })
                throw error;
            }
        }

        setIsLoading(false);
    }

    const getProductByID = async (id: string) => {
        setIsLoading(true);

        try {
            console.log("Trying to get product by ID...");

            const response = await axiosInstance.get(`${API_URL}/${id}`);
            setFetchedData(response.data.data);
            setFetchedMsg({
                code: response.data.statusCode,
                msg: response.data.message
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFetchedMsg({
                    code: error.request.status,
                    msg: error.message
                })
                throw error;
            }
        }

        setIsLoading(false);
    }

    const createProduct = async (data: any) => {
        console.log('Sent data:', data);
        setIsLoading(true)

        try {
            const response = await axiosInstance.post(API_URL, data, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setFetchedData(response.data.data);
            setFetchedMsg({
                code: response.status,
                msg: response.data.message,
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFetchedMsg({
                    code: error.request.status,
                    msg: error.message
                })
                throw error;
            }
        }

        setIsLoading(false);
    }

    const updateProduct = async (id: string, data: any) => {
        console.log('Sent data:', data);
        const url = `${API_URL}/${id}`;
        setIsLoading(true)

        try {
            const response = await axiosInstance.patch(url, data, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Axios Data: ", response.data);
            setFetchedData(response.data.data);
            setFetchedMsg({
                code: response.status,
                msg: response.data.message,
            })
            setIsLoading(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setFetchedMsg({
                    code: error.request.status,
                    msg: error.message
                })
                throw error;
            }
        }
    }

    const deleteProduct = async (id: string | undefined) => {
        console.log("Is deleting...");

        const url = `${API_URL}/${id}`;
        setIsLoading(true)

        if (id) {
            try {
                const response = await axios.delete(url, {
                    headers: {
                        'Authorization': `bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                console.log("Axios Data: ", response.data);
                setFetchedData(response.data.data);
                setIsLoading(false);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setFetchedMsg({
                        code: error.request.status,
                        msg: error.message
                    })
                    throw error;
                }
            }
        }
    }

    return { isLoading, fetchedData, fetchedMsg, getProducts, getProductByID, updateProduct, createProduct, deleteProduct }
}
