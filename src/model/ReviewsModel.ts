export class ReviewsModel {
    reviewId: string;
    rating: number;
    comment: string;
    createdDate: Date;
    userName:string;
    color:string;
    size:string;
    edited:boolean;

    constructor(reviewId: string,
        rating: number, comment: string, createdDate: Date, userName:string, color:string, size:string, edited:boolean) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.comment = comment;
        this.createdDate = createdDate;
        this.userName = userName;
        this.color = color;
        this.size = size;
        this.edited = edited;
    }

}