import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import StarRating from '../../../util/StarsRating';
import { NotepadText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderReviewProps {
    orderItemId: string;
    productId: string;
    productAttributeId: string;
    userName: string;
    onClose: () => void;
    setReviewFlag: () => void;
}



const OrderReview: React.FC<OrderReviewProps> = (props) => {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rating == 0) {
            toast.error("Vui lòng đánh giá điểm của sản phẩm");
            return;
        }

        if (comment == "") {
            toast.error("Vui lòng đánh giá sản phẩm");
            return;
        }

        console.log(props.orderItemId);
        console.log(props.productId);
        console.log(props.productAttributeId);
        console.log(props.userName);
        console.log(rating);
        console.log(comment);

        try {
            const url = `http://localhost:8080/api/reviews/add`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "rating": rating,
                    "comment": comment,
                    "orderItemId": props.orderItemId,
                    "productId": props.productId,
                    "productAttributeId": props.productAttributeId,
                    "userName": props.userName
                }),
                credentials: "include",
            });
            if (response.ok) {
                props.onClose();
                toast.success("Cảm ơn bạn đã đánh giá sản phẩm");
                props.setReviewFlag();
            }
            else {
                props.onClose();
                toast.error("Đánh giá sản phẩm thất bại");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-xl p-8 w-full max-w-2xl mx-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <NotepadText className="text-2xl font-bold text-gray-800" />
                            <h2 className="text-2xl font-bold text-gray-800">Đánh giá đơn hàng của bạn</h2>
                        </div>
                        <button
                            onClick={props.onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-user-circle text-gray-400 text-xl"></i>
                            <p className="text-gray-600 text-lg">Xin chào <span className="font-semibold text-gray-800">{props.userName}</span>, vui lòng đánh giá đơn hàng của bạn</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex flex-col items-center mb-6">
                                <p className="text-gray-600 text-lg mb-4 font-semibold bg-red-100 p-2 rounded-lg">Đánh giá điểm của sản phẩm</p>
                                <div className="flex items-center space-x-2 mb-4">
                                    <StarRating
                                        max={5}
                                        value={0}
                                        onRate={(value: number) => setRating(value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <i className="fas fa-comment-alt text-gray-400"></i>
                                    <label className="block text-sm font-medium text-gray-700">Đánh giá</label>
                                </div>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Nhập đánh giá của bạn..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={props.onClose}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center space-x-2"
                            >
                                <i className="fas fa-times"></i>
                                <span>Hủy</span>
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm flex items-center space-x-2"
                            >
                                <i className="fas fa-paper-plane"></i>
                                <span>Gửi đánh giá</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OrderReview;
