import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../../api/user/OrderAPI";
import { getOrderItemsByOrderId } from "../../../api/user/OrderItemAPI";
import { get1Image } from "../../../api/user/ImagesAPI";
import NumberFormat from "../../../util/NumberFormat";
import OrderCancel from "./OrderCancel";
import { Button } from "antd";
import OrderReview from "./OrderReview";
import { getUserName } from "../../../util/JwtService";
import SeeReview from "./SeeReview";
import { OrderItemResponse, OrderResponse, PaymentResponse } from "../../../api/interface/Responses";
import { getPaymentByOrderId } from "../../../api/user/PaymentAPI";

const OrderDetail: React.FC = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<OrderResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItemResponse[]>([]);
    const [itemImages, setItemImages] = useState<{ [key: string]: string }>({});
    const [showOrderCancel, setShowOrderCancel] = useState(false);
    const [showOrderReview, setShowOrderReview] = useState(false);
    const [showSeeReview, setShowSeeReview] = useState(false);
    const [payment, setPayment] = useState<PaymentResponse>();
    const token = localStorage.getItem('token');
    const userName = getUserName(token + "");

    const [selectedItem, setSelectedItem] = useState<OrderItemResponse>();

    useEffect(() => {
        if (orderId) {
            getOrderById(orderId)
                .then(setOrder)
                .catch(setError)
                .finally(() => setLoading(false));
        }
    }, [orderId]);

    useEffect(() => {
        if (orderId) {
            getOrderItemsByOrderId(orderId)
                .then(setOrderItems)
                .catch(setError);
        }
    }, [orderId]);

    useEffect(() => {

        if (orderId) {
            getPaymentByOrderId(orderId)
                .then(setPayment)
                .catch(setError)
        }

    }, [orderId])

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

                {order.status == "PENDING" && (
                    <div className="mb-6 text-right">
                        <button
                            onClick={() => setShowOrderCancel(true)}
                            className="inline-flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 hover:text-red-700 transition-colors duration-200 font-medium shadow-sm"
                        >
                            <i className="fas fa-times-circle mr-2"></i>
                            Hủy đơn
                        </button>
                    </div>

                )}

                {showOrderCancel && (
                    <OrderCancel
                        orderId={order.orderId}
                        onClose={() => setShowOrderCancel(false)}
                    />
                )}

            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                    <i className="fas fa-box text-green-500 mr-2"></i>
                    Danh sách sản phẩm
                </h2>
                <div className="space-y-4">
                    {orderItems.map((item) => (
                        <div key={item.orderItemId} className="flex items-center border-b pb-4 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    src={itemImages[item.productId] || "/images/no-image.png"}
                                    alt={item.productName}
                                    className="w-full h-full object-cover rounded-lg shadow-sm"
                                />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="text-lg font-medium text-left text-gray-800 hover:text-red-600 transition-colors duration-200">{item.productName}</h3>
                                <div className="grid grid-cols-2 gap-4 mt-2 bg-white p-3 rounded-lg shadow-sm">
                                    <div className="text-gray-600 text-left">Màu sắc:</div>
                                    <div
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: item.color }}
                                    />

                                    <div className="text-gray-600 text-left">Kích thước:</div>
                                    <div className="text-left text-gray-800">{item.size}</div>

                                    <div className="text-gray-600 text-left">Số lượng:</div>
                                    <div className="text-left text-gray-800">{item.quantity}</div>

                                    <div className="text-gray-600 text-left">Đơn giá:</div>
                                    <div className="font-medium text-red-600 text-left">{NumberFormat(item.price)} VNĐ</div>

                                    <div className="text-gray-600 text-left">Tổng tiền:</div>
                                    <div className="font-medium text-red-600 text-left">{NumberFormat(item.price * item.quantity)} VNĐ</div>

                                    {order.status == "DELIVERED" && (
                                        <div className="text-gray-600 text-left">Đánh giá:</div>
                                    )}
                                    <div className="text-left">
                                        {item.reviewed == false && order.status == "DELIVERED"
                                            &&
                                            <Button
                                                onClick={() => {
                                                    setShowOrderReview(true);
                                                    setSelectedItem(item);
                                                }}
                                                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                                            >
                                                <i className="fas fa-star mr-2"></i>
                                                Đánh giá
                                            </Button>
                                        }

                                        {
                                            item.reviewed == true && order.status == "DELIVERED" &&
                                            <Button
                                                onClick={() => {
                                                    setShowSeeReview(true);
                                                    setSelectedItem(item);
                                                }}
                                                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200"
                                            >
                                                <i className="fas fa-eye mr-2"></i>
                                                Xem đánh giá
                                            </Button>
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {
                        showOrderReview && (
                            <OrderReview
                                orderItemId={selectedItem?.orderItemId + ""}
                                productId={selectedItem?.productId + ""}
                                productAttributeId={selectedItem?.productAttributeId + ""}
                                userName={userName + ""}
                                onClose={() => setShowOrderReview(false)}
                            />
                        )
                    }
                    {
                        showSeeReview && (
                            <SeeReview
                                orderItemId={selectedItem?.orderItemId + ""}
                                userName={userName + ""}
                                onClose={() => setShowSeeReview(false)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
