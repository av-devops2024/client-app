import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Map from '../../components/map/Map';
import PhotosUpload from '../../components/accommodations/PhotosUpload';
import { createAccommodation } from '../../services/accommodationService';
import { Location } from '../../model/location';
import { getBenefits } from '../../services/benefitsService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      },
    },
  };

const CreateAccommodationPage = () => {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [checkedAutomaticallyAcceptance, setCheckedAutomaticallyAcceptance] = useState(false);
    const [location, setLocation] = useState<Location>();
    const [message, setMessage] = useState("");
    const [disabledForm, setDisabledForm] = useState(false);
    const [services, setServices] = useState([]);
    
    const getAllServices = async () => {
        const benefits = await getBenefits();
        setServices(benefits);
    }

    useEffect(() => {
        getAllServices();
    }, []);
    const onSubmit = async (data: any) => {
        // setClickedRegister(true);
        // const responseMessage = await signUp(data as RegistrationRequest);
        // if(responseMessage === ""){
        //     setMessage("Your account is registered successfully.Please go to your email to verify account!");
        // } else {
        //     setMessage(responseMessage);
        //     setClickedRegister(false);
        // }
        const request = {
            name: data.name,
            benefits: services,
            minNumberOfGuests: data.minNumberOfGuests,
            maxNumberOfGuests: data.maxNumberOfGuests,
            automaticallyAcceptRequest: checkedAutomaticallyAcceptance
        };
        const formData = new FormData();
        console.log(data.name);
        formData.append('name', data.name.toString());
        formData.append('minNumberOfGuests', data.minNumberOfGuests.toString());
        formData.append('maxNumberOfGuests', data.maxNumberOfGuests.toString());
        formData.append('automaticallyAcceptRequest', checkedAutomaticallyAcceptance.toString());
        console.log(selectedServices);
        formData.append('location', JSON.stringify(location));
        selectedServices.forEach(service => formData.append("services", service))
        files.forEach(file => formData.append('images', file));

        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(key, value);
        });
        setDisabledForm(true);
        const responseMessage = await createAccommodation(formData);
        if(responseMessage === "") {
            setMessage("Accommodation has been successfully added.");
        } else {
            setMessage(responseMessage);
            setDisabledForm(false);
        }
    };


    const handleServicesChange = (event: SelectChangeEvent<typeof selectedServices>) => {
        const {
          target: { value },
        } = event;
        setSelectedServices(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {message && <Alert color={message === "An error occured" ? 'error' : 'success'}>{message}</Alert>}
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 1 }}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            style={{marginRight: 10}}
                            {...register('name', {
                                required: 'Name is required'
                            })}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message?.toString() : ''}
                            disabled={disabledForm}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="minNumberOfGuests"
                            label="Min number of guests"
                            type="number"
                            style={{marginRight: 10}}
                            {...register('minNumberOfGuests', {
                                required: 'Min number of guests is required'
                            })}
                            error={!!errors.minNumberOfGuests}
                            helperText={errors.minNumberOfGuests ? errors.minNumberOfGuests.message?.toString() : ''}
                            disabled={disabledForm}
                        />
                         <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="maxNumberOfGuests"
                            label="Max number of guests"
                            type="number"
                            style={{marginRight: 10}}
                            {...register('maxNumberOfGuests', {
                                required: 'Max number of guests is required'
                            })}
                            error={!!errors.maxNumberOfGuests}
                            helperText={errors.maxNumberOfGuests ? errors.maxNumberOfGuests.message?.toString() : ''}
                            disabled={disabledForm}
                        />

                        <FormControl fullWidth margin='normal' style={{width: 800}} disabled={disabledForm}>
                            <InputLabel id="demo-multiple-name-label">Services</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectedServices}
                                onChange={handleServicesChange}
                                input={<OutlinedInput label="Services" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                sx={{ width: '100%' }}
                                // fullWidth
                            >
                                {services.map((service) => (
                                    <MenuItem
                                        key={service}
                                        value={service}
                                    >
                                        <Checkbox checked={selectedServices && selectedServices.indexOf(service) > -1} />
                                        <ListItemText primary={service} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    <PhotosUpload setFiles={setFiles} disabled={disabledForm}/>
                    </Box>
                    <Box>
                        <Map location={location} setLocation={setLocation} disabled={disabledForm}/>
                        <FormControlLabel
                            style={{marginLeft: 70, marginTop: 10}}
                            control={
                                <Switch checked={checkedAutomaticallyAcceptance} onChange={() => setCheckedAutomaticallyAcceptance(!checkedAutomaticallyAcceptance)} name="gilad" />
                            }
                            label="Automatically accept reservation"
                            disabled={disabledForm}
                        />
                        <Box display='flex' justifyContent='flex-end' marginTop={2}>
                            <Button type="submit" variant="outlined" disabled={disabledForm}>
                                Save accommodation
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};
export default CreateAccommodationPage;