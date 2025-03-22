import {Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";


const Navbar: React.FC = ()=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Yousport</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5 gap-4">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Danh mục sản phẩm
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
            <li><Link className="dropdown-item" to="/giay">Giày thể thao</Link></li>
            <li><Link className="dropdown-item" to="/gangtay">Găng tay</Link></li>
            <li><Link className="dropdown-item" to="/aoquan">Quần áo thể thao</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Quy định bán hàng</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Liên hệ</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Giới thiệu</a>
        </li>
      </ul>
    </div>

    {/* Tìm kiếm */}
    <div className="d-flex ms-3">
      <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
      <button className="btn btn-outline-light"><Search /></button>
    </div>

    {/* Biểu tượng giỏ hàng */}
    <ul className="navbar-nav ms-3">
      <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="fas fa-shopping-cart"></i>
        </a>
      </li>
    </ul>

    {/* Biểu tượng đăng nhập */}
    <ul className="navbar-nav ms-2">
      <li className="nav-item">
        <Link className="nav-link" to="/Login">
          <i className="fas fa-user"></i>
        </Link>
      </li>
    </ul>
  </div>
</nav>

    );

}
export default Navbar;