import { useParams } from "react-router-dom";
import { CartItemModel } from "../../../model/CartItemModel";
import { useEffect, useState } from "react";
import { getListCartItemByCartID } from "../../../api/CartAPI";
import CartItemProp from "../product_component/CartItemProp";

const Cart: React.FC = () => {
    const { cartID } = useParams();
    const [listCartItem, setListCartItem] = useState<CartItemModel[]>([]);
    useEffect(() => {
        getListCartItemByCartID(cartID + "")
            .then((cartItems) => {
                setListCartItem(cartItems);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            }
            );
    }
        , [cartID]);

    return (
        <div>
            <h1>Your Shopping Cart</h1>
            {cartID ? (
            <p>Cart ID: {cartID}</p>
            ) : (
            <p>No cart selected.</p>
            )}
            <div className="mb-4">
            {/* Add your cart items and functionality here */}
            {
                listCartItem.map((item, index) => (
                
                    <CartItemProp key={index} cartItem={item} />

                ))
            }
            </div>
        </div>
    );
}
export default Cart;