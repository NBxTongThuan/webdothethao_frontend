import { CategoriesModel } from "../../model/CategoriesModel";
import { CategoryResponse } from "../interface/Responses";
import requestAPI from "./RequestApi";

export async function getListCate(): Promise<CategoriesModel[]> {

    const link: string = `http://localhost:8080/api/categories`;

    const response = await requestAPI(link);

    const responseDATA = response;

    const listCate: CategoriesModel[] = [];

    for(const key in responseDATA)
    {
        listCate.push({
                categories_id: responseDATA[key].categoriesId,
                name: responseDATA[key].categoriesName
            });
    }

    return listCate;
}

export async function getTopCategory(page: number, size: number): Promise<CategoryResponse[]> {

    const link: string = `http://localhost:8080/api/categories/top-4?page=${page}&size=${size}`;
    const response = await requestAPI(link);
    const responseDATA = response;

    const listData = responseDATA._embedded.categoryResponseList;

    if(listData.length == 0 || listData == null)
    {
        return [];
    }

    const listCate: CategoryResponse[] = [];
    for(const key in listData)
    {
        listCate.push({
            categoriesId: listData[key].categoriesId,
            categoriesName: listData[key].categoriesName,
            imageData: listData[key].imageData,
            enable: listData[key].enable,
            size: listData[key].size
        });
    }
    return listCate;
}
