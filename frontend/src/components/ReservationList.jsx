import React, { useState, useEffect, useMemo } from 'react';
import ReservationCard from './ReservationCard';
import {
  Grid,
  Container,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ReservationList = () => {
  const [reservas, setReservas] = useState([]); // Armazena a lista completa de reservas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Armazena o texto da busca

  useEffect(() => {
    // Busca os dados da API apenas uma vez, quando o componente é montado
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
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Filtra a lista de reservas com base no searchTerm
  const filteredReservas = useMemo(() => {
    if (!searchTerm) {
      return reservas; // Se não houver busca, retorna a lista completa
    }
    return reservas.filter((reserva) => {
      // Verifica se o nome do cliente existe e inclui o termo de busca (ignorando maiúsculas/minúsculas)
      const clientNameMatch =
        reserva.cliente?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ?? false;
      
      // Verifica se o UUID da reserva inclui o termo de busca
      const uuidMatch = reserva.uuid.toLowerCase().includes(searchTerm.toLowerCase());

      return clientNameMatch || uuidMatch;
    });
  }, [reservas, searchTerm]); // Recalcula o filtro apenas quando as reservas ou o termo de busca mudam

  return (
    <Container sx={{ py: 4 }}>
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

      {loading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      ) : error ? (
        <Alert severity="error">Erro ao carregar dados: {error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {filteredReservas.length > 0 ? (
            filteredReservas.map((reserva) => (
              <ReservationCard key={reserva.uuid} reserva={reserva} />
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">Nenhuma reserva encontrada.</Alert>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ReservationList;