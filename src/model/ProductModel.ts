class ProductModel {
    product_id: string;
    description?: string;
    product_name?: string;
    price?: number;
    quantity_sold?: number;
    constructor(
        product_id: string,
        description?: string,
        product_name?: string,
        price?: number,
        quantity_sold?: number,
    ) {
        this.product_id = product_id;
        this.description = description;
        this.product_name = product_name;
        this.price = price;
        this.quantity_sold = quantity_sold;
    }

}
export default ProductModel;