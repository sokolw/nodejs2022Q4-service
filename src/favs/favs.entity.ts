import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', {
    array: true,
    default: '{}',
  })
  trackIds: string[];

  @Column('uuid', {
    array: true,
    default: '{}',
  })
  artistIds: string[];

  @Column('uuid', {
    array: true,
    default: '{}',
  })
  albumIds: string[];
}
