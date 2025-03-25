export class ReviewsModel {
    reviewId: string;
    rating: number;
    comment: string;
    createdDate: Date;
    constructor(reviewId: string,
        rating: number, comment: string, createdDate: Date) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.comment = comment;
        this.createdDate = createdDate;
    }

}