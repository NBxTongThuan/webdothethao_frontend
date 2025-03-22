import React, { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import ImageModel from "../../../model/ImageModel";
import get1Image from "../../../api/ImagesAPI";
import { Link } from "react-router-dom";


interface ProductPropsInterface {
    product: ProductModel
}

const ProductProps: React.FC<ProductPropsInterface> = (props) => {

    const productId = props.product.product_id;
    const [productImage, setProductImage] = useState<ImageModel | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [errorReport, setErrorReport] = useState("");


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
                    setErrorReport(error);
                }
            )
    }, [])


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
               <Link to={`/productdetail/${productId}`}>
               {productImage?.data && <img
                        src={productImage.data}
                        className="card-img-top"
                        style={{ height: '200px' }}
                    />}</Link>
                <div className="card-body">

                    <h5 className="card-title">{props.product.product_name}</h5>
                    <p className="card-text">{props.product.description}</p>
                    <div className="price">
                        <span className="discounted-price">
                            <strong>{props.product.price}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
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
