import { useEffect, useState } from "react";
import ProductModel from "../../../model/ProductModel";
import { error } from "console";
import ProductProps from "./ProductProps";
import { getAllProducts, getProductsByCategoryIdAndProductName } from "../../../api/ProductsAPI";
import { Pagination } from "../../../util/Pagination";

interface ListProductInterface {
    searchKeyword: string;
    categoryId: number;
}

const ListProduct: React.FC<ListProductInterface> = (props) => {

    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorReport, setErrorReport] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        setLoadingData(true);

        const fetchData = async () => {
            try {
                let response;
                // console.log(`SearchKeyword:${props.searchKeyword}allo`);
                if (!props.searchKeyword && props.categoryId === 0) {
                    response = await getAllProducts(currentPage - 1);

                }
                else {
                    response = await getProductsByCategoryIdAndProductName(props.categoryId, props.searchKeyword, currentPage - 1);
                }
                setListProduct(response.listProduct);
                setTotalPage(response.totalPage);
            } catch (error) {
                setErrorReport(error + "");
                alert("Lỗi: " + error);
            } finally {
                setLoadingData(false);
            }
        }

        fetchData();
    }, [currentPage, props.searchKeyword, props.categoryId]);

    // console.log("ListProduct: ", listProduct);

    const setPage = (page: number) => setCurrentPage(page);

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

            <Pagination currentPage={currentPage} setPage={setPage} totalPage={totalPage}></Pagination>
        </div>
    );

}
export default ListProduct;