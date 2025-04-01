
export class CartItemModel {
    cartItemId: string;
    price: number;
    quantity: number;
    productAttributeId: string;
    productId: string;
    productName: string;
    productDescription: string;

    constructor(cartItemId: string, price: number, quantity: number, productAttributeId: string, productId: string, productName: string, productDescription: string) {
        this.cartItemId = cartItemId;
        this.price = price;
        this.quantity = quantity;
        this.productAttributeId = productAttributeId;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
    }

}