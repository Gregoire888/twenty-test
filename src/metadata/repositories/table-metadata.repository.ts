import { Repository } from 'typeorm';
import { TableMetadata } from '../entities/table-metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TableMetadataRepository {
  constructor(
    @InjectRepository(TableMetadata)
    private readonly repository: Repository<TableMetadata>,
  ) {}

  async fetchByNameAndUserId(name: string, userId: string) {
    return this.repository.findOne({
      where: {
        name,
        userId,
      },
    });
  }

  async create(name: string, userId: string) {
    try {
      const result = await this.repository.save({
        name,
        userId,
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

  async delete(name: string, userId: string) {
    try {
      await this.repository.delete({
        name,
        userId,
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
