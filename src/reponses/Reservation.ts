import { Accommodation } from "../requests/accommodation/CreateAccommodationRequest";

export interface Reservation {
    guestId: number;
    guestName: string;
    numberOfCanceledReservations: number;
    numberOfReservations: number;
    id: number;
    startDate: Date;
    endDate: Date;
    numberOfGuests: number;
    approved: boolean;
    canceled: boolean;
    accommodation: Accommodation;
    price: number;
}