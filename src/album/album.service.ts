import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AlbumRepositoryService } from 'src/core/repository/services/album-repository.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate } from 'uuid';
import { ALBUM_NOT_EXIST, INVALID_ID } from './../core/constants';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackRepositoryService } from 'src/core/repository/services/track-repository.service';
import { ArtistRepositoryService } from 'src/core/repository/services/artist-repository.service';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepositoryService: AlbumRepositoryService,
    private trackRepositoryService: TrackRepositoryService,
    private artistRepositoryService: ArtistRepositoryService,
  ) {}

  async getAllAlbums() {
    return this.albumRepositoryService.getAll();
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const albumTemporary = createAlbumDto;

    const existArtist = this.artistRepositoryService.getById(
      createAlbumDto.artistId,
    );

    if (!existArtist) {
      albumTemporary.artistId = null;
    }

    return this.albumRepositoryService.create(albumTemporary);
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

    const albumTemporary = updateAlbumDto;

    const existArtist = this.artistRepositoryService.getById(
      updateAlbumDto.artistId,
    );

    if (!existArtist) {
      albumTemporary.artistId = null;
    }

    const updatedAlbum = this.albumRepositoryService.update({
      ...album,
      ...albumTemporary,
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
