import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly sequelize: Sequelize) { }

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      this.logger.log('Successfully connected to the database.');
    } catch (error) {
      this.logger.error('Failed to connect to the database:', error);
    }
  }
}
