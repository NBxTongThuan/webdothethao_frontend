import React, { useEffect, useState } from "react";
import { ProductResponse } from "../../api/interface/Responses";
import { getSameTypeProduct, getTop4Product } from "../../api/user/ProductsAPI";
import ProductModel from "../../model/ProductModel";
import ProductProps from "../pages/product_component/ProductProps";

interface SameTypeProductProps {    
    productId: string;
}

export const SameTypeProduct: React.FC<SameTypeProductProps> = ({ productId }) => {

    const [listSameTypeProduct, setListSameTypeProduct] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchSameTypeProduct = async () => {
            const response = await getSameTypeProduct(productId);
            setListSameTypeProduct(response);
        };
        fetchSameTypeProduct();
    }, []);

    return (
        <div className="grid grid-cols-4 gap-6 w-full">
            {listSameTypeProduct.map((product) => (
                <ProductProps key={product.product_id} product={product} />
            ))}
        </div>
    );
}