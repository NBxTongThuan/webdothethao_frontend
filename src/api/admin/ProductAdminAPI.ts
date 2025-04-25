import { ProductResponse } from "../interface/Responses";

const url = "http://localhost:8080/api/admin/products";

interface responseData {
    totalPage: number;
    listProduct: ProductResponse[],
    totalSize: number
}

export const getAllProduct = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${url}/getAllProduct?page=${page}&size=${size}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const listProduct = data._embedded?.adminProductsResponseList;

        if (!listProduct || listProduct.length === 0) {
            return {
                totalPage: 0,
                listProduct: [],
                totalSize: 0
            };
        }
        const products: ProductResponse[] = listProduct.map((product: ProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            price: product.price,
            typeName: product.typeName,
            categoryName: product.categoryName,
            brandName: product.brandName,
            inStock: product.inStock
        }));
        return {
            totalPage: data.page.totalPages,
            listProduct: products,
            totalSize: data.page.totalElements
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

}

export const getCountIsInStockProduct = async (): Promise<number> => {
    try {
        const response = await fetch(`${url}/getCountIsInStockProduct`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching count is in stock product:', error);
        throw error;
    }
}
