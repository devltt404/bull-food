import { TransformFnParams } from 'class-transformer/types/interfaces';

export const lowerAndTrimTransformer = (params: TransformFnParams): string =>
  params.value?.toLowerCase().trim();
