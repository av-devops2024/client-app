import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications } from '../../services/notificationService';
import { Notification } from '../../model/notification';
import { format } from 'date-fns';
import { swatches } from '../../theme';


function Navbar() {
    const my_pages = {'my-reservations': 'My Reservations', 'my-accommodations': 'My Accommodations', 'my-ratings': 'My Ratings'};
    const my_settings = ['Edit Profile', 'Logout'];
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

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

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

   useEffect(() => {
    if(user){
      loadNotifications();
    }
   }, [user])

    const loadNotifications = async () => {
      const response = await getNotifications();
      setNotifications(response as Notification[]);
    }

    const createMessage = (notification: Notification) => {
      switch(notification.notificationType) {
        case 'RESERVATION_REQUEST': {
          return `New reservation request for ${notification.accommodationName} from ${notification.guestName}.`;
        }
        case 'RESERVATION_CANCELLED':{
          return `Guest ${notification.guestName} cancelled reservation for ${notification.accommodationName}.`;
        }
        case 'RATING_HOST': {
          return `Guest ${notification.guestName} rated you.`;
        } 
        case 'RATING_ACCOMMODATION': {
          return `Guest ${notification.guestName} rated your accommodation ${notification.accommodationName}.`;
        }
        case 'RESERVATION_ANSWER': {
          return `You have answer on your reservation request for accommodation ${notification.accommodationName}.`;
        }
      }
    }


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
              onClick={() => navigate('/home')}
            >
              EReservation
            </Typography>
            {user &&
              <Box sx={{flexWrap:'wrap',flexGrow: 1, display:'flex' }}>
                {Object.entries(my_pages).map((page) => (
                  <Button
                    // key={my_pages}
                    onClick={() => navigate(page[0])}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page[1]}
                  </Button>
                ))}
              </Box>
          }
            {user && 
              <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.firstName} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                  <Menu
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
                      <MenuItem key={setting} onClick={() => handleClickSettingsMenuItem(setting)} sx={{width: '400px'}}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                  <IconButton style={{marginLeft: 5}} onClick={handleClick}>
                    <NotificationsIcon fontSize='large'/>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5, // 4.5 times the height of a single item
                        width: '500px',
                        overflowX: 'auto'
                      },
                    }}
                  >
                    {notifications.length === 0 ? (
                      <MenuItem disabled>
                        <Typography variant="body2">No new notifications</Typography>
                      </MenuItem>
                    ) : (
                      notifications.map((notification:Notification, index) => (
                        <MenuItem key={index} divider
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent', // Disable background color change on hover
                              cursor: 'default', // Set cursor to default
                            },
                          }}
                        >
                          <Box>
                            <Typography color={swatches.gray[100]}>
                              {format(notification.timestamp, 'dd.MM.yyyy. HH:mm')}
                            </Typography>
                            <Typography>{createMessage(notification)}</Typography>
                          </Box>
                        </MenuItem>
                      ))
                    )}
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