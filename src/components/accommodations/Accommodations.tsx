import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import AccommodationRow from "./AccommodationRow";
import { getAccommodations } from "../../services/accommodationService";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";

const Accomodations = ({accommodations, isSearch}: {accommodations: Accommodation[], isSearch: boolean}) => {
   
    return(
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' width='100%'>
            {
                accommodations.map(accommodation => (
                    <AccommodationRow accommodation={accommodation} isSearch={isSearch}/>
                ))
            }
        </Box>
    );
};
export default Accomodations;