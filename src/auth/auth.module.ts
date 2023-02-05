import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CoreModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
