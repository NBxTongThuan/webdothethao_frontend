import { UserInfoResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/auth/me';

export const getUserInfo = async (): Promise<UserInfoResponse> => {
    const response = await fetch(API_URL, {
        credentials: 'include'
    });
    const data = await response.json();
    return data;
}