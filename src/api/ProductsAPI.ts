import { useState } from "react";
import ProductModel from "../model/ProductModel";
import requestAPI from "./RequestApi";


async function getProduct(endpoint: string): Promise<ProductModel[]>  {
    const response = await requestAPI(endpoint);

    const responseDATA = response._embedded.productsResponseList;

    const listProducts: ProductModel[] = [];

    for(const key in responseDATA){
        listProducts.push({
            product_id: responseDATA[key].productId,
            description: responseDATA[key].productName,
            product_name: responseDATA[key].description,
            price: responseDATA[key].quantitySold,
            quantity_sold: responseDATA[key].price
        });
    }
    console.log(listProducts);
    return listProducts;
    
}

export async function get4Products(page:number): Promise<ProductModel[]> {
    const link: string = `http://localhost:8080/api/products?page=${page}&size=8`
    
    return getProduct(link);
}




