import React, { useEffect, useState } from "react"
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import {updateUser} from '../../services/userService';
import { UpdateUserRequest } from "../../requests/user/UpdateUserRequest";
import ChangePasswordDialog from '../../components/users/ChangePasswordDialog';

const EditProfilePage = () => {
    const [message, setMessage] = useState("");
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
    const {user} = useAuth();
    const { register, handleSubmit, getValues, formState: { errors, dirtyFields }, setValue, reset } = useForm();
    const onSubmit = async (data: any) => {
        const responseMessage = await updateUser(
            {...data, id: user?.id} as UpdateUserRequest);
        if(responseMessage === ""){
            setMessage("Your profile is updated successfully.");
            reset(data);
        } else {
            setMessage(responseMessage);
        }
    };

    useEffect(() => {
        setValue('firstName', user?.firstName);
        setValue('lastName', user?.lastName);
        setValue('email', user?.email);
        setValue('username', user?.username);
        setValue('placeOfLiving', user?.placeOfLiving);
    }, [user])

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
        {message !== "" && <Alert color={message === "Your profile is updated successfully." ? 'success' : 'error'}>
            {message}
        </Alert>
        }
        <Typography component="h1" variant="h5" marginTop={2}>
          EDIT PROFILE
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 1 }}>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    style={{marginRight: 10}}
                    {...register('firstName', {
                        required: 'First name is required',
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: 'First name must contain only letters',
                        },
                      })}
                      error={!!errors.firstName}
                      helperText={errors.firstName ? errors.firstName.message?.toString() : ''}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoFocus
                    {...register('lastName', {
                        required: 'Last name is required',
                        pattern: {
                          value: /^[A-Za-z]+$/,
                          message: 'Last name must contain only letters',
                        },
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message?.toString() : ''}
                />
            </Box>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    style={{marginRight: 10}}
                    
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message?.toString() : ''}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    {...register('username', {
                        required: 'Username is required',
                      })}
                      error={!!errors.username}
                      helperText={errors.username ? errors.username.message?.toString() : ''}
                />
            </Box>
            

            <TextField
                margin="normal"
                required
                fullWidth
                id="placeOfLiving"
                label="Place Of Living"
                {...register('placeOfLiving', {
                    required: 'Place of living is required',
                })}
                error={!!errors.placeOfLiving}
                helperText={errors.placeOfLiving ? errors.placeOfLiving.message?.toString() : ''}
            />

            <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                onClick={() => setOpenChangePasswordDialog(true)}
            >
                Change password
            </Button>

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Object.keys(dirtyFields).length === 0}
          >
            Confirm changes
          </Button>
        </form>

        {
            openChangePasswordDialog && 
            <ChangePasswordDialog 
                open={openChangePasswordDialog} 
                setOpen={setOpenChangePasswordDialog}
            />
        }
      </Box>
    );
};
export default EditProfilePage;