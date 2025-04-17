import ProductAttributeModel from "../../model/ProductAttributeModel";
import requestAPI from "./RequestApi";

export async function getListProductAttributes(productId: string): Promise<ProductAttributeModel[]> {

    const listProductAttributes:ProductAttributeModel[] = [];

    const link: string = `http://localhost:8080/api/productAttribute?productId=${productId}`;

    const response = await requestAPI(link);

    const responseDATA = response;
    for(const key in responseDATA){
        listProductAttributes.push({
            product_attribute_id:responseDATA[key].productAttributeId,
            color:responseDATA[key].color,
            quantity:responseDATA[key].quantity,
            size:responseDATA[key].size,
        });
    }
    return listProductAttributes;
}
