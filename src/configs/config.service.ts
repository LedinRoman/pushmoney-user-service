import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IConfigService } from '../models/configs/config.models';

@Injectable()
export class ConfigService implements IConfigService {

  private readonly configService: NestConfigService;
  private readonly logger: Logger = new Logger(ConfigService.name);

  constructor(configService: NestConfigService) {
    this.configService = configService;
  }

  private getValue(name: string): string {
    const value = this.configService.get<string>(name);
    if (value === undefined || value.length === 0) {
      this.logger.warn(`${name} parameter does not specified in .env file`);
    }
    return value ?? '';
  }

  public getString(name: string): string {
    const value = this.getValue(name);
    return value;
  }

  public getNumber(name: string): number {
    const value = this.getValue(name);
    const number = parseFloat(value);

    if (Number.isNaN(number)) {
      this.logger.warn(
        `${name} parameter does not specified correct number format`,
      );
    }

    return number;
  }

  public getBoolean(name: string): boolean {
    const value = this.getValue(name);

    const truly = value === 'true';
    if (truly) {
      return truly;
    }

    const falsy = value === 'false';
    if (falsy) {
      return truly;
    }

    this.logger.warn(
      `${name} parameter does not specified correct boolean format`,
    );
    return !!value;
  }

  public getDate(name: string): Date {
    const value = this.getValue(name);
    const date = new Date(value);

    const isValid = !Number.isNaN(date.getTime());
    if (isValid) {
      this.logger.warn(
        `${name} parameter does not specified correct ISO date format`,
      );
    }

    return date;
  }

}
