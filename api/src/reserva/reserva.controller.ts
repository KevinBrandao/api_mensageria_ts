import { 
  Controller, 
  Get, 
  Param, 
  Query, 
  ParseUUIDPipe
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from 'src/models/reserva.model';

interface ReservaQueryParams {
  customerId?: number;
  hotelId?: number;
  roomId?: number;
  page?: number;
  limit?: number;
}

@Controller('reserves')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // GET /reservas - Listar todas as reservas com filtros opcionais
  @Get()
  async findAll(
    @Query('customerId') customerId?: string,
    @Query('hotelId') hotelId?: string,
    @Query('roomId') roomId?: string,
  ): Promise<Reserva[]> {
    const filters: ReservaQueryParams = {};

    if (customerId && !isNaN(Number(customerId))) {
      filters.customerId = Number(customerId);
    }
    
    if (hotelId && !isNaN(Number(hotelId))) {
      filters.hotelId = Number(hotelId);
    }
    
    if (roomId && !isNaN(Number(roomId))) {
      filters.roomId = Number(roomId);
    }

    return this.reservaService.findAll(filters);
  }

  // GET /reservas/:uuid - Buscar reserva específica por UUID
  @Get(':uuid')
  async findOne(
    @Param('uuid', ParseUUIDPipe) uuid: string
  ): Promise<Reserva | null> {
    return this.reservaService.findOne(uuid);
  }
}