import React, { useState, useRef, SetStateAction, Dispatch } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Location } from '../../model/location';

const libraries = ['places'];

const mapContainerStyle = {
  width: '500px',
  height: '300px'
};


const googleMapsApiKey = 'AIzaSyDufN-mHd60fGbjME-hgXD5nV1-zvQ8GrU';

const Map = (props: MapProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    lat: 44.787197,
    lng: 20.457273
  });

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

        props.setLocation({
          street: street,
          number: number,
          city: city,
          postalCode: postalCode,
          country: country,
          longitude: lng,
          latitude: lat
        });

        setMapCenter({
          lng: lng,
          lat: lat
        })
    }
  };

  return (
    <Box marginLeft={10} marginTop={1.6}>
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={['places']}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
          
        >
          <TextField label="Choose a location" variant="outlined" fullWidth style={{marginBottom:10}} disabled={props.disabled} required/>
        </Autocomplete>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10}>
          {props.location && (
            <Marker
              position={{
                lat: props.location.latitude,
                lng: props.location.longitude
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};
export default Map;

interface MapProps {
  location: Location|undefined;
  setLocation: Dispatch<SetStateAction<Location|undefined>>;
  disabled: boolean;
}

interface MapCenter {
  lat: number;
  lng: number;
}
