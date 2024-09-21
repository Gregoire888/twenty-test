import { Module } from '@nestjs/common';
import { TableMetadataRepository } from './repositories/table-metadata.repository';
import { ColumnMetadataRepository } from './repositories/column-metadata.repository';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnMetadata } from './entities/column-metadata.entity';
import { TableMetadata } from './entities/table-metadata.entity';
import { MetadataController } from './metadata.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnMetadata, TableMetadata])],
  providers: [
    TableMetadataRepository,
    ColumnMetadataRepository,
    MetadataService,
  ],
  controllers: [MetadataController],
})
export class MetadataModule {}
