import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Version,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiHealthResponse } from '../../swagger/health/health-response';

@ApiSecurity('oneid')
@ApiTags('Health')
@Controller({
  path: 'health',
})
export class HealthController {

  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(HealthController.name);
  }

  @ApiHealthResponse()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Get('service')
  public check(): void {
    this.logger.log('Service health checked');
  }

}
