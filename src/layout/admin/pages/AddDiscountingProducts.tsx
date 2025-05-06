import { Button, ConfigProvider, Table, Tag } from "antd";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ProductResponse } from "../../../api/interface/Responses";
import { getInStockProduct } from "../../../api/admin/ProductAdminAPI";
import Column from "antd/es/table/Column";
import NumberFormat from "../../../util/NumberFormat";
import DiscountProduct from "../components/DiscountProduct";


interface AddDiscountingProductsProps {
    onClose: () => void;
    setFlag: () => void;
}

const AddDiscountingProducts: React.FC<AddDiscountingProductsProps> = (props) => {

    const [listProduct, setListProduct] = useState<ProductResponse[]>([]);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [size, setSize] = useState<number>(8);
    const [showDiscountProduct, setShowDiscountProduct] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse>();

    useEffect(() => {
        const fetchListProduct = async () => {
            const response = await getInStockProduct(currentPage - 1, size)
            setListProduct(response.listProduct);
            setTotalElement(response.totalSize);
        }
        fetchListProduct();
    }, [currentPage, size]);

    return (<ConfigProvider>

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
                            title="Giảm giá"
                            align='center'
                            dataIndex="moneyOff"
                            key="moneyOff"
                            width={150}
                            render={(moneyOff) => (
                                <span className="font-semibold text-gray-800">
                                    {moneyOff.toLocaleString("vi-VN")} VNĐ
                                </span>
                            )}
                        />
                        <Column
                            title="Thao tác"
                            align='center'
                            width={150}
                            render={(_, record: ProductResponse) => (
                                <Button type="primary" onClick={() => { setShowDiscountProduct(true); setSelectedProduct(record) }}>
                                    Giảm giá
                                </Button>
                            )}
                        />

                    </Table>
                    <div className="flex justify-end mt-4">
                        <Button type="default" className="ml-3 border-gray-300 hover:border-gray-400"
                            onClick={() => props.onClose()}
                        >
                            Trở về
                        </Button>
                    </div>

                    {showDiscountProduct && <DiscountProduct onClose={() => setShowDiscountProduct(false)} product={selectedProduct} setFlag={props.setFlag} />}
                </motion.div>
            </motion.div>
        </AnimatePresence>

    </ConfigProvider>);
}
export default AddDiscountingProducts;
