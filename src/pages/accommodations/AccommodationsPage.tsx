import { Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import Accommodations from '../../components/accommodations/Accommodations';

const AccommodationsPage = () => {
    const navigate = useNavigate();
    console.log('lal')

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
            <Accommodations/>
        </Box>
        // <Box display='flex' flexDirection='row' justifyContent='space-between' margin={5}>
            
        //         <Accommodations/>

        //     <Box>
        //         <Button
        //             variant='outlined'
        //             onClick={() => navigate('/create-accommodation')}
        //         >
        //             CREATE ACCOMMODATION
        //         </Button>
        //     </Box>
        // </Box>
    );
};
export default AccommodationsPage;