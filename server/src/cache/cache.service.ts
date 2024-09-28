import { Inject, Injectable, Logger } from '@nestjs/common';
import { Keyv } from 'keyv';
import { GetOrSetDto } from './dto/get-or-set.dto';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject('KEYV_INSTANCE') private readonly keyv: Keyv) {}

  async get(key: string): Promise<string | undefined> {
    return await this.keyv.get(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.keyv.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.keyv.delete(key);
  }

  async clear(): Promise<void> {
    await this.keyv.clear();
  }

  async getOrSet({ key, ttl, jsonParse, getter }: GetOrSetDto) {
    let cacheData = await this.get(key);

    if (cacheData) {
      try {
        return jsonParse ? JSON.parse(cacheData) : cacheData;
      } catch (error) {
        this.logger.error('Error parsing cache data:', error);
      }
    }

    const newData = await getter();
    await this.set(key, jsonParse ? JSON.stringify(newData) : newData, ttl);

    return newData;
  }
}
