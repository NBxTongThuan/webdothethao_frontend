import React, { useEffect, useState } from "react";
import { ProductResponse } from "../../api/interface/Responses";
import { get4NewestProduct, getTop4Product } from "../../api/user/ProductsAPI";
import ProductModel from "../../model/ProductModel";
import ProductProps from "../pages/product_component/ProductProps";
export const NewestProduct: React.FC = () => {

    const [listNewestProduct, setListNewestProduct] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchNewestProduct = async () => {
            const response = await get4NewestProduct();
            setListNewestProduct(response);
        };
        fetchNewestProduct();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-6 w-full">
            {listNewestProduct.map((product) => (
                <ProductProps key={product.product_id} product={product} />
            ))}
        </div>
    );
}