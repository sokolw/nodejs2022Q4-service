import { Artist } from 'src/artist/interfaces/artist.interface';
import { Album } from 'src/album/classes/album';
import { Track } from 'src/track/classes/track';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
