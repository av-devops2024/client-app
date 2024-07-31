import { Box, Typography, TextField, InputAdornment, IconButton, Button, Grid, Link } from "@mui/material"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signUp } from "../../services/authService";

const SignUp = (props: SignUpProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const request = {
            firstName: data.get('firstName')?.toString() || '',
            lastName: data.get('lastName')?.toString() || '',
            email: data.get('email')?.toString() || '',
            username: data.get('username')?.toString() || '',
            password: data.get('password')?.toString() || '',
            confirmPassword: data.get('confirmPassword')?.toString() || '',
            placeOfLiving: data.get('placeOfLiving')?.toString() || ''
        };
        try{
            signUp(request);
        } catch(error){
            console.error(error);
        }
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
        <Typography component="h1" variant="h5">
          REGISTER
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    style={{marginRight: 10}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoFocus
                />
            </Box>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    style={{marginRight: 10}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                />
            </Box>
            <Box display='flex' flexDirection='row'>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    style={{marginRight: 10}}
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
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
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
                name="placeOfLiving"
            />

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
        </Box>
      </Box>
    )
};
export default SignUp;

interface SignUpProps {
    setClickedRegister: (value: boolean) => void;
}