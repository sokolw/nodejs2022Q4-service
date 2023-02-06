import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
