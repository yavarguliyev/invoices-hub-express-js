import { winstonLogger } from 'helpers/utility-functions.helper';
import { LoggerTracerLevels } from 'value-objects/types/logger-tracers/logger-tracer.type';

export class LoggerTracerInfrastructure {
  static log (message: string, level: LoggerTracerLevels = 'info') {
    const msg = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

    if (level === 'error') {
      winstonLogger.error(msg);
    } else {
      winstonLogger.info(msg);
    }
  }
}
