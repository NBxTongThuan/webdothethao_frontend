import UserDetailModel from "../../model/UserDetailModel";
import { TopBuyerResponse, UserResponse, UserStatsResponse } from "../interface/Responses";
import requestAPI from "../user/RequestApi";

const url = "http://localhost:8080/api/admin/users";

export const getUserStats = async (): Promise<UserStatsResponse> => {
    const response = await fetch(`${url}/stats`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return response.json();

}

interface responseData {
    totalPage: number;
    listUser: UserResponse[],
    totalSize: number
}


export const getUserList = async (page: number, size: number): Promise<responseData> => {
    const response = await fetch(`${url}/all?page=${page}&size=${size}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await response.json();

    
    const users = data._embedded?.userResponseList;


    if (!users || users.length === 0) {
        return {
            totalPage: 0,
            listUser: [],
            totalSize: 0
        };
    }

    const list: UserResponse[] = users.map((user: UserResponse) => ({ 
        userId: user.userId,
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active,
        createdDate: user.createdDate,
        enable: user.enable
    }));
    return {
        totalPage: data.page.totalPages,
        listUser: list,
        totalSize: data.page.totalElements
    };
}


export async function adminGetUserDetail(userName: string): Promise<UserDetailModel> {
    const link: string = `http://localhost:8080/api/admin/user-detail/get-by-name?userName=${userName}`;

    const response = await requestAPI(link,true);

    const responseDATA = response;

    const userDetail: UserDetailModel = new UserDetailModel(
        responseDATA.userDetailId,
        responseDATA.firstName,
        responseDATA.lastName,
        responseDATA.gender,
        responseDATA.dateOfBirth,
        responseDATA.phoneNumber,
        responseDATA.province,
        responseDATA.district,
        responseDATA.ward,
        responseDATA.address
    );      

    return userDetail;
}

export const getTopBuyer = async (): Promise<TopBuyerResponse[]> => {
    const response = await fetch(`${url}/top-buyer?page=0&size=5`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch top buyer");
    }

    const data = await response.json();

    const listTopBuyer = data._embedded?.topBuyerResponseList;

    if (!listTopBuyer || listTopBuyer.length === 0) {
        return [];
    }

    const topBuyer: TopBuyerResponse[] = listTopBuyer.map((item:any) => ({
        user: {
            userId: item?.userResponse?.userId,
            username: item?.userResponse?.username,
            email: item?.userResponse?.email,
            role: item?.userResponse?.role,
            active: item?.userResponse?.active,
            createdDate: item?.userResponse?.createdDate,
            enable: item?.userResponse?.enable
        },
        totalBuy: item.totalBuy
    }));

    return topBuyer;
}

