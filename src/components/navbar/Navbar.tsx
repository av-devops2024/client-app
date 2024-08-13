import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import StoreIcon from '@mui/icons-material/Store';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';


function Navbar() {
    const my_pages = [ 'Search' , 'Reservations', 'Accommodations', 'Ratings'];
    const my_settings = ['Edit Profile', 'Logout'];
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenSettingsMenu = (event: any) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleClickSettingsMenuItem = (setting: string) => {
      setAnchorElUser(null);
      if(setting === 'Edit Profile'){
        navigate("/edit-profile");
      } else {
        logout();
        navigate("/auth");
      }
    };


    return (
      <>
      <AppBar position="static">
        <Toolbar>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                fontWeight: 200,
                fontFamily:'roboto',
                color:'white',
                letterSpacing: '.2rem',
                textDecoration: 'none',
              }}
            >
              EReservation
            </Typography>
            {user &&
              <Box sx={{flexWrap:'wrap',flexGrow: 1, display:'flex' }}>
                {my_pages.map((page) => (
                  <Button
                    // key={my_pages}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
          }
            {user && <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open my_settings">
                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '55px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {my_settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleClickSettingsMenuItem(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <Outlet/>
      </>
    );
}
export default Navbar;