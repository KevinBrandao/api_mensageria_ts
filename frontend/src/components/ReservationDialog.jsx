import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Divider,
  Chip,
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  Close,
  Person,
  Business,
  KingBed,
  Payment,
  Event,
  NightsStay,
  ConfirmationNumber,
  BookmarkBorder,
  CheckCircle,
  People,
  LocalAtmSharp,
  PriceCheck, // Novo ícone para a diária
} from '@mui/icons-material';

// Função CORRIGIDA para formatar o valor como BRL
const formatCurrency = (value) => {
  const numericValue = parseFloat(value); // Converte string para número
  if (isNaN(numericValue)) { // Verifica se a conversão falhou
    return 'R$ 0,00';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
};

const ReservationDialog = ({ reserva, open, onClose }) => {
  if (!reserva) {
    return null;
  }

  const { customer, hotel, rooms, createdAt, payment, uuid } = reserva;
  const totalReserva =
    rooms?.reduce((sum, quarto) => sum + (quarto.total || 0), 0) || 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '12px',
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(0,0,0,0.2)'
        }
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center' }}>
        <BookmarkBorder sx={{ mr: 1.5 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Detalhes da Reserva
        </Typography>
        <Chip
          label={uuid.substring(0, 8)}
          size="small"
          sx={{
            backgroundColor: '#ff9800',
            color: '#fff',
            fontWeight: 'bold',
          }}
        />
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Informações do Cliente e Hotel */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1.5, color: 'text.secondary' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Cliente</Typography>
                <Typography variant="body1" color="primary.main" fontWeight="500">
                  {customer ? customer.name : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1.5, color: 'text.secondary' }} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Hotel</Typography>
                <Typography variant="body1" color="primary.main" fontWeight="500">
                  {hotel ? hotel.name : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Detalhes dos Quartos */}
        <Typography variant="h6" gutterBottom>
          Quartos
        </Typography>
        {rooms.map((room) => (
          <Box key={room.id} sx={{ mb: 2, pl: 2, borderLeft: '3px solid #1976d2' }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
              <KingBed sx={{ fontSize: '1.2rem', mr: 1, color: 'text.secondary' }} />
              {room.category.name}
            </Typography>
            
            <Grid container spacing={1} sx={{ pl: 4, mt: 0.5 }}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Event sx={{ fontSize: '1rem', mr: 0.5 }} />
                  Check-in: {new Date(room.checkin_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Event sx={{ fontSize: '1rem', mr: 0.5 }} />
                  Check-out: {new Date(room.checkout_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                  <NightsStay sx={{ fontSize: '1rem', mr: 0.5 }} />
                  Noites: {room.number_of_days}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <People sx={{ fontSize: '1rem', mr: 0.5 }} />
                    Hóspedes: {room.guests}
                </Typography>
              </Grid>
            </Grid>

            {/* VALOR DA DIÁRIA ADICIONADO AQUI */}
            <Typography variant="body2" sx={{ pl: 4, display: 'flex', alignItems: 'center', mt: 1 }}>
              <PriceCheck sx={{ fontSize: '1.1rem', mr: 0.5, color: 'text.secondary' }} />
              Diária: {formatCurrency(room.daily_rate)}
            </Typography>
            
            {/* VALOR SUBTOTAL DO QUARTO */}
            <Typography variant="body1" sx={{ pl: 4, display: 'flex', alignItems: 'center', mt: 0.5, fontWeight: 'bold' }}>
              <LocalAtmSharp sx={{ fontSize: '1.1rem', mr: 0.5, color: 'text.secondary' }} />
              <Chip
                  label={`Subtotal: ${formatCurrency(room.total)}`}
                  size="small"
                  sx={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      fontWeight: 'medium',
                  }}
              />
            </Typography>

            {payment?.status === 'PAGO' && (
              <Typography variant="body2" sx={{ pl: 4, mt: 1, display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <CheckCircle sx={{ fontSize: '1rem', mr: 0.5 }} />
                Pagamento Confirmado
              </Typography>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Detalhes do Pagamento Geral */}
        <Typography variant="h6" gutterBottom>
          Pagamento
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Payment sx={{ color: 'text.secondary' }} />
          </Grid>
          <Grid item>
            <Chip label={payment ? payment.status : 'N/A'} size="small" color={payment?.status === 'PAGO' ? 'success' : 'warning'} />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              ({payment ? payment.method : 'N/A'})
            </Typography>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
          Total: {formatCurrency(totalReserva)}
        </Typography>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationDialog;