import React, { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import ImageModel from "../../../model/ImageModel";

import { Link } from "react-router-dom";
import { get1Image } from "../../../api/ImagesAPI";
import NumberFormat from "../../../util/NumberFormat";
import { getListReview } from "../../../api/ReviewsAPI";
import renderRate from "../../../util/Stars";


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

    const token = localStorage.getItem('token');

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
        <div className="w-full md:w-1/2 p-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
          <Link to={token ? `/productdetail/${productId}` : `/Login`}>
            {productImage ? (
              <img
                src={productImage.data || "abc"}
                alt="product"
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-72 bg-gray-200">
                <p className="text-gray-600">Không có ảnh đại diện!</p>
              </div>
            )}
          </Link>
          <div className="p-6">
            <h5 className="text-xl font-semibold text-gray-900 truncate">
              {props.product.product_name}
            </h5>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {props.product.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-red-500">
                {NumberFormat(props.product.price)} VNĐ
              </span>
              <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
            <div className="flex items-center space-x-1 mt-2">{renderRate(productRating)}</div>
          </div>
        </div>
      </div>
    );
};

export default ProductProps;
