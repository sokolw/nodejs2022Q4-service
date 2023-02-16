import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { validate } from 'uuid';
import {
  ALBUM_NOT_EXIST,
  ARTIST_NOT_EXIST,
  INVALID_ID,
  TRACK_NOT_EXIST,
} from 'src/core/constants';
import { Repository } from 'typeorm';
import { Track } from 'src/track/track.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';
import { FavoritesResponse } from './classes/favorites-response';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class FavsService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: Repository<Track>,
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: Repository<Album>,
  ) {}

  async getAllFavs(): Promise<FavoritesResponse> {
    const favsTracks = await this.trackRepository.find({
      where: { isFavorite: true },
      relations: { album: true, artist: true },
    });
    const favsArtists = await this.artistRepository.find({
      where: { isFavorite: true },
    });
    const favsAlbums = await this.albumRepository.find({
      where: { isFavorite: true },
      relations: { artist: true },
    });
    return this.buildFavsResponse(favsTracks, favsArtists, favsAlbums);
  }

  async addTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.trackRepository.save(Object.assign(track, { isFavorite: true }));
  }

  async delTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackRepository.save(
      Object.assign(track, { isFavorite: false }),
    );
  }

  async addAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.albumRepository.save(Object.assign(album, { isFavorite: true }));
  }

  async delAlbum(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumRepository.save(
      Object.assign(album, { isFavorite: false }),
    );
  }

  async addArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.artistRepository.save(
      Object.assign(artist, { isFavorite: true }),
    );
  }

  async delArtist(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistRepository.save(
      Object.assign(artist, { isFavorite: false }),
    );
  }

  private buildFavsResponse(
    favsTracks: Track[],
    favsArtists: Artist[],
    favsAlbums: Album[],
  ): FavoritesResponse {
    return {
      artists: favsArtists.map((artist) =>
        ArtistService.transformArtistEntity(artist),
      ),
      albums: favsAlbums.map((album) =>
        AlbumService.transformAlbumEntity(album),
      ),
      tracks: favsTracks.map((track) =>
        TrackService.transformTrackEntity(track),
      ),
    };
  }
}
