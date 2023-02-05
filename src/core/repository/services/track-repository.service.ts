import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from 'src/track/dto/createTrack.dto';
import { Track } from 'src/track/interfaces/track.interface';
import { Repository } from '../repository';
import { v4 as randomId } from 'uuid';

@Injectable()
export class TrackRepositoryService extends Repository<Track> {
  constructor() {
    super();
  }

  create(entity: CreateTrackDto): Track {
    const newTrack: Track = {
      ...entity,
      id: randomId(),
    };
    this.data.push(newTrack);
    return { ...newTrack };
  }

  clearArtistDependency(id: string): void {
    this.data = this.data.map((item) => {
      if (item.artistId === id) {
        return { ...item, artistId: null };
      }
      return item;
    });
  }

  clearAlbumDependency(id: string): void {
    this.data = this.data.map((item) => {
      if (item.albumId === id) {
        return { ...item, albumId: null };
      }
      return item;
    });
  }
}
