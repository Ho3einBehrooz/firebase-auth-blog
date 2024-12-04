import { config } from 'dotenv';

config();

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
class Config {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): this {
    keys.forEach((k) => this.getValue(k, true));

    return this;
  }

  public getEnvironment(): string {
    return this.getValue('NODE_ENV');
  }

  public getHostAndPort(): { host: string; port?: number } {
    try {
      return {
        host: this.getValue('HOST'),
        port: Number(this.getValue('PORT')),
      };
    } catch (e) {
      return {
        host: '0.0.0.0',
        port: 3000,
      };
    }
  }

  public getAuthExpireTime(): string {
    try {
      const expireTime = this.getValue('JWT_EXPIRES_IN');
      if (!expireTime) {
        throw new InternalServerErrorException('JWT_EXPIRES_IN key not found');
      }

      return expireTime;
    } catch (error) {
      return '86400';
    }
  }

  public getAuthSecretKey(): string {
    return this.getValue('JWT_SECRET');
  }

  public getDataBaseName(): string {
    return this.getValue('DATABASE_NAME');
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: this.getValue('DATABASE_NAME'),
      type: 'postgres',
      host: this.getValue('DATABASE_HOST'),
      port: Number(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USERNAME'),
      password: this.getValue('DATABASE_PASSWORD'),
      database:
        this.getValue('NODE_ENV', false) === 'test'
          ? this.getValue('DATABASE_NAME') + '_test'
          : this.getValue('DATABASE_NAME'),
      entities: [
        join(__dirname, '..', '..', '/**/**/*{.js,.ts}'),
        join(__dirname, '..', '/common/entities/*{.js,.ts}'),
      ],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    };
  }

  public getFirebaseBase64Config(): string {
    return this.getValue('FIREBASE_SERVICE_ACCOUNT_BASE64');
  }
}

const configService = new Config(process.env);

type ConfigService = typeof configService;

export { configService, ConfigService, Config };
