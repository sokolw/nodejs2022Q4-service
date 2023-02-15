import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  album: Album;

  @Column({ default: false })
  isFavorite: boolean;
}
