import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListProductAttributes } from "../../../api/user/ProductAttributeAPI";
import ProductAttributeModel from "../../../model/ProductAttributeModel";
import ProductModel from "../../../model/ProductModel";
import { get1Product } from "../../../api/user/ProductsAPI";
import ImageModel from "../../../model/ImageModel";
import { getListImage } from "../../../api/user/ImagesAPI";
import BrandModel from "../../../model/BrandModel";
import { getBrand } from "../../../api/user/BrandAPI";
import NumberFormat from "../../../util/NumberFormat";
import Reviews from "../product_component/Reviews";
import { toast } from "react-toastify";
import { getListReview } from "../../../api/user/ReviewsAPI";
import { ReviewsModel } from "../../../model/ReviewsModel";
import { SameTypeProduct } from "../../component/SameTypeProduct";
import { useAuth } from "../../../util/AuthContext";
import 'react-quill/dist/quill.snow.css';
const ProductDetail: React.FC = () => {

  const [listProductAttribute, setListProductAttribute] = useState<ProductAttributeModel[]>([]);

  const [product, setProduct] = useState<ProductModel>();

  const [productAttributeId, setProductAttributeId] = useState('');

  const [brand, setBrand] = useState<BrandModel>();

  const [listImage, setListImage] = useState<ImageModel[]>([]);

  const [listReview, setListReview] = useState<ReviewsModel[]>([]);

  let productRating = 0;
  if (listReview.length > 0) {
    productRating = Number(
      (listReview.reduce((sum, review) => sum + review.rating, 0) / listReview.length).toFixed(1)
    );
  }



  const { productId } = useParams();
  let product_id: string = productId + "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attributes, product, images, brand] = await Promise.all([
          getListProductAttributes(product_id),
          get1Product(product_id),
          getListImage(product_id),
          getBrand(product_id),
        ]);

        setListProductAttribute(attributes);
        setProduct(product);
        setListImage(images);
        setBrand(brand);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [product_id]);


  useEffect(() => {
    getListReview(product_id)
      .then(responseDATA => {
        setListReview(responseDATA);
      })
      .catch(error => {
        console.log("Lỗi khi tải đánh giá sản phẩm: " + error);
      });
  }, [product_id]);

  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    const newColors: string[] = [];
    const newSizes: string[] = [];

    listProductAttribute.forEach(attr => {
      if (attr !== null) {
        if (!newColors.includes(attr.color + "")) {
          newColors.push(attr.color + "");
        }
        if (!newSizes.includes(attr.size + "")) {
          newSizes.push(attr.size + "");
        }
      }
    });

    setColors(newColors);
    setSizes(newSizes);
  }, [listProductAttribute]);

  sizes.sort();

  // Chạy khi colors hoặc sizes thay đổi

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }
    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [colors, sizes]);


  const [quantity, setQuantity] = useState(1);

  const [remainingQuantity, setRemainingQuantity] = useState(0);

  useEffect(() => {
    const selectedProduct = listProductAttribute.find((productAttribute) => productAttribute.color === selectedColor && productAttribute.size === selectedSize);
    if (selectedProduct) {
      setRemainingQuantity(selectedProduct.quantity);
      setProductAttributeId(selectedProduct?.product_attribute_id + "");
      console.log(productAttributeId);
    } else {
      setRemainingQuantity(0);
    }

  }, [selectedColor, selectedSize]);

  const [mainImage, setMainImage] = useState(listImage[0]?.url || "");

  useEffect(() => {
    if (listImage.length > 0) {
      setMainImage(listImage[0].url ? listImage[0].url : "");
    }
  }, [listImage])

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setQuantity(1);
    }
    else if (parseInt(e.target.value) > remainingQuantity) {
      setQuantity(remainingQuantity);
    } else
      setQuantity(parseInt(e.target.value));
  }

  const checkQuantity = (quantity: number) => {
    if (quantity > remainingQuantity) {
      alert("abc");
    }
    if (remainingQuantity == 0) {
      setQuantity(1);
    }
  }
  const { user } = useAuth();
  const handleSubmitAddToCart = async () => {

    try {

      if (!user) {
        toast.error("Bạn cần đăng nhập để mua hàng!");
        return;
      }

      const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userName: user.userName,
          price: product?.price,
          quantity: quantity,
          productAttributeId: productAttributeId
        }),
        credentials: 'include'
      });

      const { statusCode, message } = await response.json();

      if (statusCode === 'SUCCESS') {
        toast.success(message);
      } else if (statusCode === 'NUMBER_REACHED_MAXIMUM') {
        toast.success(message);
      } else {
        toast.error(message);
      }

    } catch (error) {
      console.error("Lỗi:", error);
      throw new Error("Gặp lỗi khi thêm vào giỏ hàng!");
    }


  }

  const handleGetVNColor = (value: string) => {
    switch (value) {
      case "RED":
        return "Đỏ";
      case "BLUE":
        return "Xanh dương";
      case "GREEN":
        return "Xanh lá";
      case "YELLOW":
        return "Vàng";
      case "WHITE":
        return "Trắng";
      case "BLACK":
        return "Đen";
      case "PINK":
        return "Hồng";
      case "PURPLE":
        return "Tím";
      case "ORANGE":
        return "Cam";
      case "BROWN":
        return "Nâu";
      case "GRAY":
        return "Xám";
      default:
        return value;
    }
  }

  const handleGetColorString = () => {
    if (!colors || colors.length === 0) return "Chưa có thông tin";
    return colors.map(color => handleGetVNColor(color)).join(", ");
  }

  return (
    <div className="mt-4 container mx-auto p-6 bg-white shadow-xl rounded-2xl">
      {/* Phần trên: Ảnh sản phẩm và Thông tin sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Ảnh sản phẩm */}
        <div className="md:col-span-5 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex">
            {/* Carousel ảnh nhỏ */}
            <div className="flex flex-col items-center gap-4 mr-4">
              {listImage.map((img, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 ${mainImage === img.url ? "ring-2 ring-red-500 ring-offset-2" : ""
                    }`}
                  onClick={() => setMainImage(img.url || "")}
                >
                  <img
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-24 h-24 object-cover"
                  />
                  {mainImage === img.url && (
                    <div className="absolute inset-0 bg-red-500 bg-opacity-10" />
                  )}
                </div>
              ))}
            </div>

            {/* Ảnh chính */}
            <div className="relative flex-1">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-[500px] object-contain rounded-xl bg-gray-50"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-colors duration-200">
                <i className="far fa-heart text-xl text-gray-600 hover:text-red-500 transition-colors duration-200"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="md:col-span-7 bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 space-y-8">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{product?.product_name}</h3>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                <i className="fas fa-tag text-red-500 mr-2"></i>
                {brand?.brandName}
              </span>
              <span className="flex items-center">
                <i className="fas fa-barcode text-red-500 mr-2"></i>
                Mã SP: {product?.product_id}
              </span>
              <span className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-2"></i>
                {productRating}
                <div className="ml-2">
                  {listReview.length} lượt đánh giá
                </div>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              {product?.moneyOff && product?.moneyOff > 0 ? (
                <div>
                  <span className="text-gray-400 text-sm line-through decoration-2 decoration-gray-400 hover:decoration-red-400 transition-all duration-300">
                    {NumberFormat(product.price)} VNĐ
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-500">
                      {NumberFormat(product.price - product.moneyOff)} VNĐ
                    </span>
                    <span className="bg-yellow-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">
                      -{Math.round((1 - (product.price - product.moneyOff) / product.price) * 100)}%
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xl font-bold text-red-500">
                  {NumberFormat(product?.price || 0)} VNĐ
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500 flex items-center">
              <i className="fas fa-shopping-bag mr-1"></i>
              Đã bán: {product?.quantity_sold}
            </span>
          </div>

          {/* Chọn màu sắc */}
          <div>
            <h5 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-palette text-red-500 mr-2"></i>
              Màu sắc:
            </h5>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`group relative w-14 h-14 rounded-xl transition-all duration-200 transform hover:scale-105 ${selectedColor === color
                    ? "ring-2 ring-red-500 ring-offset-2"
                    : ""
                    }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className={`block w-full h-full rounded-xl border ${color.toLowerCase() === 'white' || color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff'
                      ? 'border-gray-300'
                      : 'border-transparent'
                      }`}
                    style={{ backgroundColor: color }}
                  />
                  {selectedColor === color && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <i className={`fas fa-check text-lg ${color.toLowerCase() === 'white' || color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#fff'
                        ? 'text-gray-800'
                        : 'text-white'
                        }`}></i>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn kích thước */}
          <div>
            <h5 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-ruler text-red-500 mr-2"></i>
              Kích thước:
            </h5>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-16 py-3 rounded-xl transition-all duration-200 font-medium ${selectedSize === size
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold flex items-center">
                <i className="fas fa-boxes text-red-500 mr-2"></i>
                Số lượng:
              </h5>
              <span className="text-sm text-gray-600 flex items-center">
                <i className="fas fa-box-open mr-1"></i>
                Còn lại: {remainingQuantity}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={quantity <= 1}
              >
                <i className="fas fa-minus text-gray-600"></i>
              </button>
              <input
                className="w-20 h-12 text-center border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                type="number"
                value={quantity}
                onChange={handleQuantity}
              />
              <button
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                onClick={() => setQuantity(quantity < remainingQuantity ? quantity + 1 : quantity)}
                disabled={quantity >= remainingQuantity}
              >
                <i className="fas fa-plus text-gray-600"></i>
              </button>
            </div>
          </div>

          {/* Nút thêm vào giỏ & đặt mua */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmitAddToCart}
              className={`flex-1 py-4 rounded-xl text-white font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${remainingQuantity > 0
                ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30"
                : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={remainingQuantity === 0}
            >
              <i className="fas fa-shopping-cart"></i>
              <span>{remainingQuantity > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết: Thông số kỹ thuật & Mô tả sản phẩm */}
<div className="mt-12 space-y-10">
  {/* Thông số kỹ thuật */}
  <div>
    <h3 className="text-2xl font-bold mb-6">Thông số kỹ thuật</h3>
    <div className="bg-gray-50 rounded-2xl overflow-hidden">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-gray-200">
            <th className="p-4 text-left text-gray-600 w-1/2">Tên sản phẩm</th>
            <td className="p-4 text-left">{product?.product_name}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="p-4 text-left text-gray-600 ">Giá</th>
            <td className="p-4 text-left">
              {product?.moneyOff && product?.moneyOff > 0 ? (
                <>
                  <span className="text-red-600 font-medium text-base">
                    {NumberFormat(product.price - product.moneyOff)} VNĐ
                  </span>
                  <span className="bg-yellow-100 text-red-600 py-0.5 px-1.5 rounded-full text-xs font-semibold ml-2">
                    -{Math.round((1 - (product.price - product.moneyOff) / product.price) * 100)}%
                  </span>
                  <span className="text-gray-400 text-sm line-through ml-2">
                    {NumberFormat(product.price)} VNĐ
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium text-base">
                  {NumberFormat(product?.price || 0)} VNĐ
                </span>
              )}
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="p-4 text-left text-gray-600">Xuất xứ</th>
            <td className="p-4 text-left">{brand?.country}</td>
          </tr>
          <tr>
            <th className="p-4 text-left text-gray-600">Màu sắc</th>
            <td className="p-4 text-left">{handleGetColorString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* Mô tả sản phẩm */}
  <div>
    <h3 className="text-2xl font-bold mb-6">Mô tả sản phẩm</h3>
    <div className="bg-gray-50 rounded-2xl p-6">
      <div
        className="text-gray-600 text-left [p.ql-align-center]:text-center [p.ql-align-right]:text-right [p.ql-align-justify]:text-justify"
        dangerouslySetInnerHTML={{ __html: product?.description || "Chưa có mô tả chi tiết cho sản phẩm này." }}
      />
    </div>
  </div>
</div>

      {/* Reviews */}
      <Reviews listReview={listReview} />

      {/* Sản phẩm cùng loại */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Sản phẩm cùng loại</h3>
        <SameTypeProduct productId={product_id} />
      </div>
    </div>

  );
}
export default ProductDetail;