
const Footer: React.FC = ()=>{

    return(
        <footer className="bg-gray-800 text-white py-4 mt-1">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Cột 1: Thông tin cửa hàng */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h5 className="text-lg font-semibold">Yousport</h5>
                <p>Địa chỉ: 123 Đường ABC, Hà Nội, Việt Nam</p>
                <p>Email: support@yousport.vn</p>
                <p>Hotline: 0123 456 789</p>
                <p>Giờ mở cửa: 8:00 - 22:00 (Hằng ngày)</p>
              </div>

              {/* Cột 2: Liên kết nhanh */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h5 className="text-lg font-semibold">Liên kết nhanh</h5>
                <ul className="list-none space-y-2">
                  <li>
                    <a href="#" className="text-white hover:underline">
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline">
                      Điều khoản sử dụng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline">
                      Hướng dẫn mua hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white hover:underline">
                      Câu hỏi thường gặp (FAQ)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Cột 3: Mạng xã hội */}
              <div className="w-full md:w-1/3">
                <h5 className="text-lg font-semibold">Theo dõi chúng tôi</h5>
                <div className="flex space-x-3">
                  <a href="#" className="text-white hover:text-gray-400">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-white hover:text-gray-400">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-white hover:text-gray-400">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Bản quyền */}
            <div className="text-center mt-4">
              <p className="text-sm">&copy; 2025 Yousport. All rights reserved.</p>
            </div>
          </div>
        </footer>
    );

}
export default Footer;