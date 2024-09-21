import { ColumnMetadataRepository } from './repositories/column-metadata.repository';
import { TableMetadataRepository } from './repositories/table-metadata.repository';

export class MetadataService {
  constructor(
    private readonly tableRepository: TableMetadataRepository,
    private readonly columnRepository: ColumnMetadataRepository,
  ) {}
}
