import { Module } from '@nestjs/common';
import { MetadataModule } from './metadata/metadata.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdataModule } from './userdata/userdata.module';

@Module({
  imports: [
    MetadataModule,
    UserdataModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: process.env.NODE_ENV === 'development',
      ssl: false,
    }),
  ],
})
export class AppModule {}
