import { Link } from "react-bootstrap-icons";
import Carousel from "../component/header/Carousel";
import ListProduct from "./product_component/ListProducts";
import ProductDetail from "./product/ProductDetail";
import { useParams } from "react-router-dom";
import { Top4Selling } from "../component/Top4Selling";
import { NewestProduct } from "../component/NewestProduct";


const HomePage: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section với Carousel */}
            <section>
                <Carousel />
            </section>

            {/* Featured Categories */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục nổi bật</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Giày đá bóng', icon: 'fas fa-futbol', color: 'bg-blue-500' },
                        { name: 'Giày chạy bộ', icon: 'fas fa-running', color: 'bg-green-500' },
                        { name: 'Giày bóng rổ', icon: 'fas fa-basketball-ball', color: 'bg-orange-500' },
                        { name: 'Phụ kiện', icon: 'fas fa-socks', color: 'bg-purple-500' }
                    ].map((category, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
                            <div className={`${category.color} h-32 flex items-center justify-center`}>
                                <i className={`${category.icon} text-4xl text-white`}></i>
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
                <section className="container mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Top sản phẩm bán chạy</h2>
                    </div>
                    <Top4Selling />
                </section>

                <section className="container mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm mới về</h2>
                    </div>
                    <NewestProduct />
                </section>

            {/* Special Offers */}
            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ưu đãi đặc biệt</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
                            <img src="/images/offer1.jpg" alt="Special Offer" className="w-full h-48 object-cover" />
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                                -30%
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">Giảm giá mùa hè</h3>
                                <p className="text-gray-600">Mua 2 tặng 1 cho tất cả giày thể thao</p>
                                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                                    Xem ngay
                                </button>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-xl bg-white shadow-md">
                            <img src="/images/offer2.jpg" alt="Special Offer" className="w-full h-48 object-cover" />
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                                -50%
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">Flash Sale</h3>
                                <p className="text-gray-600">Giảm giá đến 50% cho các sản phẩm bóng rổ</p>
                                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                                    Xem ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-red-500 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Đăng ký nhận tin</h2>
                    <p className="text-white mb-6">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
                    <div className="max-w-md mx-auto flex gap-4">
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-red-500 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default HomePage;