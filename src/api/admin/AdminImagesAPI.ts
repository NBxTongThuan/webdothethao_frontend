import ImageModel from "../../model/ImageModel";
import { ImageResponse } from "../interface/Responses";
import requestAPI from "../user/RequestApi";


export async function AdminGetListImage(productId: string): Promise<ImageModel[]> {

    const link: string = `http://localhost:8080/api/admin/images/get-by-product-id?productId=${productId}`;

    const response = await requestAPI(link,true);

    const responseDATA = response;

    const listImage: ImageModel[] = [];

    for(const key in responseDATA)
    {
            listImage.push({
                image_id: responseDATA[key].imageId,
                data: responseDATA[key].data,
                name: responseDATA[key].name,
                url: responseDATA[key].url,
            });
    }

    return listImage;
}


export async function AdminGet1Image(productId: string): Promise<ImageModel | null> {

    const link: string = `http://localhost:8080/api/admin/images/first-image-of-product?productId=${productId}`;

    const response = await requestAPI(link,true);

    const responseDATA = response;

    if(responseDATA === null)
        return null;
    

    return ({
        image_id: responseDATA.imageId,
        data: responseDATA.data,
        name: responseDATA.name,
        url: responseDATA.url,
    });
}

export const getAllImage = async (productId: string): Promise<ImageResponse[]> => {
    const response = await fetch(`http://localhost:8080/api/admin/images/get-by-product-id?productId=${productId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    const data = await response.json();
    return data;
};


