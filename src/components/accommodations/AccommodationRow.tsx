import { Box, Button, Typography } from "@mui/material";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import GroupIcon from '@mui/icons-material/Group';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { swatches } from "../../theme";
import AddPriceDialog from "./AddPriceDialog";
import { useState } from "react";
import AvailabilityDialog from "./AvailabilityDialog";
import ConfirmReservationDialog from "../reservations/ConfirmReservationDialog";
import { SearchRequest } from "../../requests/accommodation/SearchRequest";
const Color = require('color');

const AccommodationRow = ({accommodation, isSearch, searchRequest}: {accommodation: Accommodation, isSearch: boolean, searchRequest?: SearchRequest}) => {
    const data = (accommodation.images[0] as any).imageData;
    const location = `${accommodation.location.street} ${accommodation.location.number}, ${accommodation.location.city}`;
    const [openPriceDialog, setOpenPriceDialog] = useState(false);
    const [openAvailabilityDialog, setOpenAvailabilityDialog] = useState(false);
    const [openReservationDialog, setOpenReservationDialog] = useState(false);
    const getServices = () => {
        return accommodation.benefits.map(service => {
            if(service === 'WIFI') {
                return (
                    <Box display="flex" alignItems="center" flexDirection="row" marginBottom={1}>
                        <WifiIcon color='primary'/>
                        <Typography variant="body2" marginLeft={1}>Wi-Fi</Typography>
                    </Box>
                )
            }
            if(service === 'KITCHEN') {
                return (
                    <Box display="flex" alignItems="center" flexDirection="row" marginBottom={1}>
                        <KitchenIcon color="primary" />
                        <Typography variant="body2" marginLeft={1}>Kitchen</Typography>
                    </Box>
                )
            }
            if(service === 'AIRCONDITIONER') {
                return (
                    <Box display="flex" alignItems="center" flexDirection="row" marginBottom={1}>
                        <AcUnitIcon color="primary" />
                        <Typography variant="body2" marginLeft={1}>Air Conditioner</Typography>
                    </Box>
                )
            }
            if(service === 'FREEPARKING') {
                return (
                    <Box display="flex" alignItems="center" flexDirection="row" marginBottom={1}>
                        <LocalParkingIcon color="primary"/>
                        <Typography variant="body2" marginLeft={1}>Air Conditioner</Typography>
                    </Box>
                )
            }
        })
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
                    {accommodation.name}
                </Typography>
                <Typography variant="h6" marginBottom={2}>
                    {location}
                </Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent='space-between'>
                <Box marginRight={3}>
                    <img 
                        src={`data:image/jpeg;base64,${data}`} 
                        alt="Accommodation" 
                        style={{ width: '300px', height: '200px' }} 
                    />
                </Box>
                <Box display="flex" flexDirection='column'>
                    {getServices()}
                </Box>
                <Box display='flex' flexDirection='column'>
                    <Box display="flex" alignItems="center">
                        <GroupIcon color="primary" />
                        <Typography variant="body2" marginLeft={1}>
                            Min Guests: {accommodation.minNumberOfGuests}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <GroupIcon color="primary" />
                        <Typography variant="body2" marginLeft={1}>
                            Max Guests: {accommodation.maxNumberOfGuests}
                        </Typography>
                    </Box>

                    <Box marginTop={isSearch ? 5 : 10}>
                        {isSearch ? 
                            <Typography variant="body2" style={{color: swatches.primary, fontWeight: 'bold'}}>{accommodation.dailyPrice} € / {accommodation.priceType?.replace("_", " ")}</Typography>
                            :
                            <Button variant="outlined" style={{width: '130px'}} onClick={() => setOpenPriceDialog(true)}>
                                Prices
                            </Button>
                        }
                    </Box>
                    <Box marginTop={1}>
                        {isSearch ? 
                            <Typography variant="body1" style={{color: swatches.primary, fontWeight: 'bold'}}>TOTAL: {accommodation.totalPrice} €</Typography>
                        :
                            <Button variant="outlined" style={{width: '130px'}} onClick={() => setOpenAvailabilityDialog(true)}>
                                Availability
                            </Button>
                        }
                    </Box>

                    <Box marginTop={1}>
                        {isSearch &&
                            <Button variant="outlined" style={{width: '130px'}} onClick={() => setOpenReservationDialog(true)}>
                                Reserve
                            </Button>
                        }
                    </Box>


                </Box>
            </Box>
        
            {openReservationDialog && searchRequest && <ConfirmReservationDialog open={openReservationDialog} setOpen={setOpenReservationDialog} accommodation={accommodation} searchRequest={searchRequest}/>}
            {openPriceDialog && <AddPriceDialog open={openPriceDialog} setOpen={setOpenPriceDialog} accommodationName={accommodation.name} accommodationId={accommodation.id}/>}
            {openAvailabilityDialog && <AvailabilityDialog open={openAvailabilityDialog} setOpen={setOpenAvailabilityDialog} accommodationName={accommodation.name} accommodationId={accommodation.id}/>}
        </Box>
    );
};
export default AccommodationRow;