import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TrackRepositoryService } from './../core/repository/services/track-repository.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { INVALID_ID, TRACK_NOT_EXIST } from 'src/core/constants';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './classes/track';

@Injectable()
export class TrackService {
  constructor(private trackRepositoryService: TrackRepositoryService) {}

  async getAllTracks() {
    return this.trackRepositoryService.getAll();
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    return this.trackRepositoryService.create(createTrackDto);
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

    const updatedTrack = this.trackRepositoryService.update({
      ...track,
      ...updateTrackDto,
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
