// frontend/src/components/ReservationList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ReservationCard from './ReservationCard';
import {
  Grid,
  Container,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Pagination,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ReservationList = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3000/reserves');
        if (!response.ok) {
          throw new Error('Falha ao buscar os dados da API');
        }
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // Filtrar reservas baseado no termo de busca
  const filteredReservas = useMemo(() => {
    if (!searchTerm) {
      return reservas;
    }
    return reservas.filter((reserva) => {
      const clientNameMatch =
        reserva.customer?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ?? false;
      
      const uuidMatch = reserva.uuid.toLowerCase().includes(searchTerm.toLowerCase());

      return clientNameMatch || uuidMatch;
    });
  }, [reservas, searchTerm]);

  // Calcular dados da paginação
  const totalPages = Math.ceil(filteredReservas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservas = filteredReservas.slice(startIndex, endIndex);

  // Resetar página quando filtro mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handlers
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll para o topo da lista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      {/* Campo de busca */}
      <TextField
        fullWidth
        label="Buscar por Nome do Cliente ou Nº da Reserva"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Controles de paginação superiores */}
      {!loading && !error && filteredReservas.length > 0 && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredReservas.length)} de {filteredReservas.length} reservas
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Por página</InputLabel>
            <Select
              value={itemsPerPage}
              label="Por página"
              onChange={handleItemsPerPageChange}
            >
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={48}>48</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Conteúdo principal */}
      {loading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      ) : error ? (
        <Alert severity="error">Erro ao carregar dados: {error}</Alert>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentReservas.length > 0 ? (
              currentReservas.map((reserva) => (
                <ReservationCard key={reserva.uuid} reserva={reserva} />
              ))
            ) : (
              <Grid item xs={12}>
                <Alert severity="info">
                  {searchTerm 
                    ? 'Nenhuma reserva encontrada para o termo pesquisado.' 
                    : 'Nenhuma reserva encontrada.'
                  }
                </Alert>
              </Grid>
            )}
          </Grid>

          {/* Paginação inferior */}
          {filteredReservas.length > itemsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPagination-ul': {
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ReservationList;