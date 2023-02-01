import { Module } from '@nestjs/common';
import { UserRepositoryService } from './repository/services/user-repository.service';

@Module({
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class CoreModule {}
