import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, ConfigProvider, Modal, InputNumber, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ProductResponse } from "../../../api/interface/Responses";
import NumberFormat from "../../../util/NumberFormat";
import { CheckCircle2, X } from "lucide-react";

interface ModalProps {
    onClose: () => void;
    product: ProductResponse | undefined;
    setFlag: () => void;
}

const DiscountProduct: React.FC<ModalProps> = (props) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [discountingPrice, setDiscountingPrice] = useState(1000);
    const handleDiscountingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountingPrice(Number(e.target.value));
    }

    const handleSubmit = async () => {

        if (props.product?.price === undefined) {
            toast.error("Giá sản phẩm không tồn tại");
            setShowConfirmModal(false);
            return;
        }

        if (discountingPrice === undefined) {
            toast.error("Vui lòng nhập giá giảm giá");
            setShowConfirmModal(false);
            return;
        }

        if (discountingPrice > props.product?.price) {
            toast.error("Giá giảm giá không được lớn hơn giá sản phẩm");
            setShowConfirmModal(false);
            return;
        }

        if (discountingPrice < 1000) {
            toast.error("Giá giảm giá không được nhỏ hơn 1000");
            setShowConfirmModal(false);
            return;
        }
        
        if (discountingPrice % 1000 !== 0) {
            toast.error("Giá giảm giá phải là bội số của 1000");
            setShowConfirmModal(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/admin/products/updateDiscountingPrice?productId=${props.product?.productId}&moneyOff=${discountingPrice}`, {
                method: "PUT",
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);
            if (data === true) {
                toast.success("Cập nhật giá giảm giá thành công");
                props.setFlag();
                props.onClose();
            } else {
                toast.error("Cập nhật giá giảm giá thất bại");
                props.setFlag();
                props.onClose();
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật giá giảm giá");
        }

    }

    return (
        <ConfigProvider getPopupContainer={() => document.body}>
            <Modal
                open={showConfirmModal}
                onCancel={() => setShowConfirmModal(false)}
                onOk={() => handleSubmit()}
                okText="Xác nhận"
                cancelText="Quay lại"
                centered
                okButtonProps={{
                    className: "bg-blue-600 hover:bg-blue-700 flex items-center justify-center",
                    icon: <CheckCircle2 className="h-4 w-4 mr-2" />
                }}
                cancelButtonProps={{
                    className: "hover:bg-gray-100 flex items-center justify-center",
                    icon: <X className="h-4 w-4 mr-2" />
                }}
                className="[&_.ant-modal-content]:p-0 [&_.ant-modal-footer]:px-6 [&_.ant-modal-footer]:py-4 [&_.ant-modal-footer]:border-t [&_.ant-modal-footer]:border-gray-200 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-end [&_.ant-modal-footer]:gap-2"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <CheckCircle2 className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận cập nhật</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn cập nhật giá giảm giá này không?</p>
                </div>
            </Modal>

            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                >
                    <motion.div
                        className="bg-white rounded-xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <h1 className="text-2xl font-bold text-gray-800">Cập nhật giá giảm giá</h1>
                                <Button 
                                    type="text" 
                                    icon={<CloseOutlined />} 
                                    onClick={props.onClose}
                                    className="hover:bg-gray-100 rounded-full"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Mã sản phẩm</div>
                                            <div className="font-medium text-gray-800">{props.product?.productId}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Tên sản phẩm</div>
                                            <div className="font-medium text-gray-800">{props.product?.productName}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Giá sản phẩm</div>
                                            <div className="font-medium text-gray-800">{NumberFormat(props.product?.price)} VNĐ</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Số tiền giảm</div>
                                            <Input
                                                type="number"
                                                value={discountingPrice}
                                                defaultValue={1000}
                                                onChange={handleDiscountingPriceChange}
                                                className="w-full"
                                                size="large"
                                                prefix="VNĐ"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {props.product?.price && discountingPrice && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm text-gray-500 mb-1">Giá sau khi giảm</div>
                                                <div className="font-medium text-green-700 text-lg">
                                                    {NumberFormat(props.product?.price - discountingPrice)} VNĐ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button onClick={props.onClose}>
                                        Hủy
                                    </Button>
                                    <Button 
                                        type="primary"
                                        className="bg-blue-600 hover:bg-blue-700"
                                        onClick={() => setShowConfirmModal(true)}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    )
}
export default DiscountProduct;


