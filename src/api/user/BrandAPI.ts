
import BrandModel from "../../model/BrandModel";
import requestAPI from "./RequestApi";

export async function getBrand(productId: string): Promise<BrandModel> {

    const link = `http://localhost:8080/api/brands/get-by-product-id?productId=${productId}`;

    const response = await requestAPI(link);

    const responseDATA = response;

    return ({
        brandId: responseDATA.brandId,
        brandName: responseDATA.brandName,
        country: responseDATA.country
    });

}