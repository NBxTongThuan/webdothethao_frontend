import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { ProductResponse } from '../../../api/interface/Responses';
import { getAllProduct } from '../../../api/admin/ProductAdminAPI';
import { toast } from 'react-toastify';
import { Button, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import NumberFormat from '../../../util/NumberFormat';
import AdminProductDetail from '../components/AdminProductDetail';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';


const Products: React.FC = () => {

    const [listProduct, setListProduct] = useState<ProductResponse[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [selectedItem, setSelectedItem] = useState<ProductResponse>();
    const [totalElement, setTotalElement] = useState<number>(0);
    const [showProductDetail,setShowProductDetail] = useState(false);


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
    }, [currentPage, size]);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
                    <i className="bi bi-plus-lg mr-2"></i>
                    Thêm sản phẩm
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
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
                                showTotal: (total) => `Tổng ${total} sản phẩm`
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
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${productId}`}>
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
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${productName}`}>
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
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${brandName}`}>
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
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${price}`}>
                                        {NumberFormat(price)} VNĐ
                                    </span>
                                )

                                }
                            />

                            <Column
                                title="Trạng thái"
                                align='center'
                                dataIndex="inStock"
                                key="inStock"
                                width={150}
                                render={(inStock: boolean) => (
                                    <Tag color={inStock ? 'success' : 'error'}>
                                        {inStock ? 'Đang trưng bày' : 'Ngưng trưng bày'}
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
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${quantitySold}`}>
                                        {quantitySold.toLocaleString("vi-VN")}
                                    </span>
                                )}
                            />
                            <Column
                                title="Thao tác"
                                align='center'
                                key="action"
                                render={(_, record:ProductResponse) => (
                                    <div className="flex justify-center gap-2">
                                        <Button type="primary" onClick={
                                        () => {
                                           
                                            setSelectedItem(record);
                                            setShowProductDetail(true);
                                            // setShowOrderDetail(true);
                                        }}
                                    >Xem chi tiết</Button>

                                    {record.inStock && <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md"
                                        // onClick={() => handleShowDeleteModal(record)}
                                    >
                                        Ngưng trưng bày
                                    </Button>}

                                    {!record.inStock && <Button
                                        type="text"
                                        icon={<CheckOutlined />}
                                        className="bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-700 px-4 py-1 rounded-md ml-2"
                                        // onClick={() => handleShowEnableModal(record)}
                                    >
                                        Trưng bày
                                    </Button>}
                                    </div>
                                )}
                            />

                        </Table>
                                {
                                    showProductDetail &&
                                    (<AdminProductDetail product={selectedItem} onClose={() => setShowProductDetail(false)} />)
                                }

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Products; 