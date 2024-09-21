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

  async createTable({
    tableName,
    userId,
  }: {
    tableName: string;
    userId: string;
  }) {
    try {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.createSchema(userId, true);
      await queryRunner.query(`CREATE TABLE ${userId}.${tableName}`);
      // TODO : finish create data query
    } catch (error) {
      return {
        success: false,
        reason: UserDataRepositoryError.UNKNOWN_ERROR,
      };
    }
  }

  async dropTable({
    tableName,
    userId,
  }: {
    tableName: string;
    userId: string;
  }) {
    // @TODO
  }

  async createColumn({
    tableName,
    userId,
    columnName,
  }: {
    columnName: string;
    tableName: string;
    userId: string;
  }) {
    // @TODO
  }

  async dropColumn({
    tableName,
    userId,
    columnName,
  }: {
    columnName: string;
    tableName: string;
    userId: string;
  }) {
    // @TODO
  }
}
