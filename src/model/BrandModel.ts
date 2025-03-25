class BrandModel{

    brandId?:number;
    brandName?:string;
    country?:string;

    constructor(
        brandId:number,
    brandName:string,
    country:string,
    )
    {
            this.brandId = brandId;
            this.brandName = brandName;
            this.country = country;
    }

}
export default BrandModel;