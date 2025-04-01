import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListProductAttributes } from "../../../api/ProductAttributeAPI";
import { error } from "console";
import ProductAttributeModel from "../../../model/ProductAttributeModel";
import ProductModel from "../../../model/ProductModel";
import { get1Product } from "../../../api/ProductsAPI";
import ImageModel from "../../../model/ImageModel";
import { getListImage } from "../../../api/ImagesAPI";
import BrandModel from "../../../model/BrandModel";
import { getBrand } from "../../../api/BrandAPI";
import NumberFormat from "../../../util/NumberFormat";
import { ReviewsModel } from "../../../model/ReviewsModel";
import { getListReview } from "../../../api/ReviewsAPI";
import Reviews from "../product_component/Reviews";
import { getUserName } from "../../../util/JwtService";

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
      setProductAttributeId(selectedProduct?.product_attribute_id+"");
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
        alert("Bạn cần đăng nhập để mua hàng!");
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
          productAttributeId:productAttributeId
        })
      });

      if(!response.ok)
      {
        throw new Error("Lỗi khi thêm sản phẩm vào giỏ hàng!");
      }
      
      alert("Thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      throw new Error("Gặp lỗi khi thêm vào giỏ hàng!");
    }


  }


  return (
    <div className="mt-4 container mx-auto p-4 bg-white shadow-lg rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ảnh sản phẩm */}
      <div>
        <div className="flex">
          {/* Carousel ảnh nhỏ */}
          <div className="flex flex-col items-center gap-2 mr-4">
            {listImage.map((img, index) => (
              <img
                key={index}
                src={img.data}
                alt={`Thumbnail ${index}`}
                className={`w-24 h-24 border p-1 cursor-pointer rounded-lg ${mainImage === img.data ? "border-red-500" : ""}`}
                onClick={() => setMainImage(img.data || "")}
              />
            ))}
          </div>
  
          {/* Ảnh chính */}
          <img src={mainImage} alt="Main Shoe" className="w-96 h-96 object-contain border rounded-lg" />
        </div>
      </div>
  
      {/* Thông tin sản phẩm */}
      <div>
        <h3 className="text-2xl font-bold">{product?.product_name}</h3>
        <p className="mt-2 text-gray-600">
          <strong>Thương hiệu:</strong> {brand?.brandName} | <strong>Mã SP:</strong> {product?.product_id}
        </p>
        <h4 className="text-3xl font-bold text-red-600 mt-3">{NumberFormat(product?.price)} VNĐ</h4>
  
        {/* Chọn màu sắc */}
        <h5 className="mt-4 font-semibold">Màu sắc:</h5>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 transition ${selectedColor === color ? "border-red-500" : "border-gray-300"}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
  
        {/* Chọn kích thước */}
        <h5 className="mt-4 font-semibold">Kích thước:</h5>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-4 py-2 border rounded-lg transition ${selectedSize === size ? "border-red-500 bg-red-100" : "border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
  
        {/* Chọn số lượng */}
        <div className="mt-4">
          <h5 className="font-semibold">Số lượng còn lại: {remainingQuantity}</h5>
          <div className="flex items-center mt-2">
            <button
              className="px-3 py-1 border rounded-l-lg bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <input
              className="w-16 text-center border-t border-b border-gray-300"
              type="number"
              value={quantity}
              onChange={handleQuantity}
            />
            <button
              className="px-3 py-1 border rounded-r-lg bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setQuantity(quantity < remainingQuantity ? quantity + 1 : quantity)}
            >
              +
            </button>
          </div>
        </div>
  
        {/* Nút thêm vào giỏ & đặt mua */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSubmitAddToCart}
            className={`w-1/2 py-3 rounded-lg text-white font-bold transition ${remainingQuantity > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={remainingQuantity === 0}
          >
            {remainingQuantity > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
          </button>
          <button
            className="w-1/2 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            disabled={remainingQuantity === 0}
          >
            ĐẶT MUA
          </button>
        </div>
      </div>
    </div>
  
    {/* Thông số kỹ thuật */}
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Mô tả chi tiết</h3>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody>
          <tr className="border-b">
            <th className="p-3 bg-gray-100 text-left">Tên sản phẩm</th>
            <td className="p-3">{product?.product_name}</td>
          </tr>
          <tr className="border-b">
            <th className="p-3 bg-gray-100 text-left">Giá</th>
            <td className="p-3">{NumberFormat(product?.price)} VNĐ</td>
          </tr>
          <tr className="border-b">
            <th className="p-3 bg-gray-100 text-left">Xuất xứ</th>
            <td className="p-3">{brand?.country}</td>
          </tr>
          <tr>
            <th className="p-3 bg-gray-100 text-left">Các màu có sẵn</th>
            <td className="p-3">{colors.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    {/* Reviews */}
    <Reviews productId={productId + ""} />
  </div>
  
  );
}
export default ProductDetail;