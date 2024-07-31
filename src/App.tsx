
import './App.css';
import {ThemeProvider} from '@mui/material';
import {getTheme} from './theme';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';


const App = () => {
  const theme = getTheme();
  console.log(theme.palette.secondary);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Navbar/>}>
            <Route path='/login' element={<AuthPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
