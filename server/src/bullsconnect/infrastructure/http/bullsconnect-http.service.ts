import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

@Injectable()
export class BullsConnectHttpService {
  private instance: AxiosInstance;
  private readonly logger = new Logger(BullsConnectHttpService.name);

  constructor(configService: ConfigService) {
    this.instance = axios.create({
      baseURL: 'https://bullsconnect.usf.edu/mobile_ws/v17',
      headers: {
        'CG.SessionID': configService.get('bullsconnect.sessionId'),
      },
      timeout: 10000, // 10 seconds
    });

    this.instance.interceptors.request.use((config) =>
      this.handleRequest(config),
    );
    this.instance.interceptors.response.use(
      (response) => this.handleFulfilledResponse(response),
      (error) => this.handleRejectedResponse(error),
    );
  }

  private handleRequest(config: InternalAxiosRequestConfig) {
    config.headers['start-time'] = new Date().getTime();

    let fullUrl = config.url;
    if (config.params) {
      fullUrl += '?' + new URLSearchParams(config.params).toString();
    }

    this.logger.log(`Requesting ${fullUrl}`);

    return config;
  }

  private calcResponseTime({ config }: any) {
    const { headers } = config;
    return new Date().getTime() - headers['start-time'];
  }

  private handleFulfilledResponse(response: any) {
    this.logger.log(
      `Response fullfilled: ${response.config.url} - ${this.calcResponseTime(response)}ms`,
    );

    return response;
  }

  private handleRejectedResponse(error: any) {
    this.logger.error(
      `Response rejected: ${error.config.url} - ${this.calcResponseTime(error)}ms}`,
    );

    return Promise.reject(error);
  }

  //* Async http requests methods
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config,
    );
    return response;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.put(
      url,
      data,
      config,
    );
    return response;
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.patch(
      url,
      data,
      config,
    );
    return response;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response;
  }
}
