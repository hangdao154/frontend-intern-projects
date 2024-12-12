import { useState } from "react";
import { GetOrderQueries } from "../../../lib/interfaces";
import axios from "axios";

export default function useOrders() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/orders";

    const [fetchedData, setFetchedData] = useState<any>()
    const [fetchedMsg, setFetchedMsg] = useState<{ code: number, msg: string }>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getOrders = async (params?: GetOrderQueries) => {
        console.log('Getting orders...')
        setIsLoading(true)

        const searchParams: URLSearchParams = new URLSearchParams()
        if (params) {
            for (const [key, val] of Object.entries(params)) {
                searchParams.append(key, String(val))
            }
        }

        const url = `${API_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ``}`
        const token = localStorage.getItem(`accessToken`);

        if (token) {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `bearer ${token}`,
                    }
                });
                console.log("Axios response:", response);
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
                } else {
                    throw new Error('Different error than axios');
                }
            }
            setIsLoading(false)
        } else {
            setFetchedMsg({
                code: 401,
                msg: "Unauthorzied",
            })
        }
    }

    const getOrderByID = async (id: string) => {
        setIsLoading(true);
        const url = API_URL + `/${id}`;
        const token = localStorage.getItem('accessToken');

        if (token) {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `bearer ${token}`,
                    }
                });
                console.log("Axios response:", response);
                setFetchedData(response.data.data);
                setFetchedMsg({
                    code: response.status,
                    msg: response.data.message
                })

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setFetchedMsg({
                        code: error.request.status,
                        msg: error.message
                    })
                    throw error;
                } else {
                    throw new Error('Different error than axios');
                }
            }
            setIsLoading(false);
        } else {
            setFetchedMsg({
                code: 401,
                msg: "Unauthorzied",
            })
        }
    }

    return { isLoading, fetchedData, fetchedMsg, getOrders, getOrderByID }
}