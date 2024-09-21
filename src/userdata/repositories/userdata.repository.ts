import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

export enum UserDataRepositoryError {
  TABLE_NOT_FOUND = 'TABLE_NOT_FOUND',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

@Injectable()
export class UserDataRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createEntry({
    tableName,
    userId,
    entry,
  }: {
    tableName: string;
    userId: string;
    entry: Record<string, string>;
  }) {
    try {
      const repository = this.dataSource.getRepository(
        `${userId}.${tableName}`,
      );
      if (!repository)
        return {
          success: false,
          reason: UserDataRepositoryError.TABLE_NOT_FOUND,
        };
      const result = await repository.save(entry);
      return {
        success: true,
        id: result.id,
      };
    } catch (error) {
      return {
        success: false,
        reason: UserDataRepositoryError.UNKNOWN_ERROR,
      };
    }
  }

  async find({ tableName, userId }: { tableName: string; userId: string }) {
    const repository = this.dataSource.getRepository(`${userId}.${tableName}`);
    if (!repository)
      return {
        success: false,
        reason: UserDataRepositoryError.TABLE_NOT_FOUND,
      };
    return repository.find();
  }
}
