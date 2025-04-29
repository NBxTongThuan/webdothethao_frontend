import { TypesResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/types';

interface responseData {
    totalPage: number;
    listTypes: TypesResponse[],
    totalSize: number
}

export const getAllType = async (page:number, size:number):Promise<responseData> =>{

    try 
    {
        const response = await fetch(`${API_URL}/getAllType?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        
        if(!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const listTypes = data._embedded?.typeResponseList;

        if (!listTypes || listTypes.length === 0) {
            return {
                totalPage: 0,
                listTypes: [],
                totalSize: 0
            };
        }

        const types: TypesResponse[] = listTypes.map((type: TypesResponse) => ({
            typeId:type.typeId,
            typeName:type.typeName,
            enable:type.enable,
            categoryName:type.categoryName
        }));
        return {
            totalPage: data.page.totalPages,
            listTypes: types,
            totalSize: data.page.totalElements
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

}

export const getTypeByCategoryName = async (categoryName:string):Promise<TypesResponse[]> =>{

    try
    {
        const  response = await fetch(`${API_URL}/getTypeByCategoryName?categoryName=${categoryName}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if(!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch(error)
    {
        console.error('Error fetching orders:', error);
        throw error;
    }
}
