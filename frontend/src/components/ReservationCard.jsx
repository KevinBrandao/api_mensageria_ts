import React, { useState } from 'react'; // Importe o useState
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
  Button, // Importe o componente Button
  Collapse, // Importe o Collapse para uma animação suave
} from '@mui/material';
import {
  Person,
  Business,
  KingBed,
  BookmarkBorder,
} from '@mui/icons-material';

const ReservationCard = ({ reserva }) => {
  const { customer, hotel, rooms, createdAt } = reserva;
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a expansão

  const totalReserva =
    rooms?.reduce((sum, quarto) => sum + (quarto.total || 0), 0) || 0;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const quartosVisiveis = isExpanded ? rooms : rooms.slice(0, 3);

  return (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <Card sx={{
        height: '100%',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        },
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* CABEÇALHO DO CARD */}
        <Box sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BookmarkBorder sx={{ mr: 1.5 }} />
            <Typography variant="h6" component="h3" sx={{ fontSize: '1.1rem' }}>
              Reserva
            </Typography>
          </Box>
          <Chip
            label={reserva.uuid.substring(0, 8)}
            size="small"
            sx={{
              backgroundColor: '#ff9800',
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        </Box>

        {/* CONTEÚDO DO CARD */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Data: {new Date(createdAt).toLocaleDateString()}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <List dense>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Person />
              </ListItemIcon>
              <ListItemText
                primary="Cliente"
                secondaryTypographyProps={{ component: 'span', color: 'primary.main', fontWeight: '500' }}
                secondary={customer ? customer.name : 'N/A'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Business />
              </ListItemIcon>
              <ListItemText
                primary="Hotel"
                secondaryTypographyProps={{ component: 'span', color: 'primary.main', fontWeight: '500' }}
                secondary={hotel ? hotel.name : 'N/A'}
              />
            </ListItem>
          </List>

          <Box sx={{ flexGrow: 1 }}>
            <Divider sx={{ my: 1, fontSize: '0.8rem' }}>QUARTOS</Divider>
            {/* Animação de expandir/recolher */}
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              {rooms.slice(3).map((quarto) => (
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
            </Collapse>
            {/* Lista dos 3 primeiros quartos sempre visível */}
            {rooms.slice(0, 3).map((quarto) => (
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

            {/* Botão para expandir/recolher */}
            {rooms.length > 3 && (
              <Button onClick={handleToggleExpand} size="small" sx={{ mt: 1 }}>
                {isExpanded ? 'Ver menos' : `Ver mais ${rooms.length - 3} quarto(s)`}
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" align="right" fontWeight="bold" sx={{ color: 'primary.main' }}>
            Total: R$ {totalReserva.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ReservationCard;