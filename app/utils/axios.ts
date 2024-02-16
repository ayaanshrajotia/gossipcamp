import axios from "axios";

const instance = axios.create({
    baseURL: "https://college-khabar-backend.vercel.app/api/v1",
    withCredentials: true,
});

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.request.use(
    async (request) => {
        console.log("Interceptor ran");
        return request;
    },
    (error) => {}
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error.config);
    }
);

export default instance;
