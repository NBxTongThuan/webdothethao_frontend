import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListProductAttributes } from "../../../api/ProductAttributeAPI";
import ProductAttributeModel from "../../../model/ProductAttributeModel";
import ProductModel from "../../../model/ProductModel";
import { get1Product } from "../../../api/ProductsAPI";
import ImageModel from "../../../model/ImageModel";
import { getListImage } from "../../../api/ImagesAPI";
import BrandModel from "../../../model/BrandModel";
import { getBrand } from "../../../api/BrandAPI";
import NumberFormat from "../../../util/NumberFormat";
import Reviews from "../product_component/Reviews";
import { getUserName } from "../../../util/JwtService";
import { toast } from "react-toastify";

const ProductDetail: React.FC = () => {

  const [listProductAttribute, setListProductAttribute] = useState<ProductAttributeModel[]>([]);

  const [product, setProduct] = useState<ProductModel>();

  const [productAttributeId, setProductAttributeId] = useState('');

  const [brand, setBrand] = useState<BrandModel>();

  const [listImage, setListImage] = useState<ImageModel[]>([]);



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

  }, [selectedColor, selectedSize]); // Chỉ chạy khi các giá trị này thay đổi

  const [mainImage, setMainImage] = useState(listImage[0]?.data || "");

  useEffect(() => {
    if (listImage.length > 0) {
      setMainImage(listImage[0].data ? listImage[0].data : "");
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

  const handleSubmitAddToCart = async () => {

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Bạn cần đăng nhập để mua hàng!");
        return;
      }

      const response = await fetch("http://localhost:8080/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userName: getUserName(token),
          price: product?.price,
          quantity: quantity,
          productAttributeId: productAttributeId
        })
      });

      if (!response.ok) {
        throw new Error("Lỗi khi thêm sản phẩm vào giỏ hàng!");
      }

      toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      throw new Error("Gặp lỗi khi thêm vào giỏ hàng!");
    }


  }


  return (
    <div className="mt-4 container mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ảnh sản phẩm */}
        <div>
          <div className="flex">
            {/* Carousel ảnh nhỏ */}
            <div className="flex flex-col items-center gap-3 mr-4">
              {listImage.map((img, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 ${mainImage === img.data ? "ring-2 ring-red-500" : ""
                    }`}
                  onClick={() => setMainImage(img.data || "")}
                >
                  <img
                    src={img.data}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                  {mainImage === img.data && (
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
                className="w-full h-[500px] object-contain rounded-2xl bg-gray-50"
              />
              <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
                <i className="far fa-heart text-xl text-gray-600 hover:text-red-500 transition-colors duration-200"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{product?.product_name}</h3>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <i className="fas fa-tag mr-1"></i>
                {brand?.brandName}
              </span>
              <span>•</span>
              <span>Mã SP: {product?.product_id}</span>
              <span>•</span>
              <span className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                4.5/5 (15 đánh giá)
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <h4 className="text-3xl font-bold text-red-600">{NumberFormat(product?.price)} VNĐ</h4>
            <span className="text-sm text-gray-500">Đã bán: 150</span>
          </div>

          {/* Chọn màu sắc */}
          <div>
            <h5 className="text-lg font-semibold mb-3">Màu sắc:</h5>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`group relative w-12 h-12 rounded-xl transition-transform transform hover:scale-105 ${selectedColor === color
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
            <h5 className="text-lg font-semibold mb-3">Kích thước:</h5>
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
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-lg font-semibold">Số lượng:</h5>
              <span className="text-sm text-gray-600">Còn lại: {remainingQuantity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={quantity <= 1}
              >
                <i className="fas fa-minus text-gray-600"></i>
              </button>
              <input
                className="w-20 h-12 text-center border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors duration-200"
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
            <button
              className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2"
              disabled={remainingQuantity === 0}
            >
              <i className="fas fa-bolt"></i>
              <span>{remainingQuantity > 0 ? "MUA NGAY" : "HẾT HÀNG"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Thông tin chi tiết</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-gray-600">Tên sản phẩm</th>
                  <td className="p-4">{product?.product_name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-gray-600">Giá</th>
                  <td className="p-4 font-medium text-red-600">{NumberFormat(product?.price)} VNĐ</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-gray-600">Xuất xứ</th>
                  <td className="p-4">{brand?.country}</td>
                </tr>
                <tr>
                  <th className="p-4 text-left text-gray-600">Màu sắc</th>
                  <td className="p-4">{colors.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Mô tả sản phẩm</h4>
            <p className="text-gray-600 leading-relaxed">
              {product?.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
            </p>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <Reviews productId={productId + ""} />
    </div>

  );
}
export default ProductDetail;