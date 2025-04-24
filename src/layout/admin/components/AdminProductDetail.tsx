import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, ConfigProvider, Descriptions } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageResponse, ProductAttributeResponse, ProductResponse } from '../../../api/interface/Responses';
import { getAllProductAttributeByProductId } from '../../../api/admin/AdminProductAttributeAPI';
import { toast } from "react-toastify";
import { X, ArrowLeft, Edit, Trash2, CheckCircle, Package, Tag as LucideTag, Folder, List, ShoppingCart, CircleDot, FileText, Hash, Building, Plus } from 'lucide-react';
import EditProduct from './EditProduct';
import { getAllImage } from '../../../api/admin/AdminImageAPI';

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
    const [showEditProductModal, setShowEditProductModal] = useState<boolean>(false);

    const [listImage, setListImage] = useState<ImageResponse[]>([]);

    useEffect(() => {
        getAllImage(props.product?.productId + "")
            .then((response: ImageResponse[]) => {
                setListImage(response);
            })
            .catch((error: any) => {
                toast.error("Không lấy được danh sách ảnh!");
            });
    }, [props.product]);

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


            {/* <Modal
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
            </Modal> */}

            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <Package className="h-6 w-6 text-blue-600" />
                                        Chi tiết sản phẩm
                                    </h2>
                                    <p className="text-gray-500 mt-1">Xem thông tin chi tiết và quản lý thuộc tính sản phẩm</p>
                                </div>
                                <Button
                                    type="text"
                                    icon={<X className="h-5 w-5" />}
                                    onClick={props.onClose}
                                    className="hover:bg-gray-100 rounded-full transition-colors duration-200"
                                />
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                                <Descriptions
                                    bordered
                                    column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
                                    className="bg-white rounded-lg overflow-hidden"
                                >
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><Hash className="h-4 w-4" /> Mã sản phẩm</span>}>
                                        <span className="font-mono text-gray-700 text-base px-3 py-1 bg-gray-100 rounded-full">{props.product?.productId}</span>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><Tag className="h-4 w-4" /> Tên sản phẩm</span>}>
                                        <span className="text-gray-800 text-base font-medium">{props.product?.productName}</span>
                                    </Item>

                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><Folder className="h-4 w-4" /> Danh mục</span>}>
                                        <span className="text-gray-700 text-base px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{props.product?.categoryName}</span>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><Folder className="h-4 w-4" /> Giá bán</span>}>
                                        <span className="text-gray-700 text-base px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{props.product?.price?.toLocaleString('vi-VN')} VNĐ</span>
                                    </Item>

                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><List className="h-4 w-4" /> Loại</span>}>
                                        <span className="text-gray-700 text-base px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{props.product?.typeName}</span>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><Building className="h-4 w-4" /> Hãng</span>}>
                                        <span className="text-gray-700 text-base px-3 py-1 bg-blue-50 text-blue-700 rounded-full">{props.product?.brandName}</span>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><ShoppingCart className="h-4 w-4" /> Số lượng bán</span>}>
                                        <span className="text-blue-600 font-medium text-base">{props.product?.quantitySold?.toLocaleString('vi-VN')}</span>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><CircleDot className="h-4 w-4" /> Trạng thái</span>}>
                                        <Tag color={props.product?.inStock ? 'success' : 'error'} className="px-3 py-1 rounded-full">
                                            {props.product?.inStock ? "Đang bán" : "Ngưng bán"}
                                        </Tag>
                                    </Item>
                                    <Item label={<span className="font-bold text-gray-700 flex items-center gap-2"><FileText className="h-4 w-4" /> Mô tả</span>} span={2}>
                                        <p className="text-gray-600 whitespace-pre-wrap text-base bg-gray-50 p-4 rounded-lg">{props.product?.description}</p>
                                    </Item>
                                </Descriptions>
                            </div>

                            {/* Ảnh sản phẩm */}
                            <div className="grid grid-cols-3 gap-6">
                                {listImage.map((image: ImageResponse, index: number) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image.data}
                                            alt={`Ảnh sản phẩm ${index + 1}`}
                                            className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <Button
                                    type="primary"
                                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                    onClick={() => setShowEditProductModal(true)}
                                >
                                    <Edit className="h-4 w-4" />
                                    Sửa sản phẩm
                                </Button>
                                {showEditProductModal && (
                                    <EditProduct
                                        product={props.product}
                                        onClose={() => setShowEditProductModal(false)}
                                    />
                                )}
                            </div>

                            {/* Danh sách thuộc tính */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                            <List className="h-5 w-5 text-blue-600" />
                                            Danh sách thuộc tính
                                        </h3>
                                        <p className="text-gray-500 mt-1">Quản lý các thuộc tính màu sắc và kích cỡ của sản phẩm</p>
                                    </div>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                                        <Hash className="h-4 w-4" />
                                        Tổng số: {totalElement} thuộc tính
                                    </span>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="primary"
                                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Thêm thuộc tính
                                    </Button>
                                </div>
                                <Table
                                    dataSource={listProductAttribute}
                                    rowKey="productAttributeId"
                                    className="bg-white rounded-xl shadow-lg border border-gray-100"
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
                                        ellipsis={true}
                                        width={150}
                                        render={(id) => (
                                            <span className="font-mono text-gray-700 px-3 py-1 bg-gray-100 rounded-full">{id}</span>
                                        )}
                                    />

                                    <Column
                                        title="Màu"
                                        align='center'
                                        dataIndex="color"
                                        key="color"
                                        width={120}
                                        render={(color) => (
                                            <div className="flex justify-center items-center">
                                                <div
                                                    className="w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform duration-200 hover:scale-110"
                                                    style={{ backgroundColor: color }}
                                                />
                                            </div>
                                        )}
                                    />

                                    <Column
                                        title="Kích cỡ"
                                        align='center'
                                        dataIndex="size"
                                        key="size"
                                        width={120}
                                        render={(size) => (
                                            <Tag className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">{size}</Tag>
                                        )}
                                    />

                                    <Column
                                        title="Số lượng còn"
                                        align='center'
                                        dataIndex="quantity"
                                        key="quantity"
                                        width={150}
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
                                        width={120}
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
                                        width={150}
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
                                        width={200}
                                        render={(_: unknown, record: ProductAttributeResponse) => (
                                            <div className="flex justify-center items-center gap-3">
                                                <Button
                                                    type="link"
                                                    icon={<Edit className="h-4 w-4" />}
                                                    size='small'
                                                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors duration-200"
                                                >
                                                    Sửa
                                                </Button>
                                                {record.enable ? (
                                                    <Button
                                                        type="link"
                                                        danger
                                                        icon={<Trash2 className="h-4 w-4" />}
                                                        size='small'
                                                        className="hover:text-red-700 flex items-center gap-1 transition-colors duration-200"
                                                    >
                                                        Ẩn
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="link"
                                                        icon={<CheckCircle className="h-4 w-4" />}
                                                        size='small'
                                                        className="text-green-600 hover:text-green-700 flex items-center gap-1 transition-colors duration-200"
                                                    >
                                                        Hiện
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </Table>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="default"
                                    onClick={props.onClose}
                                    className="flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Trở lại</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    );
};

export default AdminProductDetail;