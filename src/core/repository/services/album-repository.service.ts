import { Injectable } from '@nestjs/common';
import { Repository } from '../repository';
import { v4 as randomId } from 'uuid';
import { Album } from 'src/album/classes/album';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';

@Injectable()
export class AlbumRepositoryService extends Repository<Album> {
  constructor() {
    super();
  }

  create(entity: CreateAlbumDto): Album {
    const newArtist: Album = {
      ...entity,
      id: randomId(),
    };
    this.data.push(newArtist);
    return { ...newArtist };
  }
}
