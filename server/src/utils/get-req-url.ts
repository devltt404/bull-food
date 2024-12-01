import { AxiosRequestConfig } from 'axios';

export function getReqUrl(config: AxiosRequestConfig): string {
  return `${config.baseURL}${config.url}${config.params ? `?${new URLSearchParams(config.params).toString()}` : ''}`;
}
