import { useEffect, useState } from "react";
import ProductModel from "../../model/ProductModel";
import ProductProps from "../pages/product_component/ProductProps";
import { getDiscountingProduct } from "../../api/user/ProductsAPI";

export const TopDiscountingProduct: React.FC = () => {

    const [listTop4Product, setListTop4Product] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchTop4Product = async () => {
            const response = await getDiscountingProduct(0);
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