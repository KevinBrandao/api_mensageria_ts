import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reserva } from '../models/reserva.model';
import { Cliente } from '../models/clientes.model';
import { Hotel } from '../models/hotel.model';
import { QuartoReserva } from '../models/quartos-reserva.model';
import { Pagamento } from '../models/pagamento.model';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel(Reserva) private reservaModel: typeof Reserva
  ) {}

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.findAll({
      include: [
        { model: Cliente },
        { model: Hotel },
        { model: QuartoReserva },
        { model: Pagamento }
      ]
    });
  }
}
