import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FavsRepositoryService } from './../core/repository/services/favs-repository.service';
import { validate } from 'uuid';
import {
  ALBUM_NOT_EXIST,
  ARTIST_NOT_EXIST,
  INVALID_ID,
  TRACK_NOT_EXIST,
} from 'src/core/constants';
import { TrackRepositoryService } from 'src/core/repository/services/track-repository.service';
import { ArtistRepositoryService } from 'src/core/repository/services/artist-repository.service';
import { AlbumRepositoryService } from 'src/core/repository/services/album-repository.service';

@Injectable()
export class FavsService {
  constructor(
    private favsRepositoryService: FavsRepositoryService,
    private trackRepositoryService: TrackRepositoryService,
    private artistRepositoryService: ArtistRepositoryService,
    private albumRepositoryService: AlbumRepositoryService,
  ) {}

  async getAllFavs() {
    return this.favsRepositoryService.getAll();
  }

  async addTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existTrack = this.trackRepositoryService.getById(id);
    if (!existTrack) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsRepositoryService.addTrackId(id);
  }

  async delTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existTrack = this.trackRepositoryService.getById(id);
    if (!existTrack) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favsRepositoryService.delTrackId(id);
  }

  async addAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existAlbum = this.albumRepositoryService.getById(id);
    if (!existAlbum) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsRepositoryService.addAlbumId(id);
  }

  async delAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existAlbum = this.albumRepositoryService.getById(id);
    if (!existAlbum) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favsRepositoryService.delAlbumId(id);
  }

  async addArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existArtist = this.artistRepositoryService.getById(id);
    if (!existArtist) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favsRepositoryService.addArtistId(id);
  }

  async delArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const existArtist = this.artistRepositoryService.getById(id);
    if (!existArtist) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favsRepositoryService.delArtistId(id);
  }
}
