import { Module } from '@nestjs/common';
import { TableMetadataRepository } from './repositories/table-metadata.repository';
import { ColumnMetadataRepository } from './repositories/column-metadata.repository';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnMetadata } from './entities/column-metadata.entity';
import { TableMetadata } from './entities/table-metadata.entity';

@Module({
  providers: [
    TableMetadataRepository,
    ColumnMetadataRepository,
    MetadataService,
  ],
  imports: [TypeOrmModule.forFeature([ColumnMetadata, TableMetadata])],
})
export class MetadataModule {}
