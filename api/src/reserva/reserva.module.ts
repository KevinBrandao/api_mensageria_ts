import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reserva } from '../models/reserva.model';
import { Cliente } from '../models/clientes.model';
import { Hotel } from '../models/hotel.model';
import { QuartoReserva } from '../models/quartos-reserva.model';
import { Pagamento } from '../models/pagamento.model';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

@Module({
  imports: [SequelizeModule.forFeature([
    Reserva, Cliente, Hotel, QuartoReserva, Pagamento
  ])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
