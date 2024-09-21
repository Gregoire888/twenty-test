import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataModule } from './metadata/metadata.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [MetadataModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
