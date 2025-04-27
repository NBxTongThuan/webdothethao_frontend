import { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import ProductProps from "./ProductProps";
import { getAllProducts, getProductsByCategoryIdAndProductName } from "../../../api/user/ProductsAPI";
import { Pagination } from "../../../util/Pagination";
import { motion } from "framer-motion";

interface ListProductInterface {
    searchKeyword: string;
    categoryId: number;
}

const ListProduct: React.FC<ListProductInterface> = (props) => {
    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorReport, setErrorReport] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        setLoadingData(true);

        const fetchData = async () => {
            try {
                let response;
                if (!props.searchKeyword && props.categoryId === 0) {
                    response = await getAllProducts(currentPage - 1);
                } else {
                    response = await getProductsByCategoryIdAndProductName(props.categoryId, props.searchKeyword, currentPage - 1);
                }
                setListProduct(response.listProduct);
                setTotalPage(response.totalPage);
            } catch (error) {
                setErrorReport(error + "");
                console.error("Error fetching products:", error);
            } finally {
                setLoadingData(false);
            }
        }

        fetchData();
    }, [currentPage, props.searchKeyword, props.categoryId]);

    const setPage = (page: number) => setCurrentPage(page);

    if (loadingData) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorReport) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h2 className="text-red-600 text-lg font-semibold mb-2">Đã xảy ra lỗi</h2>
                <p className="text-red-500">{errorReport}</p>
            </div>
        );
    }

    if (listProduct.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-gray-600 text-xl font-medium">Không tìm thấy sản phẩm nào</h2>
                <p className="text-gray-500 mt-2">Vui lòng thử tìm kiếm với từ khóa khác</p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listProduct.map((product) => (
                    <motion.div
                        key={product.product_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductProps product={product} />
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center">
                <Pagination currentPage={currentPage} setPage={setPage} totalPage={totalPage} />
            </div>
        </motion.div>
    );
}

export default ListProduct;