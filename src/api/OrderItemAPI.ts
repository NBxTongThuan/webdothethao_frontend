
const API_URL = 'http://localhost:8080/api/orderItems';

export interface OrderItemResponse {
    orderItemId: string;
    price: number;
    quantity: number;
    orderId: string;
    color: string;
    size: string;
    productName: string;
    productId: string;
    productAttributeId: string;
    reviewed: boolean;
}

export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItemResponse[]> => {
    const response = await fetch(`${API_URL}/listOrderItem?orderId=${orderId}`);
    const data = await response.json();

    const listOrderItem = data;

    const orderItems: OrderItemResponse[] = listOrderItem.map((orderItem: OrderItemResponse) => ({
        orderItemId: orderItem.orderItemId,
        price: orderItem.price,
        quantity: orderItem.quantity,
        orderId: orderItem.orderId,
        color: orderItem.color,
        size: orderItem.size,
        productName: orderItem.productName,
        productId: orderItem.productId,
        productAttributeId: orderItem.productAttributeId,
        reviewed: orderItem.reviewed
    }));
    return orderItems;
}
