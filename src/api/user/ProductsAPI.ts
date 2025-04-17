import { useState } from "react";
import ProductModel from "../../model/ProductModel";
import requestAPI from "./RequestApi";


interface ProductsAPIInterface {
    listProduct: ProductModel[];
    totalPage: number;
    totalSize: number;
}

async function getProduct(endpoint: string): Promise<ProductsAPIInterface>  {
    const response = await requestAPI(endpoint);

    if (!response || !response._embedded) {
        return { listProduct: [], totalPage: 0, totalSize: 0 };
    }

    const responseDATA = response._embedded?.productsResponseList ?? [];

    const totalPage = response.page?.totalPages ?? 0;
    const totalSize = response.page?.totalElements ?? 0;

    const listProducts: ProductModel[] = responseDATA.map((item: any) => ({
        product_id: item.productId,
        description: item.productName,
        product_name: item.description,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return { listProduct: listProducts, totalPage, totalSize };
}


export async function get1Product(productId: string): Promise<ProductModel>  {
    const link:string = `http://localhost:8080/api/products/oneproduct?productId=${productId}`;

    const response = await requestAPI(link);

    const responseDATA = response;

    return ({
        product_id: responseDATA.productId,
        description: responseDATA.productName,
        product_name: responseDATA.description,
        price: responseDATA.price,
        quantity_sold: responseDATA.quantitySold
    })
    
}


export async function getAllProducts(page:number): Promise<ProductsAPIInterface> {
    const link: string = `http://localhost:8080/api/products?page=${page}&size=4`
    console.log(link);
    return getProduct(link);
}

export async function getProductsByCategoryIdAndProductName(categoryId: number, productName: string, currentPage:number): Promise<ProductsAPIInterface> {
   
    let link: string = `http://localhost:8080/api/products/listByName?productName=${productName}&page=${currentPage}&size=4`;

    if(productName ==='' && categoryId === 0){
        link = `http://localhost:8080/api/products?page=0&size=8`;
    }else if(productName ==='' && categoryId > 0){
        link = `http://localhost:8080/api/products/listByCateId?categoryId=${categoryId}&page=${currentPage}&size=4`;
    }
    return getProduct(link);

}



