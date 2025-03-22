import { Link } from "react-bootstrap-icons";
import Carousel from "../component/header/Carousel";
import ListProduct from "./product_component/ListProducts";
import ProductDetail from "./ProductDetail";

const HomePage: React.FC = () => {


    return (
        <div>
            <Carousel />
             <ListProduct/>
             
             {/* <ProductDetail /> */}
        </div>
    );

}
export default HomePage;