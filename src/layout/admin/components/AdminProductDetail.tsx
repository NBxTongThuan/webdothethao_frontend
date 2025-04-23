import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, ConfigProvider, Descriptions } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductResponse, ProductAttributeResponse } from '../../../api/interface/Responses';
import { getAllProductAttributeByProductId } from '../../../api/admin/AdminProductAttributeAPI';
import { toast } from "react-toastify";

const { Column } = Table;
const { Item } = Descriptions;

interface ModalProps {
    product: ProductResponse | undefined;
    onClose: () => void;
    
}

const AdminProductDetail: React.FC<ModalProps> = (props) => {

    const [listProductAttribute, setListProductAttribute] = useState<ProductAttributeResponse[]>([]);

    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [selectedItem, setSelectedItem] = useState<ProductResponse>();
    const [totalElement, setTotalElement] = useState<number>(0);

    useEffect(
        () => {
            getAllProductAttributeByProductId(props.product?.productId + "", currentPage - 1, size)
                .then(
                    response => {
                        setListProductAttribute(response.listProductAttribute);
                        setTotalPage(response.totalPage);
                        setTotalElement(response.totalSize);
                    }
                )
                .catch(
                    error => {
                        toast.error("Không lấy được danh sách!");
                    }
                )

        }
        , [props.product]);

    return (
        <ConfigProvider getPopupContainer={() => document.body}>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
                                <Button 
                                    type="text" 
                                    icon={<CloseOutlined />} 
                                    onClick={props.onClose}
                                    className="hover:bg-gray-100 rounded-full"
                                />
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                                <Descriptions 
                                    bordered 
                                    column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
                                    className="bg-white rounded-lg overflow-hidden"
                                >
                                    <Item label="Mã sản phẩm" labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <span className="font-mono text-gray-700">{props.product?.productId}</span>
                                    </Item>
                                    <Item label="Tên sản phẩm" labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <span className="text-gray-800">{props.product?.productName}</span>
                                    </Item>
                                    <Item label="Hãng" labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <span className="text-gray-700">{props.product?.brandName}</span>
                                    </Item>
                                    <Item label="Số lượng bán" labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <span className="text-blue-600 font-medium">{props.product?.quantitySold?.toLocaleString('vi-VN')}</span>
                                    </Item>
                                    <Item label="Trạng thái" labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <Tag color={props.product?.inStock ? 'success' : 'error'} className="px-3 py-1 rounded-full">
                                            {props.product?.inStock ? "Đang được trưng bày" : "Ngưng trưng bày"}
                                        </Tag>
                                    </Item>
                                    <Item label="Mô tả" span={2} labelStyle={{ fontWeight: 'bold', color: '#374151' }}>
                                        <p className="text-gray-600 whitespace-pre-wrap">{props.product?.description}</p>
                                    </Item>
                                </Descriptions>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-gray-800">Danh sách thuộc tính</h3>
                                    <span className="text-sm text-gray-500">Tổng số: {totalElement} thuộc tính</span>
                                </div>

                                <Table
                                    dataSource={listProductAttribute}
                                    rowKey="productAttributeId"
                                    className="bg-white rounded-xl shadow-sm"
                                    size="middle"
                                    pagination={{
                                        current: currentPage,
                                        total: totalElement,
                                        pageSize: size,
                                        onChange: (page) => setCurrentPage(page),
                                        onShowSizeChange: (current, size) => setSize(size),
                                        showSizeChanger: true,
                                        pageSizeOptions: ['5', '10', '15', '20'],
                                        showTotal: (total) => `Tổng ${total} thuộc tính`,
                                        className: 'mt-4'
                                    }}
                                    scroll={{ y: 400, x: 'max-content' }}
                                >
                                    <Column
                                        title="Mã thuộc tính"
                                        align='center'
                                        dataIndex="productAttributeId"
                                        key="productAttributeId"
                                        width={120}
                                        render={(id) => (
                                            <span className="font-mono text-gray-700">{id}</span>
                                        )}
                                    />

                                    <Column
                                        title="Màu"
                                        align='center'
                                        dataIndex="color"
                                        key="color"
                                        width={100}
                                        render={(color) => (
                                            <Tag className="px-3 py-1 rounded-full">{color}</Tag>
                                        )}
                                    />

                                    <Column
                                        title="Kích cỡ"
                                        align='center'
                                        dataIndex="size"
                                        key="size"
                                        width={100}
                                        render={(size) => (
                                            <Tag className="px-3 py-1 rounded-full">{size}</Tag>
                                        )}
                                    />

                                    <Column
                                        title="Số lượng còn"
                                        align='center'
                                        dataIndex="quantity"
                                        key="quantity"
                                        width={120}
                                        render={(quantity) => (
                                            <span className="font-medium text-blue-600">
                                                {quantity.toLocaleString("vi-VN")}
                                            </span>
                                        )}
                                    />

                                    <Column
                                        title="Đã bán"
                                        align='center'
                                        dataIndex="quantitySold"
                                        key="quantitySold"
                                        width={100}
                                        render={(quantitySold) => (
                                            <span className="text-gray-600">
                                                {quantitySold.toLocaleString("vi-VN")}
                                            </span>
                                        )}
                                    />

                                    <Column
                                        title="Trạng thái"
                                        align='center'
                                        dataIndex="enable"
                                        key="enable"
                                        width={120}
                                        render={(enable: boolean) => (
                                            <Tag 
                                                color={enable ? 'success' : 'error'}
                                                className="px-3 py-1 rounded-full"
                                            >
                                                {enable ? 'Đang bán' : 'Ngừng bán'}
                                            </Tag>
                                        )}
                                    />

                                    <Column
                                        title="Thao tác"
                                        align='center'
                                        key="action"
                                        fixed="right"
                                        width={180}
                                        render={(_: unknown, record: ProductAttributeResponse) => (
                                            <div className="flex justify-center items-center gap-2">
                                                <Button
                                                    type="link"
                                                    icon={<EditOutlined />}
                                                    size='small'
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    Sửa
                                                </Button>
                                                {record.enable ? (
                                                    <Button
                                                        type="link"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        size='small'
                                                        className="hover:text-red-700"
                                                    >
                                                        Ẩn
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="link"
                                                        icon={<CheckOutlined />}
                                                        size='small'
                                                        className="text-green-600 hover:text-green-700"
                                                    >
                                                        Hiện
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </Table>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    );
};

export default AdminProductDetail;