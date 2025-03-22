import ImageModel from "../model/ImageModel";
import requestAPI from "./RequestApi";

async function get1Image(imageId: string): Promise<ImageModel> {

    const link: string = `http://localhost:8080/api/images/getFirstImage?productId=${imageId}`;

    const response = await requestAPI(link);

    const responseDATA = response;

    return ({
        image_id: responseDATA.imageId,
        data: responseDATA.data,
        name: responseDATA.name,
        color: responseDATA.color,
        url: responseDATA.url,
    });
} export default get1Image;



