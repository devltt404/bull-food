import { ClassConstructor } from 'class-transformer';
declare function validateConfig<T extends object>(config: Record<string, unknown>, envVariablesValidator: ClassConstructor<T>): T;
export default validateConfig;
