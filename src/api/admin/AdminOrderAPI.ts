import { promises } from "dns";
import { OrderResponse, RevenueResponse } from "../interface/Responses";


const API_URL = 'http://localhost:8080/api/admin/orders';

interface responseData{
    totalPage: number;
    listOrder: OrderResponse[],
    totalSize:number
}

export const getAllOrders = async (page:number,size:number,orderStatus: string):Promise<responseData> => {
    try {
        const response = await fetch(`${API_URL}/getAllOrder?page=${page}&size=${size}&orderStatus=${orderStatus}`,
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

export const getOrderStats = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/totalOrderToday`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();
    return data;
};

export const getRevenueOfMonth = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_URL}/getRevenueOfMonth`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        if (!text) {
            return 0;
        }

        try {
            const data = JSON.parse(text);
            return data || 0;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return 0;
        }
    } catch (error) {
        console.error('Error fetching revenue of month:', error);
        return 0;
    }
};

export const getRevenueByDate = async (startDate: string, endDate: string): Promise<RevenueResponse[]> => {
    try {
        const response = await fetch(`${API_URL}/getRevenueByDate?start=${startDate}&end=${endDate}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        const data = await response.json();
        const listRevenue = data;
        if(!listRevenue || listRevenue.length === 0){
            return [];
        }
        const revenue: RevenueResponse[] = listRevenue.map((revenue: RevenueResponse) => ({
            total: revenue.total,
            date: revenue.date
        }));
        return revenue;
    } catch (error) {
        console.error('Error fetching revenue by date:', error);
        throw error;
    }
}

export const getNewOrder = async (page:number,size:number): Promise<responseData> => {
    const response = await fetch(`${API_URL}/getNewOrders?page=${page}&size=${size}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();
    const listOrder = data._embedded?.orderResponseList;
    if(!listOrder || listOrder.length === 0){
        return {
            totalPage: 0,
            listOrder: [],
            totalSize: 0
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
}
