import { registerDecorator, ValidationOptions } from 'class-validator';
import { EventCampus } from '../constants/event.constant';

export function IsEventCampus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEventCampus',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `Campus must be one of ${Object.values(EventCampus).join(', ')}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return Object.values(EventCampus).includes(value);
        },
      },
    });
  };
}
