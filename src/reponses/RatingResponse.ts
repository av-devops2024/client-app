export interface RatingResponse {
    id: number;
    accommodationText: string;
    accommodationValue: number;
    hostText: string;
    hostValue: number;
    date: Date;
    guestId: number;
    guestName: string;
}

export interface RatingSummaryResponse {
    meanRating: number;
    ratings: RatingResponse[];
}