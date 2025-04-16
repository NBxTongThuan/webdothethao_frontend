import { useEffect, useState } from "react";
import { ReviewsModel } from "../../../model/ReviewsModel";
import { getListReview } from "../../../api/ReviewsAPI";
import renderRate from "../../../util/Stars";

interface ReviewsPropsInterface {
    listReview: ReviewsModel[];
}

const Reviews: React.FC<ReviewsPropsInterface> = (props) => {

    const listReview = props.listReview;
    
   

    let productRating = 0;
    if (listReview.length > 0) {
      productRating = Number(
        (listReview.reduce((sum, review) => sum + review.rating, 0) / listReview.length).toFixed(1)
      );
    }



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-3"></i>
                        Đánh giá sản phẩm
                    </h3>
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                        <span className="text-xl font-bold text-gray-900">{productRating}</span>
                        <div className="flex items-center">{renderRate(productRating)}</div>
                        <span className="text-sm text-gray-500">({listReview.length} đánh giá)</span>
                    </div>
                </div>

                <div className="space-y-8">
                    {listReview.map((review) => (
                        <div key={review.reviewId} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-medium text-lg shadow-lg">
                                        {review.userName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h5 className="font-semibold text-gray-900 text-lg">
                                                {review.userName}
                                            </h5>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <i className="far fa-clock mr-1"></i>
                                                {new Date(review.createdDate).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                                {review.edited && (
                                                    <span className="ml-2 text-gray-400 flex items-center">
                                                        <i className="fas fa-pencil-alt mr-1"></i>
                                                        đã chỉnh sửa
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <div className="flex">{renderRate(review.rating)}</div>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <span className="font-medium">Phân loại:</span> 
                                                <div className="inline-flex items-center ml-2">
                                                    <i className="fas fa-palette mr-1"></i>
                                                    <div className="w-4 h-4 rounded-full mx-1 border border-gray-300" style={{ backgroundColor: review.color }}></div>
                                                    <i className="fas fa-ruler ml-2 mr-1"></i>
                                                    Size {review.size}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                            
                            <div className="mt-4 text-gray-600 text-base leading-relaxed bg-gray-50 p-4 rounded-xl">
                                {review.comment}
                            </div>
                        </div>
                    ))}

                    {listReview.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <i className="far fa-comment-dots text-3xl text-gray-400"></i>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Chưa có đánh giá</h4>
                            <p className="text-gray-500 text-lg">Hãy là người đầu tiên đánh giá sản phẩm này</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );


}
export default Reviews;