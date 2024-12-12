import { useState } from "react";
import { GetCustomerQueries, Customer } from "../../../lib/interfaces";
import axios from "axios";

export default function useCustomers() {
    const API_URL = import.meta.env.VITE_BASE_URL + "/users";

    const [fetchedPages, setFetchedPages] = useState<number>()
    const [fetchedData, setFetchedData] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchedMsg, setFetchedMsg] = useState<{ code: number, msg: string}>()

    const getCustomers = async (params?: GetCustomerQueries) => {
        console.log(params);

        setIsLoading(true)
        const searchParams: URLSearchParams = new URLSearchParams();
        if (params) {
            const keys = Object.keys(params);
            keys.forEach(key => {
                if (params[key as keyof GetCustomerQueries] !== undefined) {
                    searchParams.append(key, String(params[key as keyof GetCustomerQueries]))
                }
            });
        }

        const url = `${API_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
        console.log(url);
        const token = localStorage.getItem('accessToken');

        if (token) {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `bearer ${token}`,
                    }
                });
                console.log("Axios response:", response);
                setFetchedData(() => {
                    
                    const newData: any = {...response.data.data};
                    console.log('New Data', newData);
                    newData.users.forEach((user: Customer) => {
                        user.name = user.firstName + " " + user.lastName;
                    })
                    return newData;
                });
                console.log("Axios Users: ", response.data.data.users);
                setFetchedPages(response.data.data.pages);
                setFetchedMsg({
                    code: response.status,
                    msg: response.data.message
                })
                setIsLoading(false);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setFetchedMsg({
                        code: error.request.status,
                        msg: error.message
                    })
                    throw error;
                } else {
                    throw new Error('different error than axios');
                }
            }
        } else {
            setFetchedMsg({
                code: 401,
                msg: "Unauthorzied",
            })
        }
    }

    const getCustomerByID = async (id: string) => {
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
                    throw new Error('different error than axios');
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

    return { isLoading, fetchedData, fetchedMsg, getCustomers, fetchedPages, getCustomerByID }
}