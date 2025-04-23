import { Button, ConfigProvider, Table, Tag } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { ProductAttributeResponse, ProductResponse } from "../../../api/interface/Responses";
import { useEffect, useState } from "react";
import { getAllProductAttributeByProductId } from "../../../api/admin/AdminProductAttributeAPI";
import { toast } from "react-toastify";
import Column from "antd/es/table/Column";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                >
                    <motion.div
                        className="bg-white rounded-xl p-8 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto "
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="container mx-auto px-4 py-8">
                            <div>
                                <div>Mã sản phẩm: </div>
                                <div>{props.product?.productId}</div>

                                <div>Tên sản phẩm: </div>
                                <div>{props.product?.productName}</div>

                                <div>Hãng: </div>
                                <div>{props.product?.brandName}</div>

                                <div>Số lượng bán: </div>
                                <div>{props.product?.quantitySold}</div>

                                <div>Mô tả: </div>
                                <div>{props.product?.description}</div>

                                <div>Trạng thái trưng bày: </div>
                                <div>{props.product?.inStock ? "Đang được trưng bày" : "Ngưng trưng bày"}</div>

                            </div>
                            <div> Danh sách thuộc tính của sản phẩm</div>
                            <Table
                                dataSource={listProductAttribute}
                                rowKey="productAttributeId"
                                className='shadow-sm'

                                pagination={{
                                    current: currentPage,
                                    total: totalElement,
                                    pageSize: size,
                                    onChange: (page) => setCurrentPage(page),
                                    onShowSizeChange: (current, size) => setSize(size),
                                    showSizeChanger: true,
                                    pageSizeOptions: ['4', '8', '12', '16', '20'],
                                    showTotal: (total) => `Tổng ${total} thuộc tính`
                                }}
                                scroll={{ y: 600 }}
                            >

                                <Column
                                    title="Mã thuộc tính"
                                    align='center'
                                    dataIndex="productAttributeId"
                                    key="productAttributeId"
                                    ellipsis={true}
                                    width={120}
                                    render={(productAttributeId) => (
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${productAttributeId}`}>
                                            {productAttributeId.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Màu"
                                    align='center'
                                    dataIndex="color"
                                    key="color"
                                    ellipsis={true}
                                    width={70}
                                    render={(color) => (
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${color}`}>
                                            {color.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Kích cỡ"
                                    align='center'
                                    dataIndex="size"
                                    key="size"
                                    ellipsis={true}
                                    width={70}
                                    render={(size) => (
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${size}`}>
                                            {size.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Số lượng còn"
                                    align='center'
                                    dataIndex="quantity"
                                    key="quantity"
                                    ellipsis={true}
                                    width={90}
                                    render={(quantity) => (
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${quantity}`}>
                                            {quantity.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Đã bán"
                                    align='center'
                                    dataIndex="quantitySold"
                                    key="quantitySold"
                                    ellipsis={true}
                                    width={60}
                                    render={(quantitySold) => (
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${quantitySold}`}>
                                            {quantitySold.toLocaleString("vi-VN")}
                                        </span>
                                    )}
                                />

                                <Column
                                    title="Trạng thái"
                                    align='center'
                                    dataIndex="enable"
                                    key="enable"
                                    ellipsis={true}
                                    width={100}
                                    render={(enable: boolean) => (
                                        <Tag color={enable ? 'success' : 'error'}>
                                            {enable ? 'Đang trưng bày' : 'Ngưng trưng bày'}
                                        </Tag>
                                    )}
                                />
                                <Column
                                    title="Thao tác"
                                    align='center'
                                    key="action"
                                    width={150}
                                    render={(_: unknown, record: ProductAttributeResponse) => (
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                className="bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 px-3 py-1 rounded-md"
                                            // onClick={() => handleShowEditModal(record)}
                                            >
                                                Sửa
                                            </Button>
                                            {record.enable && <Button
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-md"
                                            // onClick={() => handleShowDeleteModal(record)}
                                            >
                                                Vô hiệu hóa
                                            </Button>}

                                            {!record.enable && <Button
                                                type="text"
                                                icon={<CheckOutlined />}
                                                className="bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-700 px-4 py-1 rounded-md ml-2"
                                            // onClick={() => handleShowEnableModal(record)}
                                            >
                                                Kích hoạt
                                            </Button>}
                                        </div>
                                    )}
                                />

                            </Table>

                            <Button type="default" className="ml-3 border-gray-300 hover:border-gray-400"

                                onClick={
                                    () => { props.onClose(); }
                                }
                            >
                                Trở về
                            </Button>
                        </div>

                    </motion.div>
                </motion.div>
            </AnimatePresence>


        </ConfigProvider>
    );

}
export default AdminProductDetail;