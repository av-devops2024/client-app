import { Box, Typography } from "@mui/material";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import GroupIcon from '@mui/icons-material/Group';
import { swatches } from "../../theme";

const AccommodationRow = ({accommodation}: {accommodation: Accommodation}) => {
    const data = (accommodation.images[0] as any).imageData;
    console.log(accommodation)
    const location = `${accommodation.location.street} ${accommodation.location.number}, ${accommodation.location.city}`;
    return (
        <Box 
            border="2px solid" 
            borderColor={swatches.primary}
            marginTop={3} 
            borderRadius={1} 
            padding={2} 
            width="600px"
        >
  {/* Top section with the title */}
    <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4" marginBottom={2}>
            {accommodation.name}
        </Typography>
        <Typography variant="h6" marginBottom={2}>
            {location}
        </Typography>
    </Box>

  {/* Main content with image on the left and details on the right */}
  <Box display="flex" flexDirection="row" justifyContent='space-between'>
    {/* Image on the left */}
    <Box marginRight={3}>
      <img 
        src={`data:image/jpeg;base64,${data}`} 
        alt="Accommodation" 
        style={{ width: '300px', height: 'auto' }} 
      />
    </Box>



      {/* Services section */}
      <Box marginBottom={2}>
        <Box display="flex" alignItems="center">
          <WifiIcon color="primary" />
          <Typography variant="body2">Wi-Fi</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <KitchenIcon color="primary" />
          <Typography variant="body2">Kitchen</Typography>
        </Box>
      </Box>

      {/* Guests section */}
      <Box display='flex' flexDirection='column'>
        <Box display="flex" alignItems="center">
          <GroupIcon color="primary" />
          <Typography variant="body2">
            Min Guests: {accommodation.minNumberOfGuests}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <GroupIcon color="primary" />
          <Typography variant="body2">
            Max Guests: {accommodation.maxNumberOfGuests}
          </Typography>
        </Box>
        </Box>
</Box>
</Box>
    )
};
export default AccommodationRow;