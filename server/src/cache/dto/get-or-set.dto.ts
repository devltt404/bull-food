export interface GetOrSetDto {
  key: string;
  getter: () => Promise<any>;
  ttl?: number;
  jsonParse?: boolean;
}
