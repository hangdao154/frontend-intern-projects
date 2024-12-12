import axios, { AxiosError, AxiosResponse } from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
const accessToken = localStorage.getItem('accessToken')
// const { setNotification } = getNotiActions()

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': `bearer ${accessToken}`
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        // Do something betfore the request is sent
        return config
    },
    (error) => {
        console.error(`[request error] [${error}]`);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Do something with response data
        console.info(`[response] [${response}]`);
        return response;
    },
    (error: AxiosError) => {
        console.error(`[request error] [${error}]`);
        return Promise.reject(error);
    }
);

export default axiosInstance