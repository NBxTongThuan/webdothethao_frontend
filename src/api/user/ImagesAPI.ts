import ImageModel from "../../model/ImageModel";
import requestAPI from "./RequestApi";

export async function getListImage(productId: string): Promise<ImageModel[]> {

    const link: string = `http://localhost:8080/api/images/get-all-by-product-id?productId=${productId}`;

    const response = await requestAPI(link);

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


export async function get1Image(productId: string): Promise<ImageModel | null> {

    const link: string = `http://localhost:8080/api/images/first-image-of-product?productId=${productId}`;

    const response = await requestAPI(link);

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




