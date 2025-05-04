import { OrderItemResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/orderItems';


export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItemResponse[]> => {
    const response = await fetch(`${API_URL}/listOrderItem?orderId=${orderId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();

    const listOrderItem = data;

    const orderItems: OrderItemResponse[] = listOrderItem.map((orderItem: OrderItemResponse) => ({
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
    }));
    return orderItems;
}
