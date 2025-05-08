import { Table, Button, Input, ConfigProvider, Modal } from "antd";
import AdminLayout from "../components/AdminLayout";
import Column from "antd/es/table/Column";
import { useEffect } from "react";
import { useState } from "react";
import { getDiscountingProduct } from "../../../api/admin/ProductAdminAPI";
import { ProductResponse } from "../../../api/interface/Responses";
import NumberFormat from "../../../util/NumberFormat";
import { EditOutlined, PlusOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import UpdateDiscountingPrice from "../components/UpdateDiscountingPrice";
import { X } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import AddDiscountingProducts from "./AddDiscountingProducts";
const DiscountingProducts: React.FC = () => {

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [flag, setFlag] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [showUpdateDiscountingPrice, setShowUpdateDiscountingPrice] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ProductResponse>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showAddDiscountingProducts, setShowAddDiscountingProducts] = useState(false);

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8080/api/admin/products/stop-discount?productId=' + selectedItem?.productId, {
            method: 'PUT',
            credentials: 'include'
        });
        if (response.ok) {
            toast.success("Đã dừng giảm giá sản phẩm");
            setShowConfirmModal(false);
            setFlag(!flag);
        } else {
            toast.error("Lỗi khi dừng giảm giá sản phẩm");
            setShowConfirmModal(false);
        }

    }

    useEffect(() => {
        getDiscountingProduct(currentPage - 1, size).then(res => {
            setProducts(res.listProduct);
        });
    }, [currentPage, size, flag]);

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
                        <div className="bg-red-100 p-3 rounded-full">
                            <X className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận dừng giảm giá</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn dừng giảm giá sản phẩm này không?</p>
                </div>
            </Modal>
            <AdminLayout>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Sản phẩm giảm giá</h1>
                    <Button type="primary" icon={<PlusOutlined />} size="large" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddDiscountingProducts(true)}>
                        Thêm sản phẩm giảm giá
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6">
                        <div className="flex items-center mb-6">
                            <Input
                                placeholder="Tìm kiếm sản phẩm..."
                                prefix={<SearchOutlined className="text-gray-400" />}
                                style={{ width: 400 }}
                                className="rounded-lg"
                                size="large"
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <Table
                                dataSource={products}
                                rowKey="productId"
                                pagination={{
                                    current: currentPage,
                                    total: products.length,
                                    pageSize: size,
                                    onChange: (page) => setCurrentPage(page),
                                    onShowSizeChange: (current, size) => setSize(size),
                                    showSizeChanger: true,
                                    pageSizeOptions: ['4', '8', '12', '16', '20'],
                                    showTotal: (total) => `Tổng ${total} sản phẩm`,
                                    className: 'mt-4'
                                }}
                                className="custom-table"
                            >
                                <Column
                                    title="Mã sản phẩm"
                                    dataIndex="productId"
                                    key="productId"
                                    ellipsis={true}
                                    width={120}
                                    render={(productId) => (
                                        <span className="px-3 py-1.5 bg-gray-100 rounded-md font-medium text-gray-700">
                                            {productId.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Tên sản phẩm"
                                    dataIndex="productName"
                                    key="productName"
                                    align='left'
                                    className="font-medium"
                                />
                                <Column
                                    title="Giá"
                                    dataIndex="price"
                                    key="price"
                                    align="center"
                                    render={(price) => (
                                        <span className="px-3 py-1.5 bg-gray-100 rounded-md font-medium text-gray-700">
                                            {NumberFormat(price)} VNĐ
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Số tiền được giảm"
                                    dataIndex="moneyOff"
                                    key="moneyOff"
                                    align='center'
                                    render={(moneyOff) => (
                                        <span className="px-3 py-1.5 bg-red-50 rounded-md font-medium text-red-700">
                                            {NumberFormat(moneyOff)} VNĐ
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Giá sau khi giảm"
                                    dataIndex="price"
                                    key="price"
                                    align='center'
                                    render={(price, record) => (
                                        <span className="px-3 py-1.5 bg-green-50 rounded-md font-medium text-green-700">
                                            {NumberFormat(price - record.moneyOff)} VNĐ
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Thao tác"
                                    key="action"
                                    align="center"
                                    render={(_, record: ProductResponse) => (
                                        <div className="flex justify-center gap-3">
                                            <Button
                                                type="primary"
                                                icon={<EditOutlined />}
                                                onClick={() => {
                                                    setSelectedItem(record);
                                                    setShowUpdateDiscountingPrice(true);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                type="primary"
                                                icon={<StopOutlined />}
                                                onClick={() => {
                                                    setSelectedItem(record);
                                                    setShowConfirmModal(true);
                                                }}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                Dừng giảm
                                            </Button>
                                        </div>
                                    )}
                                />
                            </Table>
                        </div>
                        {
                            showUpdateDiscountingPrice && <UpdateDiscountingPrice product={selectedItem} onClose={() => setShowUpdateDiscountingPrice(false)} setFlag={() => setFlag(!flag)} />
                        }
                    </div>
                </div>
                {
                    showAddDiscountingProducts && <AddDiscountingProducts onClose={() => setShowAddDiscountingProducts(false)} setFlag={() => setFlag(!flag)} />
                }
            </AdminLayout>
        </ConfigProvider>
    );
};

export default DiscountingProducts;
