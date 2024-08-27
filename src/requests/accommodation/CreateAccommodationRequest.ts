import { Location } from "../../model/location";

export interface Accommodation{
    id?: number;
    name: string;
    benefits: string[];
    images: File[];
    minNumberOfGuests: number;
    maxNumberOfGuests: number;
    automaticallyAcceptRequest: boolean;
    location: Location;
    dailyPrice?: number;
    priceType?: string;
    totalPrice?: number;
};