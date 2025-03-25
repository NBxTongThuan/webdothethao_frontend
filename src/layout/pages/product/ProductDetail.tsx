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

const ProductDetail: React.FC = () => {

  const [listProductAttribute, setListProductAttribute] = useState<ProductAttributeModel[]>([]);

  const [product, setProduct] = useState<ProductModel>();

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



  return (
    <div className="mt-4 container">
      <div className="row pt-3 pb-4 pl-4 rounded border" style={{ backgroundColor: "rgb(255, 254, 254)" }}>
        {/* Ảnh sản phẩm */}
        <div className="col-md-6">
          {/* Ảnh sản phẩm */}
          <div className="d-flex">
            {/* Carousel dọc (Ảnh nhỏ) */}
            <div id="imageCarousel" className="carousel slide me-2" data-bs-ride="carousel">
              <div className="carousel-inner">
                {listImage.map((img, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img
                      src={img.data}
                      alt={`Thumbnail ${index}`}
                      className="d-block border p-1"
                      width="100"
                      height="100"
                      onClick={() => setMainImage(img.data ? img.data : "")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
              {/* Nút điều hướng lên/xuống */}
              <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>

            {/* Ảnh chính lớn bên phải */}
            <div>
              <img src={mainImage} alt="Main Shoe" className="img-fluid border" width="500"
                height="500" />
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h3>{product?.product_name}</h3>
          <p>
            <strong>Thương hiệu:</strong> {brand?.brandName} | <strong>Mã SP: </strong>{product?.product_id}

          </p>
          <h4 className="text-danger">{NumberFormat(product?.price)} VNĐ</h4>

          {/* Chọn màu sắc */}
          <h5>Màu sắc:</h5>
          <div className="d-flex gap-2 mb-3 p-3 rounded">
            {colors.map((color) => (
              <button
                key={color}
                className={`btn d-flex rounded-circle btn-outline-secondary py-3 px-3 border-secondary 
                ${selectedColor === color ? "border-danger" : ""}`}
                style={{
                  backgroundColor: color, // Màu nền luôn theo color
                  color: "white", // Chữ trắng để dễ nhìn trên màu nền
                  fontSize: "10px",
                  borderColor: selectedColor === color ? "red" : "transparent", // Viền đỏ khi được chọn
                }}
                onClick={() => setSelectedColor(color)}
              >

              </button>
            ))}
          </div>

          {/* Chọn kích thước */}
          <h5>Kích thước:</h5>
          <div className="d-flex gap-2 mb-3">
            {sizes.map((size) => (
              <button
                key={size}
                className={`btn btn-outline-secondary ${selectedSize === size ? "border-danger" : ""
                  }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Chọn số lượng */}

          <div className="d-flex align-items-center mb-3">
            <h5>Số lượng còn lại: {remainingQuantity}</h5>

          </div>

          <div className="d-flex align-items-center mb-3">
            <h5>Số lượng:</h5>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Nút Hết hàng */}
          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-danger w-100" disabled={remainingQuantity === 0}>
                {remainingQuantity > 0 ? "THÊM VÀO GIỎ" : "HẾT HÀNG"}
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary w-100" disabled={remainingQuantity === 0}>
                ĐẶT MUA
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          {/* Thông số kỹ thuật */}
          <div className="row mt-4">
            <div className="col-md-12">
              <h3 className="mb-3">Mô tả chi tiết</h3>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Tên sản phẩm</th>
                    <td>{product?.product_name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Giá</th>
                    <td>{NumberFormat(product?.price)} VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">Xuất xứ</th>
                    <td>{brand?.country}</td>
                  </tr>
                  <tr>
                    <th scope="row">Các màu có sẵn</th>
                    <td>{colors.join(", ")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

            <Reviews productId={productId+""} />

    </div>
  );
}
export default ProductDetail;