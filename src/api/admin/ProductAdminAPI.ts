import {  AdminProductResponse, ProductResponse } from "../interface/Responses";

const url = "http://localhost:8080/api/admin/products";

interface responseData {
    totalPage: number;
    listProduct: AdminProductResponse[],
    totalSize: number
}

export const getAllProduct = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${url}/get-page?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

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
        const products: AdminProductResponse[] = listProduct.map((product: AdminProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
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


export const getByProductId = async (productId: string): Promise<AdminProductResponse> => {

    try {
        const response = await fetch(`${url}/get-by-id?productId=${productId}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const product = data;

    
        const productResponse: AdminProductResponse = {
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
            typeName: product.typeName,
            categoryName: product.categoryName,
            brandName: product.brandName,
            inStock: product.inStock
        }
        return productResponse;


    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }

}

export const getCountIsInStockProduct = async (): Promise<number> => {
    try {
        const response = await fetch(`${url}/get-count-enable`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching count is in stock product:', error);
        throw error;
    }
}

export const getDiscountingProduct = async (page: number, size: number): Promise<responseData> => {
    try {
        const response = await fetch(`${url}/get-page-discount?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
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
        const products: AdminProductResponse[] = listProduct.map((product: AdminProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
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
        console.error('Error fetching discounting product:', error);
        throw error;
    }
}

export const getInStockProduct = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${url}/get-enable?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);

        const listProduct = data._embedded?.adminProductsResponseList;

        if (!listProduct || listProduct.length === 0) {
            return {
                totalPage: 0,
                listProduct: [],
                totalSize: 0
            };
        }
        const products: AdminProductResponse[] = listProduct.map((product: AdminProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
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

export const TopSaleProduct = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${url}/get-top-sale?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);

        const listProduct = data._embedded?.adminProductsResponseList;

        if (!listProduct || listProduct.length === 0) {
            return {
                totalPage: 0,
                listProduct: [],
                totalSize: 0
            };
        }
        const products: AdminProductResponse[] = listProduct.map((product: AdminProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
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

export const TopSlowSaleProduct = async (page: number, size: number): Promise<responseData> => {

    try {
        const response = await fetch(`${url}/get-top-slow-sale?page=${page}&size=${size}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);

        const listProduct = data._embedded?.adminProductsResponseList;

        if (!listProduct || listProduct.length === 0) {
            return {
                totalPage: 0,
                listProduct: [],
                totalSize: 0
            };
        }
        const products: AdminProductResponse[] = listProduct.map((product: AdminProductResponse) => ({
            productId: product.productId,
            productName: product.productName,
            description: product.description,
            quantitySold: product.quantitySold,
            importPrice: product.importPrice,
            price: product.price,
            moneyOff: product.moneyOff,
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