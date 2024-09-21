import { Module } from '@nestjs/common';
import { TableMetadataRepository } from './repositories/table-metadata.repository';
import { ColumnMetadataRepository } from './repositories/column-metadata.repository';

@Module({
  providers: [TableMetadataRepository, ColumnMetadataRepository],
})
export class MetadataModule {}
