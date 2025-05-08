import { PaymentResponse } from "../interface/Responses";

const API_URL = 'http://localhost:8080/api/admin/payment';

// /getPayment

export const AdminGetPaymentByOrderId = async (orderId: string): Promise<PaymentResponse> => {

    try {
        const response = await fetch(`${API_URL}/get-payment?orderId=${orderId}`,
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