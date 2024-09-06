import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Accommodations from '../../components/accommodations/Accommodations';
import { getAccommodations } from '../../services/accommodationService';
import { Accommodation } from '../../requests/accommodation/CreateAccommodationRequest';

const AccommodationsPage = () => {
    const navigate = useNavigate();
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const getAllAccommodations = async () => {
        const allAccommodations = await getAccommodations();
        setAccommodations(allAccommodations);
    }

    useEffect(() => {
        getAllAccommodations();
    }, []);

    return (
        <Box>
            <Box display='flex' justifyContent='flex-end' margin={3}>
                <Button
                    variant='outlined'
                    onClick={() => navigate('/create-accommodation')}
                >
                    CREATE ACCOMMODATION
                </Button>
            </Box>
            {accommodations.length === 0 && <Typography variant='h4' style={{textAlign: 'center', marginTop: 20}}>You don't have accommodations.</Typography>}
            <Accommodations accommodations={accommodations} isSearch={false}/>
        </Box>
    );
};
export default AccommodationsPage;