import { CssBaseline, Grid, Paper } from "@mui/material";
import { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";
import travelImage from '../../assets/travel.png';


const AuthPage = () => {
  const [clickedRegister, setClickedRegister] = useState(false);
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          mb={5}
          sx={{
            position: 'relative',
            backgroundImage:
              `url(${travelImage})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black color with 50% opacity
                zIndex: 1,
              }}
            />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {clickedRegister ? <SignUp setClickedRegister={setClickedRegister}/> : <SignIn setClickedRegister={setClickedRegister}/>}
        </Grid>
      </Grid>
    );
};
export default AuthPage;