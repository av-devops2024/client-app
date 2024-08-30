import { Box, Button, Rating, Typography } from "@mui/material";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import GroupIcon from '@mui/icons-material/Group';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Dispatch, SetStateAction, useState } from "react";
import { Reservation } from "../../reponses/Reservation";
import { swatches } from "../../theme";
import { format } from "date-fns";
import AddRateDialog from "./AddRateDialog";
const Color = require('color');

const ReservationRatingRow = ({reservation, isRated, setReservations}: {reservation: Reservation, isRated: boolean, setReservations: Dispatch<SetStateAction<Reservation[]|undefined>>}) => {
    const data = reservation.accommodation.images.length > 0 ? (reservation.accommodation.images[0] as any).imageData : "";
    const location = `${reservation.accommodation.location.street} ${reservation.accommodation.location.number} ${reservation.accommodation.location.city}`;
    const [openRateDialog, setOpenRateDialog] = useState(false);

    const onClose = (updating: boolean) => {
        console.log(updating);
        if(!updating) {
            setReservations((prevReservations) => {
                let updatedReservations = prevReservations ? [...prevReservations] : [];
                const foundIndex = updatedReservations.findIndex(res => res.id === reservation.id);
                updatedReservations.splice(foundIndex);
                return updatedReservations;
            })
        };
        setOpenRateDialog(false);
    }
    
    return (
        <Box 
            border="2px solid" 
            borderColor={Color(swatches.primary).alpha(0.3).string()}
            marginTop={3} 
            borderRadius={1} 
            padding={2} 
            width="700px"
        >
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h4" marginBottom={2}>
                    {reservation.accommodation.name}
                </Typography>
                <Box display="flex" flexDirection='column'>
                    <Typography variant="h6" marginBottom={2}>
                        {location}
                    </Typography>
                    {`${format(reservation.startDate, 'dd.MM.yyyy.')}-${format(reservation.endDate, 'dd.MM.yyyy.')}`}
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent='space-between'>
                <Box marginRight={1}>
                    <img 
                        src={data === "" ? data : `data:image/jpeg;base64,${data}` } 
                        alt="Accommodation" 
                        style={{ width: '300px', height: '200px' }} 
                    />
                </Box>
                <Box display='flex' flexDirection='column'>
                    <Box marginTop={10}>
                        <Button variant="outlined" style={{width: '130px'}} onClick={() => setOpenRateDialog(true)}>
                            {isRated ? 'Edit rate' : 'Add rate'}
                        </Button>
                    </Box>
                </Box>
                {
                    openRateDialog && <AddRateDialog open={openRateDialog} onClose={onClose} accommodationName={reservation.accommodation.name} reservationId={reservation.id} rating={reservation.ratingResponse}/>
                }
            </Box>
        </Box>
    );
};
export default ReservationRatingRow;