import { AdminOrderItemResponse, OrderItemResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/order-items';

export const AdminGetOrderItemsByOrderId = async (orderId: string): Promise<AdminOrderItemResponse[]> => {
    const response = await fetch(`${API_URL}/list?orderId=${orderId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();

    const listOrderItem = data;

    const orderItems: AdminOrderItemResponse[] = listOrderItem.map((orderItem: AdminOrderItemResponse) => ({
        orderItemId: orderItem.orderItemId,
        finalPrice: orderItem.finalPrice,
        originalPrice: orderItem.originalPrice,
        quantity: orderItem.quantity,
        reviewed: orderItem.reviewed,
        orderId: orderItem.orderId,
        moneyOffPerOneProduct: orderItem.moneyOffPerOneProduct,
        color: orderItem.color,
        size: orderItem.size,
        productName: orderItem.productName,
        productId: orderItem.productId,
        productAttributeId: orderItem.productAttributeId,
        importPrice: orderItem.importPrice
    }));
    return orderItems;
}