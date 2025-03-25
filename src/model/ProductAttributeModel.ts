class ProductAttributeModel{

    product_attribute_id:string;
    color:string;
    quantity:number;
    size:string;

    constructor(
        product_attribute_id:string,
        color:string,
        quantity:number,
        size:string,
    ){
            this.product_attribute_id=product_attribute_id;
            this.color=color;
            this.quantity=quantity;
            this.size=size;
    }


}
export default ProductAttributeModel;