import { OrderResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/orders';



interface responseData{
    totalPage: number;
    listOrder: OrderResponse[];
}
export const getOrders = async (userName: string, page: number, size: number,orderStatus: string): Promise<responseData> => {
    try {
        const response = await fetch(`${API_URL}/my-orders?userName=${userName}&page=${page}&size=${size}&orderStatus=${orderStatus}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const listOrder = data._embedded?.orderResponseList;

        if(!listOrder || listOrder.length === 0){
            return {
                totalPage: 0,
                listOrder: []
            };
        }

        const orders: OrderResponse[] = listOrder.map((order: OrderResponse) => ({
            orderId: order.orderId,
            status: order.status,
            createdDate: order.createdDate,
            toName: order.toName,
            toPhone: order.toPhone,
            toEmail: order.toEmail,
            toProvince: order.toProvince,
            toDistrict: order.toDistrict,
            toWard: order.toWard,
            toAddress: order.toAddress,
            orderNote: order.orderNote,
            orderNoteCanceled: order.orderNoteCanceled,
            totalPrice: order.totalPrice,
            totalMoneyOff: order.totalMoneyOff,
            finalPrice: order.finalPrice,
            shipFee: order.shipFee,
            dateReceive: order.dateReceive,
            dateExpected: order.dateExpected
        }));
        return {
            totalPage: data.page.totalPages,
            listOrder: orders
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
    try {
        const response = await fetch(`${API_URL}/get-by-id?orderId=${orderId}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok'); 
        }
        const data = await response.json();
        return ({
            orderId: data.orderId,
            status: data.status,
            createdDate: data.createdDate,
            toName: data.toName,
            toPhone: data.toPhone,
            toEmail: data.toEmail,
            toProvince: data.toProvince,
            toDistrict: data.toDistrict,
            toWard: data.toWard,
            toAddress: data.toAddress,
            orderNote: data.orderNote,
            orderNoteCanceled: data.orderNoteCanceled,
            totalPrice: data.totalPrice,
            totalMoneyOff: data.totalMoneyOff,
            finalPrice: data.finalPrice,
            shipFee: data.shipFee,
            dateReceive: data.dateReceive,
            dateExpected: data.dateExpected,
            dateCancel:data.dateCancel
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

