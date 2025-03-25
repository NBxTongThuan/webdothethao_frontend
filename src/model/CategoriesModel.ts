export class CategoriesModel {

    categories_id: number;
    name: string;

    constructor(categories_id: number,
        name: string,) {
        this.categories_id = categories_id;
        this.name = name;
    }
}