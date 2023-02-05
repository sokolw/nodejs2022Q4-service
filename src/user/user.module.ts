import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
