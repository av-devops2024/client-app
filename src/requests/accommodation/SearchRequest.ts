import { Location } from "../../model/location";

export interface SearchRequest {
    locationRequest: Location;
    numberOfGuests: number;
    startDate: Date;
    endDate: Date;
};