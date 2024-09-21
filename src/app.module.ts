import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataModule } from './metadata/metadata.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MetadataModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
