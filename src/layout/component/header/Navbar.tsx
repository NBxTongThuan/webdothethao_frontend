import { use, useEffect, useState } from "react";
import { Cart, Search, Person, ChevronDown, BoxArrowInRight, PersonPlus, BoxArrowInLeft, PersonDash, CartCheck, Key } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesModel } from "../../../model/CategoriesModel";
import { getListCate } from "../../../api/user/CategoriesAPI";
import { getUserName, logOut, getCartId } from "../../../util/JwtService";

interface NavbarInterface {
  searchKeywords: string;
  setSearchKeywords: (keywords: string) => void;
}

const Navbar: React.FC<NavbarInterface> = (props) => {
  const [temporaryKeywords, setTemporaryKeywords] = useState('');
  const [listCate, setListCate] = useState<CategoriesModel[]>([]);
  const [cartID, setCartID] = useState<string | null>(getCartId() + "");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  
  // Theo dõi sự thay đổi của localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener("storage", handleStorageChange); // Lắng nghe sự kiện thay đổi
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);




  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryKeywords(event.target.value);
  }

  const onSearchButtonClicked = () => {
    navigate(`/shop?searchKeyword=${temporaryKeywords}`);
  }

  const handleLogout = () => {
    logOut(navigate);
  }

  useEffect(() => {
    getListCate()
      .then(responseDATA => {
        setListCate(responseDATA);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <a className="text-white text-lg font-bold" href="/">
          <img src="/images/logo192.png" style={{ width: "100px",height:"50px" }} />
        </a>
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
              <ul className="absolute left-0 bg-white text-gray-800 shadow-lg rounded hidden group-hover:block z-50">
                {listCate.map((cate, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-100">

                    <Link to={`/shop/${cate.categories_id}`} className="block w-full min-w-[200px] whitespace-nowrap">{cate.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/shop" className="text-white hover:text-gray-300">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/aboutUS" className="text-white hover:text-gray-300">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-300">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="flex items-center space-x-2">
          <input
            className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
            onChange={onSearchInputChange}
            onKeyDown={e => e.key === "Enter" && onSearchButtonClicked()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSearchButtonClicked}
          >
            <Search />
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <div className="flex items-center space-x-4">
          <Link className="text-white hover:text-gray-300" to={cartID ? `/Cart/${cartID}` : '/Login'}>
            <Cart className="w-6 h-6" />
          </Link>


          {/* User Menu */}
          <div className="relative group" style={{ marginRight: '10px' }}>
            <button className="flex items-center justify-center space-x-2 text-white hover:text-gray-300">
              <Person className="w-5 h-5" />
              <span>{token ? 'Xin chào ' + getUserName(token) : 'Tài khoản'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
              {!token && <Link
                to="/Login"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <BoxArrowInRight className="w-4 h-4 mr-2" />
                Đăng nhập
              </Link>}

              {!token && <Link
                to="/Register"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <PersonPlus className="w-4 h-4 mr-2" />
                Đăng ký
              </Link>}

              {token && <Link
                to="/userDetail"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
              >
                <PersonDash className="w-4 h-4 mr-2" />
                Thông tin cá nhân
              </Link>}

              {token && <Link
                to="/myOrder"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
              >
                <CartCheck className="w-4 h-4 mr-2" />
                Đơn hàng của tôi
              </Link>}


              {
                token && <Link
                  to="/changePassword"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Đổi mật khẩu
                </Link>
              }

              {token && <Link
                to="/Login"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <BoxArrowInLeft className="w-4 h-4 mr-2" />
                Đăng Xuất
              </Link>}

              {!token && <Link
                to="/forgotPassword"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <Key className="w-4 h-4 mr-2" />
                Quên mật khẩu
              </Link>}


            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;