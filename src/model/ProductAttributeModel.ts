class ProductAttributeModel{

    product_attribute_id:string;
    color?:string;
    quantity?:number;
    size?:string;
    product_id?:number;

    constructor(
        product_attribute_id:string,
        color?:string,
        quantity?:number,
        size?:string,
        product_id?:number
    ){
            this.product_attribute_id=product_attribute_id;
            this.color=color;
            this.quantity=quantity;
            this.size=size;
            this.product_id=product_id;
    }


}
export default ProductAttributeModel;