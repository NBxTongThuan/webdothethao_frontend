class ImageModel {
    image_id: string;
    data?: string;
    name?: string;
    color?: string;
    url?: string;

    constructor(
        image_id: string,
        data?: string,
        name?: string,
        color?: string,
        url?: string

    ) {
        this.image_id=image_id;
        this.data=data;
        this.name=name;
        this.url=url;

    }


}
export default ImageModel;