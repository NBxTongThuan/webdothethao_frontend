import { UserStatsResponse } from "../interface/Responses";

const url = "http://localhost:8080/api/users";

export const getUserStats = async (): Promise<UserStatsResponse> => {
    const response = await fetch(`${url}/stats`);
    return response.json();

}

