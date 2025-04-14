import { ReviewsModel } from "../model/ReviewsModel";
import requestAPI from "./RequestApi";

export async function getListReview(productId: string): Promise<ReviewsModel[]> { 
    const link:string = `http://localhost:8080/api/reviews/getListReviews?productId=${productId}`;

    const response = await requestAPI(link);

    const responseDATA = response;

    const listReviews: ReviewsModel[] = [];

   for(const key in responseDATA){
        listReviews.push({
            reviewId: responseDATA[key].reviewId,
            rating: responseDATA[key].rating,
            comment: responseDATA[key].comment,
            createdDate: new Date(responseDATA[key].createdDate),
            userName: responseDATA[key].userName,
            color: responseDATA[key].color,
            size: responseDATA[key].size,
            edited: responseDATA[key].edited
        });
    }
    return listReviews;
    
}