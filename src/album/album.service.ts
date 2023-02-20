import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate } from 'uuid';
import { ALBUM_NOT_EXIST, INVALID_ID } from './../core/constants';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { Artist } from 'src/artist/artist.entity';
import { AlbumResponse } from './classes/album-response';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: Repository<Album>,
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
  ) {}

  async getAllAlbums(): Promise<Array<AlbumResponse>> {
    const albums = await this.albumRepository.find({
      relations: {
        artist: true,
      },
    });
    return albums.map((album) => {
      return AlbumService.transformAlbumEntity(album);
    });
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumResponse> {
    const album = new Album();
    if (
      createAlbumDto.artistId !== undefined &&
      validate(createAlbumDto.artistId)
    ) {
      const artist = await this.artistRepository.findOneBy({
        id: createAlbumDto.artistId,
      });
      album.artist = artist;
    }

    const { id } = await this.albumRepository.save(
      Object.assign(album, {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
      }),
    );

    const createdAlbum = await this.albumRepository.findOne({
      where: { id },
      relations: {
        artist: true,
      },
    });
    return AlbumService.transformAlbumEntity(createdAlbum);
  }

  async getAlbumById(id: string): Promise<AlbumResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOne({
      where: { id },
      relations: {
        artist: true,
      },
    });
    if (album) {
      return AlbumService.transformAlbumEntity(album);
    }

    throw new HttpException({ message: ALBUM_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOne({
      where: { id },
      relations: {
        artist: true,
      },
    });
    if (album === null) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      updateAlbumDto.artistId !== undefined &&
      validate(updateAlbumDto.artistId)
    ) {
      const artist = await this.artistRepository.findOneBy({
        id: updateAlbumDto.artistId,
      });
      album.artist = artist;
    }

    const { id: albumId } = await this.albumRepository.save(
      Object.assign(album, {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
      }),
    );

    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: {
        artist: true,
      },
    });
    return AlbumService.transformAlbumEntity(updatedAlbum);
  }

  async deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (album === null) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumRepository.remove(album);
  }

  static transformAlbumEntity(entity: Album): AlbumResponse {
    const artistId = entity.artist ? entity.artist.id : null;
    delete entity.artist;
    return { ...entity, artistId };
  }
}
