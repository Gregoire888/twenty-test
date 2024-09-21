import { UserDataRepository } from './repositories/userdata.repository';

export enum MetadataServiceError {
  TABLE_NOT_FOUND = 'TABLE_NOT_FOUND',
}

export class UserDataService {
  constructor(private readonly userDataRepository: UserDataRepository) {}

  createEntry({
    tableName,
    userId,
    entry,
  }: {
    tableName: string;
    userId: string;
    entry: Record<string, string>;
  }) {
    return this.userDataRepository.createEntry({
      tableName,
      userId,
      entry,
    });
  }

  async fetchEntries({
    tableName,
    userId,
  }: {
    tableName: string;
    userId: string;
  }) {
    return this.userDataRepository.find({ tableName, userId });
  }
}
