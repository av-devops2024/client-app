
import './App.css';
import {ThemeProvider} from '@mui/material';
import {getTheme} from './theme';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import VerificationPage from './pages/auth/VerificationPage';
import HomePage from './pages/home/HomePage';
import EditProfilePage from './pages/profile/EditProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import AccommodationsPage from './pages/accommodations/AccommodationsPage';
import CreateAccommodationPage from './pages/accommodations/CreateAccommodationPage';


const App = () => {
  const theme = getTheme();
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar/>}>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/verification/:id' element={<VerificationPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/edit-profile' element={<EditProfilePage/>}/>
            <Route path='/my-accommodations' element={<AccommodationsPage/>}/>
            <Route path='/create-accommodation' element={<CreateAccommodationPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
