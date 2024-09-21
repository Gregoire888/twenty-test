import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { MetadataService } from './metadata.service';
@Controller('metadata')
export class MetadataController {
  constructor(private readonly service: MetadataService) {}

  @Post('/:userId/table/create')
  createTable(@Param('userId') userId: string, @Body() body: { name: string }) {
    return this.service.createTable({ name: body.name, userId });
  }

  @Delete('/:userId/table/delete')
  deleteTable(@Param('userId') userId: string, @Body() body: { name: string }) {
    return this.service.deleteTable({ name: body.name, userId });
  }

  @Post('/:userId/column/create')
  createColumn(
    @Param('userId') userId: string,
    @Body() body: { tableName: string; name: string },
  ) {
    return this.service.createColumn({
      tableName: body.tableName,
      name: body.name,
      userId,
    });
  }

  @Delete('/:userId/table/delete')
  deleteColumn(
    @Param('userId') userId: string,
    @Body() body: { tableName: string; name: string },
  ) {
    return this.service.deleteColumn({
      tableName: body.tableName,
      name: body.name,
      userId,
    });
  }
}
