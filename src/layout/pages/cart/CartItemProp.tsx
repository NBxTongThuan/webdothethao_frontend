import React, { useEffect, useState } from 'react';
import { CartItemModel } from '../../../model/CartItemModel';
import { get1Image } from '../../../api/ImagesAPI';
import NumberFormat from '../../../util/NumberFormat';
import { Link } from 'react-router-dom';

interface CartItemPropInterface {
    cartItem: CartItemModel;
}

const CartItemProp: React.FC<CartItemPropInterface> = (prop) => {
    const [imageData, setImageData] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        get1Image(prop.cartItem.productId.toString())
            .then((image) => {
                if (image && image.data) {
                    setImageData(image.data.toString());
                }
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [prop.cartItem.productId]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Image container */}
                    <div className="w-full md:w-1/4 aspect-square rounded-xl overflow-hidden bg-gray-50">
                        {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                            </div>
                        ) : (
                            <Link to={`/productdetail/${prop.cartItem.productId}`}><img
                            src={imageData || "/images/no-image.png"}
                            alt={prop.cartItem.productName}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        /></Link>
                        )}
                    </div>

                    {/* Product details */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-1 hover:text-red-500 transition-colors duration-200">
                                {prop.cartItem.productName}
                            </h2>
                            <p className="text-gray-600 line-clamp-2">
                                {prop.cartItem.productDescription}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-gray-600 flex items-baseline justify-between md:justify-start md:space-x-2">
                                    <span>Giá:</span>
                                    <span className="font-bold text-red-500 text-lg">{NumberFormat(prop.cartItem.price)} VNĐ</span>
                                </p>
                                <div className="flex items-center justify-between md:justify-start md:space-x-2">
                                    <span className="text-gray-600">Số lượng:</span>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                            disabled={prop.cartItem.quantity <= 1}
                                        >
                                            <i className="fas fa-minus text-sm"></i>
                                        </button>
                                        <span className="font-semibold w-8 text-center">{prop.cartItem.quantity}</span>
                                        <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                                            <i className="fas fa-plus text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 text-right md:text-left">
                                <p className="text-gray-500 text-sm">
                                    Mã SP: #{prop.cartItem.productAttributeId}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Mã đơn: #{prop.cartItem.cartItemId}
                                </p>
                            </div>
                        </div>

                        {/* Total and Action buttons */}
                        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 pt-4 border-t border-gray-100">
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                aria-label="Xóa sản phẩm"
                            >
                                <i className="fas fa-trash-alt"></i>
                                <span>Xóa</span>
                            </button>
                            <div className="text-right md:text-left">
                                <p className="text-sm text-gray-600">Tổng tiền:</p>
                                <p className="text-xl font-bold text-red-500">
                                    {NumberFormat(prop.cartItem.price * prop.cartItem.quantity)} VNĐ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItemProp;