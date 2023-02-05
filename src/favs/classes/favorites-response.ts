import { Artist } from 'src/artist/classes/artist';
import { Album } from 'src/album/classes/album';
import { Track } from 'src/track/classes/track';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponse {
  @ApiProperty({
    description: 'Artists list',
    nullable: false,
    isArray: true,
    type: Artist,
  })
  artists: Artist[];

  @ApiProperty({
    description: 'Albums list',
    nullable: false,
    isArray: true,
    type: Album,
  })
  albums: Album[];

  @ApiProperty({
    description: 'Tracks list',
    nullable: false,
    isArray: true,
    type: Track,
  })
  tracks: Track[];
}
