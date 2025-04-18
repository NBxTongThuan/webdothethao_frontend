import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { CategoryResponse } from '../../../api/interface/Responses';
import { getAllCategories } from '../../../api/admin/CategoryAPI';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';



const Categories: React.FC = () => {
    const [listCategories, setListCategories] = useState<CategoryResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(4);
    const [totalElement, setTotalElement] = useState(0);


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
    }, [currentPage, size]);



    const handleEdit = (record: CategoryResponse) => {
        // TODO: Implement edit functionality
        console.log('Edit category:', record);
    };

    const handleDelete = (record: CategoryResponse) => {
        // TODO: Implement delete functionality
        console.log('Delete category:', record);
    };

    const handleAdd = () => {
        // TODO: Implement add functionality
        console.log('Add new category');
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Quản lý danh mục</h2>
                        <Button
                            type="primary"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={handleAdd}
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
                                    {enable ? 'Hoạt động' : 'Không hoạt động'}
                                </Tag>
                            )}
                        />
                        <Column
                            title="Thao tác"
                            align='center'
                            key="action"
                            width={150}
                            render={(_: unknown, record: CategoryResponse) => (
                                <div className="flex justify-center gap-2">
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEdit(record)}
                                    />
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(record)}
                                    />
                                </div>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Categories; 