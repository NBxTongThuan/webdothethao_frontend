import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CartItemModel } from '../../../model/CartItemModel';
import { getListCartItemByCartID } from '../../../api/user/CartAPI';
import OrderItem from './OrderItem';
import { getProvinces, getDistricts, getWards } from '../../../api/user/AddressAPI';
import { toast } from 'react-toastify';
import { District, MyAddressResponse, Province, Ward } from '../../../api/interface/Responses';
import { getAddress } from '../../../api/user/MyAddressAPI';
import { Form, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CreditCard, Wallet, User, Phone, MapPin, Building2, Home, MessageSquare, Wallpaper } from 'lucide-react';
const { Option } = Select;
interface FormData {
    fullName: string;
    phone: string;
    toProvince: string;
    toDistrict: string;
    toWard: string;
    address: string;
    note: string;
    paymentMethod: string;
}


const Checkout: React.FC = () => {

    const [form] = Form.useForm();
    const [listMyAddress, setListMyAddress] = useState<MyAddressResponse[]>([]);
    const { cartID } = useParams();
    const [listCartItem, setListCartItem] = useState<CartItemModel[]>([]);
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState<MyAddressResponse | null>(null);


    useEffect(() => {
        getAddress()
            .then(response => {
                setListMyAddress(response);
            })
            .catch(
                error => {
                    toast.error("Không lấy được thông tin người dùng!");
                }
            )
    }
        , []);

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

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');

    const handleProvinceCode = (provinceName: string) => {
        const province = provinces.find(p => p.ProvinceName == provinceName + "");
        return province ? province.ProvinceCode : '';
    }

    const handleDistrictCode = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictCode : '';
    }

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
        if (selectedAddress) {
            form.setFieldsValue({
                toProvince: selectedAddress.toProvince,
                toDistrict: selectedAddress.toDistrict,
                toWard: selectedAddress.toWard,
                toAddress: selectedAddress.toAddress,
                toName: selectedAddress.toName,
                toPhone: selectedAddress.toPhone,
            });
        }
    }, [selectedAddress]);

    useEffect(() => {

        const loadDistricts = async () => {
            if (selectedProvince) {
                try {
                    const districtsData = await getDistricts(selectedProvince);
                    setDistricts(districtsData);
                } catch (error) {
                    console.error('Error loading districts:', error);
                }
            } else {
                setDistricts([]);
            }
        };
        loadDistricts();
    }, [selectedProvince]);



    useEffect(() => {
        const loadWards = async () => {
            if (selectedDistrict) {
                try {
                    const wardsData = await getWards(selectedDistrict);
                    setWards(wardsData);
                } catch (error) {
                    console.error('Error loading wards:', error);
                }
            } else {
                setWards([]);
            }
        };
        loadWards();
    }, [selectedDistrict]);

    const getProvisionalPrice = () => {
        return listCartItem.reduce((acc, item) => {
            return acc + (item.price - item.moneyOff) * item.quantity;
        }, 0);
    }


    const hadleOrderCOD = async (values: any) => {
        if (values.paymentMethod == 'cod') {

            const url = `http://localhost:8080/api/orders/cod-order`;
            const data = {
                orderNote: values.note,
                toAddress: values.toAddress,
                toProvince: handleProvinceName(values.toProvince),
                toDistrict: handleDistrictName(values.toDistrict),
                toWard: handleWardName(values.toWard),
                toPhone: values.toPhone,
                toName: values.toName,

            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });

                if (response.ok) {
                    toast.success('Đặt hàng thành công');
                    navigate('/orderSuccess');
                } else {
                    toast.error('Đặt hàng thất bại');
                }
            } catch (error) {
                toast.error('Đặt hàng thất bại');
            }
        }
    }

    const hadleOrderVNPay = async (values: any) => {
        if (values.paymentMethod == 'vn-pay') {

            const url = `http://localhost:8080/api/payment/vn-pay/create`;
            const data = {
                orderNote: values.note,
                toAddress: values.toAddress,
                toProvince: handleProvinceName(values.toProvince),
                toDistrict: handleDistrictName(values.toDistrict),
                toWard: handleWardName(values.toWard),
                toPhone: values.toPhone,
                toName: values.toName,
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
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

    const handleSubmit = (values: any) => {

        if (values.paymentMethod == 'cod') {
            hadleOrderCOD(values);
        } else {
            hadleOrderVNPay(values);
        }
    };

    const handleProvinceName = (provinceCode: string) => {
        const province = provinces.find(p => p.ProvinceCode == provinceCode + "");
        return province ? province.ProvinceName : provinceCode;
    }
    const handleDistrictName = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictName : districtCode;
    }
    const handleWardName = (wardCode: string) => {
        const ward = wards.find(w => w.WardCode == wardCode);
        return ward ? ward.WardName : wardCode;
    }
    const total = getProvisionalPrice();
    const shippingFee = 30000;
    const finalTotal = total + shippingFee;



    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[95%] mx-auto px-2 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h1>
                <Form
                    form={form}
                    onFinish={(values) => {
                        handleSubmit(values);
                    }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Thông tin giao hàng */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h1 className="text-lg font-semibold mb-4 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                    Chọn địa chỉ sẵn
                                </h1>
                                <Select
                                    placeholder="Chọn địa chỉ"
                                    className="w-full rounded-lg h-12"
                                    onChange={(value) => {
                                        const address = listMyAddress.find(address => address.addressId == value);
                                        setSelectedAddress(address || null);
                                    }}
                                    dropdownStyle={{ maxHeight: 400 }}
                                    optionLabelProp="label"
                                >
                                    {listMyAddress.map(address => (
                                        <Option 
                                            key={address.addressId} 
                                            value={address.addressId}
                                            label={`${address.toName} - ${address.toPhone} - ${address.toAddress} - ${address.toWard} - ${address.toDistrict} - ${address.toProvince}`}
                                        >
                                            <div className="py-2">
                                                <div className="flex items-center text-gray-700 mb-1">
                                                    <User className="h-4 w-4 mr-2 text-gray-500" />
                                                    <span className="font-medium">{address.toName}</span>
                                                </div>
                                                <div className="flex items-center text-gray-700 mb-1">
                                                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                                    <span>{address.toPhone}</span>
                                                </div>
                                                <div className="flex items-start text-gray-700">
                                                    <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1" />
                                                    <div>
                                                        <p className="font-medium">{address.toAddress}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {address.toWard}, {address.toDistrict}, {address.toProvince}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                    Thông tin giao hàng
                                </h2>
                                <div className="space-y-4">
                                    <Form.Item
                                        name="toName"
                                        label={
                                            <span className="flex items-center text-gray-700">
                                                <User className="h-4 w-4 mr-2 text-gray-500" />
                                                Tên người nhận
                                            </span>
                                        }
                                        rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input placeholder="Nhập tên người nhận" className="rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        name="toPhone"
                                        label={
                                            <span className="flex items-center text-gray-700">
                                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                                Số điện thoại
                                            </span>
                                        }
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input placeholder="Nhập số điện thoại" className="rounded-lg" />
                                    </Form.Item>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Form.Item
                                            name="toProvince"
                                            label={
                                                <span className="flex items-center text-gray-700">
                                                    <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                                    Tỉnh/Thành phố
                                                </span>
                                            }
                                            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Select
                                                placeholder="Chọn tỉnh/thành phố"
                                                onChange={(value) => {
                                                    setSelectedProvince(value);
                                                    form.setFieldsValue({
                                                        toDistrict: null
                                                    });
                                                }}
                                                className="rounded-lg"
                                            >
                                                {provinces.map(province => (
                                                    <Select.Option key={province.ProvinceCode} value={province.ProvinceCode}>
                                                        {province.ProvinceName}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="toDistrict"
                                            label={
                                                <span className="flex items-center text-gray-700">
                                                    <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                                    Quận/Huyện
                                                </span>
                                            }
                                            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Select
                                                placeholder="Chọn quận/huyện"
                                                onChange={(value) => {
                                                    setSelectedDistrict(value);
                                                    form.setFieldsValue({
                                                        toWard: null
                                                    });
                                                }}
                                                disabled={!selectedProvince}
                                                className="rounded-lg"
                                            >
                                                {districts.map(district => (
                                                    <Select.Option key={district.DistrictCode} value={district.DistrictCode}>
                                                        {district.DistrictName}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="toWard"
                                            label={
                                                <span className="flex items-center text-gray-700">
                                                    <Home className="h-4 w-4 mr-2 text-gray-500" />
                                                    Phường/Xã
                                                </span>
                                            }
                                            rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                        >
                                            <Select
                                                placeholder="Chọn phường/xã"
                                                disabled={!selectedDistrict}
                                                className="rounded-lg"
                                            >
                                                {wards.map(ward => (
                                                    <Select.Option key={ward.WardCode} value={ward.WardCode}>
                                                        {ward.WardName}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>

                                    <Form.Item
                                        name="toAddress"
                                        label={
                                            <span className="flex items-center text-gray-700">
                                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                                Địa chỉ chi tiết
                                            </span>
                                        }
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input placeholder="Nhập địa chỉ chi tiết" className="rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        name="note"
                                        label={
                                            <span className="flex items-center text-gray-700">
                                                <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                                                Ghi chú
                                            </span>
                                        }
                                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <TextArea
                                            rows={3}
                                            placeholder="Ghi chú cho đơn hàng"
                                            className="rounded-lg"
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center">
                                    <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                                    Phương thức thanh toán
                                </h2>
                                <Form.Item
                                    name="paymentMethod"
                                    rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                                >
                                    <Radio.Group className="w-full space-y-4">
                                        <Radio value="cod" className="w-full">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200 cursor-pointer group">
                                                <Wallet className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
                                                <div className="ml-3">
                                                    <div className="text-gray-700 group-hover:text-blue-500 transition-colors duration-200 font-medium">
                                                        Thanh toán khi nhận hàng (COD)
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Thanh toán bằng tiền mặt khi nhận hàng
                                                    </div>
                                                </div>
                                            </div>
                                        </Radio>

                                        <Radio value="vn-pay" className="w-full">
                                            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200 cursor-pointer group">
                                                <CreditCard className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
                                                <div className="ml-3">
                                                    <div className="text-gray-700 group-hover:text-blue-500 transition-colors duration-200 font-medium">
                                                        Thanh toán bằng VN-Pay
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Thanh toán qua cổng thanh toán VNPay
                                                    </div>
                                                </div>
                                            </div>
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
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
                                <h2 className="text-lg font-semibold mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                    </svg>
                                    Tóm tắt đơn hàng
                                </h2>
                                <div className="border-t mt-4 pt-4 space-y-4">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Tạm tính</span>
                                        <span className="font-medium text-gray-800">{total.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Phí vận chuyển</span>
                                        <span className="font-medium text-gray-800">{shippingFee.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="border-t pt-4 mt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                                            <span className="text-xl font-bold text-blue-600">{finalTotal.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Đặt hàng</span>
                                </button>

                                <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                                    Bằng cách đặt hàng, bạn đồng ý với{' '}
                                    <Link to="/terms" className="text-blue-500 hover:text-blue-600 hover:underline ml-1 transition-colors duration-200">
                                        Điều khoản và điều kiện
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Checkout; 