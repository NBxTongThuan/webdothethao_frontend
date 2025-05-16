import { CartItemModel } from "../../../model/CartItemModel";
import NumberFormat from "../../../util/NumberFormat";
import { get1Image } from "../../../api/user/ImagesAPI";
import { useEffect, useState } from "react";

interface OrderItemProps {
    cartItem: CartItemModel;
}

const OrderItem: React.FC<OrderItemProps> = ({ cartItem }) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        get1Image(cartItem.productId)
            .then((image) => {
                if (image && image.url) {
                    setImageUrl(image.url);
                }
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [cartItem.productId]);

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 w-full">
            <div className="flex items-center space-x-6 w-3/4">
                <div className="w-32 h-32 flex-shrink-0">
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        </div>
                    ) : (
                        <img
                            src={imageUrl || "/images/no-image.png"}
                            alt={cartItem.productName}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{cartItem.productName}</h3>
                    <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-500">Mã sản phẩm: {cartItem.productId}</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Màu sắc:</span>
                            <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: cartItem.color }}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Kích cỡ:</span>
                            <span className="text-sm font-medium text-gray-900">{cartItem.size}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Số lượng:</span>
                            <span className="text-sm font-medium text-gray-900">{cartItem.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right w-1/4 pl-4">
                <div className="flex flex-col items-end space-y-1">
                    {cartItem?.moneyOff && cartItem?.moneyOff > 0 ? (
                        <>
                            <span className="text-gray-400 text-sm line-through">
                                {NumberFormat(cartItem.price)} VNĐ
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-red-500 whitespace-nowrap">
                                    {NumberFormat(cartItem.price - cartItem.moneyOff)} VNĐ
                                </span>
                                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                                    -{Math.round((1 - (cartItem.price - cartItem.moneyOff) / cartItem.price) * 100)}%
                                </span>
                            </div>
                        </>
                    ) : (
                        <span className="text-lg font-semibold text-red-500">
                            {NumberFormat(cartItem?.price || 0)} VNĐ
                        </span>
                    )}
                    <p className="text-sm text-gray-600">
                        Tổng: {NumberFormat(cartItem.price * cartItem.quantity)} VNĐ
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;