import { CartItemModel } from "../../model/CartItemModel";
import requestAPI from "./RequestApi";

export async function getListCartItemByCartID(cartID: string): Promise<CartItemModel[]> {
    const link: string = `http://localhost:8080/api/cart/getListCartItem?cartId=${cartID}`;

    const response = await requestAPI(link,true);

    const responseData = response;


    const listCart: CartItemModel[] = [];

    for (const key in responseData) {
        listCart.push({
            cartItemId: responseData[key].cartItemId,
            price: responseData[key].price,
            quantity: responseData[key].quantity,
            productAttributeId: responseData[key].productAttributeId,
            productId: responseData[key].productId,
            productName: responseData[key].productName,
            productDescription: responseData[key].description,
            remainQuantity: responseData[key].remainQuantity,
            color: responseData[key].color,
            size: responseData[key].size
         
        });
    }     
        return listCart;
    }