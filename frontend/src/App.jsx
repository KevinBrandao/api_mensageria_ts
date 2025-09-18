import React from 'react';
import ReservationList from './components/ReservationList';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" sx={{ backgroundColor: '#1976d2 ', color: '#1a2027', width:'100%' }}>
        <Toolbar>
          <img src="/bukin.png" alt="Bukin Logo" style={{ height: '40px', marginRight: '16px' }} />
          <Typography paddingLeft="40px" variant="h6" color="#fff" noWrap sx={{ flexGrow: 1 }}>
               Dashboard de Reservas
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Aplicando a classe para espaçamento */}
      <main className="main-content">
        <ReservationList />
      </main>
    </>
  );
}

export default App;