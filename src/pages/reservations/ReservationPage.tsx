import { Box, FormControlLabel, Switch, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from "@mui/lab";
import ReservationsTable from "../../components/reservations/ReservationsTable";
import { Reservation } from "../../reponses/Reservation";
import { getReservationRequests, getReservations } from "../../services/reservationService";
import CustomTabPanel from "../../components/CustomTabPanel";
  
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ReservationPage = () => {
    const [value, setValue] = useState(0);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [showForAccommodation, setShowForAccommodation] = useState(false);
    useEffect(() => {
        loadData();
    }, [value, showForAccommodation]);

    const loadData = async () => {
        try {
            const result = value === 0 ? await getReservationRequests(showForAccommodation) : await getReservations(showForAccommodation);
            setReservations(result);
        } catch (error){
            console.log(error);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <FormControlLabel
                style={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}
                control={
                    <Switch checked={showForAccommodation} onChange={() => setShowForAccommodation(!showForAccommodation)} name="gilad" />
                }
                label="Show reservations for your accommodations"
            />
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
            <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                <Tab label="RESERVATION REQUESTS" {...a11yProps(0)} />
                <Tab label="RESERVATIONS" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ReservationsTable reservations={reservations} isRequests={true} setReservations={setReservations} isHost={showForAccommodation}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <ReservationsTable reservations={reservations} isRequests={false} setReservations={setReservations} isHost={showForAccommodation}/>
            </CustomTabPanel>
      </Box>
    );
};
export default ReservationPage;