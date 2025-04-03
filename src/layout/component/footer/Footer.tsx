const Footer: React.FC = ()=>{

    return(
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            {/* Newsletter Section */}
            <div className="border-b border-gray-700">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-xl font-bold">Đăng ký nhận thông tin</h4>
                            <p className="text-gray-400 mt-1">Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="px-4 py-3 w-full md:w-64 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-100 placeholder-gray-400"
                            />
                            <button className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-r-lg font-medium transition-colors duration-200">
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Cột 1: Thông tin cửa hàng */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">YouSport</h2>
                            <p className="text-red-500 text-sm">Đam mê thể thao - Sống năng động</p>
                        </div>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start space-x-3">
                                <i className="fas fa-map-marker-alt mt-1"></i>
                                <span>123 Đường ABC, Quận XYZ<br/>Hà Nội, Việt Nam</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <i className="fas fa-phone-alt"></i>
                                <span>Hotline: 0123 456 789</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <i className="fas fa-envelope"></i>
                                <span>support@yousport.vn</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <i className="fas fa-clock"></i>
                                <span>8:00 - 22:00 (Hằng ngày)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 2: Chính sách */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4">Chính sách</h5>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Chính sách vận chuyển
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Hỗ trợ khách hàng */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h5>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Hướng dẫn mua hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Hướng dẫn thanh toán
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                                    <i className="fas fa-chevron-right text-xs mr-2"></i>
                                    Tra cứu đơn hàng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 4: Kết nối */}
                    <div>
                        <h5 className="text-lg font-semibold mb-4">Kết nối với chúng tôi</h5>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-500 flex items-center justify-center transition-colors duration-200">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-500 flex items-center justify-center transition-colors duration-200">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-500 flex items-center justify-center transition-colors duration-200">
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-500 flex items-center justify-center transition-colors duration-200">
                                <i className="fab fa-tiktok"></i>
                            </a>
                        </div>
                        <h5 className="text-lg font-semibold mb-4">Phương thức thanh toán</h5>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="bg-white p-2 rounded-lg">
                                <img src="/images/payment/visa.png" alt="Visa" className="h-6 w-auto" />
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-6 w-auto" />
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <img src="/images/payment/momo.png" alt="Momo" className="h-6 w-auto" />
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <img src="/images/payment/zalopay.png" alt="ZaloPay" className="h-6 w-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} YouSport. Tất cả các quyền được bảo lưu.
                        </p>
                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                Sơ đồ website
                            </a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                                Quy định sử dụng
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );

}
export default Footer;