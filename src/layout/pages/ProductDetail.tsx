import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {

  const { productId } = useParams();

  let product_id:string = productId+"";
  console.groupCollapsed(product_id);

  const [selectedColor, setSelectedColor] = useState<string>("yellow");
  const [selectedSize, setSelectedSize] = useState<number | null>(38);
  const [quantity, setQuantity] = useState(1);

  const colors = ["blue", "yellow", "green"];
  const sizes = [38, 39, 40, 41, 42, 43, 44];

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="d-flex">
            {/* Ảnh nhỏ bên trái */}
            <div className="me-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={`/images/shoe-${index + 1}.jpg`}
                    alt="Shoe"
                    className="border p-1 mb-2"
                    width="50"
                    height="50"
                  />
                ))}
            </div>

            {/* Ảnh lớn */}
            <div>
              <img
                src="/images/main-shoe.jpg"
                alt="Main Shoe"
                className="img-fluid border"
              />
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h3>Giày bóng đá Jogarbola Kumo Fit</h3>
          <p>
            <strong>Thương hiệu:</strong> JOGARBOLA | <strong>Mã SP:</strong>{" "}
            101031400372
          </p>
          <h4 className="text-danger">1,035,000đ</h4>

          {/* Chọn màu sắc */}
          <h5>Màu sắc:</h5>
          <div className="d-flex gap-2 mb-3">
            {colors.map((color) => (
              <button
                key={color}
                className={`btn btn-outline-secondary ${selectedColor === color ? "border-danger" : ""
                  }`}
                onClick={() => setSelectedColor(color)}
              >
                <img
                  src={`/images/color-${color}.jpg`}
                  alt={color}
                  width="30"
                  height="30"
                />
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
          <h5>Số lượng:</h5>
          <div className="d-flex align-items-center mb-3">
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
          <button className="btn btn-danger w-100" disabled>
            HẾT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;