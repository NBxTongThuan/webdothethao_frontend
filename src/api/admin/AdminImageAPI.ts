import { ImageResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/image';

export const getAllImage = async (productId: string): Promise<ImageResponse[]> => {
    const response = await fetch(`${API_URL}/getAllImage?productId=${productId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();
    return data;
};


