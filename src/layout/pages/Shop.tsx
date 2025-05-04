import React from "react";
import { useParams } from "react-router-dom";
import ListProduct from "./product_component/ListProducts";
import { motion } from "framer-motion";
import Carousel from "../component/header/Carousel";
import TopCategory from "../component/TopCategory";

interface ShopProps {
    searchKeyword: string;
}

const Shop: React.FC<ShopProps> = (props) => {
    const { categoryId } = useParams();
    let categoryIdNumber = 0;
    try {
        categoryIdNumber = parseInt(categoryId + '');
    } catch (error) {
        categoryIdNumber = 0;
    }
    if (Number.isNaN(categoryIdNumber)) {
        categoryIdNumber = 0;
    }

    return (

        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 rounded-2xl mx-4 mt-1 shadow-lg">
                <div className="container mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Khám Phá Bộ Sưu Tập
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl opacity-90"
                    >
                        Tìm kiếm sản phẩm thể thao chất lượng cao
                    </motion.p>
                </div>
            </div>
            <section>
                <div className="container mx-auto px-4 py-6">
                    <TopCategory />
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <ListProduct searchKeyword={props.searchKeyword} categoryId={categoryIdNumber} />
                </div>
            </div>
        </div>
    );
}

export default Shop;
