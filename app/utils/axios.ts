import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_ORIGIN,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (request) => {
        const accessToken = getCookie("accessToken");
        
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }else{
            throw new Error("Access token not found");
        }

        return request;
    },
    (error) => {
        document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            try {
                await refreshUserToken();
                return axiosInstance(originalRequest);
            } catch (e) {
                console.log(e);
            }
        }

        return Promise.reject(error);
    }
);

export const refreshUserToken = async () => {
    try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
            throw new Error("Refresh token not found");
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/refresh`,
            { refreshToken }
        );
        console.log(response.data.data.accessToken);
        setCookie("accessToken", response.data.data.accessToken);
        setCookie("refreshToken", response.data.data.refreshTokenNew);
    } catch (error: any) {
        document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
            "profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    }
};

export default axiosInstance;
