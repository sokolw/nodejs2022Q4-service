import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AlbumRepositoryService } from 'src/core/repository/services/album-repository.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { validate } from 'uuid';
import { ALBUM_NOT_EXIST, INVALID_ID } from './../core/constants';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { TrackRepositoryService } from 'src/core/repository/services/track-repository.service';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepositoryService: AlbumRepositoryService,
    private trackRepositoryService: TrackRepositoryService,
  ) {}

  async getAllAlbums() {
    return this.albumRepositoryService.getAll();
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.albumRepositoryService.create(createAlbumDto);
  }

  async getAlbumById(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumRepositoryService.getById(id);
    if (album) {
      return album;
    }

    throw new HttpException({ message: ALBUM_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumRepositoryService.getById(id);
    if (album === null) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedAlbum = this.albumRepositoryService.update({
      ...album,
      ...updateAlbumDto,
    });
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = this.albumRepositoryService.getById(id);
    if (album === null) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    this.trackRepositoryService.clearAlbumDependency(id);
    this.albumRepositoryService.delete(id);
  }
}
