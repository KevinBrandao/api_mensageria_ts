import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSequelizeConfig } from './config/database.config';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSequelizeConfig,
      inject: [ConfigService],
    }),
    ReservaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
