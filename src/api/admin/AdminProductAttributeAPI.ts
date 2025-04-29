import { ProductAttributeResponse } from "../interface/Responses";

const URL = "http://localhost:8080/api/admin/productAttribute";
interface responseData {
    totalPage: number;
    listProductAttribute: ProductAttributeResponse[],
    totalSize: number
}

export const getAllProductAttributeByProductId = async (productId:string,page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${URL}/getAllProductAttributeByProductId?productId=${productId}&page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const listProductAttribute = data._embedded?.adminProductAttributeResponseList;

        if (!listProductAttribute || listProductAttribute.length === 0) {
            return {
                totalPage: 0,
                listProductAttribute: [],
                totalSize: 0
            };
        }
        const products: ProductAttributeResponse[] = listProductAttribute.map((productAttribute: ProductAttributeResponse) => ({
            productAttributeId: productAttribute.productAttributeId,
            color: productAttribute.color,
            size: productAttribute.size,
            quantity: productAttribute.quantity,
            quantitySold: productAttribute.quantitySold,
            enable: productAttribute.enable
        }));
        return {
            totalPage: data.page.totalPages,
            listProductAttribute: products,
            totalSize: data.page.totalElements
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
}
