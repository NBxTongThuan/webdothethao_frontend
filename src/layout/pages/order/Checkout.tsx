import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
    const [cartItems] = useState([
        {
            id: 1,
            name: 'Giày thể thao Nike Air Max',
            price: 2500000,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 2,
            name: 'Áo thể thao Adidas',
            price: 800000,
            quantity: 2,
            image: 'https://via.placeholder.com/100'
        }
    ]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'cod'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = 30000;
    const finalTotal = total + shippingFee;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Thông tin giao hàng */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Địa chỉ <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="banking"
                                        checked={formData.paymentMethod === 'banking'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Chuyển khoản ngân hàng</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Tóm tắt đơn hàng */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">Đơn hàng của bạn</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-4 pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tạm tính</span>
                                    <span>{total.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="border-t pt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Tổng cộng</span>
                                        <span>{finalTotal.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-200">
                                Đặt hàng
                            </button>

                            <p className="text-sm text-gray-500 mt-4">
                                Bằng cách đặt hàng, bạn đồng ý với{' '}
                                <Link to="/terms" className="text-blue-500 hover:underline">
                                    Điều khoản và điều kiện
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 