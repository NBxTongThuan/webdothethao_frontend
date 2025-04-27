import { useNavigate, useParams } from "react-router-dom";
import { CartItemModel } from "../../../model/CartItemModel";
import { useEffect, useState } from "react";
import { getListCartItemByCartID } from "../../../api/user/CartAPI";
import CartItemProp from "./CartItemProp";
import NumberFormat from "../../../util/NumberFormat";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart: React.FC = () => {
    const { cartID } = useParams();
    console.log(cartID);
    const [listCartItem, setListCartItem] = useState<CartItemModel[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        getListCartItemByCartID(cartID + "")
            .then((cartItems) => {
                setListCartItem(cartItems);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    }, [cartID,flag]);


    const deleteCartItem = async (cartItemId: string) => {
        const url = `http://localhost:8080/api/cart/deleteCartItem?cartItemID=${cartItemId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(response);
        if (response.ok) {
            setListCartItem(listCartItem.filter(item => item.cartItemId !== cartItemId));
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        } else {
            toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
        }
    }


    if (listCartItem.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
                <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg max-w-md mx-4">
                    <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
                    <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Quay lại mua sắm
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
                        {cartID && (
                            <p className="mt-1 text-sm text-gray-500">Mã giỏ hàng: #{cartID}</p>
                        )}
                    </div>
                    <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                        <i className="fas fa-shopping-bag mr-2"></i>
                        Tiếp tục mua sắm
                    </Link>
                </div>

                {!cartID ? (
                    <div className="text-center py-16">
                        <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-shopping-cart text-2xl text-gray-400"></i>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Giỏ hàng trống</h2>
                        <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                        <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Quay lại mua sắm
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {listCartItem.map((item, index) => (
                                <CartItemProp key={item.cartItemId} cartItem={item} deleteCartItem={deleteCartItem} setFlag={() => setFlag(!flag)} />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-base text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{NumberFormat(listCartItem.reduce((sum, item) => sum + item.price * item.quantity, 0))} VNĐ</span>
                                </div>
                                <div className="flex justify-between text-base text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-medium text-gray-900">Tổng tiền</span>
                                    <span className="text-2xl font-bold text-red-500">
                                        {NumberFormat(listCartItem.reduce((sum, item) => sum + item.price * item.quantity, 0))} VNĐ
                                    </span>
                                </div>
                                <Link to={`/checkOut/${cartID}`} className="w-full mt-6 bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium">
                                    <i className="fas"></i>
                                    <span>Đặt hàng</span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default Cart;