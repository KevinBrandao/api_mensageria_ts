import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


 @Get('health')
  @ApiOperation({ summary: 'Verifica se a API está online' })
  @ApiResponse({
    status: 200,
    description: 'API está rodando com sucesso',
    schema: {
      example: {
        message: 'A API está no ar!',
      },
    },
  })
  getHealth() {
    return {
      message: 'A API está no ar!',
    };
  }
}
