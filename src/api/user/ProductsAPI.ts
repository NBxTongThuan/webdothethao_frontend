import { useState } from "react";
import ProductModel from "../../model/ProductModel";
import requestAPI from "./RequestApi";
import { ProductResponse } from "../interface/Responses";


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
        description: item.description,
        product_name: item.productName,
        moneyOff: item.moneyOff,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return { listProduct: listProducts, totalPage, totalSize };
}


export async function get1Product(productId: string): Promise<ProductModel>  {
    const link:string = `http://localhost:8080/api/products/get-by-id?productId=${productId}`;

    const response = await requestAPI(link);

    const responseDATA = response;

    return ({
        product_id: responseDATA.productId,
        description: responseDATA.description,
        product_name: responseDATA.productName,
        moneyOff: responseDATA.moneyOff,
        price: responseDATA.price,
        quantity_sold: responseDATA.quantitySold
    })
    
}


export async function getAllProducts(page:number): Promise<ProductsAPIInterface> {
    const link: string = `http://localhost:8080/api/products/get-all?page=${page}&size=8`

    return getProduct(link);
}

export async function getProductsByCategoryIdAndProductName(categoryId: number, productName: string, currentPage:number): Promise<ProductsAPIInterface> {
   
    let link: string = `http://localhost:8080/api/products/page-by-name?productName=${productName}&page=${currentPage}&size=8`;

    if(productName ==='' && categoryId === 0){
        link = `http://localhost:8080/api/products/get-all?page=0&size=8`;
    }else if(productName ==='' && categoryId > 0){
        link = `http://localhost:8080/api/products/page-by-category-id?categoryId=${categoryId}&page=${currentPage}&size=8`;
    }
    return getProduct(link);

}

export async function getTop4Product(): Promise<ProductModel[]> {
    const link: string = `http://localhost:8080/api/products/top-4?page=0&size=4`;

    const response = await requestAPI(link);

    const responseDATA = response._embedded?.productsResponseList ?? [];

    const listProducts: ProductModel[] = responseDATA.map((item: any) => ({
        product_id: item.productId,
        description: item.description,
        product_name: item.productName,
        moneyOff: item.moneyOff,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return listProducts;
}

export async function get4NewestProduct(): Promise<ProductModel[]> {
    const link: string = `http://localhost:8080/api/products/page-newest?page=0&size=4`;

    const response = await requestAPI(link);

    const responseDATA = response._embedded?.productsResponseList ?? [];

    const listProducts: ProductModel[] = responseDATA.map((item: any) => ({
        product_id: item.productId,
        description: item.description,
        product_name: item.productName,
        moneyOff: item.moneyOff,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return listProducts;
}

export async function getSameTypeProduct(productId: string): Promise<ProductModel[]> {
    const link: string = `http://localhost:8080/api/products/same?productId=${productId}&page=0&size=4`;

    const response = await requestAPI(link);

    const responseDATA = response._embedded?.productsResponseList ?? [];

    const listProducts: ProductModel[] = responseDATA.map((item: any) => ({
        product_id: item.productId,
        description: item.description,
        product_name: item.productName,
        moneyOff: item.moneyOff,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return listProducts;    
}

export async function getDiscountingProduct(page:number): Promise<ProductModel[]> {
    const link: string = `http://localhost:8080/api/products/discounting?page=${page}&size=4`;

    const response = await requestAPI(link);

    const responseDATA = response._embedded?.productsResponseList ?? [];

    const listProducts: ProductModel[] = responseDATA.map((item: any) => ({
        product_id: item.productId,
        description: item.description,
        product_name: item.productName,
        moneyOff: item.moneyOff,
        price: item.price,
        quantity_sold: item.quantitySold
    }));

    return listProducts;
}
