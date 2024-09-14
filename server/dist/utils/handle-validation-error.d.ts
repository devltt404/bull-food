import { ValidationError } from 'class-validator';
declare function handleValidationError(errors: ValidationError[]): any;
export default handleValidationError;
