import { CategoriesModel } from "../../model/CategoriesModel";
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