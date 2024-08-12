
import './App.css';
import {ThemeProvider} from '@mui/material';
import {getTheme} from './theme';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import VerificationPage from './pages/auth/VerificationPage';
import { AuthProvider } from './contexts/AuthContext';


const App = () => {
  const theme = getTheme();
  console.log(theme.palette.secondary);
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar/>}>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/verification/:id' element={<VerificationPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
