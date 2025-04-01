import { use, useEffect, useState } from "react";
import { Cart, Search } from "react-bootstrap-icons";
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

  const CartID = localStorage.getItem('cartID');

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <a className="text-white text-lg font-bold" href="/">Yousport</a>
      <button className="text-white md:hidden" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="fas fa-bars"></span>
      </button>

      <div className="hidden md:flex items-center space-x-6" id="navbarSupportedContent">
        <ul className="flex items-center space-x-6">
        <li>
          <Link className="text-white hover:text-gray-300" to="/">Trang chủ</Link>
        </li>
        <li className="relative group">
          <a className="text-white hover:text-gray-300 cursor-pointer">Danh mục sản phẩm</a>
          <ul className="absolute left-0 mt-2 bg-white text-gray-800 shadow-lg rounded hidden group-hover:block">
          {listCate.map((cate, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
            <Link to={`/${cate.categories_id}`}>{cate.name}</Link>
            </li>
          ))}
          </ul>
        </li>
        <li>
          <a className="text-white hover:text-gray-300" href="#">Quy định bán hàng</a>
        </li>
        <li>
          <a className="text-white hover:text-gray-300" href="#">Liên hệ</a>
        </li>
        <li>
          <a className="text-white hover:text-gray-300" href="#">Giới thiệu</a>
        </li>
        </ul>
      </div>

      {/* Tìm kiếm */}
      <div className="flex items-center space-x-2">
        <input className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} onKeyDown={e => e.key === "Enter" && onSearchButtonClicked()} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onSearchButtonClicked}><Search /></button>
      </div>

      {/* Biểu tượng giỏ hàng */}
      <div className="flex items-center space-x-4">
        <Link className="text-white hover:text-gray-300" to={CartID ? `/Cart/${CartID}` : '/Login'}>
        <Cart className="w-6 h-6" />
        </Link>

        {/* Biểu tượng đăng nhập */}
        <Link className="text-white hover:text-gray-300" to="/Login">
        <i className="fas fa-user"></i>
        </Link>
      </div>
      </div>
    </nav>

  );

}
export default Navbar;