import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { CategoryResponse } from '../../../api/interface/Responses';
import { getAllCategories } from '../../../api/admin/CategoryAPI';
import { Table, Button, Tag, ConfigProvider, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import AddCategory from '../components/AddCategory';
import { toast } from 'react-toastify';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import EditCategory from '../components/EditCategory';

const Categories: React.FC = () => {
    const [listCategories, setListCategories] = useState<CategoryResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(4);
    const [totalElement, setTotalElement] = useState(0);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [showEnableCategoryModal, setShowEnableCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [flag, setFlag] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getAllCategories(currentPage - 1, size)
            .then(response => {
                if (response) {
                    setListCategories(response.listCategories);
                    setTotalElement(response.totalSize);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [currentPage, size, flag]);


    const [record, setRecord] = useState<CategoryResponse | null>(null);

    const handleShowDeleteModal = (record: CategoryResponse) => {
        setRecord(record);
        setShowDeleteCategoryModal(true);

    };

    const handleShowEnableModal = (record: CategoryResponse) => {
        setRecord(record);
        setShowEnableCategoryModal(true);
    };

    const handleShowEditModal = (record: CategoryResponse) => {
        setRecord(record);
        setShowEditCategoryModal(true);
    };

    const handleDelete = async () => {
        if (record) {

            try {
                const url = `http://localhost:8080/api/admin/categories/disableCategory?categoryId=${record.categoriesId}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    toast.success('Vô hiệu hóa danh mục thành công');
                } else {
                    toast.error('Vô hiệu hóa danh mục thất bại');
                }
                setShowDeleteCategoryModal(false);
                setFlag(!flag);

            } catch (error) {
                toast.error('Vô hiệu hóa danh mục thất bại');
            }

        }
    };

    const handleEnable = async () => {
        if (record) {
            try {
                const url = `http://localhost:8080/api/admin/categories/enableCategory?categoryId=${record.categoriesId}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    toast.success('Kích hoạt danh mục thành công');
                } else {
                    toast.error('Kích hoạt danh mục thất bại');
                }
                setShowEnableCategoryModal(false);
                setFlag(!flag);
            } catch (error) {
                toast.error('Kích hoạt danh mục thất bại');
            }
        }
    };

    return (
        <ConfigProvider getPopupContainer={() => document.body}>

            <Modal
                open={showDeleteCategoryModal}
                onCancel={() => setShowDeleteCategoryModal(false)}
                onOk={() => {
                    handleDelete();
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
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận vô hiệu hóa</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn vô hiệu hóa danh mục này không?</p>
                </div>
            </Modal>

            <Modal
                open={showEnableCategoryModal}
                onCancel={() => setShowEnableCategoryModal(false)}
                onOk={() => {
                    handleEnable();
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
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Xác nhận kích hoạt</h3>
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn kích hoạt danh mục này không?</p>
                </div>
            </Modal>

            <AdminLayout>
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Quản lý danh mục</h2>
                            <Button
                                type="primary"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setShowAddCategoryModal(true)}
                            >
                                Thêm danh mục
                            </Button>
                        </div>

                        <Table
                            dataSource={listCategories}
                            rowKey="categoriesId"
                            className="shadow-sm"
                            pagination={{
                                current: currentPage,
                                total: totalElement,
                                pageSize: size,
                                onChange: (page) => setCurrentPage(page),
                                onShowSizeChange: (current, size) => setSize(size),
                                showSizeChanger: true,
                                pageSizeOptions: ['4', '8', '12', '16', '20'],
                                showTotal: (total) => `Tổng ${total} danh mục`
                            }}
                            scroll={{ y: 600 }}
                        >
                            <Column
                                title="ID"
                                // align='center'
                                dataIndex="categoriesId"
                                key="categoriesId"
                                width={100}
                            />
                            <Column
                                title="Tên danh mục"
                                // align='center'
                                dataIndex="categoriesName"
                                key="categoriesName"
                                width={200}
                                ellipsis={true}
                            />
                            <Column
                                title="Ảnh đại diện"
                                align='center'
                                dataIndex="imageData"
                                key="imageData"
                                width={150}
                                render={(imageData) => (
                                    <div className="flex justify-center">
                                        <img
                                            src={imageData}
                                            alt="Ảnh đại diện"
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            />
                            <Column
                                title="Trạng thái"
                                align='center'
                                dataIndex="enable"
                                key="enable"
                                width={150}
                                render={(enable: boolean) => (
                                    <Tag color={enable ? 'success' : 'error'}>
                                        {enable ? 'Hoạt động' : 'Ngưng hoạt động'}
                                    </Tag>
                                )}
                            />
                            <Column
                                title="Thao tác"
                                align='center'
                                key="action"
                                width={150}
                                render={(_, record: CategoryResponse) => (
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                            className="bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-md"
                                            onClick={() => handleShowEditModal(record)}
                                        >
                                            Sửa
                                        </Button>
                                        {record.enable && <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md"
                                            onClick={() => handleShowDeleteModal(record)}
                                        >
                                            Vô hiệu hóa
                                        </Button>}

                                        {!record.enable && <Button
                                            type="text"
                                            icon={<CheckOutlined />}
                                            className="bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-700 px-4 py-1 rounded-md ml-2"
                                            onClick={() => handleShowEnableModal(record)}
                                        >
                                            Kích hoạt
                                        </Button>}
                                    </div>
                                )}
                            />
                        </Table>
                    </div>
                    {showAddCategoryModal &&
                        <AddCategory
                            onClose={() => setShowAddCategoryModal(false)}
                            setFlag={() => setFlag(!flag)} />}

                    {showEditCategoryModal && record &&
                        <EditCategory
                            onClose={() => setShowEditCategoryModal(false)}
                            category={record}
                            setFlag={() => setFlag(!flag)}
                        />}
                </div>
            </AdminLayout>
        </ConfigProvider>
    );
};

export default Categories; 