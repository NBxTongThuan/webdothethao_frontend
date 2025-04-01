
import React, { use, useEffect, useState } from 'react';
import { CartItemModel } from '../../../model/CartItemModel';
import { get1Image } from '../../../api/ImagesAPI';
import NumberFormat from '../../../util/NumberFormat';
interface CartItemPropInterface {

    cartItem:CartItemModel;

}

const CartItemProp:React.FC<CartItemPropInterface> = (prop) => {

    const [imageData, setImageData] = useState<string>("");
    useEffect(
        () =>{
            get1Image(prop.cartItem.productId + "")
            .then((image) => {
                if(image !== null)
                    setImageData(image.data+"");
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
        }
    );

    console.log(prop.cartItem.productName + "");

    return(
        <div>
           <div className="bg-white shadow-md rounded-lg p-4 w-10/12 mt-6 mx-auto flex">
                    <img
                        src={prop.cartItem ?  imageData : ""}
                        alt="Product Image"
                        className="w-32 h-32 object-cover rounded-md"
                    />
                    <div className="ml-6 flex flex-col justify-center">
                    <h2 className="text-lg font-semibold text-gray-800">Product Name: {prop.cartItem.productName}</h2>
                    <h2 className="text-lg font-semibold text-gray-800">Description: {prop.cartItem.productDescription}</h2>
                    <p className="text-gray-600">Price: <span className="font-bold">{NumberFormat(prop.cartItem.price)} VND</span></p>
                    <p className="text-gray-600">Quantity: {prop.cartItem.quantity}</p>
                    <p className="text-gray-600">Product Attribute ID: {prop.cartItem.productAttributeId}</p>
                    <p className="text-gray-600">Cart Item ID: {prop.cartItem.cartItemId}</p>
                    </div>
                </div>
        </div>
    );
}
export default CartItemProp;