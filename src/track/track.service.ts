import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrackRepositoryService } from './../core/repository/services/track-repository.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { INVALID_ID, TRACK_NOT_EXIST } from 'src/core/constants';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ArtistRepositoryService } from 'src/core/repository/services/artist-repository.service';
import { AlbumRepositoryService } from 'src/core/repository/services/album-repository.service';

@Injectable()
export class TrackService {
  constructor(
    private trackRepositoryService: TrackRepositoryService,
    private artistRepositoryService: ArtistRepositoryService,
    private albumRepositoryService: AlbumRepositoryService,
  ) {}

  async getAllTracks() {
    return this.trackRepositoryService.getAll();
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const trackTemporary = createTrackDto;

    const existArtist = this.artistRepositoryService.getById(
      createTrackDto.artistId,
    );
    const existAlbum = this.albumRepositoryService.getById(
      createTrackDto.albumId,
    );

    if (!existArtist) {
      trackTemporary.artistId = null;
    }

    if (!existAlbum) {
      trackTemporary.albumId = null;
    }

    return this.trackRepositoryService.create(trackTemporary);
  }

  async getTrackById(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = this.trackRepositoryService.getById(id);
    if (track) {
      return track;
    }

    throw new HttpException({ message: TRACK_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = this.trackRepositoryService.getById(id);
    if (track === null) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    const trackTemporary = updateTrackDto;

    const existArtist = this.artistRepositoryService.getById(
      updateTrackDto.artistId,
    );
    const existAlbum = this.albumRepositoryService.getById(
      updateTrackDto.albumId,
    );

    if (!existArtist) {
      trackTemporary.artistId = null;
    }

    if (!existAlbum) {
      trackTemporary.albumId = null;
    }

    const updatedTrack = this.trackRepositoryService.update({
      ...track,
      ...trackTemporary,
    });
    return updatedTrack;
  }

  async deleteTrack(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = this.trackRepositoryService.getById(id);
    if (track === null) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.trackRepositoryService.delete(id);
  }
}
