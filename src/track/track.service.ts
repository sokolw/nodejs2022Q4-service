import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { INVALID_ID, TRACK_NOT_EXIST } from 'src/core/constants';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Repository } from 'typeorm';
import { Track } from './track.entity';
import { TrackResponse } from './classes/track-response';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TRACK_REPOSITORY')
    private trackRepository: Repository<Track>,
    @Inject('ARTIST_REPOSITORY')
    private artistRepository: Repository<Artist>,
    @Inject('ALBUM_REPOSITORY')
    private albumRepository: Repository<Album>,
  ) {}

  async getAllTracks(): Promise<Array<TrackResponse>> {
    const tracks = await this.trackRepository.find({
      relations: { album: true, artist: true },
    });
    return tracks.map((track) => this.transformTrackEntity(track));
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackResponse> {
    const track = new Track();

    if (
      createTrackDto.artistId !== undefined &&
      validate(createTrackDto.artistId)
    ) {
      const artist = await this.artistRepository.findOneBy({
        id: createTrackDto.artistId,
      });
      track.artist = artist;
    }
    if (
      createTrackDto.albumId !== undefined &&
      validate(createTrackDto.albumId)
    ) {
      const album = await this.albumRepository.findOneBy({
        id: createTrackDto.albumId,
      });
      track.album = album;
    }

    const { id } = await this.trackRepository.save(
      Object.assign(track, {
        name: createTrackDto.name,
        duration: createTrackDto.duration,
      }),
    );

    const createdTrack = await this.trackRepository.findOne({
      where: { id },
      relations: { album: true, artist: true },
    });

    return this.transformTrackEntity(createdTrack);
  }

  async getTrackById(id: string): Promise<TrackResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOne({
      where: { id },
      relations: { album: true, artist: true },
    });
    if (track) {
      return this.transformTrackEntity(track);
    }

    throw new HttpException({ message: TRACK_NOT_EXIST }, HttpStatus.NOT_FOUND);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOne({
      where: { id },
      relations: { album: true, artist: true },
    });
    if (track === null) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      updateTrackDto.artistId !== undefined &&
      validate(updateTrackDto.artistId)
    ) {
      const artist = await this.artistRepository.findOneBy({
        id: updateTrackDto.artistId,
      });
      track.artist = artist;
    }
    if (
      updateTrackDto.albumId !== undefined &&
      validate(updateTrackDto.albumId)
    ) {
      const album = await this.albumRepository.findOneBy({
        id: updateTrackDto.albumId,
      });
      track.album = album;
    }

    const { id: trackId } = await this.trackRepository.save(
      Object.assign(track, {
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
      }),
    );
    const updatedTrack = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: {
        artist: true,
      },
    });

    return this.transformTrackEntity(updatedTrack);
  }

  async deleteTrack(id: string): Promise<void> {
    if (!validate(id)) {
      throw new HttpException({ message: INVALID_ID }, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (track === null) {
      throw new HttpException(
        { message: TRACK_NOT_EXIST },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackRepository.remove(track);
  }

  private transformTrackEntity(entity: Track): TrackResponse {
    const artistId = entity.artist ? entity.artist.id : null;
    const albumId = entity.album ? entity.album.id : null;
    delete entity.artist;
    delete entity.album;
    delete entity.isFavorite;
    return { ...entity, artistId, albumId };
  }
}
