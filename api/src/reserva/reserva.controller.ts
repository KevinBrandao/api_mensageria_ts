import { Controller, Get } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from '../models/reserva.model';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  async getAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }
}
