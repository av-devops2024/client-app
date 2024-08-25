import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import AccommodationRow from "./AccommodationRow";
import { getAccommodations } from "../../services/accommodationService";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";

const Accomodations = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const getAllAccommodations = async () => {
        console.log('accc');
        const allAccommodations = await getAccommodations();
        console.log('ee',allAccommodations);
        setAccommodations(allAccommodations);
    }

    useEffect(() => {
        getAllAccommodations();
    }, []);
    return(
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' width='100%'>
            {
                accommodations.map(accommodation => (
                    <AccommodationRow accommodation={accommodation}/>
                ))
            }
        </Box>
    );
};
export default Accomodations;