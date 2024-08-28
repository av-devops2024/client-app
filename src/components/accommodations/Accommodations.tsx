import { Box } from "@mui/material";
import AccommodationRow from "./AccommodationRow";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import { SearchRequest } from "../../requests/accommodation/SearchRequest";

const Accomodations = ({accommodations, isSearch, searchRequest}: {accommodations: Accommodation[], isSearch: boolean, searchRequest?: SearchRequest}) => {
   
    return(
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' width='100%'>
            {
                accommodations.map(accommodation => (
                    <AccommodationRow accommodation={accommodation} isSearch={isSearch} searchRequest={searchRequest}/>
                ))
            }
        </Box>
    );
};
export default Accomodations;