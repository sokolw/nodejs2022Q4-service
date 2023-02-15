import { ArtistResponse } from 'src/artist/classes/artist-response';
import { AlbumResponse } from 'src/album/classes/album-response';
import { TrackResponse } from 'src/track/classes/track-response';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponse {
  @ApiProperty({
    description: 'Artists list',
    nullable: false,
    isArray: true,
    type: ArtistResponse,
  })
  artists: ArtistResponse[];

  @ApiProperty({
    description: 'Albums list',
    nullable: false,
    isArray: true,
    type: AlbumResponse,
  })
  albums: AlbumResponse[];

  @ApiProperty({
    description: 'Tracks list',
    nullable: false,
    isArray: true,
    type: TrackResponse,
  })
  tracks: TrackResponse[];
}
