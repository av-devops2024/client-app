import { Box, Typography, TextField, InputAdornment, IconButton, Button, Grid, Link, Alert } from "@mui/material"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signUp } from "../../services/authService";
import {useForm } from "react-hook-form";
import { RegistrationRequest } from "../../requests/auth/RegistrationRequest";

const SignUp = (props: SignUpProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [clickedRegister, setClickedRegister] = useState(false);
    const [message, setMessage] = useState("");
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    // const {navigate} = useNavigate();
    const onSubmit = async (data: any) => {
        setClickedRegister(true);
        const responseMessage = await signUp(data as RegistrationRequest);
        if(responseMessage === ""){
            setMessage("Your account is registered successfully.Please go to your email to verify account!");
        } else {
            setMessage(responseMessage);
            setClickedRegister(false);
        }

    };

    const validateConfirmPassword = (value: string) => {
        const { password } = getValues();
        return value === password || 'Passwords do not match';
    };

    return(
        <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {message !== "" && <Alert color={message === "Your account is registered successfully.Please go to your email to verify account!" ? 'success' : 'error'}>
            {message}
        </Alert>
        }
        <Typography component="h1" variant="h5">
          SIGN UP
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
                    disabled={clickedRegister}
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
                    disabled={clickedRegister}
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
                    disabled={clickedRegister}
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
                    disabled={clickedRegister}
                    {...register('username', {
                        required: 'Username is required',
                      })}
                      error={!!errors.username}
                      helperText={errors.username ? errors.username.message?.toString() : ''}
                />
            </Box>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    style={{marginRight: 10}}
                    disabled={clickedRegister}
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value:   /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{12,})/,
                          message: 'Password must contain at least 12 characters, one uppercase letter, one special character, and one number',
                        },
                      })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message?.toString() : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    color="primary"
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    disabled={clickedRegister}
                    {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        pattern: {
                          value:   /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{12,})/,
                          message: 'Password must contain at least 12 characters, one uppercase letter, one special character, and one number',
                        },
                        validate: validateConfirmPassword
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword ? errors.confirmPassword.message?.toString() : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                    color="primary"
                                >
                                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TextField
                margin="normal"
                required
                fullWidth
                id="placeOfLiving"
                label="Place Of Living"
                disabled={clickedRegister}
                {...register('placeOfLiving', {
                    required: 'Place of living is required',
                })}
                error={!!errors.placeOfLiving}
                helperText={errors.placeOfLiving ? errors.placeOfLiving.message?.toString() : ''}
            />

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={clickedRegister}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => props.setClickedRegister(false)}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    )
};
export default SignUp;

interface SignUpProps {
    setClickedRegister: (value: boolean) => void;
}