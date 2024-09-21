import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserDataService } from './userdata.service';

@Controller('userdata')
export class UserdataController {
  constructor(private readonly service: UserDataService) {}
}
