import React, { useEffect, useState } from "react";
import { ProductResponse } from "../../api/interface/Responses";
import { getTop4Product } from "../../api/user/ProductsAPI";
import ProductModel from "../../model/ProductModel";
import ProductProps from "../pages/product_component/ProductProps";
export const Top4Selling: React.FC = () => {

    const [listTop4Product, setListTop4Product] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchTop4Product = async () => {
            const response = await getTop4Product();
            setListTop4Product(response);
        };
        fetchTop4Product();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-6 w-full">
            {listTop4Product.map((product) => (
                <ProductProps key={product.product_id} product={product} />
            ))}
        </div>
    );
}