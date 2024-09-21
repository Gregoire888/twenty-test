import { ColumnMetadataRepository } from './repositories/column-metadata.repository';
import { TableMetadataRepository } from './repositories/table-metadata.repository';

export enum MetadataServiceError {
  TABLE_NOT_FOUND = 'TABLE_NOT_FOUND',
}

export class MetadataService {
  constructor(
    private readonly tableRepository: TableMetadataRepository,
    private readonly columnRepository: ColumnMetadataRepository,
  ) {}

  createTable({ name, userId }: { name: string; userId: string }) {
    return this.tableRepository.create(name, userId);
  }

  async deleteTable({ name, userId }: { name: string; userId: string }) {
    const table = await this.tableRepository.fetchByNameAndUserId(name, userId);
    if (!table) {
      return {
        success: false,
        reason: MetadataServiceError.TABLE_NOT_FOUND,
      };
    }
    await this.columnRepository.deleteAllForTable(table.id);
    return this.tableRepository.delete(name, userId);
  }

  async createColumn({
    name,
    tableName,
    userId,
  }: {
    name: string;
    tableName: string;
    userId: string;
  }) {
    const table = await this.tableRepository.fetchByNameAndUserId(
      tableName,
      userId,
    );
    if (!table) {
      return {
        success: false,
        reason: MetadataServiceError.TABLE_NOT_FOUND,
      };
    }
    return this.columnRepository.create(name, table.id);
  }

  async deleteColumn({
    name,
    tableName,
    userId,
  }: {
    name: string;
    tableName: string;
    userId: string;
  }) {
    const table = await this.tableRepository.fetchByNameAndUserId(
      tableName,
      userId,
    );
    if (!table) {
      return {
        success: false,
        reason: MetadataServiceError.TABLE_NOT_FOUND,
      };
    }
    return this.columnRepository.delete(name, userId);
  }
}
