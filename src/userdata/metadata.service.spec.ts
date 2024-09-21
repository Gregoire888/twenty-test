import { Test, TestingModule } from '@nestjs/testing';
import { MetadataService } from './userdata.service';
import { TableMetadataRepository } from './repositories/table-metadata.repository';
import { ColumnMetadataRepository } from './repositories/userdata.repository';

describe('MetadataService', () => {
  const tableRepositoryMock = {
    fetchByNameAndUserId: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  const columnRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    deleteAllForTable: jest.fn(),
  };
  let service: MetadataService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        MetadataService,
        {
          provide: TableMetadataRepository,
          useValue: tableRepositoryMock,
        },
        {
          provide: ColumnMetadataRepository,
          useValue: columnRepositoryMock,
        },
      ],
    }).compile();

    service = app.get<MetadataService>(MetadataService);
  });

  describe('createTable', () => {
    it('should call tableRepository.create', async () => {
      const expectedResult = { success: true, id: 'id1' };
      tableRepositoryMock.create.mockResolvedValue(expectedResult);
      const input = {
        name: 'myName',
        userId: 'userId',
      };
      const result = await service.createTable(input);
      expect(result).toEqual(expectedResult);
      expect(tableRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(tableRepositoryMock.create).toHaveBeenCalledWith(input);
    });
  });
  describe('deleteTable', () => {
    it('should call columnRepository.deleteAllForTable AND tableRepository.delete', async () => {
      const expectedResult = { success: true };
      const TABLE_ID = 'TABLE_ID';
      const input = {
        name: 'myName',
        userId: 'userId',
      };

      tableRepositoryMock.fetchByNameAndUserId.mockResolvedValue({
        id: TABLE_ID,
      });
      columnRepositoryMock.deleteAllForTable.mockResolvedValue({
        success: true,
      });
      tableRepositoryMock.delete.mockResolvedValue({
        success: true,
      });
      const result = await service.deleteTable(input);
      expect(result).toEqual(expectedResult);
      expect(tableRepositoryMock.fetchByNameAndUserId).toHaveBeenCalledTimes(1);
      expect(tableRepositoryMock.fetchByNameAndUserId).toHaveBeenCalledWith(
        input,
      );
      expect(columnRepositoryMock.deleteAllForTable).toHaveBeenCalledTimes(1);
      expect(columnRepositoryMock.deleteAllForTable).toHaveBeenCalledWith(
        TABLE_ID,
      );
      expect(tableRepositoryMock.delete).toHaveBeenCalledTimes(1);
      expect(tableRepositoryMock.delete).toHaveBeenCalledWith(TABLE_ID);
    });
  });
});
