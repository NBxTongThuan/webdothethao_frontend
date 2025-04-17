import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../../api/user/OrderAPI";
import { getOrderItemsByOrderId } from "../../../api/user/OrderItemAPI";
import { get1Image } from "../../../api/user/ImagesAPI";
import NumberFormat from "../../../util/NumberFormat";
import { Button } from "antd";
import { getUserName } from "../../../util/JwtService";
import { OrderItemResponse, OrderResponse, PaymentResponse } from "../../../api/interface/Responses";
import { motion, AnimatePresence } from 'framer-motion';
import { getPaymentByOrderId } from "../../../api/user/PaymentAPI";

interface ModalProps {
    orderId: string;
    onClose: () => void;
}

const OrderDetailAdmin: React.FC<ModalProps> = (props) => {
    const [order, setOrder] = useState<OrderResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItemResponse[]>([]);
    const [itemImages, setItemImages] = useState<{ [key: string]: string }>({});
    const token = localStorage.getItem('token');
    const [payment, setPayment] = useState<PaymentResponse>();


    useEffect(() => {
        if (props.orderId) {
            getOrderById(props.orderId)
                .then(setOrder)
                .catch(setError)
                .finally(() => setLoading(false));
        }
    }, [props.orderId]);

    useEffect(() => {
        if (props.orderId) {
            getOrderItemsByOrderId(props.orderId)
                .then(setOrderItems)
                .catch(setError);
        }
    }, [props.orderId]);

    useEffect(() => {

        if (props.orderId) {
            getPaymentByOrderId(props.orderId)
                .then(setPayment)
                .catch(setError)
        }

    }, [props.orderId])

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = orderItems.map(item =>
                get1Image(item.productId)
                    .then(image => ({ id: item.productId, data: image?.data?.toString() || '' }))
                    .catch(() => ({ id: item.productId, data: '' }))
            );
            const images = await Promise.all(imagePromises);
            const imageMap = images.reduce((acc, curr) => {
                acc[curr.id] = curr.data;
                return acc;
            }, {} as { [key: string]: string });
            setItemImages(imageMap);
        };

        if (orderItems.length > 0) {
            fetchImages();
        }
    }, [orderItems]);


    //Handle order
    const url = 'http://localhost:8080/api/orders/admin/updateOrder';

    const handleConfirmOrder = () => {

        const data = {
            "orderId": "cd9985f5-5476-4454-8983-68fbf35e4899",
            "orderStatus": "COMFIRMED"
        };


    }



    if (loading) {
        return (
            <div className="flex justify-start items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-start items-center h-screen">
                <div className="text-red-500 text-xl">Lỗi: {error}</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex justify-start items-center h-screen">
                <div className="text-gray-500 text-xl">Không tìm thấy đơn hàng</div>
            </div>
        );
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Chờ xác nhận';
            case 'CONFIRMED':
                return 'Đã xác nhận';
            case 'SHIPPING':
                return 'Đang giao hàng';
            case 'DELIVERED':
                return 'Đã giao hàng';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const getPaymentStatus = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Chưa thanh toán';
            case 'COMPLETED':
                return 'Đã thanh toán';
            case 'FAILED':
                return 'Thanh toán thất bại';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return status;
        }
    };


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800';
            case 'SHIPPING':
                return 'bg-purple-100 text-purple-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
            >
                <motion.div
                    className="bg-white rounded-xl p-8 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 mb-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Chi tiết đơn hàng</h1>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} shadow-sm`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                                        <i className="fas fa-shopping-bag text-red-500 mr-2"></i>
                                        Thông tin đơn hàng
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="text-gray-600 text-left">Mã đơn hàng:</div>
                                        <div className="font-medium text-left text-gray-800">{order.orderId}</div>

                                        <div className="text-gray-600 text-left">Ngày đặt hàng:</div>
                                        <div className="font-medium text-left text-gray-800">{new Date(order.createdDate).toLocaleDateString('vi-VN')}</div>

                                        <div className="text-gray-600 text-left">Ngày giao dự kiến:</div>
                                        <div className="font-medium text-left text-gray-800">{new Date(order.dateExpected).toLocaleDateString('vi-VN')}</div>



                                        {order.dateReceive && (
                                            <>
                                                <div className="text-gray-600 text-left">Ngày giao hàng:</div>
                                                <div className="font-medium text-left text-gray-800">{new Date(order.dateReceive).toLocaleDateString('vi-VN')}</div>
                                            </>
                                        )}

                                        {order.dateCancel && (
                                            <>
                                                <div className="text-gray-600 text-left">Ngày hủy:</div>
                                                <div className="font-medium text-left text-gray-800">{new Date(order.dateCancel).toLocaleDateString('vi-VN')}</div>
                                            </>
                                        )}

                                        <div className="text-gray-600 text-left">Tổng tiền hàng:</div>
                                        <div className="font-medium text-red-600 text-left">{NumberFormat(order.totalPrice)} VNĐ</div>

                                        <div className="text-gray-600 text-left">Phí vận chuyển:</div>
                                        <div className="font-medium text-left text-gray-800">{NumberFormat(order.shipFee)} VNĐ</div>

                                        <div className="text-gray-600 text-left">Tổng tiền:</div>
                                        <div className="font-medium text-red-600 text-left">{NumberFormat(order.totalPrice + order.shipFee)} VNĐ</div>

                                        <div className="text-gray-600 text-left">Phương thức thanh toán:</div>
                                        <div className="font-medium text-red-600 text-left">{payment?.paymentMethod === 'CASH_ON_DELIVERY' ? "Thanh toán khi nhận hàng" : "Thanh toán VN-Pay"}</div>

                                        <div className="text-gray-600 text-left">Trạng thái thanh toán:</div>
                                        <div className="font-medium text-red-600 text-left">{getPaymentStatus(payment?.paymentStatus + "")}</div>


                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                                        <i className="fas fa-truck text-blue-500 mr-2"></i>
                                        Thông tin giao hàng
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="text-gray-600 text-left">Họ tên:</div>
                                        <div className="font-medium text-left text-gray-800">{order.toName}</div>

                                        <div className="text-gray-600 text-left">Số điện thoại:</div>
                                        <div className="font-medium text-left text-gray-800">{order.toPhone}</div>

                                        <div className="text-gray-600 text-left">Email:</div>
                                        <div className="font-medium text-left text-gray-800">{order.toEmail}</div>

                                        <div className="text-gray-600 text-left">Địa chỉ:</div>
                                        <div className="font-medium text-left text-gray-800">{order.toAddress}, {order.toWard}, {order.toDistrict}, {order.toProvince}</div>
                                    </div>
                                </div>
                            </div>

                            {order.orderNote && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
                                        <i className="fas fa-sticky-note text-yellow-500 mr-2"></i>
                                        Ghi chú đơn hàng
                                    </h2>
                                    <p className="text-gray-600 pl-4 border-l-2 border-yellow-200 bg-yellow-50 p-3 rounded-r-lg text-left">{order.orderNote}</p>
                                </div>
                            )}

                            {order.orderNoteCanceled && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
                                        <i className="fas fa-times-circle text-red-500 mr-2"></i>
                                        Lý do hủy đơn
                                    </h2>
                                    <p className="text-red-600 pl-4 border-l-2 border-red-200 bg-red-50 p-3 rounded-r-lg text-left">{order.orderNoteCanceled}</p>
                                </div>
                            )}


                            {/* {order.status == "PENDING" && (
                                <div className="mb-6 text-right">
                                    <button
                                        onClick={() => setShowOrderCancel(true)}
                                        className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 hover:text-red-700 transition-colors duration-200 font-medium shadow-sm"
                                    >
                                        <i className="fas fa-times-circle mr-2"></i>
                                        Hủy đơn
                                    </button>
                                </div>
                            )} */}
                        </div>

                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                                <i className="fas fa-box text-green-500 mr-2"></i>
                                Danh sách sản phẩm
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sản phẩm
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Màu sắc
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kích thước
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Số lượng
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Đơn giá
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tổng tiền
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orderItems.map((item) => (
                                            <tr key={item.orderItemId} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-16 w-16">
                                                            <img
                                                                className="h-16 w-16 rounded-md object-cover"
                                                                src={itemImages[item.productId] || "/images/no-image.png"}
                                                                alt={item.productName}
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.productName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-4 h-4 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.size}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {NumberFormat(item.price)} VNĐ
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                                                    {NumberFormat(item.price * item.quantity)} VNĐ
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>



                            </div>
                            <div className="mt-5 flex justify-end">
                                {order.status === "PENDING" &&
                                    <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
                                        Xác nhận đơn hàng
                                    </Button>}
                                {order.status === "CONFIRMED" &&
                                    <Button type="primary" className="bg-green-600 hover:bg-green-700">
                                        Giao hàng
                                    </Button>}

                                {order.status === "SHIPPING" &&
                                    <Button type="primary" className="bg-purple-600 hover:bg-purple-700">
                                        Xác nhận đã giao hàng
                                    </Button>}

                                {order.status === "SHIPPING" &&
                                    <Button type="primary" className="bg-red-600 hover:bg-red-700 ml-3">
                                        Khách không nhận hàng
                                    </Button>}

                                <Button type="default" className="ml-4 border-gray-300 hover:border-gray-400">
                                    Trở về
                                </Button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OrderDetailAdmin;
