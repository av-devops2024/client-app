import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Location } from "../../model/location";
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import { LocalizationProvider, DatePicker, DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { Dayjs } from "dayjs";
import { searchAccommodations } from "../../services/accommodationService";

const Search = (props: SearchProps) => {
    const googleMapsApiKey = 'AIzaSyDufN-mHd60fGbjME-hgXD5nV1-zvQ8GrU';
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const [location, setLocation] = useState<Location>();
    const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [disabledSearch, setDisabledSearch] = useState(true);

    const handlePlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            let street = '';
            let number = '';
            let city = '';
            let postalCode = '';
            let country = '';
            let lng = 0;
            let lat = 0;
            if (place.address_components) {
            place.address_components.forEach(component => {
                const types = component.types;
                if (types.includes('route')) {
                street = component.long_name;
                }
                if (types.includes('street_number')) {
                number = component.long_name;
                }
                if (types.includes('locality')) {
                city = component.long_name;
                }
                if (types.includes('postal_code')) {
                postalCode = component.long_name;
                }
                if (types.includes('country')) {
                country = component.long_name;
                }
            });
            }

            if (place.geometry?.location) {
            lng = place.geometry.location.lng();
            lat = place.geometry.location.lat();
            }

            setLocation({
                street: street,
                number: number,
                city: city,
                postalCode: postalCode,
                country: country,
                longitude: lng,
                latitude: lat
            });
            if(date !== null){
                setDisabledSearch(false);
            }
        }
    };

    const search = async () => {
        if(location && date[0] && date[1]){
            const request = {
                locationRequest: location,
                numberOfGuests: numberOfGuests,
                startDate: date[0].toDate(),
                endDate: date[1].toDate()
            };
            try {
                const response = await searchAccommodations(request);
                console.log(response);
                props.setResults(response);
            } catch(error){
                console.log(error);
            }
        }
    }

    return(
        <Box>
            <Box display='flex' flexDirection='row' justifyContent='center' marginTop={5}>
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceChanged={handlePlaceChanged}
                    >
                    <TextField 
                        label="Choose a location" 
                        variant="outlined" 
                        required
                        style={{marginRight: 30}}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PlaceIcon color="primary"/>
                            </InputAdornment>
                            )
                        }}
                    />
                    </Autocomplete>
                </LoadScript>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker 
                        localeText={{ start: 'Check-in', end: 'Check-out' }} 
                        value={date}
                        onChange={(value) => setDate(value)}
                    />
                </LocalizationProvider>
                <TextField
                    required
                    type="number"
                    label="Enter number of guests"
                    autoFocus
                    style={{marginRight: 30, marginLeft: 30}}
                    value={numberOfGuests}
                    onChange={(event) => 
                        {
                            setNumberOfGuests(+event.target.value);
                            if(date !== null && location) {
                                setDisabledSearch(false);
                            }

                        }
                    }
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PeopleIcon color="primary"/>
                        </InputAdornment>
                        )
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="center" marginTop={3}>
                <Button 
                    style={{ alignItems: 'center' }} 
                    variant="contained"
                    disabled={disabledSearch}
                    onClick={search}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
};
export default Search;

interface SearchProps{
    results: any[];
    setResults: Dispatch<SetStateAction<any>>;
}