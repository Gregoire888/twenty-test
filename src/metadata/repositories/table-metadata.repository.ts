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
}
