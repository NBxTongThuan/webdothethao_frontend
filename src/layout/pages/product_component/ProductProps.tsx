import React, { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import ImageModel from "../../../model/ImageModel";

import { Link } from "react-router-dom";
import { get1Image } from "../../../api/user/ImagesAPI";
import NumberFormat from "../../../util/NumberFormat";
import { getListReview } from "../../../api/user/ReviewsAPI";
import renderRate from "../../../util/Stars";
import { Button } from "antd";
import { useAuth } from "../../../util/AuthContext";


interface ProductPropsInterface {
    product: ProductModel
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {

    const productId = props.product.product_id;
    const [productImage, setProductImage] = useState<ImageModel | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [errorReport, setErrorReport] = useState("");
    const [productRating, setProductRating] = useState(0);


    useEffect(() => {
        get1Image(productId)
            .then(
                responseDATA => {
                    setProductImage(responseDATA);
                    setLoadingData(false);
                }
            )
            .catch(
                error => {
                    setErrorReport("lỗi khi tải ảnh sản phẩm: " + error);
                }
            )
    }, []);

    useEffect(() => {
        getListReview(productId)
            .then(
                responseDATA => {
                    let sumRating = 0;
                    let countRating = 0;
                    responseDATA.map((review) => {
                        sumRating += review.rating;
                        countRating++;
                    });
                    if (countRating > 0) {
                        setProductRating(sumRating / countRating);
                    }
                }
            )
            .catch(
                error => {
                    setErrorReport("lỗi khi tải đánh giá sản phẩm: " + error);
                }
            )

    }, []);

    

    if (loadingData) {
        return (
            <div>
                <h1>
                    Đang tải dữ liệu....
                </h1>
            </div>
        );
    }

    if (errorReport) {
        return (
            <div>
                <h1>
                    Gặp lỗi: {errorReport}
                </h1>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="h-full group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <Link to={`/productdetail/${productId}`} className="block relative overflow-hidden">
                    {productImage ? (
                        <div className="relative">
                            <img
                                src={productImage.data || "abc"}
                                alt="product"
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-64 bg-gray-100">
                            <p className="text-gray-400 font-medium">Không có ảnh đại diện!</p>
                        </div>
                    )}
                </Link>
                <div className="p-4">
                    <div className="mb-3">
                        <h5 className="text-lg font-bold text-gray-900 truncate hover:text-red-500 transition-colors duration-200">
                            {props.product.product_name}
                        </h5>
                        <div className="flex items-center space-x-1 mt-1">
                            {renderRate(productRating)}
                        </div>

                        <div className="flex items-center space-x-1 mt-1">
                           đã bán {props.product.quantity_sold}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                        {props.product.description}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-red-500">
                            {NumberFormat(props.product.price)} VNĐ
                        </span>
                        <Link to={`/productdetail/${productId}`} className="block relative overflow-hidden">
                        <Button type="primary" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                            Xem chi tiết
                        </Button>
                        </Link>
                        

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductProps;
