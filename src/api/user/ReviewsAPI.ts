import { ReviewsModel } from "../../model/ReviewsModel";
import { Review } from "../interface/Responses";
import requestAPI from "./RequestApi";

export async function getListReview(productId: string): Promise<ReviewsModel[]> { 
    const link:string = `http://localhost:8080/api/reviews/get-list-by-product-id?productId=${productId}`;

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


    export async function getAReview(orderItemId: string): Promise<Review | null> {
    const link:string = `http://localhost:8080/api/reviews/see-review?orderItemId=${orderItemId}`;

    const response = await requestAPI(link,true);

    if(!response){
        return null;
    }

    return ({
        reviewId: response.reviewId,
        rating: response.rating,
        comment: response.comment,
        createdDate: response.createdDate,
        edited: response.edited
    })
    return response;
}
