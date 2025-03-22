import { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import { get4Products } from "../../../api/ProductsAPI";
import { error } from "console";
import ProductProps from "./ProductProps";


const ListProduct: React.FC = () => {

    const [listProduct,setListProduct] = useState<ProductModel[]>([]);
    const [loadingData,setLoadingData] = useState(true);
    const [errorReport,setErrorReport] = useState("");
    useEffect(()=>{
        setLoadingData(true);
        get4Products(0)
        .then(
            responeData=>{
                setListProduct(responeData);
                setLoadingData(false);
            }
        )
        .catch(
            error=>{
                    setErrorReport(error);
            }
        )
    },[])

    if (loadingData) {
        return (
            <div>
                <h1>
                    Đang tải dữ liệu....
                </h1>
            </div>
        );
    }

    if (errorReport) {
        return (
            <div>
                <h1>
                    Gặp lỗi: {errorReport}
                </h1>
            </div>
        );
    }

    return (
        <div className="container">
        <div className="row mt-4">
            {
                listProduct.map((product) => (
                    <ProductProps key={product.product_id} product={product} />
                ))
            }
        </div>
        <br>
        </br>
        {/* <PhanTrang pageNumber={trangHienTai} tongSoTrang={tongSoTrang} setTrang={setTrang} /> */}
    </div>
    );

}
export default ListProduct;