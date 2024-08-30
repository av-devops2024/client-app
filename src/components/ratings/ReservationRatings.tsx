import { Box, Typography } from "@mui/material";
import { Reservation } from "../../reponses/Reservation";
import ReservationRatingRow from "./ReservationRatingRow";
import { Dispatch, SetStateAction } from "react";

const ReservationRatings = ({resRatings, isRated, setResRatings}: {resRatings: Reservation[], isRated: boolean, setResRatings: Dispatch<SetStateAction<Reservation[]|undefined>>}) => {
   
    return(
        <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center' width='100%'>
            {
                resRatings.length === 0 ? 
                <Typography>{isRated ? 'No rated reservations' : 'No unrated reservations'}</Typography>
                :
                resRatings.map(res => (
                    <ReservationRatingRow reservation={res} isRated={isRated} setReservations={setResRatings}/>
                ))
            }
        </Box>
    );
};
export default ReservationRatings;