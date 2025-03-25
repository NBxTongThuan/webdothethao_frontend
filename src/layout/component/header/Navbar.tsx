import { use, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { CategoriesModel } from "../../../model/CategoriesModel";
import { getListCate } from "../../../api/CategoriesAPI";


interface NavbarInterface {
  searchKeywords: string;
  setSearchKeywords: (keywords: string) => void;
}

const Navbar: React.FC<NavbarInterface> = (props) => {

  const [temporaryKeywords, setTemporaryKeywords] = useState('');

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryKeywords(event.target.value);
  }

  const onSearchButtonClicked = () => {
    props.setSearchKeywords(temporaryKeywords);
  }

  const [listCate, setListCate] = useState<CategoriesModel[]>([]);

  useEffect(() => {
    getListCate()
      .then(
        responseDATA => {
          setListCate(responseDATA);
        }
      )
      .catch(
        error => {
          console.log(error);
        });

  }, []);

  return (
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
                {listCate.map((cate, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/${cate.categories_id}`}>{cate.name}</Link>
                  </li>
                ))}

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
          <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} onKeyDown={e => e.key === "Enter" && onSearchButtonClicked()} />
          <button className="btn btn-outline-light" onClick={onSearchButtonClicked}><Search /></button>
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