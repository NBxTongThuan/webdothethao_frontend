import { CategoryResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/categories';

interface responseData {
    totalPage: number;
    listCategories: CategoryResponse[],
    totalSize: number
}

export const getAllCategories = async (page: number, size: number): Promise<responseData> => {


    try {
        const response = await fetch(`${API_URL}/get-page?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const listCategories = data._embedded?.categoryResponseList;

        if (!listCategories || listCategories.length === 0) {
            return {
                totalPage: 0,
                listCategories: [],
                totalSize: 0
            };
        }

        const categories: CategoryResponse[] = listCategories.map((category: CategoryResponse) => ({
            categoriesId: category.categoriesId,
            categoriesName: category.categoriesName,
            imageData: category.imageData,
            enable: category.enable,
            size: category.size
        }));
        return {
            totalPage: data.page.totalPages,
            listCategories: categories,
            totalSize: data.page.totalElements
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

}

export const getAllCategory = async () => {


    try {
        const response = await fetch(`${API_URL}/find-all`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const listCategories = data;

        if (!listCategories || listCategories.length === 0) {
            return {
                listCategories: [],
            };
        }

        const categories: CategoryResponse[] = listCategories.map((category: CategoryResponse) => ({
            categoriesId: category.categoriesId,
            categoriesName: category.categoriesName,
            imageData: category.imageData,
            enable: category.enable,
            size: category.size
        }));
        return {
            listCategories: categories
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

}

export const getCategoryByName = async (categoryName: string): Promise<CategoryResponse> => {
    try {   
        const response = await fetch(`${API_URL}/get-by-name?categoryName=${categoryName}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}

export const checkCategoryNameExist = async (categoryName: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/check-exists?categoryName=${categoryName}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}