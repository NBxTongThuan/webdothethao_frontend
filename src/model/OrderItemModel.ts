class OrderItemModel {
    price: number;
    quantity: number;
    productAttributeId: string;
    constructor(price: number, quantity: number, productAttributeId: string) {
        this.price = price;
        this.quantity = quantity;
        this.productAttributeId = productAttributeId;
    }
}

export default OrderItemModel;
