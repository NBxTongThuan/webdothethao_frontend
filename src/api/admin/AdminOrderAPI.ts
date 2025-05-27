import { promises } from "dns";
import { RevenueResponse, AdminOrderResponse, InterestResponse, CountRateOrder } from "../interface/Responses";


const API_URL = 'http://localhost:8080/api/admin/orders';

interface responseData{
    totalPage: number;
    listOrder: AdminOrderResponse[],
    totalSize:number
}

export const getAllOrders = async (page:number,size:number,orderStatus: string):Promise<responseData> => {
    try {
        const response = await fetch(`${API_URL}/get-all?page=${page}&size=${size}&orderStatus=${orderStatus}`,
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

        const orders: AdminOrderResponse[] = listOrder.map((order: AdminOrderResponse) => ({
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
            dateExpected: order.dateExpected,
            dateCancel: order.dateCancel,
            totalImportPrice: order.totalImportPrice
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
    const response = await fetch(`${API_URL}/total-today`,
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
        const response = await fetch(`${API_URL}/revenue-of-month`,
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
        const response = await fetch(`${API_URL}/revenue-by-date?start=${startDate}&end=${endDate}`,
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


export const getInterestByDate = async (startDate: string, endDate: string): Promise<InterestResponse[]> => {
    try {
        const response = await fetch(`${API_URL}/interest-by-date?start=${startDate}&end=${endDate}`,
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
        const revenue: InterestResponse[] = listRevenue.map((revenue: InterestResponse) => ({
            total: revenue.total,
            date: revenue.date
        }));
        return revenue;
    } catch (error) {
        console.error('Error fetching interest by date:', error);
        throw error;
    }
}


export const getNewOrder = async (page:number,size:number): Promise<responseData> => {
    const response = await fetch(`${API_URL}/new?page=${page}&size=${size}`,
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
    const orders: AdminOrderResponse[] = listOrder.map((order: AdminOrderResponse) => ({
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
        dateExpected: order.dateExpected,
        dateCancel: order.dateCancel,
        totalImportPrice: order.totalImportPrice
    }));
    return {
        totalPage: data.page.totalPages,
        listOrder: orders,
        totalSize: data.page.totalElements
    };
}


export const getOrderAdminById = async (orderId: string): Promise<AdminOrderResponse> => {
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
            dateCancel:data.dateCancel,
            totalImportPrice: data.totalImportPrice
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const getCountRateOrder = async (): Promise<CountRateOrder> => {
    try {
        const response = await fetch(`${API_URL}/get-rate-by-status`,
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching count rate order:', error);
        throw error;
    }
}   