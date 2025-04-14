import { useEffect, useState } from "react";
import { ReviewsModel } from "../../../model/ReviewsModel";
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

    let productRating = 0;
    if(listReview.length > 0){
        productRating = listReview.reduce((sum, review) => sum + review.rating, 0) / listReview.length;
    }



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Đánh giá sản phẩm</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-700">{productRating}</span>
                        <div className="flex items-center">{renderRate(productRating)}</div>
                        <span className="text-sm text-gray-500">({listReview.length} đánh giá)</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {listReview.map((review) => (
                        <div key={review.reviewId} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-medium">
                                        {review.userName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-medium text-gray-900">
                                                {review.userName}
                                            </h5>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.createdDate).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                                {review.edited && <span className="ml-1 text-gray-400">(đã chỉnh sửa)</span>}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className="flex">{renderRate(review.rating)}</div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <span className="font-medium">Phân loại:</span> 
                                            <div className="inline-flex items-center ml-2">
                                                Màu <div className="w-4 h-4 rounded-full mx-1 border border-gray-300" style={{ backgroundColor: review.color }}></div>
                                                • Size {review.size}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                            
                            <div className="mt-4 text-gray-600 text-base leading-relaxed">
                                {review.comment}
                            </div>
                        </div>
                    ))}
                </div>

                {listReview.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="far fa-comment-dots text-2xl text-gray-400"></i>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Chưa có đánh giá</h4>
                        <p className="text-gray-500">Hãy là người đầu tiên đánh giá sản phẩm này</p>
                    </div>
                )}
            </div>
        </div>

    );


}
export default Reviews;