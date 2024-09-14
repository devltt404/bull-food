import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function handleValidationError(errors: ValidationError[]) {
  const formattedErrors = errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.property]: error.children?.length
        ? handleValidationError(error.children)
        : Object.values(error.constraints).join(', '),
    };
  }, {});

  return new BadRequestException({
    message: 'Validation failed',
    errors: formattedErrors,
  });
}

export default handleValidationError;
