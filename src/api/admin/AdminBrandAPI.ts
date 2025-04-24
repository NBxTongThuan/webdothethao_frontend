import { BrandResponse } from "../interface/Responses";

const url = "http://localhost:8080/api/admin/brands";

export const getAllBrand = async ():Promise<BrandResponse[]> => {
    try{
        const response = await fetch(`${url}/getAllBrand`);
        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

