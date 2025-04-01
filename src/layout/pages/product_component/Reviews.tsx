import { useEffect, useState } from "react";
import { ReviewsModel } from "../../../model/ReviewsModel";
import { get } from "http";
import { getListReview } from "../../../api/ReviewsAPI";
import renderRate from "../../../util/Stars";

interface ReviewsPropsInterface {
    productId: string;
}

const Reviews: React.FC<ReviewsPropsInterface> = (props) => {

    const [listReview, setListReview] = useState<ReviewsModel[]>([]);
    const productId = props.productId;

    useEffect(() => {
        getListReview(productId)
            .then( responseDATA => {
                setListReview(responseDATA);
            })
            .catch( error => {
                console.log("Lỗi khi tải đánh giá sản phẩm: " + error);
            });
    }, [props.productId]);


    return (
        <div className="container mt-4 background-light p-4">
            <h3 className="mb-4">Đánh giá sản phẩm</h3>
            <div className="list-group">
            {
                listReview.map((review) => (
                <div key={review.reviewId} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{review.comment}</h5>
                    <small>{new Date(review.createdDate).toLocaleDateString()}</small>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                    <div className="d-flex align-items-center">
                        <p>{renderRate(review.rating)}</p>
                        <span className="text-muted">by {}</span>
                    </div>
                    </div>
                    <p className="mb-1">{}</p>
                </div>
                ))
            }
            </div>
        </div>

    );


}
export default Reviews;