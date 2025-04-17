import { PaymentResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/payment';

// /getPayment

export const getPaymentByOrderId = async (orderId: string): Promise<PaymentResponse> => {

    try {
        const response = await fetch(`${API_URL}/getPayment?orderId=${orderId}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return ({
            paymentId: data.paymentId,
            createdDate: data.createdDate,
            paymentMethod: data.paymentMethod,
            paymentStatus: data.paymentStatus,
            orderId: data.orderId
        });

    } catch (error) {
        throw error;
    }

}