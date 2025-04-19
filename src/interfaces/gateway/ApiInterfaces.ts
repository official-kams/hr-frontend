import {InternalAxiosRequestConfig} from "axios";

// 응답 타입 정의
export interface ApiResponse<T = any> {
    data: T | null;
    status: number;
}

// 리프레시 토큰 응답 타입 정의
export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken?: string;
}

// 세션 응답 타입 정의
export interface SessionResponse {
    status: boolean;
    name: string;
    userCode: string;
    role: string;
}

// 세션 결과 타입 정의
export interface SessionResult {
    isLogin: boolean;
    userName: string;
    userCode: string;
    role: string;
}

export interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
