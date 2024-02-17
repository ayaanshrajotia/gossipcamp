import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://college-khabar-backend.vercel.app/api/v1",
});

axiosInstance.interceptors.request.use(
    async (request) => {
        const accessToken = localStorage?.getItem("accessToken");
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        // request.withCredentials = true;
        return request;
    },
    (error) => {}
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
                const refreshToken = localStorage?.getItem("refreshToken");
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/users/refresh`,
                    { refreshToken }
                );
                localStorage.setItem(
                    "accessToken",
                    response.data.data.accessToken
                );
                localStorage.setItem(
                    "refreshToken",
                    response.data.data.refreshToken
                );
                return axiosInstance(originalRequest);
            } catch (error: any) {
                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
