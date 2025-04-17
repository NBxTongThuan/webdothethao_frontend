import { ProductResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/products';

interface responseData {
    totalPage: number;
    listProduct: ProductResponse[];
}

export const getAllProducts = async (page: number, size: number): Promise<responseData> => {

   try{const response = await fetch(`${API_URL}/getAllProduct?page=${page}&size=${size}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const listProduct = data._embedded.productsResponseList;

    if (!listProduct || listProduct.length === 0) {
        return {
            totalPage: 0,
            listProduct: []
        }
    }

    const products: ProductResponse[] = listProduct.map(
        (product: ProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            price: product.price

        }));

        return{
            totalPage:data.page.totalPage,
            listProduct:products
        }
    }catch(error){
        console.log(error);
        throw error;
    }



}