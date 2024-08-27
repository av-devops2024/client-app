import { Box, Button } from '@mui/material';
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
        console.log('ee',allAccommodations);
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
            <Accommodations accommodations={accommodations} isSearch={false}/>
        </Box>
    );
};
export default AccommodationsPage;