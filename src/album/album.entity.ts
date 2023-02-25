import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
