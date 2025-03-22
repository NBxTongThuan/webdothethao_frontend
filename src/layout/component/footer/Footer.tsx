
const Footer: React.FC = ()=>{

    return(
        <footer className="bg-dark text-light py-4 mt-1">
        <div className="container">
          <div className="row">
            {/* Cột 1: Thông tin cửa hàng */}
            <div className="col-md-4">
              <h5>Yousport</h5>
              <p>Địa chỉ: 123 Đường ABC, Hà Nội, Việt Nam</p>
              <p>Email: support@yousport.vn</p>
              <p>Hotline: 0123 456 789</p>
              <p>Giờ mở cửa: 8:00 - 22:00 (Hằng ngày)</p>
            </div>
      
            {/* Cột 2: Liên kết nhanh */}
            <div className="col-md-4">
              <h5>Liên kết nhanh</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-light text-decoration-none">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-light text-decoration-none">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="text-light text-decoration-none">Câu hỏi thường gặp (FAQ)</a></li>
              </ul>
            </div>
      
            {/* Cột 3: Mạng xã hội */}
            <div className="col-md-4">
              <h5>Theo dõi chúng tôi</h5>
              <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
      
          {/* Bản quyền */}
          <div className="text-center mt-3">
            <p className="mb-0">&copy; 2025 Yousport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );

}
export default Footer;