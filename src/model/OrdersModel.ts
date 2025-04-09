import OrderItem from "./OrderItemModel";

class OrdersModel {
    totalPrice: number;
    orderNote: string;
    toAddress: string;
    toProvince: string;
    toDistrict: string;
    toWard: string;
    toPhone: string;
    toName: string;
    toEmail: string;
    orderItems: OrderItem[];
    constructor(totalPrice: number, orderNote: string, toAddress: string, toProvince: string, toDistrict: string, toWard: string, toPhone: string, toName: string, toEmail: string, orderItems: OrderItem[]) {
        this.totalPrice = totalPrice;
        this.orderNote = orderNote;
        this.toAddress = toAddress;
        this.toProvince = toProvince;
        this.toDistrict = toDistrict;
        this.toWard = toWard;
        this.toPhone = toPhone;
        this.toName = toName;
        this.toEmail = toEmail;
        this.orderItems = orderItems;
    }
}export default OrdersModel;
