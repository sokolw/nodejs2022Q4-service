import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { INVALID_ID, ARTIST_NOT_EXIST } from './../core/constants';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { ArtistResponse } from './classes/artist-response';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists(): Promise<Array<ArtistResponse>> {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => ArtistService.transformArtistEntity(artist));
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const createdArtist = await this.artistRepository.save(
      Object.assign(new Artist(), createArtistDto),
    );
    return ArtistService.transformArtistEntity(createdArtist);
  }

  async getArtistById(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (artist) {
      return ArtistService.transformArtistEntity(artist);
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

    const artist = await this.artistRepository.findOneBy({ id });
    if (artist === null) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = await this.artistRepository.save(
      Object.assign(artist, updateArtistDto),
    );
    return ArtistService.transformArtistEntity(updatedArtist);
  }

  async deleteArtist(id: string) {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (artist === null) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.artistRepository.remove(artist);
  }

  static transformArtistEntity(entity: Artist): ArtistResponse {
    return { ...entity };
  }
}
