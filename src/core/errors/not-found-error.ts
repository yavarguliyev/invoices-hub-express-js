import { CustomError } from 'core/errors/custom-error';
import { NotFoundDetails } from 'domain/interfaces/error-request-details.interface';

class NotFoundError extends CustomError<NotFoundDetails> {
  statusCode = 404;
  reason = 'Resource not found';

  constructor (message: string, details?: NotFoundDetails) {
    super(message, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors () {
    return [{ message: this.message, reason: this.reason, details: this.details }];
  }
}

export { NotFoundError };
