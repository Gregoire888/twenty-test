import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { TableMetadata } from './table-metadata.entity';

@Entity()
export class ColumnMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('TableName-idx')
  @Column()
  name: string;

  @ManyToOne(() => TableMetadata, (tableMetadata) => tableMetadata.columns)
  table: TableMetadata;
}
