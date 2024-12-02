import { registerDecorator, ValidationOptions } from 'class-validator';

export function isDDMMMYYYY(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDDMMMYYYY',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be in the format of DD MMM YYYY`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return /^([0-2][0-9]|(3)[0-1])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/.test(
            value,
          );
        },
      },
    });
  };
}
