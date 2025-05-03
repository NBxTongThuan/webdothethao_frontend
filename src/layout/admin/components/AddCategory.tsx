import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useState } from "react";
import { toast } from "react-toastify";
import {
    X,
    FolderPlus,
    ImageIcon,
    Upload,
    FileText,
    AlertCircle,
    Check,
    Pencil,
    CheckCircle2
} from "lucide-react";
import { ConfigProvider, Modal } from "antd";

interface ModalProps {
    onClose: () => void;
    setFlag: () => void;
}

const AddCategory: React.FC<ModalProps> = (props) => {

    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryNameError, setCategoryNameError] = useState<string>("");
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const checkCategoryNameExist = async (categoryName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/categories/checkCategoryExists?categoryName=${categoryName}`);
            const data = await response.json();
            if (data) {
                setCategoryNameError("Tên danh mục đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking category name:', error);
            return false;
        }
    }

    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCategoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.[0]) {
            const file = e.target.files?.[0];
            setCategoryImage(file);
        }
    }

    const handleCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
        setCategoryNameError("");
        checkCategoryNameExist(e.target.value);
    }

    const handleConfirm = () => {

        if (categoryName == "") {
            toast.error("Vui lòng nhập tên danh mục");
            return;
        }
        if (categoryImage == null) {
            toast.error("Vui lòng tải ảnh lên");
            return;
        }

        if (categoryNameError) {
            toast.error(categoryNameError);
            return;
        }
        setShowConfirmModal(true);
    }

    const handleSubmit = async () => {

        if (categoryName && categoryImage) {
            const base64Image = await getBase64(categoryImage);
            const category = {
                categoryName: categoryName,
                categoryImage: base64Image
            }

            try {
                const response = await fetch(`http://localhost:8080/api/admin/categories/addCategory`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(category)
                })
                if (response.ok) {
                    toast.success("Thêm danh mục thành công");
                    props.onClose();
                    props.setFlag();
                } else {
                    toast.error("Thêm danh mục thất bại");
                }
            } catch (error) {
                toast.error("Lỗi khi thêm danh mục");
            }
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
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận thêm mới</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn thêm danh mục này không?</p>
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
                        <div className="container mx-auto px-4 py-6">
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-8 border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center">
                                        <FolderPlus className="h-8 w-8 text-blue-600 mr-3" />
                                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Thêm danh mục mới</h1>
                                    </div>
                                    <button
                                        onClick={props.onClose}
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <Pencil className="h-5 w-5 text-blue-600 mr-2" />
                                            Tên danh mục
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FolderPlus className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="categoryName"
                                                className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                                placeholder="Nhập tên danh mục"
                                                value={categoryName}
                                                onChange={handleCategoryName}
                                            />
                                        </div>
                                        {categoryNameError && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {categoryNameError}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="categoryImage" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                            <ImageIcon className="h-5 w-5 text-blue-600 mr-2" />
                                            Hình ảnh danh mục
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200">
                                            <div className="space-y-1 text-center">
                                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex text-sm text-gray-600 justify-center items-center">
                                                    <label htmlFor="categoryImage" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                        <span className="flex items-center">
                                                            <Upload className="h-5 w-5 mr-1" />
                                                            Tải ảnh lên
                                                        </span>
                                                        <input
                                                            id="categoryImage"
                                                            type="file"
                                                            className="sr-only"
                                                            accept="image/*"
                                                            onChange={handleCategoryImageChange}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 1MB</p>
                                            </div>
                                        </div>
                                        {categoryImage && (
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <FileText className="h-4 w-4 mr-1" />
                                                {categoryImage.name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={props.onClose}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 flex items-center"
                                    >
                                        <X className="h-5 w-5 mr-2" />
                                        Hủy bỏ
                                    </button>
                                    <button
                                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
                                        onClick={() => handleConfirm()}>
                                        <Check className="h-5 w-5 mr-2" />
                                        Thêm danh mục
                                    </button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    )
}
export default AddCategory;


