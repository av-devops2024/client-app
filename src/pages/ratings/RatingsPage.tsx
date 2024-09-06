import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../components/CustomTabPanel";
import { useEffect, useState } from "react";
import { getResRatings } from "../../services/ratingService";
import { Reservation } from "../../reponses/Reservation";
import ReservationRatings from "../../components/ratings/ReservationRatings";
import { toast, ToastContainer } from "react-toastify";

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const RatingsPage = () => {
    const [value, setValue] = useState(0);
    const [ratingsRes, setRatingsRes] = useState<Reservation[]>([]);
    

    const loadResRatings = async () => {
        try{
            const response = await getResRatings(value === 0 ? 'unratedReservations' : 'ratedReservations');
            if(response) {
                setRatingsRes(response);
            }
        } catch(error) {
            toast.error(error as string);
        }
    }

    useEffect(() => {
        loadResRatings();
    }, [value]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
            <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs example">
                <Tab label="UNRATED RESERVATIONS" {...a11yProps(0)} />
                <Tab label="RATED RESERVATIONS" {...a11yProps(1)} />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ReservationRatings resRatings={ratingsRes ?? []} isRated={false} setResRatings={setRatingsRes}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <ReservationRatings resRatings={ratingsRes ?? []} isRated={true} setResRatings={setRatingsRes}/>
            </CustomTabPanel>
            <ToastContainer/>
      </Box>
    );
};
export default RatingsPage;