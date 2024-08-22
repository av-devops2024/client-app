import { CssBaseline, Grid, Paper } from "@mui/material";
import { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";
import React from "react";

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
          sx={{
            backgroundImage:
              'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {clickedRegister ? <SignUp setClickedRegister={setClickedRegister}/> : <SignIn setClickedRegister={setClickedRegister}/>}
        </Grid>
      </Grid>
    );
};
export default AuthPage;