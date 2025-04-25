import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { toast } from 'react-toastify';
import { Button, ConfigProvider, Modal, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import NumberFormat from '../../../util/NumberFormat';
import AdminProductDetail from '../components/AdminProductDetail';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { X, Plus, AlertTriangle, CheckCircle2, Eye, Trash2, CheckCircle } from 'lucide-react';
import { ProductResponse } from '../../../api/interface/Responses';
import { getAllProduct } from '../../../api/admin/ProductAdminAPI';
import AdminAddProduct from '../components/AdminAddProduct';



const Products: React.FC = () => {

    const token = localStorage.getItem('token');
    const [listProduct, setListProduct] = useState<ProductResponse[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [selectedItem, setSelectedItem] = useState<ProductResponse>();
    const [totalElement, setTotalElement] = useState<number>(0);
    const [showProductDetail, setShowProductDetail] = useState(false);
    const [showDisInStockProduct, setShowDisInStockProduct] = useState(false);
    const [showEnableProduct, setShowEnableProduct] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        getAllProduct(currentPage - 1, size)
            .then(response => {
                setListProduct(response.listProduct);
                setTotalPage(response.totalPage);
                setTotalElement(response.totalSize);
            })
            .catch(
                error => {
                    toast.error("Không lấy được danh sách!");
                }
            )
    }, [currentPage, size, flag]);

    const handleDisInStock = async () => {
        if (selectedItem) {

            try {
                const url = `http://localhost:8080/api/admin/products/disInStock?productId=${selectedItem.productId}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    toast.success('Ngưng bán sản phẩm thành công');
                } else {
                    toast.error('Ngưng bán sản phẩm thất bại');
                }
                setShowDisInStockProduct(false);
                setFlag(!flag);

            } catch (error) {
                toast.error('Ngưng bán sản phẩm thất bại');
            }

        }
    }

    const handleEnableProduct = async () => {
        if (selectedItem) {
            try {
                const url = `http://localhost:8080/api/admin/products/inStock?productId=${selectedItem.productId}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    toast.success('Bán lại sản phẩm thành công');
                } else {
                    toast.error('Bán lại sản phẩm thất bại');
                }
                setShowEnableProduct(false);
                setFlag(!flag);

            } catch (error) {
                toast.error('Bán lại sản phẩm thất bại');
            }
        }
    }
    return (
        <ConfigProvider getPopupContainer={() => document.body}>


            <Modal
                open={showDisInStockProduct}
                onCancel={() => setShowDisInStockProduct(false)}
                onOk={() => {
                    handleDisInStock();
                }}
                okText="Xác nhận"
                cancelText="Quay lại"
                centered
                okButtonProps={{
                    className: "bg-red-600 hover:bg-red-700 flex items-center justify-center",
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
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận ngưng bán</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn ngưng bán sản phẩm này không?</p>
                </div>
            </Modal>

            <Modal
                open={showEnableProduct}
                onCancel={() => setShowEnableProduct(false)}
                onOk={() => {
                    handleEnableProduct();
                }}
                okText="Xác nhận"
                cancelText="Quay lại"
                centered
                okButtonProps={{
                    className: "bg-green-600 hover:bg-green-700 flex items-center justify-center",
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
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận bán lại</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn bán lại sản phẩm này không?</p>
                </div>
            </Modal>
            <AdminLayout>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h2>
                        <p className="text-gray-500 mt-1">Quản lý và theo dõi tất cả sản phẩm của cửa hàng</p>
                    </div>
                    <Button
                        type="primary"
                        onClick={() => setShowAddProduct(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Thêm sản phẩm</span>
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <Table
                                dataSource={listProduct}
                                rowKey="productId"
                                className='shadow-sm'
                                pagination={{
                                    current: currentPage,
                                    total: totalElement,
                                    pageSize: size,
                                    onChange: (page) => setCurrentPage(page),
                                    onShowSizeChange: (current, size) => setSize(size),
                                    showSizeChanger: true,
                                    pageSizeOptions: ['4', '8', '12', '16', '20'],
                                    showTotal: (total) => `Tổng ${total} sản phẩm`,
                                    className: 'mt-4'
                                }}
                                scroll={{ y: 600 }}
                            >
                                <Column
                                    title="Mã sản phẩm"
                                    align='center'
                                    dataIndex="productId"
                                    key="productId"
                                    ellipsis={true}
                                    width={120}
                                    render={(productId) => (
                                        <span className="px-3 py-1 bg-gray-100  font-medium text-gray-700">
                                            {productId.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Tên sản phẩm"
                                    align='center'
                                    dataIndex="productName"
                                    key="productName"
                                    width={250}
                                    ellipsis={true}
                                    render={(productName) => (
                                        <span className="text-gray-800 font-medium">
                                            {productName.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Hãng"
                                    align='center'
                                    dataIndex="brandName"
                                    key="brandName"
                                    width={150}
                                    ellipsis={true}
                                    render={(brandName) => (
                                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                            {brandName.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Giá bán"
                                    align='center'
                                    dataIndex="price"
                                    key="price"
                                    width={150}
                                    ellipsis={true}
                                    render={(price) => (
                                        <span className="font-semibold text-gray-800">
                                            {NumberFormat(price)} VNĐ
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Trạng thái"
                                    align='center'
                                    dataIndex="inStock"
                                    key="inStock"
                                    width={150}
                                    render={(inStock: boolean) => (
                                        <Tag color={inStock ? 'success' : 'error'} className="px-3 py-1 rounded-full">
                                            {inStock ? 'Đang bán' : 'Ngưng bán'}
                                        </Tag>
                                    )}
                                />
                                <Column
                                    title="Đã bán"
                                    align='center'
                                    dataIndex="quantitySold"
                                    key="quantitySold"
                                    width={100}
                                    ellipsis={true}
                                    render={(quantitySold) => (
                                        <span className="text-gray-600 font-medium">
                                            {quantitySold.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />
                                <Column
                                    title="Thao tác"
                                    align='center'
                                    key="action"
                                    width={250}
                                    render={(_, record: ProductResponse) => (
                                        <div className="flex justify-center gap-3">
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setSelectedItem(record);
                                                    setShowProductDetail(true);
                                                }}
                                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span>Chi tiết</span>
                                            </Button>

                                            {record.inStock && (
                                                <Button
                                                    type="text"
                                                    icon={<Trash2 className="h-4 w-4" />}
                                                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md flex items-center gap-2"
                                                    onClick={() => {
                                                        setShowDisInStockProduct(true);
                                                        setSelectedItem(record);
                                                    }}
                                                >
                                                    Ngưng bán
                                                </Button>
                                            )}

                                            {!record.inStock && (
                                                <Button
                                                    type="text"
                                                    icon={<CheckCircle className="h-4 w-4" />}
                                                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 px-3 py-1 rounded-md flex items-center gap-2 ml-7"
                                                    onClick={() => {
                                                        setShowEnableProduct(true);
                                                        setSelectedItem(record);
                                                    }}
                                                >
                                                    Bán lại
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </Table>
                            {
                                showProductDetail &&
                                (<AdminProductDetail product={selectedItem} onClose={() => setShowProductDetail(false)} />)
                            }

                            {
                                showAddProduct &&
                                (<AdminAddProduct onClose={() => setShowAddProduct(false)} setFlag={() => setFlag(!flag)} />)
                            }
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </ConfigProvider>
    );
};

export default Products; 