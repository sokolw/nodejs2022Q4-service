import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { validate } from 'uuid';
import {
  ALBUM_NOT_EXIST,
  ARTIST_NOT_EXIST,
  INVALID_ID,
  TRACK_NOT_EXIST,
} from 'src/core/constants';
import { In, Repository } from 'typeorm';
import { Track } from 'src/track/track.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';
import { FavoritesResponse } from './classes/favorites-response';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { Favorites } from './favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: Repository<Track>,
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: Repository<Album>,
    @Inject('FAVS_REPOSITORY')
    private favsRepository: Repository<Favorites>,
  ) {}

  isInitFavs = false;

  async initFavs() {
    const favs = await this.favsRepository.find();
    if (favs.length > 0) {
      this.isInitFavs = true;
      return;
    }
    const favsRow = new Favorites();
    await this.favsRepository.save(favsRow);
    this.isInitFavs = true;
    return;
  }

  async getAllFavs(): Promise<FavoritesResponse> {
    if (!this.isInitFavs) await this.initFavs();
    const [favs] = await this.favsRepository.find();

    const tracks = await this.trackRepository.find({
      relations: { album: true, artist: true },
      where: { id: In(favs.trackIds) },
    });

    const artists = await this.artistRepository.find({
      where: { id: In(favs.artistIds) },
    });

    const albums = await this.albumRepository.find({
      relations: { artist: true },
      where: { id: In(favs.albumIds) },
    });

    return this.buildFavsResponse(tracks, artists, albums);
  }

  async addTrack(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
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

    const [favs] = await this.favsRepository.find();
    if (!favs.trackIds.includes(track.id)) {
      favs.trackIds.push(track.id);
      await this.favsRepository.save(favs);
    }
  }

  async delTrack(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const [favs] = await this.favsRepository.find();
    if (!favs.trackIds.includes(id)) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    favs.trackIds = favs.trackIds.filter((item) => item !== id);
    await this.favsRepository.save(favs);
  }

  async addAlbum(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
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

    const [favs] = await this.favsRepository.find();
    if (!favs.albumIds.includes(album.id)) {
      favs.albumIds.push(album.id);
      await this.favsRepository.save(favs);
    }
  }

  async delAlbum(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const [favs] = await this.favsRepository.find();
    if (!favs.albumIds.includes(id)) {
      throw new HttpException(
        { message: ALBUM_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    favs.albumIds = favs.albumIds.filter((item) => item !== id);
    await this.favsRepository.save(favs);
  }

  async addArtist(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
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

    const [favs] = await this.favsRepository.find();
    if (!favs.artistIds.includes(artist.id)) {
      favs.artistIds.push(artist.id);
      await this.favsRepository.save(favs);
    }
  }

  async delArtist(id: string): Promise<void> {
    if (!this.isInitFavs) await this.initFavs();
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const [favs] = await this.favsRepository.find();
    if (!favs.artistIds.includes(id)) {
      throw new HttpException(
        { message: ARTIST_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    favs.artistIds = favs.artistIds.filter((item) => item !== id);
    await this.favsRepository.save(favs);
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
