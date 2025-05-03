import React, { useEffect, useState } from 'react';
import { CartItemModel } from '../../../model/CartItemModel';
import { get1Image } from '../../../api/user/ImagesAPI';
import NumberFormat from '../../../util/NumberFormat';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ProductModel from '../../../model/ProductModel';
import { get1Product } from '../../../api/user/ProductsAPI';

interface CartItemPropInterface {
    cartItem: CartItemModel;
    deleteCartItem: (cartItemId: string) => void;
    setFlag: () => void;   
}

const CartItemProp: React.FC<CartItemPropInterface> = (prop) => {
    const [imageData, setImageData] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<ProductModel>();


    useEffect(() => {
        get1Product(prop.cartItem.productId)
            .then((product) => {
                setProduct(product);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [prop.cartItem.productId]);

    useEffect(() => {
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

    const handleMinusClick = async () => {

        if(prop.cartItem.quantity <= 1){
            toast.error("Số lượng không được nhỏ hơn 1 ");
            return;
        }

        if (prop.cartItem.quantity > 1) {
            const url = `http://localhost:8080/api/cartItem/updateQuantity`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItemId: prop.cartItem.cartItemId,
                    quantity: prop.cartItem.quantity - 1
                }),
                credentials:'include'
            }); 
            const { statusCode, message } = await response.json();
            if (statusCode === 'SUCCESS') {
                prop.setFlag();
            } else {
                toast.error(message);
            }
        }
    };

    const handlePlusClick = async () => {
        if(prop.cartItem.quantity >= prop.cartItem.remainQuantity){
            prop.cartItem.quantity = prop.cartItem.remainQuantity;
            toast.error("Bạn đã đạt số lượng tối đa của sản phẩm này!");
            return;
        }

        if (prop.cartItem.quantity < prop.cartItem.remainQuantity) {
            const url = `http://localhost:8080/api/cartItem/updateQuantity`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItemId: prop.cartItem.cartItemId,
                    quantity: prop.cartItem.quantity + 1
                }),
                credentials:'include'
            }); 
            const { statusCode, message } = await response.json();
            if (statusCode === 'SUCCESS') {
                prop.setFlag();
            } else {
                toast.error(message);
            }
        }
    };


        
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Image container */}
                    <div className="w-full md:w-1/4 aspect-square rounded-xl overflow-hidden bg-gray-50">
                        {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
                            </div>
                        ) : (
                            <Link to={`/productdetail/${prop.cartItem.productId}`}>
                                <img
                                    src={imageData || "/images/no-image.png"}
                                    alt={prop.cartItem.productName}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
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

                            <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Màu sắc:</span>
                                    <div 
                                        className="w-4 h-4 rounded-full border border-gray-300" 
                                        style={{ backgroundColor: prop.cartItem.color }}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">Kích cỡ:</span>
                                    <span className="text-gray-600">{prop.cartItem.size}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="text-gray-600 flex items-baseline justify-between md:justify-start md:space-x-2">
                                    {product?.moneyOff && product?.moneyOff > 0 ? (
                                        <>
                                            <span className="text-gray-400 text-sm line-through decoration-2 decoration-gray-400 hover:decoration-red-400 transition-all duration-300">
                                                {NumberFormat(product.price)} VNĐ
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-bold text-red-500">
                                                    {NumberFormat(product.price - product.moneyOff)} VNĐ
                                                </span>
                                                <span className="bg-yellow-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">
                                                    -{Math.round((1 - (product.price - product.moneyOff) / product.price) * 100)}%
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-xl font-bold text-red-500">
                                            {NumberFormat(product?.price || 0)} VNĐ
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between md:justify-start md:space-x-2">
                                    <span className="text-gray-600">Số lượng:</span>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                            disabled={prop.cartItem.quantity <= 1}
                                            onClick={handleMinusClick}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="font-semibold w-8 text-center">{prop.cartItem.quantity}</span>
                                        <button 
                                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                            onClick={handlePlusClick}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>

                                       <div className="text-gray-600 text-sm ml-2">
                                            Số lượng tối đa: {prop.cartItem.remainQuantity}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total and Action buttons */}
                        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 pt-4 border-t border-gray-100">
                            <button 
                                onClick={() => prop.deleteCartItem(prop.cartItem.cartItemId)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                                aria-label="Xóa sản phẩm"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span>Xóa</span>
                            </button>
                            <div className="text-right md:text-left">
                                <p className="text-sm text-gray-600">Tổng tiền:</p>
                                <p className="text-xl font-bold text-red-500">
                                    {product && product?.moneyOff && product?.moneyOff > 0 
                                        ? NumberFormat((product.price - product.moneyOff) * prop.cartItem.quantity)
                                        : NumberFormat((product?.price || 0) * prop.cartItem.quantity)} VNĐ
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