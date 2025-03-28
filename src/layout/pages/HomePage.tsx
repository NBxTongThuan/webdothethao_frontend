import { Link } from "react-bootstrap-icons";
import Carousel from "../component/header/Carousel";
import ListProduct from "./product_component/ListProducts";
import ProductDetail from "./product/ProductDetail";
import { useParams } from "react-router-dom";

interface HomePageInterface {
    searchKeyword: string;
}

const HomePage: React.FC<HomePageInterface> = (props) => {
    const {categoryId} = useParams();

    let categoryIdNumber = 0;
    try {
        categoryIdNumber = parseInt(categoryId+'');
    } catch (error) {
        categoryIdNumber = 0;
        console.log(error);
    } 
    if(Number.isNaN(categoryIdNumber)){
        categoryIdNumber = 0;
    }
    return (
        <div>
            <Carousel />
            <ListProduct searchKeyword={props.searchKeyword} categoryId={categoryIdNumber} />
            {/* <ProductDetail /> */}
        </div>
    );

}
export default HomePage;