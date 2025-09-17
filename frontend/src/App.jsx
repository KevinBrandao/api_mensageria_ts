import React from 'react';
import ReservationList from './components/ReservationList';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box, // Box é usado para layout
} from '@mui/material';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" sx={{ backgroundColor: '#fff', color: '#1a2027' }}>
        <Toolbar>
          <img src="/bukin.png" alt="Bukin Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Dashboard de Reservas
          </Typography>
        </Toolbar>
      </AppBar>
      <main className="main-content">
        <ReservationList />
      </main>
    </>
  );
}

export default App;