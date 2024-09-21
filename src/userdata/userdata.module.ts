import { Module } from '@nestjs/common';
import { UserDataService } from './userdata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserdataController } from './userdata.controller';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [UserDataService],
  controllers: [UserdataController],
})
export class UserdataModule {}
