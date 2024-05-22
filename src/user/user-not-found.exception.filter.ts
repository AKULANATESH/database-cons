import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'User not found',
    });
  }
}
export class DataExistsException extends HttpException {
  constructor(message: string = 'Data already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
