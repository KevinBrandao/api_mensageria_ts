import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from '@mui/material';
import {
  Person,
  Business,
  KingBed,
} from '@mui/icons-material';

const ReservationCard = ({ reserva }) => {
  const { cliente, hotel, quartos_reservados, createdAt } = reserva;

  const totalReserva =
    quartos_reservados?.reduce((sum, quarto) => sum + (quarto.total || 0), 0) || 0;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{
        height: '100%',
        borderRadius: '12px', // Bordas mais arredondadas
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Sombra sutil
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Efeito suave
        '&:hover': {
          transform: 'translateY(-5px)', // Efeito de levantar ao passar o mouse
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)', // Sombra mais pronunciada no hover
        },
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h3">
              Reserva
            </Typography>
            <Chip label={reserva.uuid.substring(0, 8)} color="primary" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Data: {new Date(createdAt).toLocaleDateString()}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <List dense>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary="Cliente"
                secondary={cliente ? cliente.name : 'N/A'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Business />
              </ListItemIcon>
              <ListItemText
                primary="Hotel"
                secondary={hotel ? hotel.name : 'N/A'}
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2, fontSize: '0.8rem' }}>QUARTOS</Divider>

          {quartos_reservados?.map((quarto) => (
            <Box key={quarto.id} sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                <KingBed sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
                {quarto.category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ pl: '26px' }}>
                Diária: R$ {quarto.daily_rate} | Total: R$ {quarto.total.toFixed(2)}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          
           <Typography variant="h6" align="right" fontWeight="bold">
            Total: R$ {totalReserva.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReservationCard;