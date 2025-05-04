import { ReactNode, use, useEffect, useState } from "react";
import { Cart, Search, Person, ChevronDown, BoxArrowInRight, PersonPlus, BoxArrowInLeft, PersonDash, CartCheck, Key } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesModel } from "../../../model/CategoriesModel";
import { getListCate } from "../../../api/user/CategoriesAPI";
import { useAuth } from "../../../util/AuthContext";
import { AutoComplete, Input } from "antd";
import { getAllProducts } from "../../../api/user/ProductsAPI";
import ProductModel from "../../../model/ProductModel";

interface NavbarInterface {
  searchKeywords: string;
  setSearchKeywords: (keywords: string) => void;
}

const Navbar: React.FC<NavbarInterface> = (props) => {
  const [temporaryKeywords, setTemporaryKeywords] = useState('');
  const [listCate, setListCate] = useState<CategoriesModel[]>([]);
  const [cartID, setCartID] = useState<string | null>();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
  const [suggestions, setSuggestions] = useState<{ value: string, label: ReactNode }[]>([]);

  useEffect(() => {
    if (temporaryKeywords === "") return;
    const fetchData = async () => {
      try {
        const response = await getAllProducts(0);
        setAllProducts(response.listProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [temporaryKeywords]);

  const handleSearch = (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const filtered = allProducts
      .filter((item) =>
        item.product_name.includes(value)
      )
      .map((item) => ({ value: item.product_name, label: <Link to={`/productdetail/${item.product_id}`}>{item.product_name}</Link> }));
    setSuggestions(filtered);
  };

  useEffect(() => {
    if (user) {
      setCartID(user?.cartId + "");
    } else {
      setCartID(null);
    }
  }, [user]);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemporaryKeywords(event.target.value);
    if (event.target.value.length === 0) {
      props.setSearchKeywords("");
    }
  }

  const onSearchButtonClicked = () => {
    props.setSearchKeywords(temporaryKeywords);
    navigate(`/shop?searchKeyword=${temporaryKeywords}`);
  }

  const handleLogout = () => {
    logout();
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
      <div className="container mx-auto px-4 py-2 flex items-center justify-between h-16">
        <a className="text-white text-lg font-bold" href="/">
          <img src="/images/logo192.png" style={{ width: "100px", height: "50px" }} />
        </a>
        <button className="text-white md:hidden" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="fas fa-bars"></span>
        </button>

        <div className="px-4 py-4 hidden md:flex items-center justify-center space-x-6 mt-4" id="navbarSupportedContent">
          <ul className="flex items-center justify-center space-x-6">
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
        <div className="flex items-center justify-center space-x-2 ">
          <AutoComplete
            options={suggestions}
            style={{ width: 300 }}
            onSearch={handleSearch}
            filterOption={false}
          >
            <Input
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
              onChange={onSearchInputChange}
              onKeyDown={e => e.key === "Enter" && onSearchButtonClicked()}
            />
          </AutoComplete>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSearchButtonClicked}
          >
            <Search />
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <div className="flex items-center justify-center space-x-4">
          <Link className="text-white hover:text-gray-300" to={cartID ? `/Cart/${cartID}` : '/Login'}>
            <Cart className="w-6 h-6" />
          </Link>


          {/* User Menu */}
          <div className="relative group" style={{ marginRight: '10px' }}>
            <button className="flex items-center justify-center space-x-2 text-white hover:text-gray-300">
              <Person className="w-5 h-5" />
              <span>{user ? 'Xin chào ' + user.userName : 'Tài khoản'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
              {!user && <Link
                to="/Login"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <BoxArrowInRight className="w-4 h-4 mr-2" />
                Đăng nhập
              </Link>}

              {!user && <Link
                to="/Register"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <PersonPlus className="w-4 h-4 mr-2" />
                Đăng ký
              </Link>}

              {user && <Link
                to="/userDetail"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
              >
                <PersonDash className="w-4 h-4 mr-2" />
                Thông tin cá nhân
              </Link>}

              {user && <Link
                to="/myOrder"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
              >
                <CartCheck className="w-4 h-4 mr-2" />
                Đơn hàng của tôi
              </Link>}


              {
                user && <Link
                  to="/changePassword"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
                >
                  <Key className="w-4 h-4 mr-2" />
                  Đổi mật khẩu
                </Link>
              }

              {user && <Link
                to="/Login"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <BoxArrowInLeft className="w-4 h-4 mr-2" />
                Đăng Xuất
              </Link>}

              {!user && <Link
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