import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from 'src/favs/classes/favorites-response';
import { AlbumRepositoryService } from './album-repository.service';
import { ArtistRepositoryService } from './artist-repository.service';
import { TrackRepositoryService } from './track-repository.service';

@Injectable()
export class FavsRepositoryService {
  private artists: Array<string> = [];
  private albums: Array<string> = [];
  private tracks: Array<string> = [];

  constructor(
    private trackRepositoryService: TrackRepositoryService,
    private artistRepositoryService: ArtistRepositoryService,
    private albumRepositoryService: AlbumRepositoryService,
  ) {}

  getAll(): FavoritesResponse {
    return {
      albums: this.albumRepositoryService.getByIds(this.albums),
      artists: this.artistRepositoryService.getByIds(this.artists),
      tracks: this.trackRepositoryService.getByIds(this.tracks),
    };
  }

  addArtistId(id: string): void {
    this.artists.push(id);
  }

  addAlbumId(id: string): void {
    this.albums.push(id);
  }

  addTrackId(id: string): void {
    this.tracks.push(id);
  }

  delArtistId(id: string): void {
    this.artists = this.artists.filter((itemId) => itemId !== id);
  }

  delAlbumId(id: string): void {
    this.albums = this.albums.filter((itemId) => itemId !== id);
  }

  delTrackId(id: string): void {
    this.tracks = this.tracks.filter((itemId) => itemId !== id);
  }
}
