import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ColumnMetadata } from './column-metadata.entity';

@Entity()
export class TableMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('UserId-idx')
  @Column()
  userId: string;

  @Index('TableName-idx')
  @Column()
  name: string;

  @OneToMany(() => ColumnMetadata, (columnMetadata) => columnMetadata.table)
  columns: ColumnMetadata[];
}
