import { AnimatePresence, color } from "framer-motion";
import { motion } from "framer-motion";
import { ProductAttributeResponse } from "../../../api/interface/Responses";
import { ConfigProvider, Form, Input, Button, Modal, message } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
interface EditProductAttributeProps {
    productAttribute: ProductAttributeResponse | undefined;
    onClose: () => void;
    setFlag: () => void;
}

export default function EditProductAttribute({ productAttribute, onClose, setFlag }: EditProductAttributeProps) {
    const [form] = Form.useForm();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const onFinish = async () => {
        if (form.getFieldsValue().quantity <= 0) {
            message.error("Số lượng phải lớn hơn 0");
            return;
        }

        const url = `http://localhost:8080/api/admin/product-attribute/update`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productAttributeId: productAttribute?.productAttributeId,
                    quantity: form.getFieldsValue().quantity,
                }),
                credentials: "include",
            });
            const result = await response.json();
            if (result === true) {
                toast.success("Cập nhật thuộc tính sản phẩm thành công");
                setShowConfirm(false);
                onClose();
                setFlag();
            } else {
                toast.error("Cập nhật thuộc tính sản phẩm thất bại");
                setShowConfirm(false);
            }
        } catch (error) {
            toast.error("Cập nhật thuộc tính sản phẩm thất bại");
            setShowConfirm(false);
        }
    };

    return (
        <ConfigProvider getPopupContainer={() => document.body}>
            <Modal
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onOk={() => onFinish()}
                centered
                className="custom-modal"
            >
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                        <Edit className="h-6 w-6 text-blue-600" />
                        Bạn có chắc chắn muốn sửa thuộc tính sản phẩm này không?
                    </h2>
                </div>
            </Modal>

            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                <Edit className="h-6 w-6 text-blue-600" />
                                Sửa thuộc tính sản phẩm
                            </h2>
                            <p className="text-gray-500 mt-2">Vui lòng điền thông tin cần thiết để cập nhật thuộc tính sản phẩm</p>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={() => setShowConfirm(true)}
                            initialValues={{
                                color: productAttribute?.color,
                                size: productAttribute?.size,
                                quantity: productAttribute?.quantity,
                            }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Form.Item
                                    name="color"
                                    label={<span className="font-medium">Màu sắc</span>}
                                    className="mb-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm transition-transform duration-200 hover:scale-110"
                                            style={{ backgroundColor: productAttribute?.color }}
                                        />
                                        <span className="text-gray-600">{productAttribute?.color}</span>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    name="size"
                                    label={<span className="font-medium">Kích thước</span>}
                                    className="mb-4"
                                >
                                    <Input disabled={true} className="bg-gray-50" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name="quantity"
                                label={<span className="font-medium">Số lượng</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                                className="mb-6"
                            >
                                <Input
                                    type="number"
                                    min={0}
                                    className="w-full"
                                    placeholder="Nhập số lượng sản phẩm"
                                />
                            </Form.Item>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    onClick={onClose}
                                    className="px-6"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="px-6"
                                >
                                    Cập nhật
                                </Button>
                            </div>
                        </Form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    );
}