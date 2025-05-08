import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { TypesResponse } from '../../../api/interface/Responses';
import { Table, Button, Tag, ConfigProvider, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { toast } from 'react-toastify';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { getAllType } from '../../../api/admin/AdminTypesAPI';
import AddType from '../components/AddType';
import EditType from '../components/EditType';

const Types: React.FC = () => {
    const [listTypes, setListTypes] = useState<TypesResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(8);
    const [totalElement, setTotalElement] = useState(0);
    const [showAddTypeModal, setShowAddTypeModal] = useState(false);
    const [showDeleteTypeModal, setShowDeleteTypeModal] = useState(false);
    const [showEnableTypeModal, setShowEnableTypeModal] = useState(false);
    const [showEditTypeModal, setShowEditTypeModal] = useState(false);
    const [flag, setFlag] = useState(false);




    useEffect(() => {
        getAllType(currentPage - 1, size)
            .then(response => {
                if (response) {
                    setListTypes(response.listTypes);
                    setTotalElement(response.totalSize);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [currentPage, size, flag]);


    const [record, setRecord] = useState<TypesResponse | null>(null);

    const handleShowDeleteModal = (record: TypesResponse) => {
        setRecord(record);
        setShowDeleteTypeModal(true);

    };

    const handleShowEnableModal = (record: TypesResponse) => {
        setRecord(record);
        setShowEnableTypeModal(true);
    };

    const handleShowEditModal = (record: TypesResponse) => {
        setRecord(record);
        setShowEditTypeModal(true);
    };

    const handleDelete = async () => {
        if (record) {

            try {
                const url = `http://localhost:8080/api/admin/types/disable?typeId=${record.typeId}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                if (response.ok) {
                    toast.success('Vô hiệu hóa thể loại thành công');
                } else {
                    toast.error('Vô hiệu hóa thể loại thất bại');
                }
                setShowDeleteTypeModal(false);
                setFlag(!flag);

            } catch (error) {
                toast.error('Vô hiệu hóa thể loại thất bại');
            }

        }
    };

    const handleEnable = async () => {
        if (record) {
            try {
                const url = `http://localhost:8080/api/admin/types/enable?typeId=${record.typeId}`;
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    credentials: 'include'
                });
                if (response.ok) {
                    toast.success('Kích hoạt thể loại thành công');
                } else {
                    toast.error('Kích hoạt thể loại thất bại');
                }
                setShowEnableTypeModal(false);
                setFlag(!flag);
            } catch (error) {
                toast.error('Kích hoạt thể loại thất bại');
            }
        }
    };


    return (
        <ConfigProvider getPopupContainer={() => document.body}>

            <Modal
                open={showDeleteTypeModal}
                onCancel={() => setShowDeleteTypeModal(false)}
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
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn vô hiệu hóa thể loại này không?</p>
                </div>
            </Modal>

            <Modal
                open={showEnableTypeModal}
                onCancel={() => setShowEnableTypeModal(false)}
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
                    <p className="text-gray-600 text-center mb-6">Bạn có chắc chắn muốn kích hoạt thể loại này không?</p>
                </div>
            </Modal>

            <AdminLayout>
                <div className="p-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">Quản lý thể loại</h2>
                            <Button
                                type="primary"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setShowAddTypeModal(true)}
                            >
                                Thêm thể loại
                            </Button>
                        </div>

                        <Table
                            dataSource={listTypes}
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
                                showTotal: (total) => `Tổng ${total} thể loại`
                            }}
                            scroll={{ y: 600 }}
                        >
                            <Column
                                title="ID"
                                // align='center'
                                dataIndex="typeId"
                                key="typeId"
                                width={100}
                            />
                            <Column
                                title="Tên thể loại"
                                // align='center'
                                dataIndex="typeName"
                                key="typeName"
                                width={200}
                                ellipsis={true}
                            />
                            <Column
                                title="Thuộc danh mục"
                                align='center'
                                dataIndex="categoryName"
                                key="categoryName"
                                width={150}

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
                                render={(_: unknown, record: TypesResponse) => (
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
                    {showAddTypeModal &&
                        <AddType
                            onClose={() => setShowAddTypeModal(false)} />}

                    {showEditTypeModal && record &&
                        <EditType
                            onClose={() => setShowEditTypeModal(false)}
                            types={record}
                        />}
                </div>
            </AdminLayout>
        </ConfigProvider>
    );
};

export default Types; 