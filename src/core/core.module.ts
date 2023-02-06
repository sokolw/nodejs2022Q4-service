import { Module } from '@nestjs/common';
import { ArtistRepositoryService } from './repository/services/artist-repository.service';
import { TrackRepositoryService } from './repository/services/track-repository.service';
import { UserRepositoryService } from './repository/services/user-repository.service';
import { AlbumRepositoryService } from './repository/services/album-repository.service';
import { FavsRepositoryService } from './repository/services/favs-repository.service';

@Module({
  providers: [
    UserRepositoryService,
    TrackRepositoryService,
    ArtistRepositoryService,
    AlbumRepositoryService,
    FavsRepositoryService,
  ],
  exports: [
    UserRepositoryService,
    TrackRepositoryService,
    ArtistRepositoryService,
    AlbumRepositoryService,
    FavsRepositoryService,
  ],
})
export class CoreModule {}
