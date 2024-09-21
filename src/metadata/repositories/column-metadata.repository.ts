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
}
