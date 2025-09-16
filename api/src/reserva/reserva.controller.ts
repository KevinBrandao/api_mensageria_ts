import { Controller, Get, Query, ParseIntPipe, Optional } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from 'src/models/reserva.model';

@Controller('reserves')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Get()
  async getAll(
    @Query('uuid') uuid?: string,
    @Query('customer_id') customerId?: string,
    @Query('hotel_id') hotelId?: string,
    @Query('room_id') roomId?: string,
  ): Promise<Reserva[]> {
    // Converte para número ou undefined, se for string vazia ou inválida
    const customerIdNum = customerId ? Number(customerId) : undefined;
    const hotelIdNum = hotelId ? Number(hotelId) : undefined;
    const roomIdNum = roomId ? Number(roomId) : undefined;

    return this.reservaService.findAll({
      uuid,
      customerId: customerIdNum,
      hotelId: hotelIdNum,
      roomId: roomIdNum,
    });
  }
}
