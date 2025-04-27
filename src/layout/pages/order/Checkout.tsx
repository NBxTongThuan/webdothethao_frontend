import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartItemModel } from '../../../model/CartItemModel';
import { getListCartItemByCartID } from '../../../api/user/CartAPI';
import OrderItemModel from '../../../model/OrderItemModel';
import OrdersModel from '../../../model/OrdersModel';
import OrderItem from './OrderItem';
import { getProvinces, getDistricts, getWards } from '../../../api/user/AddressAPI';
import { getUserName } from '../../../util/JwtService';
import { toast } from 'react-toastify';
import { District, Province, Ward } from '../../../api/interface/Responses';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    toProvince: string;
    toDistrict: string;
    toWard: string;
    address: string;
    note: string;
    paymentMethod: string;
}


const Checkout: React.FC = () => {



    const { cartID } = useParams();
    const [listCartItem, setListCartItem] = useState<CartItemModel[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const userName = getUserName(token + "");
    useEffect(() => {
        getListCartItemByCartID(cartID + "")
            .then((cartItems) => {
                setListCartItem(cartItems);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            }
            );
    }, [cartID]);

    const [orderItems, setOrderItems] = useState<OrderItemModel[]>([]);

    useEffect(() => {
        setOrderItems(listCartItem.map(item => new OrderItemModel(item.price, item.quantity, item.productAttributeId)));
    }, [listCartItem]);

    // const [orders, setOrders] = useState<OrdersModel>(new OrdersModel(getUserName(token + "") + "", 0, '', '', '', '', '', '', '', '', []));



    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        toProvince: '',
        toDistrict: '',
        toWard: '',
        address: '',
        note: '',
        paymentMethod: 'cod'
    });

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        // Load provinces when component mounts
        const loadProvinces = async () => {
            try {
                const provincesData = await getProvinces();
                setProvinces(provincesData);
            } catch (error) {
                console.error('Error loading provinces:', error);
            }
        };
        loadProvinces();
    }, []);

    useEffect(() => {
        // Load districts when province changes
        const loadDistricts = async () => {
            if (formData.toProvince) {
                try {
                    const districtsData = await getDistricts(Number(formData.toProvince));
                    setDistricts(districtsData);
                    setFormData(prev => ({ ...prev, toDistrict: '', toWard: '' }));
                } catch (error) {
                    console.error('Error loading districts:', error);
                }
            } else {
                setDistricts([]);
            }
        };
        loadDistricts();
    }, [formData.toProvince]);

    useEffect(() => {
        // Load wards when district changes
        const loadWards = async () => {
            if (formData.toDistrict) {
                try {
                    const wardsData = await getWards(Number(formData.toDistrict));
                    setWards(wardsData);
                    setFormData(prev => ({ ...prev, toWard: '' }));
                } catch (error) {
                    console.error('Error loading wards:', error);
                }
            } else {
                setWards([]);
            }
        };
        loadWards();
    }, [formData.toDistrict]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const hadleOrderCOD = async () => {
        if (formData.paymentMethod == 'cod') {

            const url = `http://localhost:8080/api/orders/codOrder`;
            const data = {
                userName: userName,
                totalPrice: finalTotal,
                shipFee: shippingFee,
                orderNote: formData.note,
                toAddress: formData.address,
                toProvince: handleProvinceName(formData.toProvince),
                toDistrict: handleDistrictName(formData.toDistrict),
                toWard: handleWardName(formData.toWard),
                toPhone: formData.phone,
                toName: formData.fullName,
                toEmail: formData.email,
                orderItems: orderItems.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productAttributeId: item.productAttributeId
                }))
            }

            console.log(data);

            try {
                const response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                if(response.ok){
                    toast.success('Đặt hàng thành công');
                }else{
                    toast.error('Đặt hàng thất bại');
                }
            } catch (error) {
                toast.error('Đặt hàng thất bại');
            }
        }
    }

    const hadleOrderVNPay = async () => {
        if (formData.paymentMethod == 'vn-pay') {

            const url = `http://localhost:8080/api/payment/vnpay/create`;
            const data = {
                userName: userName,
                totalPrice: finalTotal,
                shipFee: shippingFee,
                orderNote: formData.note,
                toAddress: formData.address,
                toProvince: handleProvinceName(formData.toProvince),
                toDistrict: handleDistrictName(formData.toDistrict),
                toWard: handleWardName(formData.toWard),
                toPhone: formData.phone,
                toName: formData.fullName,
                toEmail: formData.email,
                orderItems: orderItems.map(item => ({
                    price: item.price,
                    quantity: item.quantity,
                    productAttributeId: item.productAttributeId
                }))
            }

            try {
                const response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    const paymentUrl = result.paymentUrl;
                    // 👇 Redirect qua VNPay
                    window.location.href = paymentUrl;
                } else {
                    toast.error('Đặt hàng thất bại');
                }
            } catch (error) {
                toast.error('Đặt hàng thất bại');
            }
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData.paymentMethod == 'cod')
        {
            hadleOrderCOD();
        }else{
            hadleOrderVNPay();
        }
    };

    const handleProvinceName = (provinceCode: string) => {
        const province = provinces.find(p => p.ProvinceCode == provinceCode + "");
        return province ? province.ProvinceName : '';
    }
    const handleDistrictName = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictName : '';
    }
    const handleWardName = (wardCode: string) => {
        const ward = wards.find(w => w.WardCode == wardCode);
        return ward ? ward.WardName : '';
    }
    const total = listCartItem.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = 30000;
    const finalTotal = total + shippingFee;



    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[95%] mx-auto px-2 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Thông tin giao hàng */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4 w-full">Thông tin giao hàng</h2>
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tỉnh/Thành phố <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="toProvince"
                                                value={formData.toProvince}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                {provinces.map(province => (
                                                    <option key={province.ProvinceCode} value={province.ProvinceCode}>
                                                        {province.ProvinceName}
                                                    </option>
                                                ))
                                                }

                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Quận/Huyện <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="toDistrict"
                                                value={formData.toDistrict}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                disabled={!formData.toProvince}
                                            >
                                                <option value="">Chọn quận/huyện</option>
                                                {districts.map(district => (
                                                    <option key={district.DistrictCode} value={district.DistrictCode}>
                                                        {district.DistrictName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phường/Xã <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="toWard"
                                                value={formData.toWard}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                disabled={!formData.toDistrict}
                                            >
                                                <option value="">Chọn phường/xã</option>
                                                {wards.map(ward => (
                                                    <option key={ward.WardCode} value={ward.WardCode}>
                                                        {ward.WardName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Địa chỉ chi tiết <span className="text-red-500">*</span>
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
                                            value="vn-pay"
                                            checked={formData.paymentMethod === 'vn-pay'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>Thanh toán bằng VN-Pay</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Sản phẩm đã chọn */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Sản phẩm đã chọn</h2>
                                <div className="space-y-4">
                                    {listCartItem.map(item => (
                                        <OrderItem key={item.cartItemId} cartItem={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tóm tắt đơn hàng */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
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

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-200"
                                >
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
                </form>
            </div>
        </div>
    );
};

export default Checkout; 