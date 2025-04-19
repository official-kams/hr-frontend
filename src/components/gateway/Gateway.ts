import { AxiosResponse } from "axios";
import api from "@components/gateway/Interceptors";
import {
    ApiResponse,
    SessionResponse,
    SessionResult
} from "@interfaces/gateway/ApiInterfaces";

const baseUrl = process.env.REACT_APP_API_GATEWAY;

// GET 요청 함수
export const get = async <T = any>(path: string, opts?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await api.get(baseUrl + path, {
            params: opts,
        });

        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
        };
    } catch (error: any) {
        console.error("GET 요청 에러:", error);

        return {
            data: null,
            status: error.response?.status ?? 500,
        };
    }
};

// POST 요청 함수
export const post = async <T = any>(path: string, payload?: any): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<T> = await api.post(baseUrl + path, payload);

        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
        };
    } catch (error: any) {
        console.error("POST 요청 에러:", error);

        return {
            data: null,
            status: error.response?.status ?? 500,
        };
    }
};

// 세션 확인 함수
export const session = async (): Promise<SessionResult> => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const { data } = await api.post<SessionResponse>(
            baseUrl + "/auth/session",
            { accessToken }
        );

        return {
            isLogin: data.status,
            userName: data.name,
            userCode: data.userCode,
            role: data.role,
        };
    } catch (error) {
        console.error("세션 확인 실패:", error);
        return {
            isLogin: false,
            userName: '',
            userCode: '',
            role: '',
        };
    }
};
