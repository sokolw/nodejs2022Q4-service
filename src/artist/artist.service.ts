import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArtistRepositoryService } from 'src/core/repository/services/artist-repository.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { INVALID_ID, ARTIST_NOT_EXIST } from './../core/constants';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackRepositoryService } from 'src/core/repository/services/track-repository.service';
import { AlbumRepositoryService } from 'src/core/repository/services/album-repository.service';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepositoryService: ArtistRepositoryService,
    private trackRepositoryService: TrackRepositoryService,
    private albumRepositoryService: AlbumRepositoryService,
  ) {}

  async getAllArtists() {
    return this.artistRepositoryService.getAll();
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return this.artistRepositoryService.create(createArtistDto);
  }

  async getArtistById(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistRepositoryService.getById(id);
    if (artist) {
      return artist;
    }

    throw new HttpException(
      { message: ARTIST_NOT_EXIST },
      HttpStatus.NOT_FOUND,
    );
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = this.artistRepositoryService.getById(id);
    if (artist === null) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = this.artistRepositoryService.update({
      ...artist,
      ...updateArtistDto,
    });
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const user = this.artistRepositoryService.getById(id);
    if (user === null) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }
    this.trackRepositoryService.clearArtistDependency(id);
    this.albumRepositoryService.clearArtistDependency(id);
    this.artistRepositoryService.delete(id);
  }
}
