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
        <div className="col-md-3 mt-2">
            <div className="card">
                  <Link to={token ? `/productdetail/${productId}` : `/Login`} >
                    {productImage ? <img
                        src={productImage.data ? productImage.data : "abc"}
                        alt="product"
                        className="card-img-top"
                        style={{ height: '200px' }}
                    /> : <p>Không có ảnh đại diện!</p>}</Link>
                <div className="card-body">

                    <h5 className="card-title">{props.product.product_name}</h5>
                    <p className="card-text">{props.product.description}</p>
                    <div className="price">
                        <span className="discounted-price">
                            <strong>{NumberFormat(props.product.price)} VNĐ</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <p>
                                {renderRate(productRating)}
                            </p>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-3">
            </div>

        </div>
    );
};

export default ProductProps;
