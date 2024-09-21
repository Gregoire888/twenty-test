import { ColumnMetadataRepository } from './repositories/column-metadata.repository';
import { TableMetadataRepository } from './repositories/table-metadata.repository';
import { UserDataRepository } from './repositories/userdata.repository';

export enum MetadataServiceError {
  TABLE_NOT_FOUND = 'TABLE_NOT_FOUND',
}

export class MetadataService {
  constructor(
    private readonly tableRepository: TableMetadataRepository,
    private readonly columnRepository: ColumnMetadataRepository,
    private readonly userdataRepository: UserDataRepository,
  ) {}

  async createTable({ name, userId }: { name: string; userId: string }) {
    await this.userdataRepository.createTable({
      tableName: name,
      userId,
    });
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
    await this.userdataRepository.dropTable({
      tableName: name,
      userId,
    });
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

    await this.userdataRepository.createColumn({
      tableName,
      columnName: name,
      userId,
    });

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
    await this.userdataRepository.dropColumn({
      tableName,
      columnName: name,
      userId,
    });
    return this.columnRepository.delete(name, userId);
  }
}
