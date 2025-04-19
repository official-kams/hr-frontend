import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {
    RefreshTokenResponse,
    ExtendedInternalAxiosRequestConfig
} from "@interfaces/gateway/ApiInterfaces";

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config as ExtendedInternalAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token found');
                }

                const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
                    `${process.env.REACT_APP_API_GATEWAY}/auth/refresh`,
                    { refreshToken }
                );

                const { accessToken } = response.data;

                localStorage.setItem('accessToken', accessToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);

                // 로그아웃 처리
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
