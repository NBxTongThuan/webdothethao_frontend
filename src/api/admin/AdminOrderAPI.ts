import { promises } from "dns";
import { OrderResponse } from "../interface/Responses";


const API_URL = 'http://localhost:8080/api/admin/orders';

interface responseData{
    totalPage: number;
    listOrder: OrderResponse[],
    totalSize:number
}

export const getAllOrders = async (page:number,size:number,orderStatus: string):Promise<responseData> => {
    try {
        const response = await fetch(`${API_URL}/getAllOrder?page=${page}&size=${size}&orderStatus=${orderStatus}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const listOrder = data._embedded?.orderResponseList;

        if(!listOrder || listOrder.length === 0){
            return {
                totalPage: 0,
                listOrder: [],
                totalSize:0
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
            shipFee: order.shipFee,
            dateReceive: order.dateReceive,
            dateExpected: order.dateExpected
        }));
        return {
            totalPage: data.page.totalPages,
            listOrder: orders,
            totalSize: data.page.totalElements
        };

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};