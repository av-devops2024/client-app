export interface ReservationRequest {
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    accommodationId: number;
}