import { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import ProductProps from "./ProductProps";
import { getAllProducts, getByFilter, getProductsByCategoryIdAndProductName } from "../../../api/user/ProductsAPI";
import { Pagination } from "../../../util/Pagination";
import { motion } from "framer-motion";
import { Button, Input, Select } from "antd";
import { CategoryResponse } from "../../../api/interface/Responses";
import { ca } from "date-fns/locale";
import { getListCate } from "../../../api/user/CategoriesAPI";
import { CategoriesModel } from "../../../model/CategoriesModel";
import { error } from "console";

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
    const [selectPrice, setSelectPrice] = useState(0);
    const [listCategory, setListCategory] = useState<CategoriesModel[]>([]);




    const category: CategoriesModel = {
        name: "Tất cả",
        categories_id: 0,
    };

    const [selectCategory, setSelectCategory] = useState<number | null>(category.categories_id);
    const [showFilter, setShowFilter] = useState(true);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectPrice(parseInt(event.target.value));
    };

    useEffect(() => {
        getListCate()
            .then(
                (response) => {
                    setListCategory(response);
                }
            )
            .catch(
                error => {
                    setErrorReport(error + "");
                    console.error("Error fetching products:", error);
                }
            )
    }, []);

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

    const handleFilter = () => {
        setLoadingData(true);
        getByFilter(currentPage - 1, parseInt(selectCategory + ""), selectPrice)
            .then(
                (response) => {
                    setListProduct(response);
                    setLoadingData(false);
                }
            )
            .catch(
                (error) => {
                    setErrorReport(error + "");
                    console.error("Error fetching products:", error);
                }
            )
    }

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
                {/* Filter Toggle */}
            <div className="mb-2">
                <Button
                    type="primary"
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 transition-all"
                    style={{ backgroundColor: '#3B82F6' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${showFilter ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    {showFilter ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </Button>
            </div>
                 {/* Filter Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: showFilter ? "auto" : 0,
                    opacity: showFilter ? 1 : 0,
                    scale: showFilter ? 1 : 0.95,
                    y: showFilter ? 0 : -20,
                    marginBottom: showFilter ? "1.5rem" : 0
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                }}
                className="overflow-hidden origin-top"
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
                    initial={false}
                    animate={{
                        y: showFilter ? 0 : -10,
                        opacity: showFilter ? 1 : 0
                    }}
                    transition={{
                        duration: 0.2,
                        delay: showFilter ? 0.1 : 0
                    }}
                >
                    <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-8">
                        {/* Category Filter */}
                        <div className="bg-gray-50 border rounded-xl p-4 w-full">
                            <h2 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                Danh mục
                            </h2>
                            <Select
                                className="w-full font-medium"
                                onChange={(value) => setSelectCategory(value)}
                                placeholder="Chọn danh mục"
                                value={selectCategory}
                                style={{ borderRadius: '0.5rem' }}
                            >
                                <Select.Option value={category.categories_id}>
                                    {category.name}
                                </Select.Option>
                                {
                                    listCategory.map(
                                        (category) => (
                                            <Select.Option value={category.categories_id} key={category.categories_id}>
                                                {category.name}
                                            </Select.Option>
                                        )
                                    )
                                }
                            </Select>
                        </div>

                        {/* Price Filter */}
                        <div className="bg-gray-50 border rounded-xl p-4 w-full">
                            <h2 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                Lọc theo giá
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 whitespace-nowrap">đ0</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={5000000}
                                    value={selectPrice}
                                    onChange={handlePriceChange}
                                    className="w-full accent-blue-500 h-2 rounded-lg"
                                />
                                <span className="text-sm text-gray-600 whitespace-nowrap">đ5.000.000</span>
                            </div>
                            <div className="text-left mt-3 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                                Mức giá: 0 - {selectPrice.toLocaleString()} VNĐ
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 w-full">
                            <Button
                                type="primary"
                                className="w-full text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#3B82F6' }}
                                onClick={handleFilter}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                LỌC
                            </Button>
                            <Button
                                type="primary"
                                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                                onClick={() => {
                                    setSelectPrice(0);
                                    setSelectCategory(category.categories_id);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cài lại
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
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
            className="space-y-4 md:space-y-8"
        >
            {/* Filter Toggle */}
            <div className="mb-2">
                <Button
                    type="primary"
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 transition-all"
                    style={{ backgroundColor: '#3B82F6' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${showFilter ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    {showFilter ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </Button>
            </div>

            {/* Filter Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: showFilter ? "auto" : 0,
                    opacity: showFilter ? 1 : 0,
                    scale: showFilter ? 1 : 0.95,
                    y: showFilter ? 0 : -20,
                    marginBottom: showFilter ? "1.5rem" : 0
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 }
                }}
                className="overflow-hidden origin-top"
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
                    initial={false}
                    animate={{
                        y: showFilter ? 0 : -10,
                        opacity: showFilter ? 1 : 0
                    }}
                    transition={{
                        duration: 0.2,
                        delay: showFilter ? 0.1 : 0
                    }}
                >
                    <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-8">
                        {/* Category Filter */}
                        <div className="bg-gray-50 border rounded-xl p-4 w-full">
                            <h2 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                Danh mục
                            </h2>
                            <Select
                                className="w-full font-medium"
                                onChange={(value) => setSelectCategory(value)}
                                placeholder="Chọn danh mục"
                                value={selectCategory}
                                style={{ borderRadius: '0.5rem' }}
                            >
                                <Select.Option value={category.categories_id}>
                                    {category.name}
                                </Select.Option>
                                {
                                    listCategory.map(
                                        (category) => (
                                            <Select.Option value={category.categories_id} key={category.categories_id}>
                                                {category.name}
                                            </Select.Option>
                                        )
                                    )
                                }
                            </Select>
                        </div>

                        {/* Price Filter */}
                        <div className="bg-gray-50 border rounded-xl p-4 w-full">
                            <h2 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                                Lọc theo giá
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 whitespace-nowrap">đ0</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={5000000}
                                    value={selectPrice}
                                    onChange={handlePriceChange}
                                    className="w-full accent-blue-500 h-2 rounded-lg"
                                />
                                <span className="text-sm text-gray-600 whitespace-nowrap">đ5.000.000</span>
                            </div>
                            <div className="text-left mt-3 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                                Mức giá: 0 - {selectPrice.toLocaleString()} VNĐ
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 w-full">
                            <Button
                                type="primary"
                                className="w-full text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#3B82F6' }}
                                onClick={handleFilter}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                LỌC
                            </Button>
                            <Button
                                type="primary"
                                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                                onClick={() => {
                                    setSelectPrice(0);
                                    setSelectCategory(category.categories_id);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cài lại
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {listProduct.map((product) => (
                    <motion.div
                        key={product.product_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductProps product={product} />
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 md:mt-6">
                <Pagination currentPage={currentPage} setPage={setPage} totalPage={totalPage} />
            </div>
        </motion.div>

    );
}

export default ListProduct;