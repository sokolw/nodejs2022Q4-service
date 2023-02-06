import { Injectable } from '@nestjs/common';
import { Repository } from '../repository';
import { v4 as randomId } from 'uuid';
import { Artist } from 'src/artist/classes/artist';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';

@Injectable()
export class ArtistRepositoryService extends Repository<Artist> {
  constructor() {
    super();
  }

  create(entity: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...entity,
      id: randomId(),
    };
    this.data.push(newArtist);
    return { ...newArtist };
  }
}
