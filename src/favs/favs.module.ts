import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [CoreModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
