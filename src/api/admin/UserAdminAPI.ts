import { UserResponse, UserStatsResponse } from "../interface/Responses";

const url = "http://localhost:8080/api/users";

export const getUserStats = async (): Promise<UserStatsResponse> => {
    const response = await fetch(`${url}/stats`);
    return response.json();

}

interface responseData {
    totalPage: number;
    listUser: UserResponse[],
    totalSize: number
}


export const getUserList = async (page: number, size: number): Promise<responseData> => {
    const response = await fetch(`${url}/allUser?page=${page}&size=${size}`,
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

    console.log(users);

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

