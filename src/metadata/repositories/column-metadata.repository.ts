import { Repository } from 'typeorm';
import { ColumnMetadata } from '../entities/column-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ColumnMetadataRepository {
  constructor(
    @InjectRepository(ColumnMetadata)
    private readonly repository: Repository<ColumnMetadata>,
  ) {}

  async create(name: string, tableId: string) {
    try {
      const result = await this.repository.save({
        name,
        table: { id: tableId },
      });
      return {
        success: true,
        id: result.id,
      };
    } catch (error) {
      return {
        success: false,
        id: null,
      };
    }
  }

  async delete(name: string, tableId: string) {
    try {
      await this.repository.delete({
        name,
        table: { id: tableId },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  async deleteAllForTable(tableId: string) {
    try {
      await this.repository.delete({
        table: { id: tableId },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
