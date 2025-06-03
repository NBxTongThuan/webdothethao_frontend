// Invoice.tsx
import React, { forwardRef } from "react";
import { User, Calendar, MapPin, Phone, Mail } from "lucide-react";
import dayjs from "dayjs";

interface InvoiceProps {
    orderId: string;
    customerName: string;
    dateReceive:string;
    address: string;
    phone: string;
    email: string;
    items: {
        name: string;
        quantity: number;
        price: number;
        color: string;
        size: string;
    }[];
    total: number;
}


const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(({ orderId, customerName, address, phone, email, items, total,dateReceive }, ref) => {
    const currentDate = new Date().toLocaleDateString('vi-VN');

    const handleGetVNColor = (value: string) => {
        switch (value.trim()) {
            case "RED":
                return "Đỏ";
            case "BLUE":
                return "Xanh";
            case "GREEN":
                return "Xanh lá";
            case "YELLOW":
                return "Vàng";
            case "WHITE":
                return "Trắng";
            case "BLACK":
                return "Đen";
            case "PINK":
                return "Hồng";
            case "PURPLE":
                return "Tím";
            case "ORANGE":
                return "Cam";
            case "BROWN":
                return "Nâu";
            case "GRAY":
                return "Xám";
            default:
                return "";
        }
    }

    const handleTotalPrice = () => {
        let totalPrice = 0;
        items.map(
            item => {
                totalPrice = totalPrice + item.price * item.quantity;
            }
        )
        return totalPrice;

    }

    return (
        <div ref={ref} className="text-black max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-red-600 mb-4">HÓA ĐƠN THANH TOÁN</h1>
                <p className="text-gray-700 text-lg">Ngày: {currentDate}</p>
            </div>

            {/* Store Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cửa hàng</h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="font-semibold text-gray-700">Tên cửa hàng:</p>
                        <p className="text-gray-700">YouSport</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Mã đơn hàng:</p>
                        <p className="text-gray-700">{orderId}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Địa chỉ:</p>
                        <p className="text-gray-700">Số 30 Phùng Khoang, Quận Hà Đông, TP. Hà Nội</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Hotline:</p>
                        <p className="text-gray-700">0869 325 957</p>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin khách hàng</h2>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3 w-full sm:w-1/2 md:w-1/3">
                        <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <p className="text-gray-700"><span className="font-semibold">Tên khách hàng:</span> {customerName}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-1/2 md:w-1/3">
                        <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <p className="text-gray-700"><span className="font-semibold">Ngày mua:</span> {dayjs(dateReceive).format('DD/MM/YYYY HH:mm')}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-1/2 md:w-1/3">
                        <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <p className="text-gray-700"><span className="font-semibold">Địa chỉ:</span> {address}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-1/2 md:w-1/3">
                        <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <p className="text-gray-700"><span className="font-semibold">Số điện thoại:</span> {phone}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-1/2 md:w-1/3">
                        <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <p className="text-gray-700"><span className="font-semibold">Email:</span> {email}</p>
                    </div>
                </div>
            </div>


            {/* Items Table */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Chi tiết sản phẩm</h2>
                <table className="w-full border-collapse shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-4 text-left">Sản phẩm</th>
                            <th className="border p-4 text-right">Màu sắc</th>
                            <th className="border p-4 text-right">Kích cỡ</th>
                            <th className="border p-4 text-right">Đơn giá</th>
                            <th className="border p-4 text-center">Số lượng</th>
                            <th className="border p-4 text-right">Thành tiền</th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-all">
                                <td className="border p-4">{item.name}</td>
                                <td className="border p-4 text-right">{handleGetVNColor(item.color + "")}</td>
                                <td className="border p-4 text-right">{item.size}</td>
                                <td className="border p-4 text-right">{item.price.toLocaleString()} đ</td>
                                <td className="border p-4 text-center">{item.quantity}</td>
                                <td className="border p-4 text-right">{(item.quantity * item.price).toLocaleString()} đ</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total */}
            <div className="text-right bg-gray-50 rounded-lg shadow-md">
                <p className="text-2xl p-4 font-bold text-red-600">
                    Tổng cộng: {handleTotalPrice()} VNĐ
                </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-600">
                <p className="mb-2">Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi!</p>
                <p>Hóa đơn này có giá trị thanh toán và không cần chữ ký.</p>
            </div>
        </div>

    );
});

export default Invoice;
