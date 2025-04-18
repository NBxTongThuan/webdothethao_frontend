import { CategoryResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/categories';

interface responseData {
    totalPage: number;
    listCategories: CategoryResponse[],
    totalSize: number
}

export const getAllCategories = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${API_URL}/getAllCategory?page=${page}&size=${size}`);

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
            enable: category.enable
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