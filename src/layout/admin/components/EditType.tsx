import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
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
    CheckCircle2,
    Tag,
    List
} from "lucide-react";
import { ConfigProvider, Modal } from "antd";
import { getAllCategory } from "../../../api/admin/CategoryAPI";
import { CategoryResponse, TypesResponse } from "../../../api/interface/Responses";

interface ModalProps {
    types:TypesResponse;
    onClose: () => void;
}

const EditType: React.FC<ModalProps> = (props) => {

    const [categoryName, setCategoryName] = useState<string>(props.types.categoryName);
    const [typeNameError, setTypeNameError] = useState<string>("");
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
    const [typeName, setTypeName] = useState(props.types.typeName);
    const token = localStorage.getItem("token");

    const oldTypeName = props.types.typeName;

    useEffect(() => {
        getAllCategory()
            .then(
                (response) => {
                    if (response) {
                        setListCategory(response.listCategories);
                    }
                })
            .catch(error => {
                console.error('Error fetching categories:', error);
            })

    }, []);



    const checkTypeNameExist = async (typeName: string, categoryName: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/types/checkExistsType?typeName=${typeName}&categoryName=${categoryName}`);
            const data = await response.json();
            if (data == true) {
                setTypeNameError("Tên thể loại này đã tồn tại trong danh mục");
                return true;
            }
            setTypeNameError("");
            return false;
        } catch (error) {
            console.error('Error checking category name:', error);
            return false;
        }
    }


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryName(e.target.value);
        setTypeNameError("");
        setTypeName("");
    }

    console.log(oldTypeName);

    const handleTypeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypeName(e.target.value);
        if(e.target.value.trim() != oldTypeName)
        {
            checkTypeNameExist(e.target.value, categoryName);
        }
    }

    const handleConfirm = () => {

        if (categoryName == "") {
            toast.error("Vui lòng chọn một danh mục");
            return;
        }
        if (categoryName == "") {
            toast.error("Vui lòng nhập tên thể loại");
            return;
        }
        if (typeNameError) {
            toast.error(typeNameError);
            return;
        }
        setShowConfirmModal(true);
    }
    const handleSubmit = async () => {

        const type = {
            typeId: props.types.typeId,
            typeName: typeName,
            categoryName: categoryName
        }

        try {
            const response = await fetch(`http://localhost:8080/api/admin/types/updateType`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(type)
            })
            if (response.ok == true) {
                toast.success("Cập nhật thể loại thành công");
                props.onClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error("Cập nhật thể loại thất bại");
            }
        } catch (error) {
            toast.error("Lỗi khi cập nhật thể loại");
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
                <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn cập nhật thể loại này không?</p>
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
                                    <Tag className="h-8 w-8 text-blue-600 mr-3" />
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Cập nhật thể loại</h1>
                                </div>
                                <button
                                    onClick={props.onClose}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <List className="h-5 w-5 text-blue-600 mr-2" />
                                        Danh mục
                                    </label>
                                    <select
                                        name="category"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={props.types.categoryName}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        {listCategory.map(
                                            category => (
                                                <option key={category.categoriesId} value={category.categoriesName}>
                                                    {category.categoriesName}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="typeName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <Tag className="h-5 w-5 text-blue-600 mr-2" />
                                        Tên thể loại
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Tag className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="typeName"
                                            className="w-full pl-10 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            placeholder="Nhập tên thể loại"
                                            value={typeName}
                                            onChange={handleTypeNameChange}
                                        />
                                    </div>
                                    {
                                        typeNameError && <p className="mt-1 text-sm text-red-600 flex items-center" >
                                            {typeNameError}
                                        </p>
                                    }
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
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
                                    Cập nhật thể loại
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

export default EditType;


